var express = require('express'),
  app = express(),
  server = app.listen(3000),
  io = require('socket.io').listen(server),
  path = require('path'),
  users = {},
  available_usernames = [
    'Xx_Demolidor_xX',
    '_V1m_C0nv3rs4r_',
    '-_-_G4tinha_123_-_-',
    '$_Xurupita_$',
    '20-P3gAr',
    '@Kp1ntão-4mer1k@',
    'l3k-l3k',
    '$$_P4nt3r4_$$',
    '**L01rinh4**'
  ],
  username_generator = 0; //Holds the username when the available usernames are empty

var sendUsersList = function() {
  var users_update = [];
  for (user_id in users) {
    users_update.push(users[user_id]);
  }
  console.log("sending " + users_update);
  io.emit('user-update', users_update);
};

var generateUsername = function(socket) {
  //Get a username
  var username;
  if (available_usernames.length != 0) {
    var index = Math.floor(Math.random() * available_usernames.length);
    username = available_usernames[index];
    //Remove the username from the list
    available_usernames.splice(index, 1);
  } else {
    username = username_generator;
    username_generator += 1;
  }

  users[socket.id] = username;

  io.to(socket.id).emit('authentication', users[socket.id]);
  console.log('authenticating ' + users[socket.id]);
  console.log(users);
};

app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', function(socket) {


  generateUsername(socket);
  sendUsersList(socket);
  io.emit('chat message', {'usr': '', 'msg': users[socket.id] + ' has entered'});

  socket.on('disconnect', function() {
    var message = {
      'user': '',
      'msg': ''
    };

    if (users.hasOwnProperty(socket.id)) {
      if (isNaN(users[socket.id])) {
        available_usernames.push(users[socket.id]);
      } else {
        username_generator -= 1;
      }
      message['msg'] = users[socket.id] + ' has left';
      delete users[socket.id];
    }
    sendUsersList();

    io.emit('chat message', message);
    console.log('user disconnected');
  });

  socket.on('chat message', function(msg) {
    if (users[socket.id] != undefined) {
      console.log(users);
      var username = users[socket.id];
      console.log(username);
      var message = {
        'user': username,
        'msg': msg
      };
      console.log(message);
      io.emit('chat message', message);
    }
  });
});
