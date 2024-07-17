
import { createUser, getUserByEmail } from "../service/userService.js";
import validator from "validator";
import bcrypt from 'bcrypt'
import path from 'path'
import jwt from 'jsonwebtoken';
import fs from 'fs'

const __dirname = path.resolve()

export const createNewUser = (req, res) => {
  const body = req.body;
  createUsr(body)
    .then((resp) => {
      res.status(200).send(resp);
    })
    .catch((err) => {
      res.status(200).send({ success: false, error: "Something went worng" });
    });
};

export const login = (req, res) => {
  const body = req.body;
  login_user(body)
    .then((resp) => {
      res.status(200).send(resp);
    })
    .catch((err) => {
      res.status(200).send({ success: false, error: "Something went worng" })
    })
};




const createUsr = async (body) => {
  if (
    !body.email ||
    validator.isEmpty(body.email) ||
    !validator.isEmail(body.email)
  ) {
    return { success: false, error: "Invalid Email" };
  }

  if (!body.username || validator.isEmpty(body.username)) {
    return { success: false, error: "user name is required." };
  }
  const newUser = await getUserByEmail(body.email);
  if (newUser) {
    return {
      success: false,
      error: "Sorry,there is an account with this email.",
    };
  }

  const password = body.password;
  const comfirmPassword = body.comfirmPassword;

  if (password !== comfirmPassword) {
    return { success: false, error: "Passwords did not match" };
  }

  if (password.length < 8) {
    return {
      success: false,
      error: "password must be at least 8 characters long",
    };
  }
  if (!(password.match(/[a-z]/) && password.match(/[A-Z]/))) {
    return {
      success: false,
      error: "password must  include both lower and upper case characters",
    };
  }
  if (!(password.match(/[^a-zA-Z\d]/) && password.match(/\d/))) {
    return {
      success: false,
      error: "password must be include at least one number and symbol.",
    };
  }

  body.password = bcrypt.hashSync(body.password, 10);

  try {
    const user = await createUser(body);

    return {
      success: true,
      message:"user successfully registered"
    };
  } catch (err) {
    return {
      success: false,
      error: "oops,Something went wrong. please try again.",
    };
  }
};

const login_user = async (body) => {
  const loggedUser = await getUserByEmail(body.email);


  if (!loggedUser) {
    return { success: false, error: "Email or password incorrect" };
  }

  
  const checkPassword = await checkPasswordFunc(loggedUser.password, body.password);

  if (!checkPassword) {
    return { success: false, error: "Email or password incorrect" };
  }

    const token = await signToken( loggedUser.email);
    delete loggedUser.password
    return {
      success: true,
      token,
      user: loggedUser

    };

};

const signToken = async (email, ) => {
  const _keyDir = __dirname + "/controllers/jwtRS256.key";
  const privateKey = fs.readFileSync(_keyDir);
  const token = jwt.sign({  email  }, privateKey, {
    algorithm: "RS256",
  });
  return token;
};

const checkPasswordFunc = (dbPassword, userPassword) => {
  return bcrypt.compare(userPassword, dbPassword);
};


