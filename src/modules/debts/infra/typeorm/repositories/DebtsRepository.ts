import { getMongoRepository, MongoRepository } from 'typeorm';

import IDebtsRepository from '@modules/debts/repositories/IDebtsRepository';
import ICreateDebtDTO from '@modules/debts/dtos/ICreateDebtDTO';

import Debt from '@modules/debts/infra/typeorm/schemas/Debt';

class DebtsRepository implements IDebtsRepository {
  private ormRepository: MongoRepository<Debt>;

  constructor() {
    this.ormRepository = getMongoRepository(Debt, 'mongo');
  }

  public async findById(id: string): Promise<Debt | undefined> {
    const user = await this.ormRepository.findOne(id);

    return user;
  }

  public async create({
    reason,
    value,
    date,
    client,
  }: ICreateDebtDTO): Promise<Debt> {
    const { id, name, email, phone } = client;

    const debt = this.ormRepository.create({
      reason,
      value,
      date,
      client: { id, name, email, phone },
    });

    await this.ormRepository.save(debt);

    return debt;
  }

  public async save(debt: Debt): Promise<Debt> {
    return this.ormRepository.save(debt);
  }
}

export default DebtsRepository;
