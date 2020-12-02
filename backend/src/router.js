const koaRouter = require("koa-router");

const root = new koaRouter();

const login = require("./routes/session");
root.post("/login", login);
root.get("/hello", (ctx) => {
  ctx.status = 200;
  ctx.body = "hello";
});

const { client1, client2 } = require("./jasmin");
const companyRouter = require("./routes/company");

const company1 = companyRouter(client1());
root.use("/companies/1", company1.routes(), company1.allowedMethods());

const company2 = companyRouter(client2());
root.use("/companies/2", company2.routes(), company2.allowedMethods());

const itemAssocs = require("./routes/item-association");
root.use(
  "/item-associations",
  itemAssocs.routes(),
  itemAssocs.allowedMethods()
);

module.exports = root;
