import IconeFlecha from "@/app/componentes/Icon";
import Calendario from "@/app/componentes/DataYear";
import { kv } from "@vercel/kv";
import Link from "next/link";

type HabitoPaginaProps = {
  habito: string;
}

export default async function PaginaHabito({ params: { habito } }: { params: HabitoPaginaProps }) {
  const formataHabito = decodeURI(habito)
  const cadeiaHabito: Record<string, boolean> | null = await kv.hget("habitos", formataHabito)

  return (
    <main className="container relative flex flex-col gap-8 px-12 pt-16">
      <h1 className="text-2xl font-light text-center text-white font-display">{formataHabito}</h1>

      <Link href="/" className="flex  items-center font-sans text-xs text-neutral-300 gap-2 ">
        <IconeFlecha width={18} height={18}/>
        Voltar
      </Link>

      <Calendario habito={formataHabito} cadeiaHabito={cadeiaHabito} />
    </main>
  )}