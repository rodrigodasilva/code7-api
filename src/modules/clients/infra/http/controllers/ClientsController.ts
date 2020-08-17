import { Request, Response } from 'express';
import { container } from 'tsyringe';

import listClientsService from '@modules/clients/services/listClientsService';

export default class ClientsController {
  public async index(req: Request, res: Response): Promise<Response> {
    const listClients = container.resolve(listClientsService);

    const response = await listClients.execute();

    return res.json(response.data);
  }
}
