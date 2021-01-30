import { Request, Response } from 'express';

import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';
import CreateUserAdminService from '@modules/users/services/CreateUserAdminService';

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
}
