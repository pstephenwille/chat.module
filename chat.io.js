/**
 *
 * Created by Stephen Wille
 * Date: 8/20/13
 */


"use strict";




module.exports = chat;


function chat(io)
{
    console.log('chat.io called');

    var messageDoc = {when:new Date(), from:'', message:''};

    io.sockets.on('connection', function(socket)
    {
        //    console.log(socket);

        socket.on('clientMessage', function(content)
        {
            socket.get('username', function(err, username)
            {
                if(! username)
                    { username = socket.id; }

                socket.get('room', function(err, room)
                {
                    var broadcast = socket.broadcast;
                    var message = content;

                    if(err) { console.log(err); }

//                    if(room === undefined) { room = 'home'; }




                    if(room) { broadcast.to(room); }

                    messageDoc = {when:new Date(), from:username, room:room, message:content};


                    socket.emit('serverMessage', messageDoc);

//                    todo log msg to db

                    broadcast.emit('serverMessage', messageDoc);
                });
            });
        });






        socket.on('login', function(username)
        {
            socket.set('username', username, function(err)
            {
                if(err) { throw err; }

                messageDoc = {when:new Date(), from:username, room:'', message:''};

                messageDoc.message =  'currently logged in as '+ username;
                socket.emit('serverMessage', messageDoc);

                messageDoc.message = 'user '+ username + ' logged in';
                socket.broadcast.emit('serverMessage', messageDoc);
            });
        });




        socket.on('disconnect', function()
        {
            socket.get('username', function(err, username)
            {
                if(! username)
                { username = socket.id; }
                socket.broadcast.emit('serverMessage', 'user '+ username +' disconnected');
            });
        });


        socket.on('join', function (room)
        {
            socket.get('room', function (err, oldRoom)
            {
                if (err)
                { throw err; }

                socket.set('room', room, function (err)
                {
                    if (err)
                    { throw err; }

                    socket.join(room);

                    if (oldRoom)
                    { socket.leave(oldRoom); }

                    socket.get('username', function (err, username)
                    {
                        if (! username)
                        { username = socket.id; }
                    });


                    socket.emit('servierMessage', 'you joined room ' + room);

                    socket.get('username', function (err, username)
                    {
                        if (! username)
                        { username = socket.id; }

                        socket.broadcast.to(room).emit('serverMessage', 'user ' + username + ' joined this room');
                    });
                });
            });
        });



        socket.emit('login');

    }); /* END - .on('connection') */
}/* End chat */