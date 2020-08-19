import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateDebtService from '@modules/debts/services/CreateDebtService';
import UpdateDebtService from '@modules/debts/services/UpdateDebtService';
import SearchDebtsService from '@modules/debts/services/SearchDebtsService';
import DeleteDebtService from '@modules/debts/services/DeleteDebtService';

export default class DebtsController {
  public async index(req: Request, res: Response): Promise<Response> {
    const {
      page = 1,
      per_page = 10,
      client_id,
      reason = '',
      date = '',
      value_min,
      value_max,
    } = req.query;

    const searchDebts = container.resolve(SearchDebtsService);

    const parsedPageToNumber = Number(page);
    const parsedPerPageToNumber = Number(per_page);

    const { debts, totalCount } = await searchDebts.execute({
      page: parsedPageToNumber,
      per_page: parsedPerPageToNumber,
      client_id: Number(client_id),
      reason: String(reason),
      date: String(date),
      value_min: Number(value_min),
      value_max: Number(value_max),
    });

    res.header('X-Total-Count', String(totalCount));
    res.header(
      'X-Total-Page',
      String(Math.ceil(totalCount / Number(parsedPerPageToNumber))),
    );

    return res.json(debts);
  }

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

  public async update(req: Request, res: Response): Promise<Response> {
    const { id, reason, value, date, client } = req.body;

    const updateDebt = container.resolve(UpdateDebtService);

    const debt = await updateDebt.execute({
      id,
      reason,
      value,
      date,
      client,
    });

    return res.json(debt);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const deleteDebt = container.resolve(DeleteDebtService);

    await deleteDebt.execute(id);

    return res.send();
  }
}
