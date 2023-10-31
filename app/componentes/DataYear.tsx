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

  const currentDate = new Date();
  const currentDay = currentDate.getDay()
  const currentMonth = currentDate.getMonth()
  const currentYear = currentDate.getFullYear()
  const [mes, setMonth] = useState<number>(currentMonth)
  const [ano, setYear] = useState<number>(currentYear)
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [daysInMonth, setDaysInMonth] = useState<Array<Date | null>>(getAllDiasMes(mes, ano))

  useEffect(() => {
    setDaysInMonth(getAllDiasMes(mes, ano))
    setSelectedDate(new Date(ano, mes, 1))
  }, [mes, ano])

  function goToPreviousMonth() {
    // based on index
    // jan = 0
    // dec = 11
    if (mes === 0) {
      setYear(ano - 1)
      setMonth(11)
    } else {
      setMonth(mes - 1)
    }
  }

  function goToNextMonth() {
    // based on index
    // jan = 0
    // dec = 11
    if (mes === 11) {
      setYear(ano + 1)
      setMonth(0)
    } else {
      setMonth(mes + 1)
    }
  }

  function monthDictionary() {
    const monthName = selectedDate.toLocaleString("pt-BR", { month: "long" })
    return `${monthName.charAt(0).toUpperCase() + monthName.slice(1)} de ${selectedDate.getFullYear()}`
  }

  function getDayString(day: Date) {
    return `${ano.toString()}-${(mes + 1).toString().padStart(2, "0")}-${day.getDate().toString().padStart(2, "0")}`
  }

  return (
    <section className="w-full my-2 rounded-md bg-neutral-800">
      <div className="flex justify-between mx-2 my-4 font-sans text-neutral-400">
        <button
          className="stroke-neutral-400"
          onClick={goToPreviousMonth}
        >
          <IconeFlexa width={18} height={18} />
        </button>
        <span>{monthDictionary()}</span>
        <button
          className="rotate-180 stroke-neutral-400"
          onClick={goToNextMonth}
        >
          <IconeFlexa width={18} height={18} /></button>
      </div>
      <div className="grid w-full grid-cols-7">
        {WEEKDAYS.map((day => (
          <div key={day} className="flex flex-col items-center p-2">
            <span className="font-sans text-xs font-light text-neutral-200">
              {day}
            </span>
          </div>
        )))}
        {daysInMonth.map((day, index) => (
          <div
            key={index}
            className="flex flex-col items-center p-2"
            onClick={() => trocaHabito({
              habito: props.habito,
              cadeiaHabitos: props.cadeiaHabito,
              data: getDayString((day as Date)),
              realizado: props.cadeiaHabito ? props.cadeiaHabito[getDayString((day as Date))] : true
            })}
          >
            <span className="font-sans text-xs font-light text-neutral-400">
              {day?.getDate()}
              {day && <Dia dia={props.cadeiaHabito ? props.cadeiaHabito[getDayString(day)] : undefined} />}
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}