const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({
    name: {
        type: 'string',
        required: true
    },

    rol: {
        type: Schema.Types.ObjectId,
        ref: 'Rol',
        required: true  
    },
    
    email: {
        type: 'string',
        required: true,
        unique: true
    },

    area: {
        type: Schema.Types.ObjectId,
        ref: 'Area',
        required: false
    },

    password: {
        type: 'string',
        required: true
    },
});

module.exports = model('Usuario', UsuarioSchema);