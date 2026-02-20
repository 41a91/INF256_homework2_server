import { Router } from "express";
import { comparePasswords, validatePasswords } from "../utils/passwords.js";
import {
  getOtherUsers,
  getUserByName,
  registerUser,
} from "../controllers/user.js";
import { generateJWT } from "../utils/jwt.js";
import { authenticate } from "../middleware/auth.js";

const router = Router();

router.post("/register", async (req, res) => {
  //Need to register a user, the username must be unique
  const name: string | undefined = req.body.name;
  const password: string | undefined = req.body.password;
  const password2: string | undefined = req.body.password2;

  if (name && password && password2) {
    const exists = await getUserByName(name);
    if (!exists) {
      if (comparePasswords(password, password2)) {
        const created = await registerUser(name, password);
        if (created) {
          res.json({ status: "success", data: { name: name } });
        } else {
          res
            .status(500)
            .send(`Something went wrong while creating a new user: ${name}`);
        }
      } else {
        res
          .status(400)
          .send(
            `Your provided password does not match the complexity requirements`,
          );
      }
    } else {
      res.status(400).send(`An account with that name already exists`);
    }
  } else {
    res
      .status(400)
      .send(`Please provide all the required data for registering an account`);
  }
});

router.post("/", async (req, res) => {
  //Route for logging a user in
  const name: string | undefined = req.body.name;
  const password: string | undefined = req.body.password;

  if (name && password) {
    const exists = await getUserByName(name);
    if (exists) {
      if (await validatePasswords(password, exists.password.toString("utf8"))) {
        //Need to setup the authentication here
        const token = await generateJWT({ id: exists.id, name: exists.name });
        res.json({ status: "success", data: { token, user: { name } } });
      } else {
        res.status(400).send(`Invalid username or password`);
      }
    } else {
      res.status(400).send(`Invalid username or password`);
    }
  } else {
    res.status(400).send(`Please provide all the required data for logging in`);
  }
});

router.get("/chatters", authenticate, async (req, res) => {
  if (req.user) {
    //Need to get all chatters other than the logged in user
    const users = await getOtherUsers(req.user.id);
    res.json({ status: "success", data: { users } });
  } else {
    res.status(500).send("Somehow got past auth without setting the user data");
  }
});

export default router;
