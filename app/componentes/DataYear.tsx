'use client'
import { WEEKDAYS } from "@/app/utils/utils";
import { useEffect, useState } from "react";
import Dia from "./Day";
import { trocaHabito } from "../action";
import IconeFlexa from "./Icon";

type CalendarioProps = {
  habito: string;
  cadeiaHabito: Record<string, boolean> | null;
}

function getAllDiasMes(mes: number, ano: number): Array<Date | null> {
  const data = new Date(ano, mes, 1);
  const primeiroDiaMes = data.getDay()
  const ultimoDiaMes = Array(primeiroDiaMes).fill(null)
  const dias = [...ultimoDiaMes];
  while (data.getMonth() === mes) {
    dias.push(new Date(data));
    data.setDate(data.getDate() + 1)
  }

  return dias;
}

export default function CalendarioPagina(props: CalendarioProps) {

  const dataAtual = new Date();
  const mesAtual = dataAtual.getMonth()
  const anoAtual = dataAtual.getFullYear()


  const [mes, setMes] = useState<number>(mesAtual)
  const [ano, setAno] = useState<number>(anoAtual)
  const [selecionaData, setSelecionaData] = useState(new Date())
  const [diasMes, setDiasMes] = useState<Array<Date | null>>(getAllDiasMes(mes, ano))

  useEffect(() => {
    setDiasMes(getAllDiasMes(mes, ano))
    setSelecionaData(new Date(ano, mes, 1))
  }, [mes, ano])

  function mesAnterior() {
    if (mes === 0) {
      setAno(ano - 1)
      setMes(11)
    } else {
      setMes(mes - 1)
    }
  }

  function proximoMes() {
    if (mes === 11) {
      setAno(ano + 1)
      setMes(0)
    } else {
      setMes(mes + 1)
    }
  }

  function meses() {
    const mes = selecionaData.toLocaleString("pt-BR", { month: "long" })
    return `${mes.charAt(0).toUpperCase() + mes.slice(1)} de ${selecionaData.getFullYear()}`
  }

  function semana(dia: Date) {
    return `${ano.toString()}-${(mes + 1).toString().padStart(2, "0")}-${dia.getDate().toString().padStart(2, "0")}`
  }

  return (
    <section className="w-full my-2 rounded-md bg-neutral-800">
      <div className="flex justify-between mx-2 my-4 font-sans text-neutral-400">
        <button
          className="stroke-neutral-400"
          onClick={mesAnterior}
        >
          <IconeFlexa width={18} height={18} />
        </button>
        <span>{meses()}</span>
        <button
          className="rotate-180 stroke-neutral-400"
          onClick={proximoMes}
        >
          <IconeFlexa width={18} height={18} /></button>
      </div>
      <div className="grid w-full grid-cols-7">
        {WEEKDAYS.map((dia => (
          <div key={dia} className="flex flex-col items-center p-2">
            <span className="font-sans text-xs font-light text-neutral-200">
              {dia}
            </span>
          </div>
        )))}
        {diasMes.map((dia, index) => (
          <div
            key={index}
            className="flex flex-col items-center p-2"
            onClick={() => trocaHabito({
              habito: props.habito,
              cadeiaHabitos: props.cadeiaHabito,
              data: semana((dia as Date)),
              realizado: props.cadeiaHabito ? props.cadeiaHabito[semana((dia as Date))] : true
            })}
          >
            <span className="font-sans text-xs font-light text-neutral-400">
              {dia?.getDate()}
              {dia && <Dia dia={props.cadeiaHabito ? props.cadeiaHabito[semana(dia)] : undefined} />}
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}