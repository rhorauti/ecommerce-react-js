import Button from "@src/components/button/button";
import Input from "@src/components/input/input";
import Loading from "@src/components/loading/loading";
import ModalInfo from "@src/components/modal/modal-info";
import { sendEmailRecover } from "@src/core/http/auth/userAuth";
import { IAxiosResponseError } from "@src/core/interfaces/IAxiosResponseError";
import { useState } from "react";
import { Link, redirect } from "react-router-dom";

export function PasswordRecover() {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState<string>("");
  const [modalConfig, setModalConfig] = useState({
    isActive: false,
    iconType: "",
    message: "",
  });

  let isPasswordRecoverOk = false;

  async function sendRecoverEmail() {
    setIsLoading(true);
    try {
      const response = await sendEmailRecover(email);
      if (response.status) {
        isPasswordRecoverOk = true;
        setModalConfig(() => ({ isActive: true, iconType: "success", message: response.message }));
      } else {
        throw new Error("Falha ao tentar recuperar a senha!");
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

  function onModalInfoCloseEvent(): void {
    if (isPasswordRecoverOk) {
      redirect("/login");
      isPasswordRecoverOk = false;
    }
    setModalConfig((prevState) => ({ ...prevState, isActive: false }));
  }

  return (
    <div>
      <div className="bg-standard-gray flex h-screen w-full justify-center overflow-auto p-7">
        <div className="m-auto flex w-full max-w-2xl flex-col justify-between rounded-lg bg-white p-7 shadow-2xl md:w-4/5 lg:w-3/5">
          <div>
            <p className="text-2xl font-bold">Recuperaçao de Senha</p>
          </div>
          <div className="mt-5 mb-3">
            <div>
              <p className="mb-2 font-semibold">E-mail</p>
              <Input
                icon="email"
                placeholder="exemplo@provedor.com"
                inputValue={(value) => setEmail(value)}
              />
            </div>
          </div>
          <p>O sistema irá enviar um link para o e-mail acima caso o mesmo esteja cadastrado.</p>
          <div className="mt-3">
            <Button emitClickEvent={sendRecoverEmail} btnColor="blue" label="Enviar email" />
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
