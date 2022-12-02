const { response } = require('express');
const Area = require('../models/Area');

const getAreas = async(req, resp = response) => {

    const areas = await Area.find();

    try {
        return resp.status(200).json({
            ok: true, 
            areas
        });
    } catch (error) {
        return resp.status(500).json({
            ok: false,
            msg: 'Hable con el administrador...',
        });
    };
};

const crearArea = async( req, resp = response ) => {
    const area = new Area( req.body );

    try {
        await area.save();
        return resp.status(200).json({
            ok: true,
            msg: 'Evento creado',
            area
        });
    } catch (error) {
        console.log(error);
        return resp.status(500).json({
            ok: false,
            msg: 'Hable con el administrador...',
        });
    };
};

const eliminarArea = async( req, res = response ) => {

    const areaId = req.params.id;

    try {

        const area = await Area.findById( areaId );

        if ( !area ) {
            return res.status(404).json({
                ok: false,
                msg: 'Area no existe por ese id'
            });
        }

        await Area.findByIdAndDelete( areaId );

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
    getAreas, crearArea, eliminarArea
}