// Importing Node packages required for schema
const mongoose = require('mongoose');
const helpers = require('../helpers');
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
        path: {
            type: String,
            default: ""
        },
        views: {type: Number},
        likes: [{type: Schema.Types.ObjectId, ref: "User"}],
        dislikes: [{type: Schema.Types.ObjectId, ref: "User"}],
        //comments: [{type: Schema.Types.ObjectId, ref: "Comment"}],
        comments: [{
            comment: {type: String},
            owner: {type: Schema.Types.ObjectId, ref: "User"}
        }],
        //tags: [{type: Schema.Types.ObjectId, ref: "Tag"}],
        tags: [{type: String}],
        category: {type: Schema.Types.ObjectId, ref: "Category"},
        lat: {
            type: String,
            // required: true
        },
        long: {
            type: String,
            // required: true
        },
        owner: {type: Schema.Types.ObjectId, ref: "User"},
        violated:{
            type: Boolean,
            default: false
        },
        copyrights:{
            type: Schema.ObjectId,
            ref: 'Report'
        },
        thumb: {type: String},

    },
    {
        toJSON: {virtuals: true},
        timestamps: true,
    });

//= index =//
VideoSchema.index({'$**': 'text'});


// VideoSchema.pre('remove', function (next) {
//     // Remove all related docs
//     helpers.removeFile(this.image);
//     next();
// });

//= ===============================
// User ORM Virtuals
//= ===============================

// Pre-delete of video to database,
VideoSchema.pre('remove', function (next) {
    // Remove related file
    helpers.removeFile(this.filename);
    next();
    

});


/*
 * pagination
*/
VideoSchema.plugin(mongoosePaginate);

mongoose.model('Video', VideoSchema);
