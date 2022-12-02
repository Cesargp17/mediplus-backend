const { response } = require('express');
const Evento = require('../models/Evento');
const Usuario = require('../models/Usuario');

const editarUsuarios = async(req, resp = response) => {
    const userId = req.params.id;
    try {
        const user = await Usuario.findById(userId);
        const nuevoUsuario = {
            ...req.body
        };

        const usuarioActualizado = await Usuario.findByIdAndUpdate( userId, nuevoUsuario );
        
        return resp.status(200).json({
            ok: true,
            user: usuarioActualizado
        });

    } catch (error) {
        return resp.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    };
};

const eliminarUsuario = async( req, resp = response ) => {
    const userId = req.params.id;
    try {
        const usuario = await Usuario.findById( userId );
        if ( !usuario ) {
            return res.status(404).json({
                ok: false,
                msg: 'Usuario no existe por ese id'
            });
        }

        await Usuario.findByIdAndDelete( userId );
        resp.json({ ok: true });

    } catch (error) {
        console.log(error);
        resp.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

module.exports = {
    editarUsuarios, eliminarUsuario
}
