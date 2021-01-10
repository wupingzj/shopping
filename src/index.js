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
  let tag = request.body.fulfillmentInfo.tag;
  let jsonResponse = {};
  if (tag != "welcome tag") {
    //fulfillment response to be sent to the agent if the request tag is equal to "welcome tag"
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
  response.json(jsonResponse);
});

// start the Express server
app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
