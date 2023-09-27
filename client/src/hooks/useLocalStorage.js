import { useEffect, useState } from "react"

export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    const jsonValue = localStorage.getItem(key)

    if (jsonValue == undefined || jsonValue == null) {
      return initialValue;
    }

    try {
      return JSON.parse(jsonValue)
    } catch (error) {
      console.error("Error parsing local storage value:", error);
      return initialValue;
    }

  })

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  return [value, setValue]
}