const port = process.env.PORT || 8080;
const CHECK_PRODUCT_AVAILABILITY = "checkProductAvailability";

const pluralize = require("pluralize");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  console.log(`serving / ...`);
  res.send("Hello world! v1.2");
});

app.post("/webhook", (req, res) => {
  console.log("** calling webhook...");
  console.log(`webhook get called. body`, JSON.stringify(req.body));
  let parameters = req.body.sessionInfo.parameters;
  console.log("*** name=", parameters.name);
  let tag = req.body.fulfillmentInfo.tag;
  let jsonResponse = {};
  if (tag == CHECK_PRODUCT_AVAILABILITY) {
    let product = parameters.product.original;
    let store = parameters.store.original;
    let count = randomInt(1, 100); // dummy stock availability

    console.log("**** product", product);
    console.log("**** store", store);
    let countedProduct = pluralize(product, count, true);
    console.log("**** countedProduct", countedProduct);

    jsonResponse = {
      fulfillment_response: {
        messages: [
          {
            text: {
              text: [
                `We have ${countedProduct} in stock at ${store}. 

              Was there anything else I can help you with?`
              ]
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
  res.json(jsonResponse);
});

// start the Express server
app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});

function randomInt(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}
