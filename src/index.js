const port = process.env.PORT || 8080;

const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// define a route handler for the default home page
app.get("/", (req, res) => {
  console.log(`serving / ...`);
  res.send("Hello world! v1.2");
});

app.post("/webhook", (request, response) => {
  console.log("** calling webhook...");
  console.log(`webhook get called. body`, JSON.stringify(request.body));
  let tag = request.body.fulfillmentInfo.tag;
  let jsonResponse = {};
  if (tag != "welcome tag") {
    jsonResponse = {
      fulfillment_response: {
        messages: [
          {
            text: {
              //fulfillment text response to be sent to the agent
              text: ["Hi! This is a webhook response"]
            }
          }
        ]
      }
    };
  } else {
    jsonResponse = {
      //fulfillment text response to be sent to the agent if there are no defined responses for the specified tag
      fulfillment_response: {
        messages: [
          {
            text: {
              ////fulfillment text response to be sent to the agent
              text: [
                `There are no fulfillment responses defined for "${tag}"" tag`
              ]
            }
          }
        ]
      }
    };
  }

  console.log("** called webhook **");
  response.json(jsonResponse);
});

// start the Express server
app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
