/**
 * Created by vishruthkrishnaprasad on 11/3/17.
 */
module.exports = function (app, mongoose) {
    var q = require('q');
    var userSchema = require('./user.schema.server')(app, mongoose);
    var userModel = mongoose.model('userModel', userSchema);

    var api = {
        createUser: createUser,
        findUserById: findUserById,
        findUserByUsername: findUserByUsername,
        findUserByCredentials: findUserByCredentials,
        findAllUsers: findAllUsers,
        findAllDoctors: findAllDoctors,
        updateUser: updateUser,
        deleteUser: deleteUser,
        updateMessage: updateMessage,
        deleteMessage: deleteMessage
    };
    return api;

    function createUser(user) {
        var deferred = q.defer();
        userModel.create(user, function (err, status) {
            if(err) {
                deferred.reject(new Error(err));
            } else {
                deferred.resolve(status);
            }
        });
        return deferred.promise;
    }

    function findUserById(userId) {
        var deferred = q.defer();
        userModel.findById(userId, function (err, status) {
            if (err) {
                deferred.reject(new Error(err));
            } else {
                deferred.resolve(status);
            }
        });
        return deferred.promise;
    }

    function findUserByUsername(username) {
        var deferred = q.defer();
        userModel.findOne({username: username}, function (err, status) {
            if (err) {
                deferred.reject(new Error(err));
            }
            else if(status) {
                deferred.resolve(status);
            } else {
                deferred.resolve(status);
            }
        });
        return deferred.promise;
    }

    function findUserByCredentials(username, password) {
        var deferred = q.defer();
        userModel.findOne({username: username, password: password}, function (err, status) {
            if (err) {
                deferred.reject(new Error(err));
            } else if(status) {
                deferred.resolve(status);
            } else {
                deferred.reject(new Error(err));
            }
        });
        return deferred.promise;
    }

    function findAllUsers() {
        var deferred = q.defer();
        userModel.find(function (err, status) {
            if (err) {
                deferred.reject(new Error(err));
            } else if(status) {
                deferred.resolve(status);
            } else {
                deferred.reject(new Error(err));
            }
        });
        return deferred.promise;
    }

    function findAllDoctors() {
        var deferred = q.defer();
        userModel.find({role: "DOCTOR"}, function (err, status) {
            if (err) {
                deferred.reject(new Error(err));
            } else if(status) {
                deferred.resolve(status);
            } else {
                deferred.reject(new Error(err));
            }
        });
        return deferred.promise;
    }

    function updateUser(userId, user) {
        var deferred = q.defer();
        userModel.update({_id: userId}, {$set: user}, function (err, status) {
            if (err) {
                deferred.reject(new Error(err));
            } else {
                deferred.resolve(status);
            }
        });
        return deferred.promise;
    }

    function deleteUser(userId) {
        var deferred = q.defer();
        userModel.remove({_id: userId}, function (err, status) {
            if (err) {
                deferred.reject(new Error(err));
            } else {
                deferred.resolve(status);
            }
        });
        return deferred.promise;
    }

    function updateMessage(userId, message) {
        var deferred = q.defer();
        userModel.update({_id: userId}, {$push: {messages: message}}, function (err, status) {
            if (err) {
                deferred.reject(new Error(err));
            } else {
                deferred.resolve(status);
            }
        });
        return deferred.promise;
    }

    function deleteMessage(userId, messageId) {
        var deferred = q.defer();
        userModel
            .findById(userId, function (err, user) {
                var index = user.messages.indexOf(messageId);
                user.messages.splice(index, 1);
                user.save();
                deferred.resolve(user);
            });
        return deferred.promise;

    }
};

