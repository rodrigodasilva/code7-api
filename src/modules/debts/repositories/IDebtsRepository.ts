import Debt from '@modules/debts/infra/typeorm/schemas/Debt';
import ICreateDebtDTO from '@modules/debts/dtos/ICreateDebtDTO';

export default interface IDebtsRepository {
  findById(id: string): Promise<Debt | undefined>;
  create(data: ICreateDebtDTO): Promise<Debt>;
  save(debt: Debt): Promise<Debt>;
}
