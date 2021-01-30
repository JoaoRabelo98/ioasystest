import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { classToClass } from 'class-transformer';
import CreateMoovieService from '@modules/moovies/services/CreateMoovieService';

export default class MooviesController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { actors, director, genre, name } = request.body;

    const createMoovieService = container.resolve(CreateMoovieService);

    const moovie = await createMoovieService.execute({
      actors,
      director,
      genre,
      name,
    });

    return response.json(classToClass(moovie));
  }
}
