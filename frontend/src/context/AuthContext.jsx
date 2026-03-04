import { createContext, useContext, useState } from 'react'

const AuthContext = createContext(null)

const DUMMY_USERS = [
  { email: 'test@gmail.com', password: '123', name: 'Stephen Nailes' },
]

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('sprintellect_user')
      return saved ? JSON.parse(saved) : null
    } catch {
      return null
    }
  })

  const login = (email, password) => {
    const found = DUMMY_USERS.find(
      (u) => u.email === email && u.password === password
    )
    if (found) {
      setUser(found)
      localStorage.setItem('sprintellect_user', JSON.stringify(found))
      return true
    }
    return false
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('sprintellect_user')
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
