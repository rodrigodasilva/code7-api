import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IDebtsRepository from '@modules/debts/repositories/IDebtsRepository';
import Debt from '@modules/debts/infra/typeorm/schemas/Debt';

interface IRequest {
  id: string;
  reason: string;
  value: number;
  date: Date;
  client: {
    id: number;
    name: string;
    email: string;
    phone: string;
  };
}

@injectable()
class CreateDebtService {
  constructor(
    @inject('DebtsRepository')
    private debtsRepository: IDebtsRepository,
  ) {}

  async execute({ id, reason, value, date, client }: IRequest): Promise<Debt> {
    const debt = await this.debtsRepository.findById(id);

    if (!debt) {
      throw new AppError('Debt not found');
    }

    Object.assign(debt, {
      reason,
      value,
      date,
      client,
    });

    return this.debtsRepository.save(debt);
  }
}

export default CreateDebtService;
