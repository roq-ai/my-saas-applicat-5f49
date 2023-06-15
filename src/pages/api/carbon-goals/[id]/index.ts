import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { carbonGoalValidationSchema } from 'validationSchema/carbon-goals';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.carbon_goal
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getCarbonGoalById();
    case 'PUT':
      return updateCarbonGoalById();
    case 'DELETE':
      return deleteCarbonGoalById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getCarbonGoalById() {
    const data = await prisma.carbon_goal.findFirst(convertQueryToPrismaUtil(req.query, 'carbon_goal'));
    return res.status(200).json(data);
  }

  async function updateCarbonGoalById() {
    await carbonGoalValidationSchema.validate(req.body);
    const data = await prisma.carbon_goal.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deleteCarbonGoalById() {
    const data = await prisma.carbon_goal.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
