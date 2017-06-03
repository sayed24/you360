// Importing Node packages required for schema
const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const CONSTANTS = require('../constants');
const Schema = mongoose.Schema;
// pagination
const mongoosePaginate = require('mongoose-paginate');

//= ===============================
// User Schema
//= ===============================
const UserSchema = new Schema({
        email: {
            type: String,
            lowercase: true,
            unique: true,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        online: {
            type: Boolean,
            default: false
        },
        firstName: {type: String},
        lastName: {type: String},
        image: {type: String, default: CONSTANTS.PROFILE_IMAGE},
        role: {
            type: String,
            enum: [CONSTANTS.ROLE_MEMBER, CONSTANTS.ROLE_CLIENT, CONSTANTS.ROLE_OWNER, CONSTANTS.ROLE_ADMIN],
            default: CONSTANTS.ROLE_MEMBER
        },
        stripe: {
            customerId: {type: String},
            subscriptionId: {type: String},
            lastFour: {type: String},
            plan: {type: String},
            activeUntil: {type: Date}
        },
        resetPasswordToken: {type: String},
        resetPasswordExpires: {type: Date}
    },
    {
        toJSON: {virtuals: true},
        timestamps: true,
    });

UserSchema.methods.toJSON = function() {
    var obj = this.toObject()
    delete obj.password
    delete obj.__v
    return obj
}
//= ===============================
// User ORM Methods
//= ===============================

UserSchema.methods.notifyFor = function notifyFor(notification,cb) {
    notification.to = this._id
    this.model('Notification').create(notification, (err) => {
        if (err) cb(err)
        cb()
    });
};

// Pre-save of user to database, hash password if password is modified or new
UserSchema.pre('save', function (next) {
    const user = this,
        SALT_FACTOR = 5;
    if (!user.isModified('password')) return next();
    bcrypt.genSalt(SALT_FACTOR, (err, salt) => {
        if (err) return next(err);
        bcrypt.hash(user.password, salt, null, (err, hash) => {
            if (err) return next(err);
            user.password = hash;
            next();
        });
    });
});
UserSchema.pre('remove', function (next) {
    // Remove all related docs
    this.model('Notification').remove({to: this._id}, (err) => {
        if (err) return next(err);
        next();
    });
});
// Method to compare password for login
UserSchema.methods.comparePassword = function (candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
        if (err) {
            return cb(err);
        }
        cb(null, isMatch);
    });
};

//= ===============================
// User ORM Virtuals
//= ===============================
UserSchema.virtual('notifications', {
    ref: 'Notification', // The model to use
    localField: '_id', // Find people where `localField`
    foreignField: 'to' // is equal to `foreignField`
});

/*
 * pagination
*/
UserSchema.plugin(mongoosePaginate);

mongoose.model('User', UserSchema);
