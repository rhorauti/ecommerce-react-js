import Button from "@components/Button/Button";
import Input from "@components/Input/Input";
import Loading from "@components/Loading/Loading";
import ModalInfo from "@components/Modal/ModalInfo";
import { sendEmailRecover } from "@core/http/auth/userAuth";
import { IAxiosErrorResponse } from "@core/interfaces/IAxiosResponse";
import { useState } from "react";
import { Link, redirect } from "react-router-dom";

export default function PasswordRecover() {
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
      const axiosError = error as IAxiosErrorResponse;
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
      <div className="bg-standard-gray flex h-screen w-full justify-center overflow-hidden p-7">
        <div className="m-auto flex w-full max-w-2xl flex-col justify-between rounded-lg bg-white p-7 shadow-2xl md:w-4/5 lg:w-3/5">
          <div>
            <p className="text-2xl font-bold">Recuperaçao de Senha</p>
          </div>
          <div className="mt-5 mb-3">
            <div>
              <p className="mb-2 font-semibold">E-mail</p>
              <Input icon="email" placeholder="exemplo@provedor.com" inputValue={(value) => setEmail(value)} />
            </div>
          </div>
          <p>O sistema irá enviar um link para o e-mail acima caso o mesmo esteja cadastrado.</p>
          <div className="mt-3">
            <Button emitClickEvent={sendRecoverEmail} btnColor="blue" btnClass="w-full" label="Enviar email" />
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
