import AppError from '@shared/errors/AppError';

import FakeDebtsRepository from '@modules/debts/repositories/fakes/FakeDebtsRepository';

import UpdateDebtService from './UpdateDebtService';

let fakeDebtsRepository: FakeDebtsRepository;
let updateDebt: UpdateDebtService;

describe('UpdateDebt', () => {
  beforeEach(() => {
    fakeDebtsRepository = new FakeDebtsRepository();
    updateDebt = new UpdateDebtService(fakeDebtsRepository);
  });

  it('should be able to update a debt', async () => {
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

    const updatedDebt = await updateDebt.execute({
      id: String(debt.id),
      value: 400,
      reason: 'Updated-reason',
      date: new Date(2020, 12, 20),
      client: {
        id: 2,
        name: 'Updated-client-name',
        email: 'updated-email@example.com',
        phone: '99-11-988-11332',
      },
    });

    expect(updatedDebt.value).toBe(400);
    expect(updatedDebt.reason).toBe('Updated-reason');
    expect(updatedDebt.client.id).toBe(2);
  });

  it('should not be able to update a debt that non-existing', async () => {
    await expect(
      updateDebt.execute({
        id: 'non-existing-debt-id',
        value: 400,
        reason: 'Updated-reason',
        date: new Date(2020, 12, 20),
        client: {
          id: 2,
          name: 'Updated-client-name',
          email: 'updated-email@example.com',
          phone: '99-11-988-11332',
        },
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
