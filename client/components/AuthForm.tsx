'use client'

import { loginUser, registerUser } from "@/api/api"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import ButtonUI from "./ui/button"


type dataForm = {
    username: string,
    password: string
}

export default function AuthForm() {
    const router = useRouter()
    const {
        handleSubmit,
        register,
        formState: { errors },
        reset
    } = useForm<dataForm>()
    const [isLogin, setIsLogin] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const onSubmit: SubmitHandler<dataForm> = async (data) => {
        setError(null)

        if (!isLogin) {
            try {
                await registerUser(data)
                setIsLogin(true)
                reset()
            } catch (err: any) {
                if (err.response && err.response.status == 409) {
                    setError('Ошибка регистрации')
                } else {
                    setError('Такой пользователь уже существует')
                }
            }
            return
        } else { 
            try {
                const token = await loginUser(data)
                localStorage.setItem('token', token)
                router.push('/main')
                reset()
            } catch (err: any) {
                if (err.response && err.response.status === 401) {
                    setError('Неверный логин или пароль')
                } else {
                    setError('Ошибка при входе')
                }
            }
        }
    }

    return (
        <div className="h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-96">
                <h2 className="text-black text-xl mb-4 text-center">{isLogin ? 'Вход' : 'Регистрация'}</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
                    <input
                        type="text"
                        placeholder="Username"
                        className="border p-2 rounded text-black hover:bg-gray-100 focus:outline-blue-300"
                        {...register('username', {
                            required: 'Логин обязателен',
                            minLength: { value: 3, message: 'Логин должен быть от 3-х символов' },
                            maxLength: { value: 25, message: 'Логин должен быть не более 25-ти символов' }
                        })}
                    />
                    {errors.username && <p className="text-red-500 text-sm">{errors.username.message}</p>}

                    <input
                        type="password"
                        placeholder="Password"
                        className="border p-2 rounded text-black hover:bg-gray-100 focus:outline-blue-300"
                        {...register('password', {
                            required: !isLogin ? 'Пароль обязателен' : false,
                            minLength: !isLogin ? { value: 8, message: "Пароль должен быть более 8-ми символов" } : undefined
                        })}
                    />
                    {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                    {!isLogin ? <div className="flex flex-col gap-4 mt-4">
                        <label className="flex items-center gap-3 cursor-pointer">
                            <input
                                type="checkbox"
                                className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                            />
                            <span className="text-gray-900 text-base">
                                Я согласен с пользованием данной площадки
                            </span>
                        </label>
                    </div> : " "}

                    <p className="text-red-500">{error}</p>

                    <ButtonUI
                        title={isLogin ? 'Войти' : 'Зарегистрироваться'}
                        type="submit"
                        style="bg-blue-500 text-white p-2 rounded mt-2 hover:bg-blue-700"
                    />
                </form>

                <p
                    className="text-sm mt-4 text-center text-blue-500 cursor-pointer hover:text-blue-700"
                    onClick={() => setIsLogin(prev => !prev)}
                >
                    {isLogin ? 'Нет аккаунта? зарегистрироваться' : 'Есть аккаунт? Войти'}
                </p>
            </div>
        </div>
    )

}