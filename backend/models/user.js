const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UsersSchema = mongoose.Schema({
    firstname: {
        type: String,
        required: [true, 'Firstname is required']
    },
    lastname: {
        type: String
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: [true, 'Email Already Exist'],
        match: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    }
},
{
    timestamps: true
});

UsersSchema.pre('save', function (next) {
    var user = this;
    if (this.isModified('password') || this.isNew) {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                return next(err);
            }
            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) {
                    return next(err);
                }
                user.password = hash;
                next();
            });
        });
    } else {
        return next();
    }
});

UsersSchema.methods.verifyPassword = async function (pass, cb) {
    bcrypt.compare(pass, this.password, function (err, isMatch) {
        if (err) {
            return cb(err);
        }
        return cb(null, isMatch);
    });
};

let User = module.exports = mongoose.model('User', UsersSchema);