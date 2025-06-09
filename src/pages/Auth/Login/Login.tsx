import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "@src/components/Button/Button";
import { IRequestLogin } from "@src/core/interfaces/IAuthUser";
import { authenticateUser } from "@src/core/http/auth/userAuth";
import Input from "@src/components/Input/Input";
import ModalInfo from "@src/components/Modal/ModalInfo";
import Loading from "@src/components/Loading/Loading";
import { IAxiosErrorResponse } from "@src/core/interfaces/IAxiosResponse";
import { store } from "@src/store/store";
import { getToken, hideMenuBar, setUserData, showMenuBar } from "@src/store/auth.store";

function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const [loginData, setloginData] = useState<IRequestLogin>({
    email: "",
    password: "",
  });
  const [modalConfig, setModalConfig] = useState({
    isActive: false,
    iconType: "",
    message: "",
  });

  const [isLoginOk, setIsLoginOk] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    store.dispatch(hideMenuBar());
  });

  async function loginUser(): Promise<void> {
    setIsLoading(true);
    try {
      const response = await authenticateUser(loginData);
      if (response.status) {
        store.dispatch(getToken({ token: response.token }));
        store.dispatch(
          setUserData({
            name: response.data.name,
            email: response.data.email,
            avatar: response.data.avatar,
          })
        );
        setModalConfig(() => ({ isActive: true, iconType: "success", message: response.message }));
        setIsLoginOk(true);
      } else {
        throw new Error(response.message);
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
    if (isLoginOk) {
      setIsLoginOk(false);
      navigate("/home");
      setloginData(() => ({ email: "", password: "" }));
      store.dispatch(showMenuBar());
    }
    setModalConfig((prevState) => ({ ...prevState, isActive: false }));
  }

  return (
    <div>
      <div className="bg-standard-gray flex h-screen w-full justify-center overflow-hidden p-7">
        <div className="m-auto flex w-full max-w-2xl flex-col justify-between rounded-lg bg-white p-7 shadow-2xl md:w-4/5 lg:w-3/5">
          <div>
            <p className="text-2xl font-bold">Bem-vindo!</p>
            <p className="mt-4">
              Logando ou criando uma conta, você concorda com os
              <span className="cursor-pointer font-bold"> Termos de Serviço</span> da aplicação
            </p>
          </div>
          <div className="mt-5 mb-4 space-y-4">
            <div>
              <p className="mb-2 font-semibold">E-mail</p>
              <Input
                icon="email"
                placeholder="exemplo@provedor.com"
                inputValue={(value) => setloginData((prevState) => ({ ...prevState, email: value }))}
              />
            </div>
            <div>
              <p className="mb-2 font-semibold">Senha</p>
              <Input
                icon="password"
                placeholder="***********"
                inputValue={(value) =>
                  setloginData((prevState) => ({
                    ...prevState,
                    password: value,
                  }))
                }
              />
            </div>
            <p className="text-center">
              Esqueceu a senha?{" "}
              <Link to="/password-recover" className="cursor-pointer font-bold">
                Clique aqui
              </Link>
            </p>
          </div>
          <div>
            <Button emitClickEvent={loginUser} btnColor="blue" btnClass="w-full" label="Entrar" />
            {/* <p className="my-3 text-center">OU</p> */}
            {/* <div className="mt-3">
              <button className="flex w-full items-center justify-center rounded-lg border-2 border-gray-400 p-1 font-semibold hover:bg-gray-100">
                <img src={"/img/logo-google.webp"} width="25" alt="Logo do Google" />
                <span className="ml-3">Acessar com o Google</span>
              </button>
            </div> */}
            <p className="mt-4 text-center">
              Não tem conta?{" "}
              <Link to="/signup" className="cursor-pointer font-bold">
                Crie uma nova conta
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

export default Login;
