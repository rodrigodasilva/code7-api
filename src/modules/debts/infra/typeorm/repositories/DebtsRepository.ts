import { getMongoRepository, MongoRepository } from 'typeorm';

import IDebtsRepository from '@modules/debts/repositories/IDebtsRepository';
import ICreateDebtDTO from '@modules/debts/dtos/ICreateDebtDTO';

import Debt from '@modules/debts/infra/typeorm/schemas/Debt';
import ISearchDebtsDTO from '@modules/debts/dtos/ISearchDebtsDTO';
import IResponseSearchDebtsDTO from '@modules/debts/dtos/IResponseSearchDebtsDTO';

interface IDebtsWhere {
  client_id?: number;
  reason?: RegExp;
  value?: {
    $gte: number;
    $lte: number;
  };
  date?: string;
}

class DebtsRepository implements IDebtsRepository {
  private ormRepository: MongoRepository<Debt>;

  constructor() {
    this.ormRepository = getMongoRepository(Debt, 'mongo');
  }

  public async search({
    page,
    per_page = 5,
    client_id,
    reason,
    value_min,
    value_max,
    date,
  }: ISearchDebtsDTO): Promise<IResponseSearchDebtsDTO> {
    const skip = (page - 1) * per_page;

    const debtsWhere: IDebtsWhere = {};

    if (client_id) {
      debtsWhere.client_id = client_id;
    }
    if (reason) {
      debtsWhere.reason = new RegExp(`${reason.toLowerCase()}`, 'i');
    }
    if (value_min && value_max) {
      debtsWhere.value = {
        $gte: value_min,
        $lte: value_max,
      };
    }
    if (date) {
      debtsWhere.date = date;
    }

    const [debts, totalCount] = await this.ormRepository.findAndCount({
      order: { created_at: 'DESC' },
      where: debtsWhere,
      take: per_page,
      skip,
    });

    return { debts, totalCount };
  }

  public async findById(id: string): Promise<Debt | undefined> {
    const debt = await this.ormRepository.findOne(id);

    return debt;
  }

  public async create({
    reason,
    value,
    date,
    client_id,
    client,
  }: ICreateDebtDTO): Promise<Debt> {
    const { id, name, email, phone } = client;

    const debt = this.ormRepository.create({
      reason,
      value,
      date,
      client_id,
      client: { id, name, email, phone },
    });

    await this.ormRepository.save(debt);

    return debt;
  }

  public async save(debt: Debt): Promise<Debt> {
    return this.ormRepository.save(debt);
  }

  public async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }
}

export default DebtsRepository;
