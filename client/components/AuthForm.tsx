'use client'

import { loginUser, registerUser } from "@/api/api"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"


type dataForm = {
    username: string,
    password: string
}

export default function AuthForm() {
    const router = useRouter()
    const {
        handleSubmit,
        register,
        formState: { errors }
    } = useForm<dataForm>()
    const [isLogin, setIsLogin] = useState(true)

    const onSubmit: SubmitHandler<dataForm> = async (data) => {
        if (!isLogin) {
            return registerUser(data)
        } else {
            try {
                const token = await loginUser(data)
                localStorage.setItem('token', token)
                router.push('/main')
            } catch (err: any) {
                console.log('Ошибка входа! Неверный пароль или логин')
            }
        }

    }

    return (
        <div>
            <h2>{isLogin ? 'Вход' : 'Регистрация'}</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input
                    type="text"
                    placeholder="Username"
                    {...register('username', { required: 'Логин обязателен', minLength: 3, maxLength: 8 })}
                />
                {errors.username && <p>{errors.username.message}</p>}


                <input
                    type="password"
                    placeholder="Password"
                    {...(!isLogin ? register('password', {
                        required: 'Пароль обязателен',
                        minLength: { value: 8, message: "Пароль должен быть более 8-ми символов" }
                    }) : {})}
                />
                {errors.password && <p>{errors.password.message}</p>}

                <button type="submit">{isLogin ? 'Войти' : 'Зарегистрироваться'}</button>
            </form>
            <button onClick={() => setIsLogin(prev => !prev)}>
                {isLogin ? 'Есть аккаунт? Войти' : 'Нет аккаунта? зарегистрироваться'}
            </button>
        </div>
    )

}