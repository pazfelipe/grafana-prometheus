const {Router} = require("express");
const route = Router();

route.get(
  "/",
  (req, res) => res.send({message: "Connected succesfuly"}).status(200)
);
route.get(
  "/invalid-request",
  (req, res) => res.send({message: "Return 400"}).status(400)
);
route.get(
  "/not-authorized",
  (req, res) => res.send({message: "Return 401"}).status(401)
);
route.get(
  "/not-authenticated",
  (req, res) => res.send({message: "Return 403"}).status(403)
);
route.get(
  "/internal-error",
  (req, res) => res.send({message: "Return 500"}).status(500)
);
route.get(
  "/server-error",
  (req, res) => res.send({message: "Return 503"}).status(503)
);

route.get(
  "/failing",
  (req, res) => {
    const {FAILING} = undefinedVariable;
    res.send({message: "Return 200"}).status(200);
  }
);
route.get(
  "/failing-2",
  (req, res) => {
    const myConst = 10
    myConst = "a new string"
    res.send({message: "Return 200"}).status(200);
  }
);

module.exports = route;