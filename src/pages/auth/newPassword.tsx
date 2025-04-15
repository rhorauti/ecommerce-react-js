import Button from "@src/components/button/button";
import Input from "@src/components/input/input";
import Loading from "@src/components/loading/loading";
import ModalInfo from "@src/components/modal/modal-info";
import { updateUserPassword } from "@src/core/http/auth/userAuth";
import { IAxiosResponseError } from "@src/core/interfaces/IAxiosResponseError";
import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

function NewPassword() {
  const [isLoading, setIsLoading] = useState(false);
  const [newPassword, setNewPassword] = useState<string>("");
  const [isPasswordOk, setIsPasswordOk] = useState(false);
  const [isBtnDisabled, setIsBtnDisabled] = useState(true);
  const [modalConfig, setModalConfig] = useState({
    isActive: false,
    iconType: "",
    message: "",
  });
  const [searchParams] = useSearchParams("");
  const [token, setToken] = useState("");

  useEffect(() => {
    const tokenFromParams = searchParams.get("token");
    if (tokenFromParams) {
      setToken(tokenFromParams);
    }
  }, [searchParams]);

  const [_, setIsNewPasswordOk] = useState(false);

  async function updatePassword(): Promise<void> {
    setIsLoading(true);
    try {
      const response = await updateUserPassword(newPassword, token as string);
      if (response.status) {
        setIsNewPasswordOk(true);
        setModalConfig(() => ({ isActive: true, iconType: "success", message: response.message }));
      } else {
        throw new Error("Falha ao cadastrar a nova senha!");
      }
    } catch (error) {
      const axiosError = error as IAxiosResponseError;
      setModalConfig(() => ({
        isActive: true,
        iconType: "fail",
        message: axiosError.response.data.message,
      }));
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    isPasswordOk ? setIsBtnDisabled(false) : setIsBtnDisabled(true);
  }, [isPasswordOk]);

  const navigate = useNavigate();

  function onModalInfoCloseEvent(): void {
    if (isPasswordOk) {
      navigate("/login");
      setIsNewPasswordOk(false);
    }
    setModalConfig((prevState) => ({ ...prevState, isActive: false }));
  }

  return (
    <div>
      <div className="bg-standard-gray flex h-screen w-full justify-center overflow-auto p-7">
        <div className="m-auto flex w-full max-w-2xl flex-col justify-between rounded-lg bg-white p-7 shadow-2xl md:w-4/5 lg:w-3/5">
          <div>
            <p className="text-2xl font-bold">Nova Senha</p>
          </div>
          <div className="my-5 space-y-4">
            <div>
              <p className="mb-2 font-semibold">Senha</p>
              <Input
                validationType="password"
                icon="password"
                placeholder="***********"
                inputValue={(inputValue) => setNewPassword(inputValue)}
                passwordOk={(isPassordOk) => setIsPasswordOk(isPassordOk)}
              />
            </div>
          </div>
          <div className="mt-3">
            <Button
              emitClickEvent={updatePassword}
              btnColor="blue"
              btnIsDisabled={isBtnDisabled}
              label="Cadastrar nova senha"
            />
            <p className="mt-4 text-center">
              Já tem conta?{" "}
              <Link to="/login" className="cursor-pointer font-bold">
                Acessar
              </Link>
            </p>
          </div>
        </div>
      </div>
      <ModalInfo
        isModalInfoActive={modalConfig.isActive}
        closeModalInfoEvent={() => onModalInfoCloseEvent()}
        iconType={modalConfig.iconType}
        description={modalConfig.message}
      />
      <Loading isLoading={isLoading} />
    </div>
  );
}

export default NewPassword;
