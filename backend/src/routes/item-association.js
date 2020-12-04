const koaRouter = require("koa-router");
const { sequelize } = require("../db");
const router = new koaRouter();

router.get("/", async (ctx) => {
  const results = await sequelize.models.ItemAssociation.findAll();
  const mapped = results.map(function (result) {
    return { company1Id: result.company1Id, company2Id: result.company2Id };
  });
  ctx.body = mapped;
  ctx.status = 200;
});

router.post("/", async (ctx) => {
  console.log(ctx.request.body);
  const { company1Id, company2Id } = ctx.request.body;
  const model = await sequelize.models.ItemAssociation.create({
    company1Id,
    company2Id,
  });
  ctx.body = { company1Id: model.company1Id, company2Id: model.company2Id };
  ctx.status = 200;
});

router.delete("/:company1Id/:company2Id", async (ctx) => {
  const { company1Id, company2Id } = ctx.params;
  const model = await sequelize.models.ItemAssociation.findOne({
    where: {
      company1Id,
      company2Id,
    },
  });
  await model.destroy();
  ctx.status = 200;
});

module.exports = router;
