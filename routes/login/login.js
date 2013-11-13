/**
 *
 * Created by Stephen Wille
 * Date: 8/12/13
 */


"use strict";


var userSchema = require('../../data/schema/users.js');


module.exports = function login_router(app)
{

    app.get('/login', login);
    app.post('/login/authUser', authenticateUser);
    app.post('/login/createUser', createUser);
}






/* shows login & createuser form */
function login(req, res, next)
    { res.render('login'); }




/*
* handles authenticating user.
* on success, redirects to page requested before login.
* on fail, not yet handled. */
function authenticateUser(req, res, next)
{
    if(req.session.name === undefined && req.body.username && req.body.password)
    {
        console.log('=== req POST ===');

        var db =  mongoose.connect(dbConn_str, function(err)
                    { if(err) { console.log(err); } })
                    .connection;

        var User = ( mongoose.models.user )
                    ? mongoose.models.user
                    : mongoose.model('user', userSchema);


        db.on('error', function(err)
            {
                console.log(err);

                db.close();

//                todo - pass error msg to view
                res.render('login');
            })
            .once('open', function(user_details)
            {
                User.findOne({username:req.body.username}, function(err, doc)
                {
                   if(err){ console.log(err); }

                    user_details = (doc)? doc.toObject(): new Object({name:'error'});

                    bcrypt.compare(req.body.password, user_details.password, function(err, isMatch)
                    {
                        if(err) { console.log(err); }

                        if(isMatch)
                        {
                            req.session.name = user_details.name;
                            res.redirect(req.session.path || req.path);
                        }
                        else
                        {
                            res.redirect(req.session.path || req.path);
                        }
                    });

                    db.close();
                });
            });
    }
    else if(req.session.name)
    {
        console.log('=== post login 2 ===');
        res.redirect(req.session.path || req.path);
    }
    else
    {
        console.log('=== next ===');
        res.render('login');
    }
}



/*
* creates new user and logs them in,
* by setting req.session.name = req.body.name */
function createUser(req, res, next)
{
    console.log('== create user==');


    if(req.session.name === undefined && req.body.username && req.body.password)
    {
        console.log('=== req.body ===');

        var db =  mongoose.connect(dbConn_str, function(err)
                    { if(err) { console.log(err); } })
                    .connection;

        var User = ( mongoose.models.user )
                    ? mongoose.models.user
                    : mongoose.model('user', userSchema);


        var new_user = new User(req.body)
                    .save(function(err, new_user)
                    {
                        console.log('=== save ===');

                        if(err)
                        {
                            console.log(err);
                            res.render('login');
                        }
                        else
                        {
                            req.session.name = req.body.name;
                            res.redirect(req.session.path || req.path);
                        }
                    });

        db.close();
    }
    else
        { res.render('login'); }
}




