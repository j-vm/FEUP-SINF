const models = require("../jasmin/models");
const fs = require("fs");

module.exports = {
  runExecutions: async function (executions, stepsToRun) {
    const iterateStep = await Promise.all(
      executions.map(async (execution, index) => {
        if (stepsToRun[index] == null) return 0;
        return await runStep(execution, stepsToRun[index]);
      })
    );
  },
};

// return 1 if successful
function runStep(exec, step) {
  console.log(step), console.log(exec);
  let returnCode = 0;
  switch (step.documentType) {
    case "supplierInvoice":
      returnCode = handleSupplierInvoice(step.type, exec.id);
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

function handleSupplierInvoice(type, id) {
  if (type == "emit") {
    //GET JSON DATA FROM FILE WITH FS
    //Access Correct endpoint with the json data
    console.log("Emiting Supplier Invoice");
  } else if (type == "wait") {
    //Access Correct endpoint to get the json data
    //STORE JSON DATA ON FILE WITH FS
    console.log("Looking for Supplier Invoice");
  }
  console.log("ERROR: Unrecognized step type " + type);
}
