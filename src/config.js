export default {
  MAX_ATTACHMENT_SIZE: 5000000,
  s3: {
    REGION: "us-west-2",
    BUCKET: "react-deploy-pax"
  },
  apiGateway: {
    REGION: "us-west-2",
    URL: ""
  },
  cognito: {
    REGION: "us-west-2",
    USER_POOL_ID: "",
    APP_CLIENT_ID: "",
    IDENTITY_POOL_ID: ""
  }
}