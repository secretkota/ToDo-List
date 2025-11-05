'use client'

import { jwtDecode } from "jwt-decode"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function  MainPAge() {
    const router = useRouter()
    const [userData, setUserData] = useState<any>(null)

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (!token) return router.push('/login')

        try {
            const decoded = jwtDecode(token)
            setUserData(decoded)
        } catch (error) {
            console.log('Ошибка при проверке JWT', error)
            localStorage.removeItem('token')
            router.push('/login')
        }
    }, [router])

    if(!userData) return <div>Загрузка......</div>

    return (
        <div>Привет! {userData.username}</div>
    )
}