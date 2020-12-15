const isDev = require("isdev");
if (isDev) {
  const dotenv = require("dotenv");
  dotenv.config();
}

// check if all required environment variables have been set
const REQUIRED_ENV_VARIABLES = [
  "JWT_SECRET",
  "JASMIN_APP1_KEY",
  "JASMIN_APP1_SECRET",
  "JASMIN_ACCOUNT1",
  "JASMIN_SUBSCRIPTION1",
  "JASMIN_APP2_KEY",
  "JASMIN_APP2_SECRET",
  "JASMIN_ACCOUNT2",
  "JASMIN_SUBSCRIPTION2",
];

for (const envVar of REQUIRED_ENV_VARIABLES) {
  if (!process.env[envVar]) {
    console.error(
      `ERROR: environmental variable ${envVar} is required but has not been defined!`
    );
    const required = REQUIRED_ENV_VARIABLES.join(", ");
    console.warn(
      `WARNING: the following variables must be set:\n\t${required}`
    );
    process.exit(1);
  }
}

const koa = require("koa");
const app = new koa();

if (isDev) {
  const logger = require("koa-logger");
  app.use(new logger());
}

const { client1, client2 } = require("./jasmin");
const { sequelize } = require("./db");
(async () => {
  let [client1Docs, client2Docs] = await Promise.all([
    client1().getAllDocuments(),
    client2().getAllDocuments(),
  ]);
  client1Docs = client1Docs.map((key) => {
    return { key, company: 1 };
  });
  client2Docs = client2Docs.map((key) => {
    return { key, company: 2 };
  });
  await sequelize.models.SeenDocument.bulkCreate([
    ...client1Docs,
    ...client2Docs,
  ]);
})().then(() => {
  const processExecuter = require("./execution/executer");
  setInterval(async () => {
    const executions = await sequelize.models.Execution.findAll({
      where: { done: false },
      include: sequelize.models.Process,
    });
    const stepsToRun = await Promise.all(
      executions.map(async (execution) => {
        return await sequelize.models.ProcessStep.findOne({
          where: { processId: execution.processId, order: execution.stepAt },
        });
      })
    );

    processExecuter.runExecutions(executions, stepsToRun);
  }, 20_000);
});

const koaJson = require("koa-json");
if (isDev) {
  app.use(koaJson());
} else {
  app.use(koaJson({ pretty: false, param: "pretty-print" }));
}

const bodyParser = require("koa-bodyparser");
app.use(bodyParser());

// Custom 401 handling if you don't want to expose koa-jwt errors to users
app.use(function (ctx, next) {
  return next().catch((err) => {
    console.log(`INFO: caught unauthorized access: ${err}`);
    if (401 == err.status) {
      ctx.status = 401;
      ctx.body = "Protected resource, use Authorization header to get access\n";
    } else {
      throw err;
    }
  });
});

const jwt = require("koa-jwt");
app.use(jwt({ secret: process.env.JWT_SECRET }).unless({ path: /^\/login$/ }));

const router = require("./router");
app.use(router.routes());

app.listen(process.env.APP_PORT || 3000);
