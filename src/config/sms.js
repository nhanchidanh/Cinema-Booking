require("dotenv").config();
const aws = require("aws-sdk");

aws.config.update({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_SNS,
  secretAccessKey: process.env.AWS_SECRET_KEY_SNS,
});

// const messageTemplate = (user_name, password) => {
//     return `Welcome to Galaxy Cinema. Your account has been created successfully. Your username is ${user_name} and your password is ${password}. Please change your password after login.`
// }

const sendSMS = (phone, content, cb) => {
  const params = {
    Message: content,
    PhoneNumber: "+" + phone,
    MessageAttributes: {
      "AWS.SNS.SMS.SenderID": {
        DataType: "String",
        StringValue: "CinemaHub",
      },
    },
  };
  const publishTextPromise = new aws.SNS({ apiVersion: "2010-03-31" })
    .publish(params)
    .promise();
  publishTextPromise
    .then(function (data) {
      cb(data.MessageId);
    })
    .catch(function (err) {
      cb(err);
    });
};

exports.sendSMS = sendSMS;
