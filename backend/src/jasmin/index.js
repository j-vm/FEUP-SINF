const { baseUri, authUri } = require("../config/api");
const { ClientCredentials } = require("simple-oauth2");

class JasminClient {
  constructor({ access_token, company1, company2 }) {
    this.access_token = access_token;
    this.company1 = company1;
    this.company2 = company2;
  }
}

async function auth() {
  const config = {
    auth: {
      tokenHost: authUri.base,
      tokenPath: authUri.tokenPath,
    },
    client: {
      id: process.env.JASMIN_APP_KEY,
      secret: process.env.JASMIN_APP_SECRET,
    },
  };
  const client = new ClientCredentials(config);
  const access_token = await client.getToken({ scope: "application" });
  return access_token;
}

module.exports = auth();
