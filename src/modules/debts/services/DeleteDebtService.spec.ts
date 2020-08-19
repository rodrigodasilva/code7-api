import AppError from '@shared/errors/AppError';

import FakeDebtsRepository from '@modules/debts/repositories/fakes/FakeDebtsRepository';

import DeleteDebtService from './DeleteDebtService';

let fakeDebtsRepository: FakeDebtsRepository;
let deleteDebt: DeleteDebtService;

describe('DeleteDebt', () => {
  beforeEach(() => {
    fakeDebtsRepository = new FakeDebtsRepository();
    deleteDebt = new DeleteDebtService(fakeDebtsRepository);
  });

  it('should be able to delete a debt', async () => {
    const debt = await fakeDebtsRepository.create({
      value: 100.4,
      reason: 'Emprestimo pessoal',
      date: new Date(2020, 4, 10),
      client_id: 1,
      client: {
        id: 1,
        name: 'Leanne Graham',
        email: 'Sincere@april.biz',
        phone: '1-770-736-8031 x56442',
      },
    });

    expect(await deleteDebt.execute(String(debt.id))).toBeUndefined();
  });

  it('should not be able to delete a debt that non-existing', async () => {
    await expect(
      deleteDebt.execute('non-existing-debt-id'),
    ).rejects.toBeInstanceOf(AppError);
  });
});
