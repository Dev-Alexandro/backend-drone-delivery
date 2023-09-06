import { calcDelivery, moveCostSeconds } from '../src/controllers/delivery.controller.js';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';


let mock;

beforeEach(() => {
  mock = new MockAdapter(axios);
});

afterEach(() => {
  mock.restore();
});

describe('calcDelivery', () => {
  it('Should calculate delivery correctly', async () => {
    const start_point = 'A';
    const pickup_point = 'B';
    const deliver_point = 'C';

    const mockGraph = {
      A: { B: 1, C: 2 },
      B: { A: 1, C: 3 },
      C: { A: 2, B: 3 },
    };

    mock.onGet('https://mocki.io/v1/10404696-fd43-4481-a7ed-f9369073252f').reply(200, mockGraph);

    const req = {
      params: {
        start_point,
        pickup_point,
        deliver_point,
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await calcDelivery(req, res);

    // Add your expectations here
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      path1: expect.any(Array),
      cost1: expect.any(Number),
      path2: expect.any(Array),
      cost2: expect.any(Number),
      totalPath: expect.any(Array),
      totalCost: expect.any(Number),
    });
  });

  it('Should handle errors correctly', async () => {
    const req = {
      params: {
        start_point: 'A',
        pickup_point: 'B',
        deliver_point: 'C',
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    mock.onGet('https://mocki.io/v1/10404696-fd43-4481-a7ed-f9369073252f').reply(500);

    await calcDelivery(req, res);

    // Add your expectations here
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: expect.anything() });
  });
});

describe('moveCostSeconds', () => {
  it('Should calculate move cost correctly', () => {
    const graph = {
      A: { B: 1, C: 2 },
      B: { A: 1, C: 3 },
      C: { A: 2, B: 3 },
    };

    const path = ['A', 'B', 'C'];

    const cost = moveCostSeconds(graph, path);

    // Add your expectation for the calculated cost
    expect(cost).toBe(4); // Adjust the expected value based on your graph
  });
});