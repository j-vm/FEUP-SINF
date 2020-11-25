const koaRouter = require("koa-router");

module.exports = function (client) {
  const router = new koaRouter();
  router.get("/info", async (ctx) => {
    ctx.body = await client.getCompanies();
    ctx.status = 200;
  });
  return router;
};
