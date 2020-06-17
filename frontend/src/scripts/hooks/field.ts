import { ChangeEvent, useCallback, useState } from 'react'

type UseEventHandler<T = any> = (e: T) => void
type UseEvent<T = any> = [T, UseEventHandler]

export const useField = (initialValue: string): UseEvent => {
  const [value, setValue] = useState(initialValue)

  const onChangeValue = useCallback((e: ChangeEvent) => {
    const { value } = e.target as HTMLInputElement
    setValue(value)
  }, [])

  return [value, onChangeValue]
}