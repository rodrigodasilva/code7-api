import { uuid } from 'uuidv4';

import IDebtsRepository from '@modules/debts/repositories/IDebtsRepository';
import ICreateDebtDTO from '@modules/debts/dtos/ICreateDebtDTO';
import Debt from '@modules/debts/infra/typeorm/schemas/Debt';
import IResponseSearchDebtsDTO from '@modules/debts/dtos/IResponseSearchDebtsDTO';

class DebtsRepository implements IDebtsRepository {
  private debts: Debt[] = [];

  public async search(): Promise<IResponseSearchDebtsDTO> {
    return { debts: this.debts, totalCount: this.debts.length };
  }

  public async findById(id: string): Promise<Debt | undefined> {
    const findDebt = this.debts.find(debt => String(debt.id) === id);

    return findDebt;
  }

  public async create({
    reason,
    value,
    date,
    client,
  }: ICreateDebtDTO): Promise<Debt> {
    const { id, name, email, phone } = client;

    const debt = new Debt();

    Object.assign(debt, {
      id: uuid(),
      reason,
      value,
      date,
      client: { id, name, email, phone },
    });

    this.debts.push(debt);

    return debt;
  }

  public async save(debt: Debt): Promise<Debt> {
    const findIndex = this.debts.findIndex(findDebt => findDebt.id === debt.id);

    this.debts[findIndex] = debt;

    return debt;
  }
}

export default DebtsRepository;
