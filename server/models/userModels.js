import db from "../utils/db.js";

export function register(username, password) {
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

export function getUserByUsername(username) {
    return new Promise((resolve, reject) => {
        const stmt = `SELECT * FROM user WHERE username = ?`
        db.get(stmt, [username], (err, row) => {
            if (err) {
                return reject(err)
            }
            resolve(row)
        })
    }
    )
}


