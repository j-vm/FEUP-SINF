const models = require("../jasmin/models");
const { sequelize } = require("../db");
const { client1, client2 } = require("../jasmin/index");

module.exports = {
  runExecutions: async function (executions, stepsToRun) {
    await Promise.all(
      executions.map(async (execution, index) => {
        if (stepsToRun[index] == null) {
          execution.done = true;
          await execution.save();
          return;
        }
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
  return;
}

async function handleBuyOrder(type, company, exec) {
  const client = company == 1 ? client1() : client2();
  console.log(client);
  if (type == "emit") {
    console.log("Emiting Buy Order not Supported");
    return 0;
  } else if (type == "wait") {
    const [returnCode, info] = await client.getNewBuyOrder();
    console.log("Looking for BuyOrder");
    console.log(info);
    console.log(returnCode);
    const smart = await sequelize.models.Execution.findByPk(exec.id);
    smart.info = JSON.stringify({ buyOrder: info });
    smart.stepAt += returnCode;
    await smart.save();
    return;
  }
  console.log("ERROR: Unrecognized step type " + type);
}

async function handleSellOrder(type, company, exec) {
  const client = company == 1 ? client1() : client2();
  console.log(client);
  if (type == "emit") {
    const info = JSON.parse(exec.info);
    const [returnCode, sellOrderId] = await client.generateSellOrder(
      info.buyOrder
    );
    console.log("Emitted SellOrder");
    if (returnCode == 1) {
      info.sellOrder = sellOrderId;
      exec.stepAt = exec.stepAt + 1;
      exec.info = JSON.stringify(info);
      await exec.save();
    }
    return returnCode;
  } else if (type == "wait") {
    console.log("Wait not supported for sell order");
    return;
  }
  console.log("ERROR: Unrecognized step type " + type);
}

async function handleDeliveryNote(type, company, exec) {
  const client = company == 1 ? client1() : client2();
  console.log(client);
  if (type == "emit") {
    console.log("Emiting Delivery Note not Supported");
    return 0;
  } else if (type == "wait") {
    const info = JSON.parse(exec.info);
    console.log(info.sellOrder.naturalKey);
    const [returnCode, deliveryNote] = await client.getDeliveryNote(
      info.sellOrder.naturalKey
    );
    console.log(returnCode);
    if (returnCode == 0) return 0;
    console.log("Looking for Delivery Note");
    console.log(deliveryNote);
    console.log(returnCode);
    const smart = await sequelize.models.Execution.findByPk(exec.id);
    info.deliveryNote = deliveryNote;
    smart.info = JSON.stringify(info);
    smart.stepAt += 1;
    await smart.save();
    return returnCode;
  }
  console.log("ERROR: Unrecognized step type " + type);
}

async function handleOrderReceipt(type, company, exec) {
  const client = company == 1 ? client1() : client2();
  console.log(client);
  if (type == "emit") {
    const info = JSON.parse(exec.info);
    const [returnCode, orderReceiptId] = await client.generateOrderReceipt(
      info.buyOrder
    );
    console.log("Emitted order receipt");
    if (returnCode == 1) {
      info.orderReceipt = orderReceiptId;
      exec.stepAt = exec.stepAt + 1;
      exec.info = JSON.stringify(info);
      await exec.save();
    }
    return returnCode;
  } else if (type == "wait") {
    console.log("Wait not supported for order receipt");
    return;
  }
  console.log("ERROR: Unrecognized step type " + type);
}

async function handleInvoice(type, company, exec) {
  const client = company == 1 ? client1() : client2();
  console.log(client);
  if (type == "emit") {
    console.log("Emiting Invoice not Supported");
    return 0;
  } else if (type == "wait") {
    const info = JSON.parse(exec.info);
    console.log("Looking for Invoice");
    console.log(info.deliveryNote.naturalKey);
    const [returnCode, invoice] = await client.getInvoice(
      info.deliveryNote.naturalKey
    );
    if (returnCode == 0) return 0;
    console.log(invoice);
    console.log(returnCode);
    const smart = await sequelize.models.Execution.findByPk(exec.id);
    info.invoice = invoice;
    smart.info = JSON.stringify(info);
    smart.stepAt += 1;
    await smart.save();
    return returnCode;
  }
  console.log("ERROR: Unrecognized step type " + type);
}

async function handleInvoiceReceipt(type, company, exec) {
  const client = company == 1 ? client1() : client2();
  console.log(client);
  if (type == "emit") {
    const info = JSON.parse(exec.info);
    const [returnCode, invoiceReceiptId] = await client.generateInvoiceReceipt(
      info.orderReceipt,
      info.buyOrder
    );
    console.log("Emitted invoice receipt");
    if (returnCode == 1) {
      info.invoiceReceipt = invoiceReceiptId;
      exec.stepAt = exec.stepAt + 1;
      exec.info = JSON.stringify(info);
      await exec.save();
    }
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
    console.log("Emitting payment not supported");
    return 0;
  } else if (type == "wait") {
    const info = JSON.parse(exec.info);
    console.log("Looking for payment");
    const [returnCode, payment] = await client.getPayment(info.orderReceipt);
    if (returnCode == 0) return 0;
    console.log(payment);
    console.log(returnCode);
    const smart = await sequelize.models.Execution.findByPk(exec.id);
    info.payment = payment;
    smart.info = JSON.stringify(info);
    smart.stepAt += 1;
    await smart.save();
    return returnCode;
  }
  console.log("ERROR: Unrecognized step type " + type);
}

async function handleReceipt(type, company, exec) {
  const client = company == 1 ? client1() : client2();
  console.log(client);
  if (type == "emit") {
    const info = JSON.parse(exec.info);
    const [returnCode, paymentReceiptId] = await client.generateReceipt(
      info.invoice
    );
    console.log("Emitted payment receipt");
    if (returnCode == 1) {
      info.paymentReceipt = paymentReceiptId;
      exec.stepAt = exec.stepAt + 1;
      exec.info = JSON.stringify(info);
      await exec.save();
    }
    return returnCode;
  } else if (type == "wait") {
    console.log("Wait not supported for Receipt");
    return 0;
  }
  console.log("ERROR: Unrecognized step type " + type);
}
