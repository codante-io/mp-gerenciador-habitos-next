'use server';

import { kv } from '@vercel/kv';
import { revalidatePath } from 'next/cache';

export async function deletaHabito(habito: string) {
  await kv.hdel('habitos', habito);

  revalidatePath('/');
}

type HabitoParams = {
  habito: string;
  cadeiaHabitos: Record<string, boolean> | null;
  data: string | null;
  realizado?: boolean;
};

export async function trocaHabito({
  habito,
  cadeiaHabitos,
  data,
  realizado,
}: HabitoParams) {
  if (!cadeiaHabitos || !data) {
    return;
  }

  const atualizaHabito = {
    [habito]: {
      ...cadeiaHabitos,
      [data]: realizado === undefined ? true : !realizado,
    },
  };

  await kv.hset('habitos', atualizaHabito);
  revalidatePath('/');
}