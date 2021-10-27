const { response, request } = require("express")//para agregar el tipado del parámetro


const getMethod = (req = request, res = response)=>{
    const query = req.query;//Se puede desestructurar para evitar la inyección de query
    res.json({msg:'Get route', query})
}
const postMethod = (req, res = response)=>{
    const body = req.body;
    res.json({msg:'Post route', body})
}
const putMethod = (req, res = response)=>{
    const {id} = req.params;
    res.json({msg:'Put route', id})
}
const deleteMethod = (req, res = response)=>{res.json({msg:'Delete route'})}

module.exports = {
    getMethod,
    postMethod,
    putMethod,
    deleteMethod
}