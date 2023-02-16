import { Sequelize } from 'sequelize';
import path from "path";

const client = {
    Connect: () => { return new Sequelize({
        dialect: 'sqlite',
        storage: path.join('src/db', 'db.sqlite3'),
        host: 'localhost',
        retry: { max: 10 },
    })}
}

const db = client.Connect();

try {
    db.authenticate();
    console.log('Connected to database');
} catch (err) {
    console.log('Could not connect to database');
}

export default db;