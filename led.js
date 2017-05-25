
//import required modules

var awsIot = require('aws-iot-device-sdk');
var rpio = require('rpio');

//initialize GPIO18 to low
rpio.open(12, rpio.OUTPUT, rpio.LOW);

//setup paths to certificates
var device = awsIot.device({
   keyPath: '../private.pem.key',
  certPath: '../certificate.pem.crt',
    caPath: '../caCert.crt',
  clientId: 'MyThingName',
    region: 'us-east-2'
});

device
  .on('connect', function() {

    //subscribe to the LED topic
    device.subscribe('LED');

    });

device
  .on('message', function(topic, payload) {

    // convert the payload to a JSON object
    var payload = JSON.parse(payload.toString());

    console.log(payload.light);

    //check for TOPIC name
    if(topic == 'LED'){

        if(payload.light == 'on'){

          rpio.write(12, rpio.HIGH);

        } else {

          rpio.write(12, rpio.LOW);

        }
    }

  });
