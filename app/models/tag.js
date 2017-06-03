// Importing Node packages required for schema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// pagination
const mongoosePaginate = require('mongoose-paginate');
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
            default: ""
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

/*
 * pagination
*/
TagSchema.plugin(mongoosePaginate);
mongoose.model('Tag', TagSchema);
