const mongoose = require('mongoose');
const Schema = mongoose.Schema

const budget = new Schema({

    name: {
        type: String
    },
    email: {
        type: String
    },
    phone: {
        type: String
    },
    whatsApp: {
        type: String
    },
    project: {
        type: String
    }
}, {
    timestamps: true,  // serve para cadastrar time na db quando estiver cadastrando ou salvando na db
});

mongoose.model('Budget', budget)