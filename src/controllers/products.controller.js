import {getConnection, querys ,sql} from "../database/index.js"

export const getProducts = async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().query(querys.getAllProducts);
        console.log(result);

        res.json(result.recordset)
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}

export const createNewProduct = async (req, res) => {
    const {name, description} = req.body
    let {quantity} = req.body

    if(name == null || description == null) {
        return res.status(400).json({ msg: "Bad Request. Please fill all fields"});
    }

    if(quantity == null) quantity = 0;

    try {
        const pool = await getConnection();

        await pool
            .request()
            .input("name", sql.VarChar, name)
            .input("description", sql.Text, description)
            .input("quantity", sql.Int, quantity)
            .query(querys.addNewProduct);

        //console.log(name, description,quantity);

        res.json({name, description, quantity})    
    } catch (error) {
        res.status(500);
        res.send(error.message);    
    }
    
};

export const getProductById = async (req, res) => {
    try {
        const pool = await getConnection();

        const result = await pool
            .request()
            .input("id", req.params.id)
            .query(querys.getProductById)
            res.send(result.recordset[0])
    } catch (error) {
        res.status(500)
        res.send(error.message)
    }
}

export const deleteProduct = async (req, res) => {
    try {
        const pool = await getConnection();

        const result = await pool
            .request()
            .input("id", req.params.id)
            .query(querys.deleteProduct)

        if(result.rowAffected[0] === 0) return res.sendStatus(404);
        res.sendStatus(204);
    } catch (error) {
        res.status(500)
        res.send(error.message)
    }
}

export const getTotalProducts = async (req, res) => {
    const pool = await getConnection();
    const result = await pool
        .request()
        .query(querys.getTotalProducts)
    console.log(result);
    res.json(result.recordset[0][''])
}

export const updateProduct = async (req, res) => {
    const { name, description, quantity } = req.body;
    const { id } = req.params;
    
    if(name == null || description == null || quantity == null) {
        return res.status(400).json({ msg: "Bad Request. Please fill all fields"});
    }

    try {
        const pool = await getConnection();
        await pool.request()
            .input("name", sql.VarChar, name)
            .input("description", sql.Text, description)
            .input("quantity", sql.Int, quantity)
            .input("id", id)
            .query(querys.updateProduct)
        res.json({ name, description, quantity });
    } catch (error) {
        res.status(500)
        res.send(error.message)
    }
}