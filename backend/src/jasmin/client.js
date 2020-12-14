const config = require("../config/api");
const { ClientCredentials } = require("simple-oauth2");
const nodeFetch = require("node-fetch");
const { Item } = require("./models");
const { sequelize } = require("../db");

class JasminClient {
  constructor(baseUri, authCreds, companyId) {
    this.baseUri = baseUri;
    this.authCreds = authCreds;
    this.fetch = null;
    this.token = null;
    this.companyId = companyId;
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

  async getNewBuyOrder() {
    const fetch = await this.getFetch();
    const response = await fetch("/purchases/orders");
    const buyOrders = await response.json();
    const buyOrderIds = buyOrders.map((order, i) => [
      `ECF-${order.seriesNumber}`,
      i,
    ]);
    const seenDocuments = await sequelize.models.SeenDocument.findAll({
      where: { company: this.companyId },
    });
    for (const id of buyOrderIds) {
      const [key, i] = id;
      if (seenDocuments.findIndex((v) => v.key == key) > -1) continue;
      const buyOrder = buyOrders[i];
      await sequelize.models.SeenDocument.create({
        key,
        company: this.companyId,
      });
      return [1, buyOrder];
    }
    return [0, null];
  }

  async generateSellOrder(info) {
    const fetch = await this.getFetch();
    const parsedInfo = JSON.parse(info);
    const associations = await sequelize.models.ItemAssociation.findAll();
    const documentLines = parsedInfo.documentLines.map((documentline) => {
      if (this.companyId == 1) {
        const association = associations.find(
          (association) => association.company2Id == documentline.purchasesItem
        );
        if (association == null) return null;
        return {
          quantity: documentline.quantity,
          salesItem: association.company1Id,
        };
      } else {
        const association = associations.find(
          (association) => association.company1Id == documentline.purchasesItem
        );
        if (association == null) return null;
        return {
          quantity: documentline.quantity,
          salesItem: association.company2Id,
        };
      }
    });
    if (documentLines == null) {
      console.log("Couldn't find item association");
      return 0;
    }
    const bodyContent = {
      companyID: parsedInfo.sellerSupplierPartyId,
      buyerCustomerParty: parsedInfo.accountingParty,
      deliveryTerm: parsedInfo.deliveryTerm,
      documentLines,
    };
    const body = JSON.stringify(bodyContent);

    console.log(body);
    const response = await fetch("/sales/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: body,
    });

    if (response.ok) {
      return 1;
    } else {
      console.log(response);
      return 0;
    }
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
