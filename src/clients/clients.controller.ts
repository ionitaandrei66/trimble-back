import {
  Controller,
  Get,
  NotFoundException,
} from '@nestjs/common';

export interface ResponseModel<T> {
  ready: boolean;
  data?: T;
}

export interface ClientModel {
  name: string;
  id: string;
  email: string;
  points: number;
}

export const clients: ClientModel[] | null = [
  {
    name: 'Andrei',
    id: '1',
    email: 'Andrei@yahoo.com',
    points: 200,
  },
  {
    name: 'Ionita',
    id: '2',
    email: 'Ionita@yahoo.com',
    points: 400,
  },
  {
    name: 'George',
    id: '3',
    email: 'George@yahoo.com',
    points: 5200,
  },
  {
    name: 'Catalin',
    id: '4',
    email: 'Catalin@yahoo.com',
    points: 2200,
  },
];

@Controller('clients')
export class ClientsController {
  private isOperationComplete = false;
  countErrors = 0;
  countTotal = 3;

  @Get('getClients')
  async getAuth(): Promise<ResponseModel<ClientModel[] | null>> {
    const bool = this.countErrors > this.countTotal;
    if (!bool) {
      this.countErrors += 1;
      throw new NotFoundException({
        ready: bool,
      });
    }
    this.countErrors = 0;
    return {
      ready: bool,
      data: clients,
    };
  }
  @Get('fetchDataForSubs')
  async fetchDataForSubs(): Promise<ResponseModel<ClientModel[] | null>> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ ready: true, data: clients });
      }, 60000);
    });
  }

  @Get('fetchDataLongPolling')
  async fetchDataLongPolling(): Promise<void> {
    new Promise(() => {
      setTimeout(() => {
        this.isOperationComplete = true;
      }, 10000);
    });
    throw new NotFoundException({
      ready: false,
    });
  }

  @Get('getStatusLongPolling')
  async getAuthLongPolling(): Promise<ResponseModel<ClientModel[] | null>> {
    if (!this.isOperationComplete) {
      throw new NotFoundException({
        ready: false,
      });
    }
    this.isOperationComplete = false;
    return {
      ready: true,
      data: clients,
    };
  }
}
