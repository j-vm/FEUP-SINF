const koaRouter = require("koa-router");
const router = new koaRouter();

const { sequelize } = require("../db");

const processExecuter = require("../execution/executer");

router.get("/", async (ctx) => {
  const results = await sequelize.models.Process.findAll({
    include: sequelize.models.ProcessStep,
  });

  ctx.body = results.map((result) => {
    return {
      id: result.id,
      name: result.name,
      numberSteps: result.ProcessSteps.length,
    };
  });
  ctx.status = 200;
});

router.post("/", async (ctx) => {
  const { name } = ctx.request.body;
  const model = await sequelize.models.Process.create({
    name,
  });
  ctx.body = { name: model.name, id: model.id, numberSteps: 0 };
  ctx.status = 200;
});

router.get("/:id/steps", async (ctx) => {
  const results = await sequelize.models.ProcessStep.findAll({
    where: { processId: ctx.params.id },
  });

  ctx.body = results.map((result) => {
    return {
      order: result.order,
      id: result.processId,
      company: result.company,
      type: result.type,
      docType: result.documentType,
    };
  });
  ctx.status = 200;
});

router.post("/:id/steps", async (ctx) => {
  const { order, type, documentType, company } = ctx.request.body;
  const model = await sequelize.models.ProcessStep.create({
    order,
    processId: ctx.params.id,
    type,
    documentType,
    company,
  });
  ctx.body = {
    order: model.order,
    type: model.type,
    documentType: model.documentType,
    company: model.company,
  };
  ctx.status = 200;
});

router.get("/executions", async (ctx) => {
  const results = await sequelize.models.Execution.findAll({
    include: sequelize.models.Process,
  });

  const processNames = await Promise.all(
    results.map(async (result) => {
      return (
        await sequelize.models.Process.findOne({
          where: { id: result.processId },
        })
      ).name;
    })
  );

  ctx.body = results.map((result, i) => {
    return {
      id: processNames[i],
      name: result.name,
      info: result.info,
      stepAt: result.stepAt,
      finished: result.finished,
      done: result.done,
    };
  });
  ctx.status = 200;
});

router.post("/executions", async (ctx) => {
  const { processId } = ctx.request.body;
  const model = await sequelize.models.Execution.create({
    processId,
    stepAt: 0,
    info: "{}",
    finished: false,
    done: false,
  });
  ctx.body = {
    processId: model.processId,
    stepAt: model.stepAt,
    finished: model.finished,
    done: model.done,
  };
  ctx.status = 200;
});

router.post("/test", async (ctx) => {
  const executions = await sequelize.models.Execution.findAll({
    where: { done: false },
    include: sequelize.models.Process,
  });
  console.log("EXECUTION:" + executions);
  const stepsToRun = await Promise.all(
    executions.map(async (execution) => {
      return await sequelize.models.ProcessStep.findOne({
        where: { processId: execution.processId, order: execution.stepAt },
      });
    })
  );

  processExecuter.runExecutions(executions, stepsToRun);

  ctx.body = stepsToRun;
  ctx.status = 200;
});

module.exports = router;
