import { pool } from "../db.js";

export const getClientes = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM clientes');
        // Devuelve el json de las filas
        res.json(rows);
    } catch (error) {
        return res.status(500).json({
            message: 'Algo salió mal'
        });
    };
};

export const getClienteByMatricula = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM clientes WHERE matricula = ?', [req.params.matricula]);
        // Eliminar el console log más tarde
        console.log(rows);

        if (rows.length == 0) return res.status(404).json({
            message: 'No se encontró el cliente'
        })
        res.json(rows[0]);

    } catch (error) {
        return res.status(500).json({
            message: 'Algo salió mal'
        });
    }
};

// Ver si puedo hacer con sobrecarga que no se usen todos los campos
export const createCliente = async (req, res) => {
    try {
        const { matricula, vehiculo, nombre, apellido, telefono, email } = req.body;
        const [rows] = await pool.query(
            'INSERT INTO clientes (matricula, vehiculo, nombre, apellido, telefono, mail) VALUES (?, ?, ?, ?, ?)',
            [matricula, vehiculo, nombre, apellido, telefono, email]);

        res.send({
            id: rows.insertId,
            matricula,
            vehiculo,
            nombre,
            apellido,
            telefono,
            mail
        });

        console.log(res.send);
    } catch (error) {
        return res.status(500).json({
            message: 'Algo salió mal'
        });
    };
};

export const updateClientes = async (req, res) => {
    try {
        const { matricula } = req.params;
        const { nombre, apellido, telefono, email } = req.body;

        const [result] = await pool.query(
            'UPDATE clientes SET nombre = IFNULL(?, nombre), apellido = IFNULL(?, apellido), telefono = IFNULL(?, telefono), mail = IFNULL(?, email) WHERE matricula = ?',
            [nombre, apellido, telefono, email, matricula]);

        if (result.affectedRows == 0) res.status(404).json({
            message: "No se pudieron actualizar "
        });

        const [rows] = await pool.query('SELECT * FROM clientes WHERE matricula = ?', [matricula]);

        res.sendStatus(204);
        console.log(result);
        res.json(rows[0]);

    } catch (error) {
        return res.status(500).json({
            message: 'Algo salió mal'
        });
    };
};

export const deleteCliente = async (req, res) => {
    try {
        const [result] = await pool.query('DELETE FROM clientes WHERE matricula = ?', [req.params.matricula]);

        if (result.affectedRows == 0) res.status(404).json({
            message: 'No se encontró el cliente'
        });
        console.log(result);
        res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({
            message: 'Algo salió mal'
        });
    };
}