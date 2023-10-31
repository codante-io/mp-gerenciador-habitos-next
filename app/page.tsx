// import { kv } from "@vercel/kv";
import DeletaBotao from "./componentes/DeletaBotao";
import Link from "next/link";
import { WEEKDAYS } from "./utils/utils";
import Dia from "./componentes/Dia";

type Habitos = {
  [habito: string]: Record<string, boolean>;
} | null;

export default async function Home() {
  // const habitos: Habitos = await kv.hgetall("habitos");

  const hoje = new Date().getDay();
  const diasSemana = WEEKDAYS.slice(hoje + 1).concat(
    WEEKDAYS.slice(0, hoje + 1)
  );
  const ultimosDiasSemana = WEEKDAYS.map((_, index) => {
    const date = new Date();
    date.setDate(date.getDate() - 1 - index);

    return date.toISOString().slice(0, 10);
  }).reverse();

  return (
    <main className="container relative flex flex-col grap-8 px-4 pt-16 text-center">
      {/* {habitos === null ||
        (Object.keys(habitos).length === 0 && (
          <h1 className="mt-20 text-4xl font-ligth text-white font-display">
            Não existes hábitos Cadastrados
          </h1>
        ))}
      {habitos !== null &&
        Object.entries(habitos).map(([habito, cadeiaHabitos]) => (
          <div key={habito} className="text-white">
            <div className="flex justify-between items-center">
              <span className="font-sans text-xl text-whit font-light">
                {habito}
              </span>
              <DeletaBotao habito={habito} />
              <Link href={`habito/${habito}`}>
              <section className="grid grid-cols-7 bg-neutral-800 rounded-md p-2">
                {diasSemana.map((dia, index) => (
                  <div key={dia} className="flex flex-col last:font-bold">
                    <span className="font-sans text-xs text-white text-center">
                      {dia}
                    </span>
                    <Dia dia={cadeiaHabitos[ultimosDiasSemana[index]]} />
                  </div>
                ))}
              </section>
              </Link>
            </div>

          </div>
        ))}
        <Link href={"novo-habito"} className="fixed text-center bottom-10 w-2/3 left-1/2 -translate-x-1/2 text-neutral-900 bg-[#45EDAD] font-display font-normal text-2xl p-2 rounded-md">
        Novo Hábito
        </Link> */}
    </main>
  );
}
