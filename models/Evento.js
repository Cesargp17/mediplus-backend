const { Schema, model } = require('mongoose');

const EventoSchema = Schema({
    title: {
        type: 'string',
        required: true,
    },
    notes: {
        type: 'string'
    },
    start: {
        type: Date,
        required: true,
    },
    end: {
        type: Date,
        required: true
    },
    // area: {
    //   type: Schema.Types.ObjectId,
    //   ref: 'Area',
    //   required: true  
    // },
    
    user: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    doctor: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    status: {
        type: 'string',
        required: true
    }
});

EventoSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});



module.exports = model('Evento', EventoSchema );
