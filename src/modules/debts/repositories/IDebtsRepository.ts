import Debt from '@modules/debts/infra/typeorm/schemas/Debt';
import ICreateDebtDTO from '@modules/debts/dtos/ICreateDebtDTO';
import ISearchDebtsDTO from '@modules/debts/dtos/ISearchDebtsDTO';
import IResponseSearchDebtsDTO from '@modules/debts/dtos/IResponseSearchDebtsDTO';

export default interface IDebtsRepository {
  search(data: ISearchDebtsDTO): Promise<IResponseSearchDebtsDTO>;
  findById(id: string): Promise<Debt | undefined>;
  create(data: ICreateDebtDTO): Promise<Debt>;
  save(debt: Debt): Promise<Debt>;
  delete(id: string): Promise<void>;
}
