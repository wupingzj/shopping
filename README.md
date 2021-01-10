## WolliesX Shopping Webhook service

For NodeJS and webhook coding demo purpose, the express server is used to handle webhook request.
In production, API gateways and Functions or Lambdas should be used instead.

### Run locally

- `run`: npm run start
- `watch`: npm run start:dev

### Webhook Request API Documentation:

- https://cloud.google.com/dialogflow/cx/docs/reference/rpc/google.cloud.dialogflow.cx.v3beta1#webhookrequest
- https://cloud.google.com/dialogflow/cx/docs/reference/rpc/google.cloud.dialogflow.cx.v3

### Deployment

This test webhook service is deployed to Heroku

- `login`: heroku git:remote -a pingshopping
- `log`: heroku logs --tail

### Authentication

- `Webhook authentication is not enforced for this test`
- `Testing Site`: My webhook testing site Heroku is public at https://pingshopping.herokuapp.com/webhook
- `Production Site`, as per Dialogflow CX documentation, either username/password or http Header can be used for authentication. When http Header is used, API key/value or Open ID JWT can be used.
