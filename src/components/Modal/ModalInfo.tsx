import { mdiCheckCircleOutline, mdiCloseOctagon } from "@mdi/js";
import Icon from "@mdi/react";
import { useEffect, useState } from "react";
import Button from "@components/Button/Button";

function ModalInfo(props: {
  iconType: string;
  description: string;
  isModalInfoActive: boolean;
  closeModalInfoEvent: () => void;
}) {
  const [title, setTitle] = useState("");
  const { isModalInfoActive: showModalInfo = false } = props;
  useEffect(() => {
    switch (props.iconType) {
      case "success": {
        setTitle("Sucesso!");
        break;
      }
      case "fail": {
        setTitle("Erro!");
        break;
      }
      default:
        "success";
    }
  }, [props.iconType]);
  if (showModalInfo) {
    return (
      <div className="absolute left-0 top-0 flex h-screen w-full items-center justify-center bg-black/80 p-4 sm:p-7">
        <div className="m-auto flex w-full max-w-2xl flex-col items-center justify-between rounded-lg bg-white p-7 shadow-2xl md:w-4/5 lg:w-1/3">
          {props.iconType == "success" ? (
            <Icon className="text-green-500" path={mdiCheckCircleOutline} size={2} />
          ) : (
            <Icon className="text-red-500" path={mdiCloseOctagon} size={2} />
          )}
          <div className="my-4 space-y-2 text-center">
            <p className="text-lg font-bold">{title}</p>
            <p>{props.description}</p>
          </div>
          <Button btnColor="black" label="Fechar" btnIsDisabled={false} emitClickEvent={props.closeModalInfoEvent} />
        </div>
      </div>
    );
  }
}

export default ModalInfo;
