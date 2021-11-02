const Role = require('../models/role');
const Usuario = require('../models/usuario');//Schema de usuario

const esRoleValido = async (rol = '') => {
    const existeRol = await Role.findOne({ rol });
    if (!existeRol)
        throw new Error(`El rol ${rol} no está registrado en la BD`);
}

const emailExiste = async (correo = '') => {
    console.log(correo);
    const ExisteCorreo = await Usuario.findOne({ correo });
    if (ExisteCorreo)
        throw new Error(`El correo ${correo} ya existe`);
}

const existeUsuarioPorId = async (id = '') => {
    console.log(correo);
    const ExisteUsuario = await Usuario.findById(id);
    if (!ExisteUsuario)
        throw new Error(`El ID ${id} no existe`);
}

module.exports = {
    esRoleValido,
    emailExiste,
    existeUsuarioPorId
}