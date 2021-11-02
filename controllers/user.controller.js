const { response, request } = require("express")//para agregar el tipado del parámetro
const bcrypjs = require('bcryptjs');
const Usuario = require('../models/usuario');//Schema de usuario

const getMethod = async (req = request, res = response) => {
    const { limite = 5, desde = 0 } = req.query;//Se puede desestructurar para evitar la inyección de query
    const query = { estado: true }
    const usuariosProm = Usuario.find(query)
        .skip(Number(desde))
        .limit(Number(limite));

    const totalProm = Usuario.countDocuments(query);

    const [total, usuarios] = await Promise.all([usuariosProm, totalProm]);//Desestructuración de un arreglo
    res.json({ total, usuarios })
}

const postMethod = async (req, res = response) => {
    try {
        const { nombre, correo, password, rol } = req.body;
        const usuario = new Usuario({ nombre, correo, password, rol });

        const salt = bcrypjs.genSaltSync();
        usuario.password = bcrypjs.hashSync(password, salt);
        await usuario.save();
        res.json({ msg: 'Post route', usuario })
    } catch (error) {
        res.json({ msg: 'Post ERROR!!', error })
    }
}
const putMethod = async (req, res = response) => {
    try {

        const { id } = req.params;
        const { password, google, ...resto } = req.body;

        if (password) {
            const salt = bcrypjs.genSaltSync();
            usuario.password = bcrypjs.hashSync(password, salt);
        }
        const usuario = await Usuario.findByIdAndUpdate(id, resto);
        res.json({ msg: 'Put route', usuario })
    } catch (error) {
        res.json({ msg: 'Put ERROR!!', error })
    }
}
const deleteMethod = async (req, res = response) => {
    try {
        const { id } = req.params;

        // const usuario = await Usuario.findByIdAndDelete(id);//Borrado físico
        const usuario = await Usuario.findByIdAndUpdate(id, { estado: false });

        res.json({ usuario })
    } catch (error) {
        res.json({ msg: 'Get ERROR!!', error })
    }

}

module.exports = {
    getMethod,
    postMethod,
    putMethod,
    deleteMethod
}