'use client'

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function Header() {
    const router = useRouter()
    const [token, setToken] = useState<string | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const storedToken = localStorage.getItem('token')
        setToken(storedToken)
        setLoading(false)
    }, [])

    const handleLogout = async () => {
        localStorage.removeItem('token')
        setToken(null)
        router.push('/login')
    }
    
    if (loading) return null

    return (
        <div className="h-12 bg-gray-200 text-black">
            <nav className="flex justify-center gap-4 items-center h-full">
                <Link href={'/main'}>Главная</Link>
                <Link href={'/createToDo'}>Создать задачу</Link>
                {token ? (
                    <button onClick={handleLogout}>Выйти</button>
                ) : (
                    <Link href="/login">Войти</Link>
                )}
                { }
            </nav>
        </div>
    )
}