const { Schema, model } = require('mongoose');

const AreaSchema = Schema({
    area: {
        type: 'string',
        required: true
    },

});

module.exports = model('Area', AreaSchema);