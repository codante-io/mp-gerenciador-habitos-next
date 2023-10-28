import Image from "next/image";

type DiaProps = {
  dia: boolean | undefined
}

const iconeDia = (dia: boolean | undefined) => {
  switch (dia) {
    case undefined:
      return {
        icon: '/images/task.svg',
        alt: 'incomplete dia',
        size: 14,
      }
    case true:
      return {
        icon:  '/images/acert.svg',
        alt: 'check dia',
        size: 24,
      } 
    default:
      return {
        icon:  '/images/fail.svg',
        alt: 'fail day',
        size: 24,
      } 
      
  }
}

export default function Dia(props: DiaProps) {
  return (
    <div className="flex items-center justify-center h-9">
      <Image 
        src={iconeDia(props.dia).icon}
        width={iconeDia(props.dia).size}
        height={iconeDia(props.dia).size}
        alt={iconeDia(props.dia).alt}
        
      />
    </div>
  )
}