import { injectable, inject } from 'tsyringe';

import IDebtsRepository from '@modules/debts/repositories/IDebtsRepository';

import Debt from '@modules/debts/infra/typeorm/schemas/Debt';

interface IRequest {
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

  async execute({ reason, value, date, client }: IRequest): Promise<Debt> {
    const debt = await this.debtsRepository.create({
      reason,
      value,
      date,
      client_id: client.id,
      client,
    });

    return debt;
  }
}

export default CreateDebtService;
