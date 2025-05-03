import jwt from "jsonwebtoken";

const JWT_KEY = process.env.JWT_KEY;

const tokenValidation = (req, res, next) => {
  try {
    let token = req.headers.authorization;
    if (!token) {
      res.status(401).send("authorization missing");
    } else {
      if (token.includes("Bearer")) token = token.split(" ")[1];

      const payload = jwt.verify(token, JWT_KEY);
      if (!payload) {
        res.status(401).send("user not authorized");
      } else {
        next();
      }
    }
  } catch (err) {
    console.log(err);
    res.send(err);
  }
};

export default tokenValidation;
