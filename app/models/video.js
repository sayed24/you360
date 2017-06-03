// Importing Node packages required for schema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
        comments: [{type: Schema.Types.ObjectId, ref: "Comment"}],
        tags: [{type: Schema.Types.ObjectId, ref: "Tag"}],
        category: {type: Schema.Types.ObjectId, ref: "Category"},
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


mongoose.model('Video', VideoSchema);