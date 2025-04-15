import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "@src/components/button/button";
import { IRequestSignup } from "@src/core/interfaces/IAuthUser";
import { createUser } from "@src/core/http/auth/userAuth";
import Input from "@src/components/input/input";
import ModalInfo from "@src/components/modal/modal-info";
import Loading from "@src/components/loading/loading";
import { AxiosError } from "axios";
import { IAxiosResponseError } from "@src/core/interfaces/IAxiosResponseError";

function Signup() {
  const [isLoading, setIsLoading] = useState(false);
  const [signupData, setSignupData] = useState<IRequestSignup>({
    name: "",
    email: "",
    password: "",
    avatar: "",
  });
  const [signupRequirementsOk, setSignupRequirementsOk] = useState({
    isNameOk: false,
    isEmailOk: false,
    isPasswordOk: false,
  });
  const [modalConfig, setModalConfig] = useState({
    isActive: false,
    iconType: "",
    message: "",
  });
  const [isBtnDisabled, setIsBtnDisabled] = useState(true);
  const [isSignupOk, setIsSignupOk] = useState(false);

  async function registerNewUser(): Promise<void> {
    setIsLoading(true);
    try {
      const response = await createUser(signupData);
      if (response.status) {
        setIsSignupOk(true);
        setModalConfig(() => ({
          isActive: true,
          iconType: "success",
          message: response.message,
        }));
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      if (error && (error as AxiosError).isAxiosError) {
        const axiosError = error as IAxiosResponseError;
        setModalConfig(() => ({
          isActive: true,
          iconType: "fail",
          message: axiosError.response.data.message,
        }));
      }
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (
      signupRequirementsOk.isNameOk &&
      signupRequirementsOk.isEmailOk &&
      signupRequirementsOk.isPasswordOk
    ) {
      setIsBtnDisabled(false);
    } else {
      setIsBtnDisabled(true);
    }
  }, [
    signupRequirementsOk.isNameOk,
    signupRequirementsOk.isEmailOk,
    signupRequirementsOk.isPasswordOk,
  ]);

  const navigate = useNavigate();

  function onModalInfoCloseEvent(): void {
    if (isSignupOk) {
      navigate("/login");
      setIsSignupOk(false);
    }
    setModalConfig((prevState) => ({ ...prevState, isActive: false }));
  }

  return (
    <div>
      <div className="bg-standard-gray flex h-screen w-full justify-center overflow-hidden p-7">
        <div className="m-auto flex w-full max-w-2xl flex-col justify-between rounded-lg bg-white p-7 shadow-2xl md:w-4/5 lg:w-3/5">
          <div>
            <p className="text-2xl font-bold">Novo Usuário</p>
          </div>
          <div className="my-5 space-y-4">
            <div>
              <p className="mb-2 font-semibold">Nome</p>
              <Input
                validationType="name"
                icon="name"
                inputValue={(value) =>
                  setSignupData((prevState) => ({
                    ...prevState,
                    name: value,
                  }))
                }
                nameOk={(isNameOk) =>
                  setSignupRequirementsOk((prevState) => ({
                    ...prevState,
                    isNameOk: isNameOk,
                  }))
                }
              />
            </div>
            <div>
              <p className="mb-2 font-semibold">E-mail</p>
              <Input
                validationType="email"
                icon="email"
                placeholder="exemplo@provedor.com"
                inputValue={(value) =>
                  setSignupData((prevState) => ({ ...prevState, email: value }))
                }
                emailOk={(isEmailOk) =>
                  setSignupRequirementsOk((prevState) => ({ ...prevState, isEmailOk: isEmailOk }))
                }
              />
            </div>
            <div>
              <p className="mb-2 font-semibold">Senha</p>
              <Input
                validationType="password"
                icon="password"
                placeholder="***********"
                inputValue={(value) =>
                  setSignupData((prevState) => ({
                    ...prevState,
                    password: value,
                  }))
                }
                passwordOk={(isPasswordOk) =>
                  setSignupRequirementsOk((prevState) => ({
                    ...prevState,
                    isPasswordOk: isPasswordOk,
                  }))
                }
              />
            </div>
          </div>
          <div className="mt-3">
            <Button
              emitClickEvent={registerNewUser}
              btnColor="blue"
              btnIsDisabled={isBtnDisabled}
              label="Cadastrar com o e-mail"
            />
            {/* <p className="my-3 text-center">OU</p>
            <div>
              <button className="flex w-full items-center justify-center rounded-lg border-2 border-gray-400 p-1 font-semibold hover:bg-gray-100">
                <img src={"/img/logo-google.webp"} width="25" alt="Logo do Google" />
                <span className="ml-3">Registre-se com o Google</span>
              </button>
            </div> */}
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
        closeModalInfoEvent={onModalInfoCloseEvent}
        iconType={modalConfig.iconType}
        description={modalConfig.message}
      />
      <Loading isLoading={isLoading} />
    </div>
  );
}

export default Signup;
