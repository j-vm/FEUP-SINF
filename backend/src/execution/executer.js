const models = require("../jasmin/models");
const { sequelize } = require("../db");
const { client1, client2 } = require("../jasmin/index");

module.exports = {
  runExecutions: async function (executions, stepsToRun) {
    const iterateStep = await Promise.all(
      executions.map(async (execution, index) => {
        if (stepsToRun[index] == null) return 0;
        return await runStep(execution, stepsToRun[index]);
      })
    );
    for (let index = 0; index < iterateStep.length; index++) {
      if(iterateStep[index]){
        //In database increment stepAt or toggle done
      }
    }
  },
};

// return 1 if successful
async function runStep(exec, step) {
  console.log(step), console.log(exec);
  let returnCode = 0;
  switch (step.documentType) {
    case "clientInvoice":
      returnCode = await handleBuyOrder(step.type, step.company);
      break;
    case "docB":
      //TODO: returnCode = docB(step.type, exec.id)
      break;
    case "docC":
      //TODO: returnCode = docC(step.type, exec.id)
      break;

    default:
      console.log("ERROR: Unrecognized Document type " + step.documentType);
      return 1;
  }
  return returnCode;
}

async function handleBuyOrder(type, company) {
  const client = company == 1 ? (client1()):(client2())
  console.log(client)
  if (type == "emit") {
    //GET JSON DATA FROM FILE WITH FS
    //Access Correct endpoint with the json data
    console.log("Emiting Supplier Invoice");
  } else if (type == "wait") {
    let info;
    let returnCode;
    returnCode, info = await client.getBuyOrder();
    console.log("Looking for Supplier Invoice");
    console.log(info);
    console.log(returnCode);
    //STORE JSON DATA ON FILE WITH FS
    return returnCode;
  }
  console.log("ERROR: Unrecognized step type " + type);
}
