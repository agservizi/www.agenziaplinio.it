"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useUser } from "@/contexts/user-context"
import type { LoginData } from "./types"

export function LoginForm() {
  const { login } = useUser()
  const [loginData, setLoginData] = useState<LoginData>({
    email: "",
    password: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setLoginData((prev) => ({ ...prev, [name]: value }))
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const success = await login(loginData.email, loginData.password)
      if (!success) {
        setError("Credenziali non valide. Riprova.")
      }
    } catch (err) {
      setError("Si è verificato un errore durante il login. Riprova più tardi.")
      console.error("Errore durante il login:", err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-6 text-center">Accedi all'Area Clienti</h2>
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-md text-sm">{error}</div>
        )}
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={loginData.email}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="La tua email"
              required
              disabled={isLoading}
              aria-describedby="email-error"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={loginData.password}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="La tua password"
              required
              disabled={isLoading}
              aria-describedby="password-error"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-2 px-4 rounded-md transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
            disabled={isLoading}
          >
            {isLoading ? "Accesso in corso..." : "Accedi"}
          </button>
        </form>
        <div className="mt-4 text-center">
          <Link href="#" className="text-sm text-primary hover:text-primary/80">
            Password dimenticata?
          </Link>
        </div>
        <div className="mt-6 pt-6 border-t text-center">
          <p className="text-gray-600 mb-4">Non hai ancora un account?</p>
          <Link
            href="#"
            className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2 px-4 rounded-md transition-colors inline-block w-full"
          >
            Registrati
          </Link>
        </div>
      </div>
    </div>
  )
}
