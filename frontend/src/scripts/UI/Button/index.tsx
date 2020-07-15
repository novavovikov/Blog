import React, { FC, HTMLAttributes } from 'react'
import cn from 'classnames'

interface Props extends HTMLAttributes<HTMLButtonElement> {
  disabled?: boolean
}

const Button: FC<Props> = ({ className, ...restProps }) => {
  return (
    <button
      className={cn('btn', className)}
      {...restProps}
    />
  )
}

export default Button