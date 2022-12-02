const { response } = require('express');
const Rol = require('../models/Rol');

const getRoles = async(req, resp = response) => {

    const roles = await Rol.find();

    try {
        return resp.status(200).json({
            ok: true, 
            roles
        });
    } catch (error) {
        return resp.status(500).json({
            ok: false,
            msg: 'Hable con el administrador...',
            evento
        });
    };
};

const crearRol = async( req, resp = response ) => {
    const rol = new Rol( req.body );

    try {
        await rol.save();
        return resp.status(200).json({
            ok: true,
            msg: 'Evento creado',
            rol
        });
    } catch (error) {
        console.log(error);
        return resp.status(500).json({
            ok: false,
            msg: 'Hable con el administrador...',
        });
    };
};

const eliminarRol = async( req, res = response ) => {

    const rolId = req.params.id;

    try {

        const rol = await Rol.findById( rolId );

        if ( !rol ) {
            return res.status(404).json({
                ok: false,
                msg: 'Rol no existe por ese id'
            });
        }

        await Rol.findByIdAndDelete( rolId );

        res.json({ ok: true });

        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

}

module.exports = {
    getRoles, crearRol, eliminarRol
}