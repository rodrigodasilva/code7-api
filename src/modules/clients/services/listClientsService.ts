import axios, { AxiosResponse } from 'axios';

class ListClientsService {
  public async execute(): Promise<AxiosResponse> {
    const clients = await axios.get(
      'https://jsonplaceholder.typicode.com/users',
    );

    return clients;
  }
}

export default ListClientsService;
