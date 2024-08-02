import React from 'react'
import Button from './components/button'
import Logo from './components/logo'
import Link from 'next/link'

export default function page() {
  return (
    <>
      <p className='text-center font-bold text-3xl'>Voce não tem hábitos cadastrados</p>
      <Link href="/create" >
        <Button>
          Novo Habito
        </Button>
      </Link>
    </>
  )
}
