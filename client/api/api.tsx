const URL = 'http://localhost:4000'

type dataAuthForm = {
    username: string,
    password: string
}

export async function loginUser(data: dataAuthForm) {
    try {
        const res = await fetch(`${URL}/user/login`, {
            method: 'POST',
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify(data)
        })

        if (!res.ok) {
            throw new Error(`${res.status} || 'Login failed'`)
        }

        const result = await res.json()
        return result.token
    } catch (error) {
        throw error
    }
}



export async function registerUser(data: dataAuthForm) {
    try {
        const res = await fetch(`${URL}/user/register`, {
            method: 'POST',
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify(data)
        })

        if (!res.ok) {
            throw new Error(`Server: ${res.status}`)
        }
    } catch (error) {
        throw error
    }
}

export default {
    registerUser
}