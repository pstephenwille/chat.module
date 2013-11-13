
/*
 * handlers for all routes
 */






exports.routeHandlers = function routeHandlers(app)
{
    require('./index')(app);
    require('./test')(app);
    require('./faq/faq')(app);
    require('./login/login')(app);
};
