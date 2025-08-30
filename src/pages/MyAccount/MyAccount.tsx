import { mdiHeart } from "@mdi/js";
import Icon from "@mdi/react";
import Title from "@src/components/Title/Title";
import { useState } from "react";

interface IItem {
  title: string;
  description: string;
}

function MyAccount() {
  const [items, setItems] = useState<IItem[]>([
    { title: "Endereços", description: "Alterar endereços para pedidos." },
    { title: "Meus pedidos", description: "Rastrear pedidos realizados." },
    { title: "Cartões", description: "Inserir e excluir cartões." },
    { title: "Endereços", description: "Alterar endereços para pedidos." },
    { title: "Meus pedidos", description: "Rastrear pedidos realizados." },
    { title: "Cartões", description: "Inserir e excluir cartões." },
    { title: "Endereços", description: "Alterar endereços para pedidos." },
    { title: "Meus pedidos", description: "Rastrear pedidos realizados." },
    { title: "Cartões", description: "Inserir e excluir cartões." },
  ]);
  return (
    <>
      <div className="p-7">
        <Title title="Sua conta"></Title>
        <div className="flex flex-wrap justify-center gap-5">
          {items?.map((item) => (
            <div className="flex items-center gap-4 p-3 border-black border w-1/2 md:w-1/4 cursor-pointer">
              <Icon className="" path={mdiHeart} size={1.5}></Icon>
              <div className="flex flex-col gap-1">
                <p>{item.title}</p>
                <p>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default MyAccount;
