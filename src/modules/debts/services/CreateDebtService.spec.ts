import FakeDebtsRepository from '@modules/debts/repositories/fakes/FakeDebtsRepository';

import CreateDebtService from './CreateDebtService';

let fakeDebtsRepository: FakeDebtsRepository;
let createDebt: CreateDebtService;

describe('CreateDebt', () => {
  beforeEach(() => {
    fakeDebtsRepository = new FakeDebtsRepository();

    createDebt = new CreateDebtService(fakeDebtsRepository);
  });

  it('should be able to create a new debt', async () => {
    const debt = await createDebt.execute({
      value: 100.4,
      reason: 'Emprestimo pessoal',
      date: new Date(2020, 4, 10),
      client: {
        id: 1,
        name: 'Leanne Graham',
        email: 'Sincere@april.biz',
        phone: '1-770-736-8031 x56442',
      },
    });

    expect(debt).toHaveProperty('id');
  });
});
