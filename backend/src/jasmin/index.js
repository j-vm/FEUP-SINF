const { baseUri } = require("../config/api");
const JasminClient = require("./client");

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
