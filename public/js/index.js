// angular.module('chatApp', [])
//   .controller('ChatController', function() {
//
//   });


// function() {
  var last_user = '';
  var user = '';
  var socket = io();
  var users = [];
  
  var send = function() {
    socket.emit('chat message', $('#m').val());
    $('#m').val('');
    return false;
  };

//  var authenticate = function(user) {
//    socket.emit('authentication', user);
//  }

  socket.on('connect', function() {
//    authenticate(user);
  });

  socket.on('authentication', function(username) {
    user = username;
    console.log("My username is " + user);
  });

  $('form').submit(function() {
    return send();
  });

  socket.on('chat message', function(msg) {
    var p = $('<p></p>');
    p.append(msg['msg']);
    
    //If the last user to send a message is the same
    if(last_user == msg['user']) {
      $('#messages li:last-child div').append(p);
      
    } else {
      last_user = msg['user'];
      var li = $('<li></li>');
      var div = $('<div></div>');

      //If who sent the message is receiving it
      if(msg['user'] == user) {
        li.addClass('own-message');
      } else {
        var user_p = $('<p></p>');
        user_p.append(last_user);
        user_p.addClass('user');
        div.append(user_p);
      }

      div.append(p);
      li.append(div);
      $('#messages').append(li);
    }
    
    //Scroll the chat
    $("#chat-view").prop({ scrollTop: $("#chat-view").prop("scrollHeight")});
    
  });

  socket.on('error', function(msg) {
    console.log(msg);
  })
  
  socket.on('user-update', function(users_list) {
    users = users_list;
    console.log(users);
    updateUserList();
  });

  var updateUserList = function() {
    var DOM_users_list = $('#users-section ul');
    DOM_users_list.empty();
    for(var i = 0; i < users.length; i++) {
      console.log(users[i]);
      var li = $('<li></li>');
      if(users[i] == user) {
        li.addClass('own-user');
      }
      li.append(users[i]);
      DOM_users_list.append(li);
      
    }
  }

// }();
