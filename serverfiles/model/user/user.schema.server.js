/**
 * Created by vishruthkrishnaprasad on 11/3/17.
 */
module.exports = function(app, mongoose) {
    var userSchema = mongoose.Schema({
        username: {type: String, required: true},
        role: {type: String, enum: ['NORMAL', 'ADMIN', 'DOCTOR', 'MANAGER'], required: true},
        email: {type: String},
        password: {type: String},
        firstName: {type: String, required: true},
        lastName: {type: String, required: true},
        phone: {type: String},
        messages: [{
            domain: {type: String},
            username: {type: String},
            subject: {type: String},
            body: {type: String},
            dateOfMessage: {type: Date},
            senderId: {type: String}
        }],
        appointments: [{type: mongoose.Schema.Types.ObjectId, ref: 'AppointmentModel'}],
        dateCreated: {type: Date, default: Date.now}
    }, {collection: 'UserModel'});

    return userSchema;
};