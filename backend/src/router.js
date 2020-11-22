const koaRouter = require("koa-router");

const root = new koaRouter();

const login = require("./routes/session");
root.post("/login", login);
root.get("/hello", (ctx) => {
  ctx.status = 200;
  ctx.body = "hello";
});

module.exports = root;
