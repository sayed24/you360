// Importing Node packages required for schema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//= ===============================
// Video Schema
//= ===============================
const CategorySchema = new Schema({
        name: {
            type: String,
            required: true,
            unique: true
        },
        description: {
            type: String,
        },
    },
    {
        toJSON: {virtuals: true},
        timestamps: true,
    });


//= ===============================
// Category ORM Methods
//= ===============================



//= ===============================
// Category ORM Virtuals
//= ===============================


mongoose.model('Category', CategorySchema);
