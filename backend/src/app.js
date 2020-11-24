const isDev = require("isdev");
if (isDev) {
  const dotenv = require("dotenv");
  dotenv.config();
}

const {
  APP_PORT,
  JWT_SECRET,
  JASMIN_APP1_KEY,
  JASMIN_APP1_SECRET,
} = process.env;
if (!JWT_SECRET || !JASMIN_APP1_KEY || !JASMIN_APP1_SECRET) {
  console.error(
    "ERROR: JWT_SECRET, JASMIN_APP1_KEY, and JASMIN_APP1_SECRET environment variables must be set"
  );
  process.exit(1);
}

// to test authentication flow
// require("./jasmin").then((authToken) =>
//   console.log(JSON.stringify(authToken.token))
// );

const koa = require("koa");
const app = new koa();

if (isDev) {
  const logger = require("koa-logger");
  app.use(new logger());
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
app.use(jwt({ secret: JWT_SECRET }).unless({ path: /^\/login$/ }));

const router = require("./router");
app.use(router.routes());

app.listen(APP_PORT || 3000);
