

var sdpConstraints = { optional: [{RtpDataChannels: true}]  }
var pc = new RTCPeerConnection(null)

var dc

pc.oniceconnectionstatechange = function(e) {
    var state = pc.iceConnectionState

    if (state == "connected"){
        document.getElementById('messages').style.display = 'block'
        document.getElementById('send').style.display = 'block'
    }
    
}
pc.ondatachannel  = function(e) {dc = e.channel; dcInit(dc)}
  pc.onicecandidate = function(e) {
    if (e.candidate) return

    document.getElementById('joiner-sdp').value = JSON.stringify(pc.localDescription)
   
}

function dcInit(dc) {
    dc.onopen    = function()  {addMSG("CONNECTED!", "info")};
    dc.onmessage = function(e) {if (e.data) addMSG(e.data, "other");}
  }

  function createAnswerSDP() {
    var offerDesc = 
    new RTCSessionDescription(
        JSON.parse(document.getElementById('creator-sdp').value)
    );
    pc.setRemoteDescription(offerDesc)
    pc.createAnswer(function (answerDesc) {
      pc.setLocalDescription(answerDesc)
    }, function () {console.warn("Couldn't create offer")},
    sdpConstraints);
  };

var addMSG = function(msg, who) {
    console.log(msg,who)
}


var sendMSG = function() {
    var value = document.getElementById('send').value 
    if (value) {
      dc.send(value);
      addMSG(value, "me");
      document.getElementById('send').value = ''
    }
}

document.getElementById('send').addEventListener("keypress",(e)=>{
    if(e.which == 13) {sendMSG()}
})

document.getElementById('create').addEventListener('click',createAnswerSDP)
