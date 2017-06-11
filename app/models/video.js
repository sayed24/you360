    // Importing Node packages required for schema
const mongoose = require('mongoose');
const helpers = require('../helpers');
const Schema = mongoose.Schema;
// pagination
const mongoosePaginate = require('mongoose-paginate');
//search 
const mongooseApiQuery = require('mongoose-api-query');
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
        //tags: [{type: Schema.Types.ObjectId, ref: "Tag"}],
        tags: [String],
        category: {type: Schema.Types.ObjectId, ref: "Category"},
        lat:{
            type: String,
            // required: true
        },
        long:{
            type: String,
            // required: true
        },
        owner: {type: Schema.Types.ObjectId, ref: "User"},
        thumb: {type: String},

    },
    {
        toJSON: {virtuals: true},
        timestamps: true,
    });

VideoSchema.pre('remove', function (next) {
    // Remove all related docs
    helpers.removeFile(this.image);
    next();su
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
/*
 * Search
*/
VideoSchema.plugin(mongooseApiQuery);

mongoose.model('Video', VideoSchema);
