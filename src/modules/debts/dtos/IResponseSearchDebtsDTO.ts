import Debt from '@modules/debts/infra/typeorm/schemas/Debt';

export default interface IResponseSearchDebtsDTO {
  debts: Debt[];
  totalCount: number;
}
