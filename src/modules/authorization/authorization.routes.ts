import {Router} from 'express';

import {requestWriterRole, viewRoleRequests, updateRoleRequest} from './authorization.controller';
import {authenticate} from '../../middleware/authenticate';
import {authorize} from '../../middleware/authorize';
import {validate} from "../../middleware/validate";
import {updateRoleSchema} from "./authorization.schemas";

const router = Router();

router.post('/request-writer', [authenticate], requestWriterRole);
router.get('/role-requests', [authenticate, authorize(['ADMIN'])], viewRoleRequests);
router.post('/role-requests/:id', [validate(updateRoleSchema), authenticate, authorize(['ADMIN'])], updateRoleRequest);

export default router;