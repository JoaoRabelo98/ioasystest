import { Request, Response } from 'express';

import { container } from 'tsyringe';
import CreateUserService from '@modules/users/services/CreateUserService';
import { classToClass } from 'class-transformer';
import UpdateUserService from '@modules/users/services/UpdateUserService';
import InactivateUserService from '@modules/users/services/InactivateUserService';

export default class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    const createUserService = container.resolve(CreateUserService);

    const userCreated = await createUserService.execute({
      email,
      password,
      name,
    });

    return response.status(201).json(classToClass(userCreated));
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
