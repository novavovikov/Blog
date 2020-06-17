import React, { FC, useCallback, useState } from 'react'
import cn from 'classnames'
import s from './styles.css'

interface Props {
  className?: string
}

const AVAILABLE_MIME_TYPES = [
  'images/jpeg'
]

const FileLoader: FC<Props> = ({
  className,
  children,
  ...restProps
}) => {
  const [img, setImg] = useState<string | null>(null)

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const [file] = e.target.files || []
    const fileReader = new FileReader()

    fileReader.onloadend = function () {
      console.log(file.type)
      setImg(fileReader.result as string)
    }

    if (file) {
      fileReader.readAsDataURL(file)
    } else {
      setImg(null)
    }
  }, [])

  return (
    <label
      className={cn(
        s.FileLoader,
        className,
      )}
    >
      <input
        type="file"
        className={s.FileLoader__input}
        onChange={onChange}
        {...restProps}
      />

      {img
        ? (
          <img
            className={s.FileLoader__img}
            src={img}
            alt=""
          />
        )
        : <span className={s.FileLoader__label}>{children}</span>
      }
    </label>
  )
}

export default FileLoader