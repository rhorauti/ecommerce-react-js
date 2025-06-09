import { useEffect, useState } from "react";
import Icon from "@mdi/react";
import { mdiEmailOutline, mdiAccount, mdiEyeOutline, mdiEyeOffOutline, mdiCheckCircle, mdiCloseCircle } from "@mdi/js";

function Input(props: {
  icon?: string;
  placeholder?: string;
  showIcon?: boolean;
  validationType?: string;
  inputValue?: (value: string) => void;
  passwordOk?: (isOk: boolean) => void;
  nameOk?: (isOk: boolean) => void;
  emailOk?: (isOk: boolean) => void;
}) {
  const { icon = "email", placeholder = "", showIcon = true } = props;
  const [showPassword, setShowPassword] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isBorderRed, setIsBorderRed] = useState(false);
  const [isBorderGreen, setIsBorderGreen] = useState(false);
  const [isLettersQtyPasswordOk, setIsLetterQtyPasswordOk] = useState(false);
  const [isOneLetterNumberOk, setIsOneLetterNumberOk] = useState(false);
  const [isOneLetterSymbolOk, setIsOneLetterSymbolOk] = useState(false);
  const [isOneLetterUppercaseOk, setIsOneLetterUppercaseOk] = useState(false);
  const [isLettersQtyNameOk, setIsLettersQtyNameOk] = useState(false);
  const [isEmailOk, setIsEmailOk] = useState(false);

  useEffect(() => {
    if (inputValue.length > 0 && props.validationType) {
      switch (props.validationType) {
        case "name": {
          if (inputValue.length > 1) {
            setIsLettersQtyNameOk(true);
            setIsBorderRed(false);
            setIsBorderGreen(true);
            props.nameOk && props.nameOk(true);
          } else {
            props.nameOk && props.nameOk(false);
            setIsLettersQtyNameOk(false);
            setIsBorderRed(true);
            setIsBorderGreen(false);
          }
          break;
        }
        case "email": {
          if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inputValue)) {
            setIsEmailOk(true);
            setIsBorderRed(false);
            setIsBorderGreen(true);
            props.emailOk && props.emailOk(true);
          } else {
            props.emailOk && props.emailOk(false);
            setIsBorderRed(true);
            setIsBorderGreen(false);
            setIsEmailOk(false);
          }
          break;
        }
        case "password": {
          const isLengthOk = inputValue.length > 5;
          const hasNumber = /[0-9]/g.test(inputValue);
          const hasUppercase = /[A-Z]/g.test(inputValue);
          const hasSymbol = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/g.test(inputValue);
          setIsLetterQtyPasswordOk(isLengthOk);
          setIsOneLetterNumberOk(hasNumber);
          setIsOneLetterUppercaseOk(hasUppercase);
          setIsOneLetterSymbolOk(hasSymbol);

          const isPasswordValid = isLengthOk && hasNumber && hasUppercase && hasSymbol;
          if (isPasswordValid) {
            setIsBorderRed(false);
            setIsBorderGreen(true);
          } else {
            setIsBorderRed(true);
            setIsBorderGreen(false);
          }
          props.passwordOk && props.passwordOk(isPasswordValid);
          break;
        }
        default:
          "password";
          break;
      }
    } else {
      setIsBorderRed(false);
    }
  }, [inputValue]);

  function handleInputValue(e: React.ChangeEvent<HTMLInputElement>) {
    setInputValue(e.target.value);
    props.inputValue && props.inputValue(e.target.value);
  }

  return (
    <div>
      <div className="relative">
        <input
          type={icon == "password" && !showPassword ? "password" : "text"}
          className={`w-full rounded-md border-2 ${
            isBorderRed ? "border-red-500" : isBorderGreen ? "border-green-600" : "border-gray-300"
          } bg-transparent py-2 pl-3 pr-11`}
          placeholder={placeholder}
          onInput={handleInputValue}
        />
        {showIcon &&
          ((icon == "email" && <Icon path={mdiEmailOutline} size={1} className="absolute right-3 top-2" />) ||
            (icon == "name" && <Icon path={mdiAccount} size={1} className="absolute right-3 top-2" />) ||
            (icon == "password" &&
              (showPassword ? (
                <div onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-2 cursor-pointer">
                  <Icon path={mdiEyeOutline} size={1} />
                </div>
              ) : (
                <div onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-2 cursor-pointer">
                  <Icon path={mdiEyeOffOutline} size={1} />
                </div>
              ))))}
      </div>
      <div>
        {(props.validationType == "name" && inputValue.length > 0 && (
          <p
            className={`flex items-center mt-3
            ${isLettersQtyNameOk ? "text-green-600" : "text-red-500"}`}
          >
            <Icon path={isLettersQtyNameOk ? mdiCheckCircle : mdiCloseCircle} size={1}></Icon>
            <span className="ml-1">Mínimo de 2 caracteres</span>
          </p>
        )) ||
          (props.validationType == "email" && inputValue.length > 0 && (
            <p
              className={`flex items-center mt-3
            ${isEmailOk ? "text-green-600" : "text-red-500"}`}
            >
              <Icon path={isEmailOk ? mdiCheckCircle : mdiCloseCircle} size={1}></Icon>
              <span className="ml-1">Email válido</span>
            </p>
          )) ||
          (props.validationType == "password" && inputValue.length > 0 && (
            <div className="mt-3 space-y-1">
              <p
                className={`flex items-center
                  ${isOneLetterUppercaseOk ? "text-green-600" : "text-red-500"}`}
              >
                <Icon path={isOneLetterUppercaseOk ? mdiCheckCircle : mdiCloseCircle} size={1}></Icon>
                <span className="ml-1">Mínimo de 1 letra maiúscula</span>
              </p>
              <p
                className={`flex items-center
                  ${isOneLetterNumberOk ? "text-green-600" : "text-red-500"}`}
              >
                <Icon path={isOneLetterNumberOk ? mdiCheckCircle : mdiCloseCircle} size={1}></Icon>
                <span className="ml-1">Mínimo de 1 número</span>
              </p>
              <p
                className={`flex items-center
                  ${isOneLetterSymbolOk ? "text-green-600" : "text-red-500"}`}
              >
                <Icon path={isOneLetterSymbolOk ? mdiCheckCircle : mdiCloseCircle} size={1}></Icon>
                <span className="ml-1">Mínimo de 1 caracter especial</span>
              </p>
              <p
                className={`flex items-center
                  ${isLettersQtyPasswordOk ? "text-green-600" : "text-red-500"}`}
              >
                <Icon path={isLettersQtyPasswordOk ? mdiCheckCircle : mdiCloseCircle} size={1}></Icon>
                <span className="ml-1">Mímino de 6 caracteres</span>
              </p>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Input;
