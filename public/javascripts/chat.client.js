/**
 *
 * Created by Stephen Wille
 * Date: 8/20/13
 */


"use strict";




var socket = io.connect('http://localhost:5005'),
    inputElement = document.getElementById('input'),
    messagesElement = document.getElementById('messages'),
    lastMessageElement = null,
    username;




function addMessage(message)
{
    var newMessageElement = document.createElement('div');
    var newMessageText = document.createTextNode(message);

    newMessageElement.className = 'message';

    if(message.when)
    {
        message.when = new Date(message.when).toLocaleTimeString();
    }


    //messageDoc
    ['when', 'from', 'message'].forEach(function(prop)
            {
                var newPart = document.createElement('span');
                    newPart.className = prop;//when, from, message

                var messageText = message[prop];

                if(prop === 'when')
                {
                    messageText = '['+ messageText +' - ';
                }
                if(prop === 'from')
                {
                    if(message[prop] === username)
                        { newPart.className += ' self'; }
                    messageText += ' ]...';
                }



                messageText += ' ';

                var newPartText = document.createTextNode(messageText);

                newPart.appendChild(newPartText);
                newMessageElement.appendChild(newPart);

            });

//    newMessageElement.appendChild(newMessageText);
    messagesElement.insertBefore(newMessageElement, lastMessageElement);
    lastMessageElement = newMessageElement;
}



socket.on('serverMessage', function(content)
{
    console.log(content.when +' - '+ content.from +' - '+ content.message);
    addMessage(content);
});

socket.on('login', function()
{
    username = prompt('what username to use');
    socket.emit('login', username);
});



function sendCommand(command, args)
{
    if(command === 'j')
        { socket.emit('join', args); }
    else
        { alert('unknown command '+ command); }
}


function sendMessage(message)
{
    var commandMatch = message.match(/^\/(\w*)(.*)/);

    if(commandMatch)
        { sendCommand(commandMatch[1], commandMatch[2].trim()); }
    else
        { socket.emit('clientMessage', message); }
}






inputElement.onkeydown = function(keyboardEvent)
{
    if(keyboardEvent.keyCode === 13)
    {
        sendMessage(inputElement.value);
        inputElement.value = '';
        return false;
    }
    else
        { return true; }
};


