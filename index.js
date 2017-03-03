var serialport = require('serialport');// include the library
SerialPort = serialport.SerialPort; // make a local instance of it

var WebSocketServer = require('ws').Server;


var SERVER_PORT = 8081;               // port number for the webSocket server
var wss = new WebSocketServer({port: SERVER_PORT}); // the webSocket server
var connections = new Array;          // list of connections to the server


// var mandrill = require('node-mandrill')('aaa36aaf31efa21115b420e57b17ea0f-us15'); 


/*
function sendEmail ( _name, _email, _subject, _message) {
    mandrill('/messages/send', {
        message: {
            to: [{email: _email , name: _name}],
            from_email: 'bralexm2@gmail.com',
            subject: _subject,
            text: _message
        }
    }, function(error, response){
        if (error) console.log( error );
        else console.log(response);
    });
}

// define your own email api which points to your server.

app.post( '/api/sendemail/', function(req, res){

    var _name = req.body.name;
    var _email = req.body.email;
    var _subject = req.body.subject;
    var _messsage = req.body.message;

    //implement your spam protection or checks. 

    sendEmail ( _name, _email, _subject, _message );

});*/





//var webSocket = new WebSocket("ws://localhost:8081");

// list serial ports:
/*serialport.list(function (err, ports) {
  ports.forEach(function(port) {
    console.log(port.comName);
  });
});*/

portName = '/dev/ttyACM0';
console.log(portName);

var myPort = new SerialPort(portName, {
   baudRate: 9600,
   // look for return and newline at the end of each data packet:
   parser: serialport.parsers.readline("\n")
 });

//myPort.write("Hello");

myPort.on('open', showPortOpen);
myPort.on('data', sendSerialData);
myPort.on('close', showPortClose);
myPort.on('error', showError);

var open = require('open');

function showPortOpen()
{
   console.log('port open. Data rate: ' + myPort.options.baudRate);
   open('./public/index.html', 'firefox');
}
 
function sendSerialData(data)
{
   console.log(data);
   broadcast(data);
}
 
function showPortClose()
{
   console.log('port closed.');
}
 
function showError(error)
{
   console.log('Serial port error: ' + error);
}

// webSocket event listeners

wss.on('connection', handleConnection);

function handleConnection(client) {
 console.log("New Connection"); // you have a new client
 connections.push(client); // add this client to the connections array
 
 client.on('close', function() { // when a client closes its connection
 console.log("connection closed"); // print it out
 var position = connections.indexOf(client); // get the client's position in the array
 connections.splice(position, 1); // and delete it from the array
 });
}

// Here’s a function to send webSocket data to the serial port.
/*function sendToSerial(data) {
 console.log("sending to serial: " + data);
 myPort.write(data);
}*/

// This function broadcasts messages to all webSocket clients
function broadcast(data) {
 for (myConnection in connections) {   // iterate over the array of connections
  connections[myConnection].send(data); // send the data to each connection
 }
}

// This will send the latest data to all available webSocket clients
function saveLatestData(data) {
	console.log("index.js");
   console.log(data);
   // if there are webSocket connections, send the serial data
   // to all of them:
   if (connections.length > 0) {
     broadcast(data);
   }
}