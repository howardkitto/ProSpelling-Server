async.series([
        //Load user to get `userId` first
        function(callback) {
            db.query('users', {name: name}, function(err, users) {
                if (err) return callback(err);
                //Check that a user was found
                if (users.length == 0) {
                    return callback(new Error('No user with name '+name+' found.'));
                }
                var user = users[0];
                userId = user.id; //Set the `userId` here, so the next task can access it
                locals.user = {
                    name: user.name,
                    email: user.email,
                    bio: user.bio
                };
                callback();
            });
        }