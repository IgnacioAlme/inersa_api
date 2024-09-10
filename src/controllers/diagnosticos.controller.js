import { pool } from "../db.js";

export const getDiagnosticos = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM diagnosticos');
        res.json(rows);
    } catch (error) {
        return res.status(500).json({
            message: 'Algo salió mal'
        });
    }
}

export const getDiagnosticosByMatricula = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM diagnosticos WHERE matricula = ?', [req.params.matricula]);
        console.log(rows);

        if (rows.length == 0) return res.status(404).json({
            message: 'No se encontró el cliente'
        });
        res.json(rows[0]);
    } catch (error) {
        return res.status(500).json({
            message: 'Algo salió mal'
        });
    }
}

export const createDiagnostico = async (req, res) => {
    try {
        const { matricula, fecha, descripcion } = req.body;
        const [rows] = await pool.query('INSERT INTO diagnosticos (matricula, fecha, descripcion) VALUES (?, ?, ?)', [matricula, fecha, descripcion]);
        res.send({
            id: rows.insertId,
            matricula,
            fecha,
            descripcion
        });
        console.log(res.send);

    } catch (error) {
        return res.status(500).json({
            message: 'Algo salió mal'
        });
    }
}

// usar con PATCH
export const updateDiagnostico = async (req, res) => {
    try {
        const { id } = req.params;
        const { descripcion } = req.body;
        const [result] = await pool.query(
            'UPDATE diagnosticos SET descripcion = ? WHERE id = ?', [descripcion, id]);
        if (result.affectedRows == 0) res.status(404).json({
            message: "No se pudieron actualizar "
        });

        const [rows] = await pool.query('SELECT * FROM diagnosticos WHERE id = ?', [id]);
        res.sendStatus(204);
        console.log(result);
        res.json(rows[0]);

    } catch (error) {
        return res.status(500).json({
            message: 'Algo salió mal'
        });
    }
}

export const deleteDiagnostico = async (req, res) => {
    try{
    const [result] = await pool.query('DELETE * FROM diagnosticos WHERE id = ?', [req.params.id]);

    if (result.affectedRows == 0) res.status(404).json({
        message: 'No se encontró el diagnóstico'
    });
    console.log(result);
        res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({
            message: 'Algo salió mal'
        });
    };
}