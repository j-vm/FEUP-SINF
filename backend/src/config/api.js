module.exports = {
  authUri: {
    base: "https://identity.primaverabss.com",
    tokenPath: "/connect/token",
  },
  baseUri: function (account, subscription) {
    return `https://my.jasminsoftware.com/api/${account}/${subscription}`;
  },
};
