const port = process.env.PORT || 8080;
const CHECK_PRODUCT_AVAILABILITY = "checkProductAvailability";

const pluralize = require("pluralize");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("Yeah, I am feeling good.");
});

app.post("/webhook", (req, res) => {
  console.log("*** calling webhook ...", JSON.stringify(req.body));
  let parameters = req.body.sessionInfo.parameters;
  let tag = req.body.fulfillmentInfo.tag;
  let jsonResponse = {};
  if (tag == CHECK_PRODUCT_AVAILABILITY) {
    let product = parameters.product.original;
    let store = parameters.store.original;
    let count = randomInt(1, 100); // dummy stock availability
    let countedProduct = pluralize(product, count, true);
    console.log("**** countedProduct", countedProduct);

    jsonResponse = {
      fulfillment_response: {
        messages: [
          {
            text: {
              text: [
                `We have ${countedProduct} in stock at our ${store} store. 

              Was there anything else I can help you with?`
              ]
            }
          }
        ]
      }
    };
  } else {
    jsonResponse = {
      fulfillment_response: {
        messages: [
          {
            text: {
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
  console.log(`server started at port ${port}`);
});

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
