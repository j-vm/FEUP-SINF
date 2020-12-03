const SecurePassword = require("secure-password");

const pwd = new SecurePassword();

const { sequelize } = require("../db");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;

module.exports = async function (ctx) {
  const { username, password } = ctx.request.body;
  try {
    const user = await sequelize.models.User.findOne({
      where: { username },
    });
    const pw = user.hashedPassword;
    const result = await pwd.verify(Buffer.from(password), pw);
    switch (result) {
      case SecurePassword.VALID_NEEDS_REHASH:
        try {
          const reHash = await pwd.hash(Buffer.from(password));
          user.hashedPassword = reHash;
          user.save();
        } catch (e) {
          console.warn(
            `WARNING: could not rehash password for user ${username} successfully`
          );
        }
      case SecurePassword.VALID:
        ctx.status = 200;
        ctx.body = {
          token: jwt.sign(
            {
              username,
            },
            JWT_SECRET,
            {
              expiresIn: "1 week",
            }
          ),
        };
        break;
      default:
        throw new Error();
    }
  } catch (e) {
    console.error(e);
    ctx.status = 401;
  }
};
