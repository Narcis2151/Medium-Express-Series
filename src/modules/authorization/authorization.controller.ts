import {Request, Response} from 'express';
import {requestRoleChange, getRoleRequests, handleRoleRequest} from './authorization.service';
import {UpdateRoleInput} from "./authorization.schemas";

export const requestWriterRole = async (req: Request, res: Response) => {
  const userId = res.locals.user;
  try {
    await requestRoleChange(userId, 'WRITER');
    res.status(200).json({message: 'Request to become a writer submitted'});
  } catch (error: any) {
    res.status(400).json({message: error.message});
  }
};

export const viewRoleRequests = async (req: Request, res: Response) => {
  try {
    const requests = await getRoleRequests();
    res.json(requests);
  } catch (error: any) {
    res.status(400).json({message: error.message});
  }
};

export const updateRoleRequest = async (req: Request<UpdateRoleInput["params"], {}, UpdateRoleInput["body"]>, res: Response) => {
  const {id} = req.params;
  const {status} = req.body;
  try {
    await handleRoleRequest(Number(id), status);
    res.status(200).json({message: `Role request ${status}`});
  } catch (error: any) {
    res.status(400).json({message: error.message});
  }
};