import { container } from 'tsyringe';

import { TOKENS } from '@shared/token';
import { UserRepository } from '@repositories/user.repo';
import { IocContainer, ServiceIdentifier } from '@tsoa/runtime';
import { StorageService } from 'core/service/external';

container.register(TOKENS.UserRepository, { useToken: UserRepository });
container.register(TOKENS.StorageService, { useClass: StorageService });

export const iocContainer: IocContainer = {
  get: <T>(controller: ServiceIdentifier<T>): T => {
    return container.resolve<T>(controller as never);
  },
};
