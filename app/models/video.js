// Importing Node packages required for schema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// pagination
const mongoosePaginate = require('mongoose-paginate');
//= ===============================
// Video Schema
//= ===============================
const VideoSchema = new Schema({
        name: {
            type: String,
            required: true
        },
        description: {
            type: String,
        },
        filename: {
            type: String,
            lowercase: true,
            unique: true,
        },
        views: {type: Number},
        likes: [{type: Schema.Types.ObjectId, ref: "User"}],
        dislikes: [{type: Schema.Types.ObjectId, ref: "User"}],
        //comments: [{type: Schema.Types.ObjectId, ref: "Comment"}],
        comments:[{
            comment:{type: String},
            uid:{type: Schema.Types.ObjectId, ref: "User"}
        }],
        tags: [{type: Schema.Types.ObjectId, ref: "Tag"}],
        category: {type: Schema.Types.ObjectId, ref: "Category"},
        latitude:{
            type: String,
            required: true
        },
        longitude:{
            type: String,
            required: true
        },
        owner: {type: Schema.Types.ObjectId, ref: "User"},
        thumb: {type: String},

    },
    {
        toJSON: {virtuals: true},
        timestamps: true,
    });


//= ===============================
// Video ORM Methods
//= ===============================


//= ===============================
// User ORM Virtuals
//= ===============================

/*
 * pagination
*/
VideoSchema.plugin(mongoosePaginate);


mongoose.model('Video', VideoSchema);
