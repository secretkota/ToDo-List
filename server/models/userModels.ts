import type { TUser } from "../types/user.types.ts";
import db from "../utils/db.ts";

export function register(username: string, password: string) {
    return new Promise((resolve, reject) => {
        const stmt = `INSERT INTO user (username, password) VALUES (?, ?)`
        db.run(stmt, [username, password], function (err) {
            if (err) {
                return reject(err)
            }
            resolve({ id: this.lastID })
        })
    })

}

export function getUserByUsername(username: string): Promise<TUser | null> {
    return new Promise((resolve, reject) => {
        const stmt = `SELECT * FROM user WHERE username = ?`
        db.get(stmt, [username], (err, row: any) => {
            if (err) {
                return reject(err)
            }

            resolve(row)
        })
    }
    )
}


