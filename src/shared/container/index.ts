import { container } from 'tsyringe';

import '@modules/users/providers';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import IDebtsRepository from '@modules/debts/repositories/IDebtsRepository';
import DebtsRepository from '@modules/debts/infra/typeorm/repositories/DebtsRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IDebtsRepository>(
  'DebtsRepository',
  DebtsRepository,
);
