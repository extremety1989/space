
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
  pc.onicecandidate = function(e) {
    if (e.candidate) return

    document.getElementById('create-sdp').value = JSON.stringify(pc.localDescription)
    
  
}

console.log(document.getElementById('create-sdp').value)

function createOfferSDP() {
    dc = pc.createDataChannel("chat");
    pc.createOffer().then(function(e) {
      pc.setLocalDescription(e)
    });
    dc.onopen = function(){
    console.log("Connected")
}
    dc.onmessage = function(e) {
      if (e.data) addMSG(e.data, "other")
    }
}

createOfferSDP()

var addMSG = function(msg, who) {
}
function start() {
    var answerSDP = document.getElementById('joiner-sdp').value
    var answerDesc = new RTCSessionDescription(JSON.parse(answerSDP));
    pc.setRemoteDescription(answerDesc);
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
document.getElementById('start').addEventListener('click',start)

