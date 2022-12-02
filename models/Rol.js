const { Schema, model } = require('mongoose');

const RolSchema = Schema({
    rol: {
        type: 'string',
        required: true
    },

});

module.exports = model('Rol', RolSchema);