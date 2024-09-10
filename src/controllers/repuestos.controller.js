import { pool } from "../db.js";

export const getRepuestos = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM repuestos');
        // Devuelve el json de las filas
        res.json(rows);
    } catch (error) {
        return res.status(500).json({
            message: 'Algo salió mal'
        })
    }
}

export const getRepuestosByCodigo = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM repuestos WHERE codigo = ?', [req.params.codigo]);
        console.log(rows);
        if (rows.length == 0) return res.status(404).json({
            message: 'No se encontró el repuesto'
        })
        res.json(rows);

    } catch (error) {
        return res.status(500).json({
            message: 'Algo salió mal'
        });
    }
}

export const getRepuestosByTipo = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM repuestos WHERE tipo = ?', [req.params.tipo]);
        // Eliminar el console log más tarde
        console.log(rows);
        if (rows.length == 0) return res.status(404).json({
            message: 'No se encontró el repuesto'
        })
        res.json(rows);

    } catch (error) {
        return res.status(500).json({
            message: 'Algo salió mal'
        });
    }
}

export const getRepuestosByMarcaAuto = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM repuestos WHERE marca_auto = ?', [req.params.marca_auto]);
        // Eliminar el console log más tarde
        console.log(rows);
        if (rows.length == 0) return res.status(404).json({
            message: 'No se encontró el repuesto'
        })
        res.json(rows);

    } catch (error) {
        return res.status(500).json({
            message: 'Algo salió mal'
        });
    }
}

export const getRepuestosPair = async (req, res) => {
    try {
        const { tipo, marca_auto } = req.body
        const [rows] = await pool.query('SELECT * FROM repuestos WHERE tipo = ? AND (marca_auto = ? OR marca_auto = "UNIVERSAL"', [tipo, marca_auto]);
        // Eliminar el console log más tarde
        console.log(rows);
        if (rows.length == 0) return res.status(404).json({
            message: 'No se encontró el repuesto'
        });
        res.json(rows);

    } catch (error) {
        return res.status(500).json({
            message: 'Algo salió mal'
        });
    }
}

// Revisar para que identifique si es un error de tipo de archivo, de formato o de que no lo encuentra
export const loadRepuestos = async (req, res) => {
    try {
        const { filepath } = req.body;
        const [result] = await pool.query(
            "LOAD DATA INFILE ? INTO TABLE repuestos FIELDS TERMINATED BY ',' ENCLOSED BY '\n' IGNORE 1 ROWS", [filepath]
        );
        // if (result.code == 'EE_FILENOTFOUND') {
        //     return res.status(404).json({
        //         message: 'Entró al if'
        //     });
        // };
        console.log(result);
        res.json(result);

    } catch (error) {
        return res.status(404).json({
            message: 'No se encontró el archivo.'
        });
    }
}
