import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateDebtService from '@modules/debts/services/CreateDebtService';

export default class DebtsController {
  public async store(req: Request, res: Response): Promise<Response> {
    const { reason, value, date, client } = req.body;

    const createDebt = container.resolve(CreateDebtService);

    const debt = await createDebt.execute({
      reason,
      value,
      date,
      client,
    });

    return res.json(debt);
  }
}
