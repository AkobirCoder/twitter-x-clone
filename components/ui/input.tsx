import * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        `w-full p-3 text-md bg-black border-2 border-neutral-800 rounded-md outline-none text-white
        focus:border-sky-500 focus:border-2 transition disabled:bg-neutral-900 disabled:cursor-not-allowed disabled:opacity-70`,
        className
      )}
      {...props}
    />
  )
}

export { Input }
