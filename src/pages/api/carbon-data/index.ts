import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { authorizationValidationMiddleware, errorHandlerMiddleware } from 'server/middlewares';
import { carbonDataValidationSchema } from 'validationSchema/carbon-data';
import { convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  switch (req.method) {
    case 'GET':
      return getCarbonData();
    case 'POST':
      return createCarbonData();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getCarbonData() {
    const data = await prisma.carbon_data
      .withAuthorization({
        roqUserId,
        tenantId: user.tenantId,
        roles: user.roles,
      })
      .findMany(convertQueryToPrismaUtil(req.query, 'carbon_data'));
    return res.status(200).json(data);
  }

  async function createCarbonData() {
    await carbonDataValidationSchema.validate(req.body);
    const body = { ...req.body };

    const data = await prisma.carbon_data.create({
      data: body,
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(authorizationValidationMiddleware(handler))(req, res);
}
