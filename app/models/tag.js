// Importing Node packages required for schema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//= ===============================
// Video Schema
//= ===============================
const TagSchema = new Schema({
        name: {
            type: String,
            required: true
        },
        description: {
            type: String,
        }
    },
    {
        toJSON: {virtuals: true},
        timestamps: true,
    });


//= ===============================
// Tag ORM Methods
//= ===============================



//= ===============================
// Tag ORM Virtuals
//= ===============================


mongoose.model('Tag', TagSchema);
