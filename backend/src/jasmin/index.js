const config = require("../config/api");
const { ClientCredentials } = require("simple-oauth2");
const { baseUri } = require("../config/api");
const nodeFetch = require("node-fetch");

let client1 = null;
let client2 = null;

module.exports = {
  client1: function () {
    if (client1) return client1;

    const {
      JASMIN_APP1_KEY,
      JASMIN_APP1_SECRET,
      JASMIN_ACCOUNT1,
      JASMIN_SUBSCRIPTION1,
    } = process.env;

    const creds1 = {
      id: JASMIN_APP1_KEY,
      secret: JASMIN_APP1_SECRET,
    };

    client1 = new JasminClient(
      baseUri(JASMIN_ACCOUNT1, JASMIN_SUBSCRIPTION1),
      creds1
    );

    return client1;
  },
  client2: function () {
    if (client2) return client2;

    const {
      JASMIN_APP2_KEY,
      JASMIN_APP2_SECRET,
      JASMIN_ACCOUNT2,
      JASMIN_SUBSCRIPTION2,
    } = process.env;

    const creds2 = {
      id: JASMIN_APP2_KEY,
      secret: JASMIN_APP2_SECRET,
    };

    client2 = new JasminClient(
      baseUri(JASMIN_ACCOUNT2, JASMIN_SUBSCRIPTION2),
      creds2
    );

    return client2;
  },
};

class JasminClient {
  constructor(baseUri, authCreds) {
    this.baseUri = baseUri;
    this.authCreds = authCreds;
    this.fetch = null;
    this.token = null;
  }

  async getFetch() {
    // this.token is null if and only if this.fetch is also null
    // the 5 means that we should replace the token 5 seconds before expiration, at
    // the latest;
    // this is done to avoid any weird race condition with the token expiring before
    // reaching the Jasmin API endpoint
    if (this.fetch == null || this.token.expired(5)) {
      this.token = await auth(config.auth, this.authCreds);
      this.fetch = async (url, options = { headers: {} }) => {
        if (!options.headers) options.headers = {};
        options.headers.Authorization = `Bearer ${this.token.token.access_token}`;
        return await nodeFetch(url, options);
      };
    }
    return this.fetch;
  }

  async getCompanies() {
    const fetch = await this.getFetch();
    const result = await fetch(`${this.baseUri}/corePatterns/companies`);
    return await result.json();
  }
}

async function auth(auth, client) {
  const config = {
    auth,
    client,
  };
  const oauth = new ClientCredentials(config);
  return await oauth.getToken({ scope: "application" });
}
