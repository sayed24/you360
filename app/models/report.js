// Importing Node packages required for schema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// pagination
const mongoosePaginate = require('mongoose-paginate');

//= ===============================
// Video Schema
//= ===============================
const ReportSchema = new Schema({
        video: {type: Schema.ObjectId, ref: 'Video'},
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            lowercase: true
        },
        description: {
            type: String,
        },
        approved:{type:Boolean,default:false}
    },
    {
        toJSON: {virtuals: true},
        timestamps: true,
    });


ReportSchema.plugin(mongoosePaginate);

mongoose.model('Report', ReportSchema);
