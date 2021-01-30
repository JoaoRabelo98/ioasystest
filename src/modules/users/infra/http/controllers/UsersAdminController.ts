import { Request, Response } from 'express';

import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';
import CreateUserAdminService from '@modules/users/services/CreateUserAdminService';
import UpdateUserService from '@modules/users/services/UpdateUserService';

export default class UsersAdminController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    const createUserAdminService = container.resolve(CreateUserAdminService);

    const adminCreated = await createUserAdminService.execute({
      email,
      password,
      name,
    });

    return response.status(201).json(classToClass(adminCreated));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { name, email } = request.body;
    const { id } = request.user;

    const updateUserService = container.resolve(UpdateUserService);

    const userCreated = await updateUserService.execute({
      id,
      email,
      name,
    });

    return response.json(classToClass(userCreated));
  }

  public async inactivate(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const inactivateUserService = container.resolve(InactivateUserService);

    await inactivateUserService.execute(id);

    return response.status(204).send();
  }
}
