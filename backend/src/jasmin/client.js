const config = require("../config/api");
const { ClientCredentials } = require("simple-oauth2");
const nodeFetch = require("node-fetch");
const { Item } = require("./models");

class JasminClient {
  constructor(baseUri, authCreds) {
    this.baseUri = baseUri;
    this.authCreds = authCreds;
    this.fetch = null;
    this.token = null;
    this.documentsSeen = [];
  }

  async getCompanies() {
    const fetch = await this.getFetch();
    const result = await fetch("/corePatterns/companies");
    return await result.json();
  }

  async getItems() {
    const fetch = await this.getFetch();
    const response = await fetch("/businessCore/items");
    const parsed = await response.json();
    return parsed.map((item) => new Item(item));
  }

  async getBuyOrder() {
    const fetch = await this.getFetch();
    const response = await fetch("/purchases/orders");
    const buyOrders = await response.json();
    for (const i in buyOrders) {
      const buyOrder = buyOrders[i];
      if (!this.documentsSeen.includes("ECF-" + buyOrder["seriesNumber"])) {
        this.documentsSeen.push("ECF-" + buyOrder["seriesNumber"]);
        return 1, buyOrder;
      }
    }
    return 0;
  }

  async getFetch() {
    // this.token is null if and only if this.fetch is also null
    // the 5 means that we should replace the token 5 seconds before expiration, at
    // the latest;
    // this is done to avoid any weird race condition with the token expiring before
    // reaching the Jasmin API endpoint
    if (this.fetch == null || this.token.expired(5)) {
      this.token = await auth(config.auth, this.authCreds);
      this.fetch = async (path, options = { headers: {} }) => {
        if (!options.headers) options.headers = {};
        options.headers.Authorization = `Bearer ${this.token.token.access_token}`;
        return await nodeFetch(`${this.baseUri}${path}`, options);
      };
    }
    return this.fetch;
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

module.exports = JasminClient;
