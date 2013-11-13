/**
 *
 * Created by Stephen Wille
 * Date: 8/12/13
 */


"use strict";





exports.isLoggedIn = function(req, res, next)
{
    console.log('=== auth.isLoggedIn ===');

    if(req.session.name)
    {
        next();
    }
    else
    {
        req.session.path = req.path;
        res.redirect('/login');
    }
};
exports.goForIt = function (req, res, next)
{
    console.log('go for it');
    next();
};