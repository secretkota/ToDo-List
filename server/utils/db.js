import sqlite3 from 'sqlite3'

const db = new sqlite3.Database('./data/todo.db', (err) => {
    if (err) return console.error('Could not connect to database', err)
    console.log('Connected to SQLite database')
})

export default db