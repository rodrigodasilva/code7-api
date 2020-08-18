import { injectable, inject } from 'tsyringe';

import IDebtsRepository from '@modules/debts/repositories/IDebtsRepository';
import ICreateDebtDTO from '@modules/debts/dtos/ICreateDebtDTO';

import Debt from '@modules/debts/infra/typeorm/schemas/Debt';

@injectable()
class CreateDebtService {
  constructor(
    @inject('DebtsRepository')
    private debtsRepository: IDebtsRepository,
  ) {}

  async execute({
    reason,
    value,
    date,
    client,
  }: ICreateDebtDTO): Promise<Debt> {
    const debt = await this.debtsRepository.create({
      reason,
      value,
      date,
      client,
    });

    return debt;
  }
}

export default CreateDebtService;
