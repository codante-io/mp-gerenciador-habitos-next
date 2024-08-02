import React from "react";
import { IoTimer } from "react-icons/io5";

export default function Logo() {
  return (
    <div className="inline-flex items-center justify-center text-mint w-full">
      <IoTimer className="w-8 h-8" />
      <div className="inline-flex font-bold text-4xl">
      <p>Habitos.</p>
      <p className=" text-secondary">diários</p>
      </div>
    </div>
  );
}
