import React from "react";

type ButtonProps = {
  children: React.ReactNode;
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({ children, className, ...props }: ButtonProps) {
  return (
    <button
      type="button"
      className="w-full bg-navy text-accent text-md font-semibold py-2 rounded-md hover:opacity-90"
      {...props}
    >
      {children}
    </button>
  );
}
