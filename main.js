


            var connection = new RTCMultiConnection();
 

            // by default, socket.io server is assumed to be deployed on your own URL
            // connection.socketURL = '/';

            // comment-out below line if you do not have your own socket.io server
             connection.socketURL = 'https://rtcmulticonnection.herokuapp.com:443/';

            connection.socketMessageEvent = 'textchat-plus-fileshare-demo';
            if(connection.socketMessageEvent){
                if (localStorage.getItem(connection.socketMessageEvent)){
                    localStorage.removeItem(connection.socketMessageEvent)
                }
            }
            connection.enableFileSharing = true; // by default, it is "false".

            connection.session = {
                data: true
            };

            connection.sdpConstraints.mandatory = {
                OfferToReceiveAudio: false,
                OfferToReceiveVideo: false
            };
            connection.extra.userColor = getRandomColor();
   
            connection.extra.fullName = prompt('Enter your full name');
            connection.onmessage = function(event) {
                appendNewMessage(event.data, event.extra.fullName, event.extra.userColor);
            };
            var chatContainer = document.querySelector('.chat-output');
            function appendNewMessage(message, fullName, userColor, sendingThisMessage) {
                var div = document.createElement('div');
                div.style.color = userColor; //check this line
                div.innerHTML = '' + fullName + ' said: ' + message;
                div.focus();
                chatContainer.appendChild(div);
            
                if (sendingThisMessage === true) {
                    div.innerHTML = '' + fullName + ' : ' + message;
                    div.style.color = 'black'
                }
                document.getElementById('input-text-chat').focus();
            }
            
            
        
            connection.filesContainer = document.getElementById('img');
            function getRandomColor() {
                var letters = '0123456789ABCDEF'.split('');
                var color = '#';
                for (var i = 0; i < 6; i++) {
                    color += letters[Math.round(Math.random() * 15)];
                }
                return color;
            }

            connection.onopen = function() {
                // document.getElementById('').style.display = 'none';
                document.getElementById('input-text-chat').style.display = 'none';
                document.getElementById('messages').style.display = 'block';
                document.getElementById('input-text-chat').style.display = 'block';
                document.getElementById('share-file').style.display = 'block';
          
            };

            function disableInputButtons() {
                document.getElementById('open-or-join-room').style.display = 'none';
                document.getElementById('open-room').style.display = 'none';
                document.getElementById('join-room').style.display = 'none';
                document.getElementById('room-id').style.display = 'none';
            }

            // ......................................................
            // ......................Handling Room-ID................
            // ......................................................

            function showRoomURL(roomid) {
              
                var roomHashURL = '#' + roomid;
                // var roomQueryStringURL = '?roomid=' + roomid;

                 var html = '';

                html += 'Hash URL: <a href="' + roomHashURL + '" target="_blank">' + roomHashURL + '</a>';
                // html += '<br>';
                // html += 'QueryString URL: <a href="' + roomQueryStringURL + '" target="_blank">' + roomQueryStringURL + '</a>';

                // var roomURLsDiv = document.getElementById('room-urls');
                // roomURLsDiv.innerHTML = html;

                // roomURLsDiv.style.display = 'block';

                document.getElementById('url-room').innerHTML = html
              }

              document.getElementById('open-room').onclick = function() {
                disableInputButtons();
                connection.open(document.getElementById('room-id').value, function() {
                    showRoomURL(connection.sessionid);
                });
            };

            document.getElementById('join-room').onclick = function() {
                disableInputButtons();
                connection.join(document.getElementById('room-id').value);
            };

            document.getElementById('open-or-join-room').onclick = function() {
                disableInputButtons();
                connection.openOrJoin(document.getElementById('room-id').value, function(isRoomExists, roomid) {
                    if(!isRoomExists) {
                        showRoomURL(roomid);
                    }
                });
            };

            // ......................................................
            // ................FileSharing/TextChat Code.............
            // ......................................................

            document.getElementById('share-file').onclick = function() {
                var fileSelector = new FileSelector();
                fileSelector.selectSingleFile(function(file) {
                    connection.send(file);
                });
            };

            document.getElementById('input-text-chat').onkeyup = function(e) {
                if (e.keyCode != 13) return;

                // removing trailing/leading whitespace
                this.value = this.value.replace(/^\s+|\s+$/g, '');
                if (!this.value.length) return;

                connection.send(this.value);
                appendNewMessage(this.value, connection.extra.fullName, connection.extra.userColor, true);
                this.value = '';
            };


    
   
            (function() {
                setInterval(() => {
                    document.getElementById('input-text-chat').focus() 
                }, 1000);
                var params = {},
                    r = /([^&=]+)=?([^&]*)/g;

                function d(s) {
                    return decodeURIComponent(s.replace(/\+/g, ' '));
                }
                var match, search = window.location.search;
                while (match = r.exec(search.substring(1)))
                    params[d(match[1])] = d(match[2]);
                window.params = params;
            })();

            var roomid = '';
            if (localStorage.getItem(connection.socketMessageEvent)) {
                roomid = localStorage.getItem(connection.socketMessageEvent);
                
            } else {
                roomid = connection.token();
                
            }
            document.getElementById('room-id').value = roomid;
            document.getElementById('room-id').onkeyup = function() {
                localStorage.setItem(connection.socketMessageEvent, this.value);
            };

            var hashString = location.hash.replace('#', '');
            if(hashString.length && hashString.indexOf('comment-') == 0) {
              hashString = '';
            }

            var roomid = params.roomid;
            if(!roomid && hashString.length) {
                roomid = hashString;
            }

            if(roomid && roomid.length) {
                document.getElementById('room-id').value = roomid;
                localStorage.setItem(connection.socketMessageEvent, roomid);

                // auto-join-room
                (function reCheckRoomPresence() {
                    connection.checkPresence(roomid, function(isRoomExists) {
                        if(isRoomExists) {
                            connection.join(roomid);
                            return;
                        }

                        setTimeout(reCheckRoomPresence, 5000);
                    });
                })();

                disableInputButtons();
            }
