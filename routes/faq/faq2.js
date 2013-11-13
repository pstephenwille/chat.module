/**
 *
 * Created by Stephen Wille
 * Date: 8/10/13
 */


function faq(req, res)
{
    res.send('faq page');
}


module.exports = function faq_router(app)
{

    app.get('/faq2', faq);
}


