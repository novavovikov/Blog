import React, { FC, HTMLAttributes } from 'react'
import cn from 'classnames'

interface Props extends HTMLAttributes<HTMLButtonElement> {

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