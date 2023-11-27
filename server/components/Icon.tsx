import { HtmlHTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'

type Props = HtmlHTMLAttributes<HTMLDivElement>

function Icon({ children, className, ...rest }: Props) {
  return (
    <div
      className={twMerge(
        'flex flex-col justify-center bg-extraLightPurple rounded-full text-black text-xs w-6 h-6',
        className
      )}
      {...rest}
    >
      {children}
    </div>
  )
}

export default Icon
