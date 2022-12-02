const { response } = require('express');
const Area = require('../models/Area');
const Evento = require('../models/Evento');
const Usuario = require('../models/Usuario');

const obtenerUsuarios = async( req, resp = response ) => {

    const usuarios = await Usuario.find()
                                        .populate('rol', 'rol').populate('area', 'area')
    console.log(usuarios)

    return resp.status(200).json({
        ok: true,
        usuarios
    });
};

const obtenerCitas = async(req, resp = response) => {
    const citas = await Evento.find({'user': req.uid }).populate('doctor').populate('user');
    
    
    try {
        return resp.status(200).json({
            ok: true,
            citas
        });
    } catch (error) {
        return resp.status(500).json({
            ok: false,
            msg: 'Hable con el administrador...',
        });
    }
}

const getEventos = async(req, resp = response) => {

    const eventos = await Evento.find()
                                .populate('user', 'name').populate('doctor')

    try {
        return resp.status(200).json({
            ok: true, 
            eventos
        });
    } catch (error) {
        console.log(error);
    };
};

const crearEventos = async( req, resp = response ) => {

    const evento = new Evento( req.body );

    try {
        evento.user = evento.user
       await evento.save();
        return resp.status(200).json({
            ok: true,
            msg: 'Evento creado',
            evento
        });
    } catch (error) {
        console.log(error);
        return resp.status(500).json({
            ok: false,
            msg: 'Hable con el administrador...',
            evento
        });
    };
};

const actualizarEvento = async(req, resp = response) => {

    const eventoId = req.params.id;
    const uid = req.uid;

    try {

        const evento = await Evento.findById(eventoId);

        if( !evento ){
            return resp.status(404).json({
                ok: false,
                msg: "El evento no existe con ese Id"
            });
        };

        // if ( evento.user.toString() !== uid){
        //     return resp.status(401).json({
        //         ok: false, 
        //         msg: "No tiene privilegio de editar este evento"
        //     });
        // };
        const nuevoEvento = {
            ...req.body, user: req.body.user._id
        };

        const eventoActualizado = await Evento.findByIdAndUpdate( eventoId, nuevoEvento, { new: true } );

        return resp.status(200).json({
            ok: true,
            evento: eventoActualizado
        });
    } catch (error) {
        console.log(error);
        return resp.status(500).json({
            ok: false,
            msg: 'Hable con el administrador...'
        });
    };
};

const eliminarEvento = async( req, res = response ) => {

    const eventoId = req.params.id;
    const uid = req.uid;

    try {

        const evento = await Evento.findById( eventoId );

        if ( !evento ) {
            return res.status(404).json({
                ok: false,
                msg: 'Evento no existe por ese id'
            });
        }

        // if ( evento.user.toString() !== uid ) {
        //     return res.status(401).json({
        //         ok: false,
        //         msg: 'No tiene privilegio de eliminar este evento'
        //     });
        // }


        await Evento.findByIdAndDelete( eventoId );

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
    getEventos, crearEventos, actualizarEvento, eliminarEvento, obtenerUsuarios, obtenerCitas
}