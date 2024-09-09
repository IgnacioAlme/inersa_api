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
    };
};


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
    };
};