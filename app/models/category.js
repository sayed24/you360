// Importing Node packages required for schema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// pagination
const mongoosePaginate = require('mongoose-paginate');
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
            default: ""
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

/*
 * pagination
*/
CategorySchema.plugin(mongoosePaginate);

mongoose.model('Category', CategorySchema);
