/**
 *
 * Created by Stephen Wille
 * Date: 8/20/13
 */


"use strict";




module.exports = function chat_router(app)
{
    app.get('/index', chat);
};








function chat(req, res, next)
{

    res.render('index');
}