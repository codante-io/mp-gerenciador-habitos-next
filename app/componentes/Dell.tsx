"use client";

import { deletaHabito } from "@/app/action";

import Image from "next/image";

function DeletaBotao({ habito }: { habito: string }) {
  return (
    <button onClick={() => deletaHabito(habito)}>
      <Image
        src="/images/trash.svg"
        width={20}
        height={20}
        alt="Ícone de lixeira vermelha"
      />
    </button>
  );
}

export default DeletaBotao;