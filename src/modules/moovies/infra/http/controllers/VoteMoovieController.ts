import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { classToClass } from 'class-transformer';
import CreateVoteMoovieService from '@modules/moovies/services/CreateVoteMoovieService';

export default class VoteMoovieController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { moovieId, rate } = request.body;

    const createVoteMoovieService = container.resolve(CreateVoteMoovieService);

    const VoteMoovie = await createVoteMoovieService.execute({
      moovieId,
      rate,
      userId: request.user.id,
    });

    return response.json(classToClass(VoteMoovie));
  }
}
