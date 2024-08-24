import { Request, Response } from "express";

import { registerUser, loginUser } from "./authentication.service";

export async function register(req: Request, res: Response) {
  try {
    const token = await registerUser(req.body);
    res.status(200).send({ token });
  } catch (error: any) {
    console.error(error.message);
    res
      .status(400)
      .send({ message: "Registration failed", error: error.message });
  }
}

export async function login(req: Request, res: Response) {
  try {
    const token = await loginUser(req.body);
    res.status(200).send({ token });
  } catch (error: any) {
    console.error(error.message);
    res.status(400).send({ message: "Login failed", error: error.message });
  }
}
