/**
 *
 * Created by Stephen Wille
 * Date: 8/8/13
 */
//
//exports.test = function(req, res)
//{
////    console.log('================');
////    console.log(req);
//
//
//
//    //    res.send("my separate test page");
//    var ip = req.connection.remoteAddress;
//    var sess = req.session.name = 'stephen';
//
////    var port = app.get('port');
//    res.render('test', {title:sess});
//
//
////    res.sendfile(__dirname +'/test.html', {title:'file'});
//
//
//};



function test(req, res)
{
    "use strict";

    var ip = req.connection.remoteAddress;

    res.render('test', {title:ip});
}

function test2(req, res)
{
    "use strict";
    res.send('test 2');
}



module.exports = function test_router(app)
{
    app.get('/test', auth.isLoggedIn, test);
    app.get('/test2', auth.isLoggedIn, test2);
};




//exports.test = test;


