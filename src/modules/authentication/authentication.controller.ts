import { Request, Response } from "express";

import { registerUser, loginUser } from "./authentication.service";
import { LoginUserInput, RegisterUserInput } from "./authentication.schemas";

export async function register(
  req: Request<{}, {}, RegisterUserInput>,
  res: Response
) {
  const { email, username, password } = req.body;
  try {
    const token = await registerUser(email, username, password);
    res.status(200).send({ token });
  } catch (error: any) {
    res.status(400).send({ message: error.message });
  }
}

export async function login(
  req: Request<{}, {}, LoginUserInput>,
  res: Response
) {
  const { email, password } = req.body;
  try {
    const token = await loginUser(email, password);
    res.status(200).send({ token });
  } catch (error: any) {
    res.status(400).send({ message: error.message });
  }
}
