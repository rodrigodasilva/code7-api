import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IDebtsRepository from '@modules/debts/repositories/IDebtsRepository';

@injectable()
class DeleteDebtService {
  constructor(
    @inject('DebtsRepository')
    private debtsRepository: IDebtsRepository,
  ) {}

  async execute(id: string): Promise<void> {
    const debt = await this.debtsRepository.findById(id);

    if (!debt) {
      throw new AppError('Debt not found');
    }

    await this.debtsRepository.delete(id);
  }
}

export default DeleteDebtService;
