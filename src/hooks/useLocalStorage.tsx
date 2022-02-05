import { useCallback, useState, Dispatch, SetStateAction } from 'react'

export const useLocalStorage = <Type,>(key: string, initialValue: Type): [Type, Dispatch<SetStateAction<Type>>] => {
  const [storedValue, setStoredValue] = useState<Type>(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.log(error)
      return initialValue
    }
  })
  const setStateAction = (value: Type | ((prevState: Type) => Type)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      window.localStorage.setItem(key, JSON.stringify(valueToStore))
    } catch (error) {
      console.log(error)
    }
  }

  window.localStorage.setItem(key, JSON.stringify(storedValue))

  return [storedValue, useCallback(setStateAction, [key, storedValue])]
}
