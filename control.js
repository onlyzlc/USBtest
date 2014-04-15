// const DEVICE_PATH = '/dev/ttyACM0';
const SERIAL = chrome.serial;
const BITRATE = 9600;

var Device_path;

var onGetDevices = function(ports) {
  for (var i=0; i<ports.length; i++) {
    // console.log(ports[i].path);
  }
  Device_path = ports[0].path;
  console.log(Device_path);
}
SERIAL.getDevices(onGetDevices);


var onConnect = function(connectionInfo) {
   // 串行端口已打开，保存其标识符以便以后使用。
  _this.connectionId = connectionInfo.connectionId;
  // 对已打开的端口做任何您需要做的事情。
}
// 连接到串行端口 /dev/ttyS01
SERIAL.connect("Device_path", {bitrate: BITRATE}, onConnect);