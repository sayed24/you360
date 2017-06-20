/**
 * Created by salamaashoush on 04/04/17.
 */
/**
 * Created by salamaashoush on 04/04/17.
 */
/**
 * Created by salamaashoush on 04/04/17.
 */
// Importing Node packages required for schema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//= ===============================
//  Schema
//= ===============================
const NotificationSchema = new Schema({
        message: {
            type: String,
            required: true
        },
        details: {
            type: String,
        },
        icon: {
            type: String,
        },
        link: {
            type: String,
            required: true
        },
        seen: {
            type: Boolean,
            default: false
        },
        type: {
            type: String,
            required: true
        },
        to: {type: Schema.ObjectId, ref: 'User'},
    },
    {
        timestamps: true,
    });

//= ===============================
// ORM Methods
//= ===============================
NotificationSchema.methods.markSeen = function markSeen() {
    this.seen = true;
    this.save((err) => {
        if (err) {
            console.log(err);
        }
    })
}


mongoose.model('Notification', NotificationSchema);
