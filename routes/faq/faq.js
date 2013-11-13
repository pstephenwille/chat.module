/**
 *
 * Created by Stephen Wille
 * Date: 8/10/13
 */


function faq(req, res, next)
{
    res.send('faq page');
    next();
}


module.exports = function faq_router(app)
{

    app.get('/faq', auth.isLoggedIn, faq);
}


