// const DEVICE_PATH = '/dev/ttyACM0';
const SERIAL = chrome.serial;
const BITRATE = 9600;

var Device_path = "COM3";
var ConnectionId = -1;
var IsReady = false; 
var stringReceived = '';

/* Interprets an ArrayBuffer as UTF-8 encoded string data. */
var ab2str = function(buf) {
  var bufView = new Uint8Array(buf);
  var encodedString = String.fromCharCode.apply(null, bufView);
  return decodeURIComponent(escape(encodedString));
};

/* Converts a string to UTF-8 encoding in a Uint8Array; returns the array buffer. */
var str2ab = function(str) {
  var encodedString = unescape(encodeURIComponent(str));
  var bytes = new Uint8Array(encodedString.length);
  for (var i = 0; i < encodedString.length; ++i) {
    bytes[i] = encodedString.charCodeAt(i);
  }
  return bytes.buffer;
};


// var onGetDevices = function(ports) {
//   for (var i=0; i<ports.length; i++) {
//     // console.log(ports[i].path);
//   }
//   Device_path = ports[0].path;
//   console.log(Device_path);
// }
// SERIAL.getDevices(onGetDevices);





var writeSerial=function(str) {
  	SERIAL.send(ConnectionId, convertStringToArrayBuffer(str), function() {});
}
// 将字符串转换为 ArrayBuffer
var convertStringToArrayBuffer=function(str) {
  var buf=new ArrayBuffer(str.length);
  var bufView=new Uint8Array(buf);
  for (var i=0; i<str.length; i++) {
    bufView[i]=str.charCodeAt(i);
  }
  return buf;
}



var onLineReceived = function(str){
	var dataReceived = parseFloat(str);
	var dataText = document.getElementById("data");
	dataText.innerHTML = dataReceived;
}


var onReceiveCallback = function(info) {
	console.log(info.data);
    if (info.connectionId == expectedConnectionId && info.data) {
      var str = ab2str(info.data);
      if (str.charAt(str.length-1) === '\n') {
        stringReceived += str.substring(0, str.length-1);
        onLineReceived(stringReceived);
        stringReceived = '';
      } else {
        stringReceived += str;
      }
    }
};




var onConnect = function(connectionInfo) {
   	// 串行端口已打开，保存其标识符以便以后使用。
	ConnectionId= connectionInfo.connectionId;

	var btn_start = document.getElementById("start");
	btn_start.addEventListener('click', function() {
		// 向下位机打招呼
	  	writeSerial("o");
	});

	//断开连接
	var btn_stop = document.getElementById("stop");
	btn_stop.addEventListener('click', function() {
		var onDisconnect = function(result) {
		  if (result) {
		    console.log("Disconnect");
		  } else {
		    console.log("Disconnect Fail");
		  }
		}
		SERIAL.disconnect(ConnectionId, onDisconnect);
	});
}

// IsReady = true;
//发送启动信号




// 连接到串行端口
SERIAL.connect(Device_path, {bitrate: BITRATE}, onConnect);
SERIAL.onReceive.addListener(onReceiveCallback);



