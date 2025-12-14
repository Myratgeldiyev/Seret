"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface User {
  id: string
  email: string
  subscription: "none" | "basic" | "standard" | "premium"
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => boolean
  register: (email: string, password: string) => boolean
  logout: () => void
  updateSubscription: (plan: "basic" | "standard" | "premium") => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    // Load user from localStorage on mount
    const savedUser = localStorage.getItem("seret_user")
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
  }, [])

  const login = (email: string, password: string): boolean => {
    // Get users from localStorage
    const users = JSON.parse(localStorage.getItem("seret_users") || "[]")
    const foundUser = users.find((u: any) => u.email === email && u.password === password)

    if (foundUser) {
      const userData: User = {
        id: foundUser.id,
        email: foundUser.email,
        subscription: foundUser.subscription || "none",
      }
      setUser(userData)
      localStorage.setItem("seret_user", JSON.stringify(userData))
      return true
    }
    return false
  }

  const register = (email: string, password: string): boolean => {
    // Get existing users
    const users = JSON.parse(localStorage.getItem("seret_users") || "[]")

    // Check if user already exists
    if (users.some((u: any) => u.email === email)) {
      return false
    }

    // Create new user
    const newUser = {
      id: Date.now().toString(),
      email,
      password,
      subscription: "none",
    }

    users.push(newUser)
    localStorage.setItem("seret_users", JSON.stringify(users))

    // Auto login
    const userData: User = {
      id: newUser.id,
      email: newUser.email,
      subscription: "none",
    }
    setUser(userData)
    localStorage.setItem("seret_user", JSON.stringify(userData))
    return true
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("seret_user")
  }

  const updateSubscription = (plan: "basic" | "standard" | "premium") => {
    if (user) {
      const updatedUser = { ...user, subscription: plan }
      setUser(updatedUser)
      localStorage.setItem("seret_user", JSON.stringify(updatedUser))

      // Update in users array
      const users = JSON.parse(localStorage.getItem("seret_users") || "[]")
      const updatedUsers = users.map((u: any) => (u.id === user.id ? { ...u, subscription: plan } : u))
      localStorage.setItem("seret_users", JSON.stringify(updatedUsers))
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        updateSubscription,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider")
  }
  return context
}
