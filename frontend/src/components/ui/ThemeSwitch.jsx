import { useEffect, useState } from "react"
import { Sun, Moon } from "lucide-react"

export default function ThemeSwitch() {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "light"
  )

  useEffect(() => {
    const root = document.documentElement
    if (theme === "dark") {
      root.classList.add("dark")
    } else {
      root.classList.remove("dark")
    }
    localStorage.setItem("theme", theme)
  }, [theme])

  return (
    <button
      onClick={() =>
        setTheme(theme === "light" ? "dark" : "light")
      }
      aria-label="Cambiar modo de color"
      className="p-2 rounded-full shadow-soft transition-all duration-300 hover:scale-105 bg-secondary-light dark:bg-secondary-dark"
    >
      {theme === "light" ? (
        <Moon className="w-5 h-5 text-primary-light" />
      ) : (
        <Sun className="w-5 h-5 text-accent-dark" />
      )}
    </button>
  )
}
