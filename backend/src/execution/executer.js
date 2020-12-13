const models = require("../jasmin/models");
const { sequelize } = require("../db");
const { client1, client2 } = require("../jasmin/index");

module.exports = {
  runExecutions: async function (executions, stepsToRun) {
    await Promise.all(
      executions.map(async (execution, index) => {
        if (stepsToRun[index] == null) return;
        await runStep(execution, stepsToRun[index]);
        return;
      })
    );
  },
};

// return 1 if successful
async function runStep(exec, step) {
  console.log(step), console.log(exec);
  switch (step.documentType) {
    case "buyOrder":
      await handleBuyOrder(step.type, step.company, exec);
      break;
    case "sellOrder":
      await handleSellOrder(step.type, step.company, exec);
      break;
    case "deliveryNote":
      await handleDeliveryNote(step.type, step.company, exec);
      break;
    case "orderReceipt":
      await handleOrderReceipt(step.type, step.company, exec);
      break;
    case "invoice":
      await handleInvoice(step.type, step.company, exec);
      break;
    case "invoiceReceipt":
      await handleInvoiceReceipt(step.type, step.company, exec);
      break;
    case "payment":
      await handlePayment(step.type, step.company, exec);
      break;
    case "receipt":
      await handleReceipt(step.type, step.company, exec);
      break;
    default:
      console.log("ERROR: Unrecognized Document type " + step.documentType);
      return;
  }
  return returnCode;
}

async function handleBuyOrder(type, company, exec) {
  const client = company == 1 ? client1() : client2();
  console.log(client);
  if (type == "emit") {
    //GET JSON DATA FROM FILE WITH FS
    //Access Correct endpoint with the json data
    console.log("Emiting Buy Order not Supported");
    return 0;
  } else if (type == "wait") {
    const [returnCode, info] = await client.getNewBuyOrder();
    console.log("Looking for BuyOrder");
    console.log(info);
    console.log(returnCode);
    const smart = await sequelize.models.Execution.findByPk(exec.id);
    smart.info = JSON.stringify(info);
    smart.stepAt += returnCode;
    await smart.save();
    return returnCode;
  }
  console.log("ERROR: Unrecognized step type " + type);
}

async function handleSellOrder(type, company, exec) {
  const client = company == 1 ? client1() : client2();
  console.log(client);
  if (type == "emit") {
    const [returnCode, info] = await client.generateSellOrder();
    console.log("Emitting SellOrder");
    console.log(info);
    console.log(returnCode);
    const smart = await sequelize.models.Execution.findByPk(exec.id);
    smart.info = JSON.stringify(info);
    smart.stepAt += returnCode;
    await smart.save();
    return returnCode;
  } else if (type == "wait") {
    console.log("Wait not supported for Supplier Invoice");
    return 0;
  }
  console.log("ERROR: Unrecognized step type " + type);
}

async function handleDeliveryNote(type, company, exec) {
  const client = company == 1 ? client1() : client2();
  console.log(client);
  if (type == "emit") {
    //GET JSON DATA FROM FILE WITH FS
    //Access Correct endpoint with the json data
    console.log("Emiting Delivery Note not Supported");
    return 0;
  } else if (type == "wait") {
    const [returnCode, info] = await client.getDeliveryNote();
    console.log("Looking for Delivery Note");
    console.log(info);
    console.log(returnCode);
    const smart = await sequelize.models.Execution.findByPk(exec.id);
    smart.info = JSON.stringify(info);
    smart.stepAt += returnCode;
    await smart.save();
    return returnCode;
  }
  console.log("ERROR: Unrecognized step type " + type);
}

async function handleOrderReceipt(type, company, exec) {
  const client = company == 1 ? client1() : client2();
  console.log(client);
  if (type == "emit") {
    const [returnCode, info] = await client.generateOrderReceipt();
    console.log("Emitting Order Receipt");
    console.log(info);
    console.log(returnCode);
    const smart = await sequelize.models.Execution.findByPk(exec.id);
    smart.info = JSON.stringify(info);
    smart.stepAt += returnCode;
    await smart.save();
    return returnCode;
  } else if (type == "wait") {
    console.log("Wait not supported for Order Receipt");
    return 0;
  }
  console.log("ERROR: Unrecognized step type " + type);
}

async function handleInvoice(type, company, exec) {
  const client = company == 1 ? client1() : client2();
  console.log(client);
  if (type == "emit") {
    //GET JSON DATA FROM FILE WITH FS
    //Access Correct endpoint with the json data
    console.log("Emiting Invoice not Supported");
    return 0;
  } else if (type == "wait") {
    const [returnCode, info] = await client.getInvoice();
    console.log("Looking for Invoice");
    console.log(info);
    console.log(returnCode);
    const smart = await sequelize.models.Execution.findByPk(exec.id);
    smart.info = JSON.stringify(info);
    smart.stepAt += returnCode;
    await smart.save();
    return returnCode;
  }
  console.log("ERROR: Unrecognized step type " + type);
}

async function handleInvoiceReceipt(type, company, exec) {
  const client = company == 1 ? client1() : client2();
  console.log(client);
  if (type == "emit") {
    const [returnCode, info] = await client.generateInvoiceReceipt();
    console.log("Emitting Invoice Receipt");
    console.log(info);
    console.log(returnCode);
    const smart = await sequelize.models.Execution.findByPk(exec.id);
    smart.info = JSON.stringify(info);
    smart.stepAt += returnCode;
    await smart.save();
    return returnCode;
  } else if (type == "wait") {
    console.log("Wait not supported for Invoice Receipt");
    return 0;
  }
  console.log("ERROR: Unrecognized step type " + type);
}

async function handlePayment(type, company, exec) {
  const client = company == 1 ? client1() : client2();
  console.log(client);
  if (type == "emit") {
    //GET JSON DATA FROM FILE WITH FS
    //Access Correct endpoint with the json data
    console.log("Emiting Payment not Supported");
    return 0;
  } else if (type == "wait") {
    const [returnCode, info] = await client.getNewBuyOrder();
    console.log("Looking for Payment");
    console.log(info);
    console.log(returnCode);
    const smart = await sequelize.models.Execution.findByPk(exec.id);
    smart.info = JSON.stringify(info);
    smart.stepAt += returnCode;
    await smart.save();
    return returnCode;
  }
  console.log("ERROR: Unrecognized step type " + type);
}

async function handleReceipt(type, company, exec) {
  const client = company == 1 ? client1() : client2();
  console.log(client);
  if (type == "emit") {
    const [returnCode, info] = await client.generateSellOrder();
    console.log("Emitting Receipt");
    console.log(info);
    console.log(returnCode);
    const smart = await sequelize.models.Execution.findByPk(exec.id);
    smart.info = JSON.stringify(info);
    smart.stepAt += returnCode;
    await smart.save();
    return returnCode;
  } else if (type == "wait") {
    console.log("Wait not supported for Receipt");
    return 0;
  }
  console.log("ERROR: Unrecognized step type " + type);
}
