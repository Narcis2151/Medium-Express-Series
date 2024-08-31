import { Request, Response } from "express";

import {
  requestRoleChange,
  getRoleRequests,
  handleRoleRequest,
} from "./authorization.service";
import { UpdateRoleRequestInput } from "./authorization.schemas";

export async function requestWriterRole(req: Request, res: Response) {
  const userId = res.locals.user;
  try {
    await requestRoleChange(userId, "WRITER");
    res.status(200).send({ message: "Request to become a writer submitted" });
  } catch (error: any) {
    res.status(400).send({ message: error.message });
  }
}

export async function viewRoleRequests(req: Request, res: Response) {
  try {
    const requests = await getRoleRequests();
    res.send(requests);
  } catch (error: any) {
    res.status(400).send({ message: error.message });
  }
}

export async function updateRoleRequest(
  req: Request<
    UpdateRoleRequestInput["params"],
    {},
    UpdateRoleRequestInput["body"]
  >,
  res: Response,
) {
  const { id } = req.params;
  const { status } = req.body;
  try {
    await handleRoleRequest(Number(id), status);
    res.status(200).send({ message: `Role request ${status}` });
  } catch (error: any) {
    res.status(400).send({ message: error.message });
  }
}
