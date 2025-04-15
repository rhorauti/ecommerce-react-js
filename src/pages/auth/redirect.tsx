import Button from "@src/components/button/button";
import { checkValidToken } from "@src/core/http/auth/userAuth";
import { IAxiosResponseError } from "@src/core/interfaces/IAxiosResponseError";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

function Redirect() {
  const [message, setMessage] = useState("");
  const [searchParams] = useSearchParams("");

  useEffect(() => {
    const token = searchParams.get("token");
    async function verifyToken() {
      if (token) {
        try {
          const response = await checkValidToken(token);
          setMessage(response.message);
        } catch (error) {
          const axiosError = error as IAxiosResponseError;
          setMessage(axiosError.response.data.message);
        }
      }
    }
    verifyToken();
  }, []);

  const navigate = useNavigate();

  function onRedirect() {
    navigate("/login");
  }

  return (
    <div className="bg-standard-gray flex flex-col h-screen w-full justify-center items-center overflow-auto p-7">
      <div className="md:w-1/3 w-full">
        <p className="text-center text-lg font-bold mb-4">{message}</p>
        <Button emitClickEvent={onRedirect} btnColor="blue" label="Voltar para login" />
      </div>
    </div>
  );
}

export default Redirect;
