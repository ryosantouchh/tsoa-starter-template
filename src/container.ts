import { container } from 'tsyringe';

import { UserRepository } from '@repositories/user.repo';
import { IocContainer, ServiceIdentifier } from '@tsoa/runtime';
import { TOKENS } from '@shared/token';

container.register(TOKENS.UserRepository, { useToken: UserRepository });

export const iocContainer: IocContainer = {
  get: <T>(controller: ServiceIdentifier<T>): T => {
    return container.resolve<T>(controller as never);
  },
};
