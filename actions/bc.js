const bycrypt = require("bcrypt");

const hashPass = async (password) => {
  try {
    const result = await bycrypt.hash(password, 10);
    return result;
  } catch (err) {
    console.log(err);
  }
};

const comparePass = async (password, hash) => {
  try {
    const result = await bycrypt.compare(password, hash);
    return result;
  } catch (err) {
    console.log(err);
  }
};


// hashPass("123456");
const main = async () => {

r = await comparePass("123456", "$2b$10$4c.4PVFz8DMdDS.cCkdnN.iFldp/UytL6U73O6kKeBt.IHBhc/UiW")
console.log(r);
}

main()