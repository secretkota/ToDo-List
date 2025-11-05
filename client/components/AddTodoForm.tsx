'use client'

import { loginUser, registerUser } from "@/api/api"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import ButtonUI from "./ui/button"


type dataForm = {
    title: string,
    description: string,
    completed?: 0 | 1,
    dueDate?: string,
    priority?: 'low' | ' medium' | 'high'
}



export default function AddTodoForm() {
    const router = useRouter()
    const {
        handleSubmit,
        register,
        formState: { errors },
        reset
    } = useForm<dataForm>({
        defaultValues: {
            completed: 0,
            priority: 'low'
        }
    })
    const [error, setError] = useState<string | null>(null)

    const onSubmit: SubmitHandler<dataForm> = async (data) => {
        console.log(data)
    }

    return (
        <div className="h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-96">
                <h2 className="text-black text-xl mb-4 text-center">Создание Задачи</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
                    <input
                        type="text"
                        placeholder="Название"
                        className="border p-2 rounded text-black hover:bg-gray-100 focus:outline-blue-300"
                        {...register('title', {
                            required: 'Название обязательно',
                            minLength: { value: 3, message: 'Название должно быть от 3-х символов' },
                            maxLength: { value: 25, message: 'Название должно быть не более 25-ти символов' }
                        })}
                    />
                    {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}

                    <textarea
                        id="description"
                        placeholder="Описание задачи"
                        className="border p-2 rounded text-black hover:bg-gray-100 focus:outline-blue-300"
                        {...register('description', {
                            minLength: { value: 8, message: "Описание должно быть более 8-ми символов" },
                            maxLength: { value: 100, message: "Описание должно быть более 100-ми символов" }
                        })}
                    />

                    {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}

                    <label className="text-black">
                        <input
                            type="checkbox"
                            id="completed"
                            {...register('completed')}
                            className="mx-2"
                        />
                        Завершена
                    </label>

                    <label className="text-black">
                        Статус задачи:
                        <select {...register("priority")}>
                            <option value="low">Низкий</option>
                            <option value="medium">Средний</option>
                            <option value="high">Высокий</option>
                        </select>
                    </label>

                    <ButtonUI
                        title='Создать'
                        type="submit"
                        style="bg-green-500 text-white p-2 rounded mt-2 hover:bg-green-700"
                    />
                </form>
            </div>
        </div >
    )

}
