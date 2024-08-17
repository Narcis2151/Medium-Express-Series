import {PrismaClient, Role, RoleRequestStatus} from '@prisma/client';

const prisma = new PrismaClient();

export const requestRoleChange = async (userId: number, role: Role) => {
  const user = await prisma.user.findUnique({where: {id: userId}});

  if (user?.role === role) {
    throw new Error(`User is already a ${role}`);
  }

  await prisma.roleRequest.create({
    data: {
      userId,
      role,
      status: 'PENDING',
    },
  });
};

export const getRoleRequests = async () => {
  return prisma.roleRequest.findMany({where: {status: 'PENDING'}});
};

export const handleRoleRequest = async (requestId: number, status: RoleRequestStatus) => {
  const roleRequest = await prisma.roleRequest.findUnique({where: {id: requestId}});

  if (!roleRequest || roleRequest.status !== 'PENDING') {
    throw new Error('Invalid or already processed request');
  }

  if (status === RoleRequestStatus.ACCEPTED) {
    await prisma.user.update({
      where: {id: roleRequest.userId},
      data: {role: roleRequest.role},
    });
  }

  await prisma.roleRequest.update({
    where: {id: requestId},
    data: {status},
  });
};