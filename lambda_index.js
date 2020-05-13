var AWS = require('aws-sdk');

exports.handler = (event, context, callback) => {


    var sns = new AWS.SNS();
    var params = {
        Message: event.Message,
        MessageStructure: 'string',
        PhoneNumber: event.number,
        Subject: event.subject

    };


    sns.publish(params, function(err, data) {
        if (err) console.log(err, err.stack); // an error occurred
        else     console.log(data);           // successful response
    });

};