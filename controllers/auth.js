const { response } = require('express');
const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');
const Rol = require('../models/Rol');

const crearUsuario = async(req, resp = response) =>  {

    const { email, password } = req.body;

    try {
        let usuario = await Usuario.findOne({ email: email });
        if( usuario ){
            return resp.status(400).json({
                ok: false,
                msg: "Un usuario ya existe con ese correo."
            });
        };
        
        usuario = new Usuario( req.body );
        console.log(req.body)

        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);

        await usuario.save();

        const token = await generarJWT( usuario.id, usuario.name, usuario.rol )
    
        resp.status(201).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
        });
        
    } catch (error) {
        resp.status(500).json({
            ok: 'false',
            msg: 'Porfavor hable con el administrador'
        });
    }
};

const loginUsuario = async(req, resp = response) =>  {

    const { email, password } = req.body;

    try {
        const usuario = await Usuario.findOne({ email: email });
        const rol = await Rol.findById(usuario.rol)
        if( !usuario ){
            return resp.status(400).json({
                ok: false,
                msg: "El usuario no existe con ese email."
            });
        };

        const validPassword = bcrypt.compareSync(password, usuario.password);

        if( !validPassword ) {
            return resp.status(400).json({
                ok: false,
                msg: 'Password incorrecta.',
            });
        };

        const token = await generarJWT( usuario.id, usuario.name )

        resp.json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            rol: rol.rol,
            token
        });

    } catch (error) {
        console.log('error');
        return resp.status(500).json({
            ok: 'false',
            msg: 'Porfavor hable con el administrador'
        });
    }
};

const revalidarToken = async(req, resp = response) =>  {

    const uid = req.uid;
    const name = req.name;

    const usuario = await Usuario.findById(uid);
    const rol = await Rol.findById(usuario.rol)
    const token = await generarJWT(uid, name);

    console.log(rol)

    resp.json({
        ok: true,
        uid, name, rol: rol.rol,
        token
    });
};

module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken,
}