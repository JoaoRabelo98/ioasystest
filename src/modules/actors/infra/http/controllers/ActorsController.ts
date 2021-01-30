import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { classToClass } from 'class-transformer';
import CreateActorService from '@modules/actors/services/CreateActorService';

export default class ActorsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name } = request.body;

    const createActorService = container.resolve(CreateActorService);

    const actor = await createActorService.execute({
      name,
    });

    return response.json(classToClass(actor));
  }
}
