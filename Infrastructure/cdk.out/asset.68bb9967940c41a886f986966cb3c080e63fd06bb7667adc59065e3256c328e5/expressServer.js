const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const compression = require("compression");
const { getCurrentInvoke } = require("@vendia/serverless-express");
const app = express();
const router = express.Router();
const webpush = require("web-push");
var AWS = require("aws-sdk");

var region = "us-east-1";
var tableName = "subscriptions";

const publicVapidKey =
  "BKDeMpB42tmc0bYQ_4-o_Lohbn4GGlkk5wH4AwF7kfj9GAwB-10W2g81GoRSPlpBQ93A1-mZM-Bq190QBumEqPk";
const privateVapidKey = "lDs-x5lOsNh9CeGu8AJIKVZirDvrlDOmKAi4iCtWJ6U";

webpush.setVapidDetails(
  "mailto:test@test.com",
  publicVapidKey,
  privateVapidKey
);

router.use(compression());

router.use(cors());
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.get("/", (req, res) => {
  res.status(201).json({ hello: "world" });
});

// Subscribe Route
router.post("/subscribe", (req, res) => {
  // Get pushSubscription object
  const subscription = req.body;

  console.log({ subscription });
  var dynamoDB = new AWS.DynamoDB({
    region: region,
  });

  var params = {
    Item: {
      endpoint: {
        S: subscription.endpoint,
      },
      expirationTime: {
        S: subscription.expirationTime || "",
      },
      keys: {
        S: JSON.stringify(subscription.keys),
      },
      id: {
        S: subscription.keys.auth,
      },
    },
    ReturnConsumedCapacity: "TOTAL",
    TableName: tableName,
  };

  const putItemREsult = dynamoDB.putItem(params, function (err, data) {
    if (err) {
      console.log(err, err.stack);
      res
        .status(500)
        .json({ message: "failed trying to add subscription to table" });
    } else {
      console.log({ data });
      // Send 201 - resource created
      res.status(201).json({ message: "successfully got subscription" });
    }
  });
});

router.options("*", (req, res) => {
  // Send 201 - resource created
  res.status(201).json({});
  return;
});

// The serverless-express library creates a server and listens on a Unix
// Domain Socket for you, so you can remove the usual call to app.listen.
// app.listen(3000)
app.use("/", router);

// Export your express server so you can import it in the lambda function.
module.exports = app;
