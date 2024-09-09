import {createPool} from 'mysql2/promise';

// Crear conexión con base de datos
export const pool = createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    port: 3306,
    database: 'inersadb'
})

