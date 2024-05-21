import { TestBed } from '@angular/core/testing';

import { BarbecueService } from './barbecue.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Bebida } from '../models/bebida.interface';
import { Carne } from '../models/carne.interface';

describe('BarbecueService', () => {
  let service: BarbecueService;
  let httpMock: HttpTestingController;

  const mockCarnes: Carne[] = [
    {
      id: '1',
      nome: 'Picanha',
      tipo: 'bovina',
      preco_kg: 70,
      consumo_medio_adulto_g: 300,
      consumo_medio_crianca_g: 100
    },
    {
      id: '2',
      nome: 'Frango',
      tipo: 'ave',
      preco_kg: 15,
      consumo_medio_adulto_g: 200,
      consumo_medio_crianca_g: 100
    }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BarbecueService]
    });

    service = TestBed.inject(BarbecueService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch carnes successfully', () => {
    service.getCarnes().subscribe(carnes => {
      expect(carnes).toEqual(mockCarnes);
    });

    const req = httpMock.expectOne(`${service['API_URL']}/carnes`);
    expect(req.request.method).toBe('GET');
    req.flush(mockCarnes);
  });

});
