// THis file configures the proper API endpoints for the Jasmin api

module.exports = {
  // this object contais the endpoint configuration for OAuth auth in client token mode
  // the keys follow the convention used by the simple-oauth2 package
  auth: {
    tokenHost: "https://identity.primaverabss.com",
    tokenPath: "/connect/token",
  },
  // this object contains a endpoint generator for the API itself
  baseUri: function (account, subscription) {
    return `https://my.jasminsoftware.com/api/${account}/${subscription}`;
  },
};
