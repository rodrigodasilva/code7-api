import { injectable, inject } from 'tsyringe';

import IDebtsRepository from '@modules/debts/repositories/IDebtsRepository';
import ISearchDebtsDTO from '@modules/debts/dtos/ISearchDebtsDTO';
import IResponseSearchDebtsDTO from '../dtos/IResponseSearchDebtsDTO';

@injectable()
class SearchDebtsService {
  constructor(
    @inject('DebtsRepository')
    private debtsRepository: IDebtsRepository,
  ) {}

  async execute({
    page,
    per_page,
    client_id,
    reason,
    date,
    value_min,
    value_max,
  }: ISearchDebtsDTO): Promise<IResponseSearchDebtsDTO> {
    const { debts, totalCount } = await this.debtsRepository.search({
      page,
      per_page,
      client_id,
      reason,
      date,
      value_min,
      value_max,
    });

    return { debts, totalCount };
  }
}

export default SearchDebtsService;
