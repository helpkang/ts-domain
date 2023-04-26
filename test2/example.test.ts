// example.test.ts
import axios from 'axios';
import { fetchData } from './example';

jest.mock('axios');


export async function processData(): Promise<string> {
  const data = await fetchData();

  // process data
  const result = data.toUpperCase();

  return result;
}

test('processData function', async () => {
    const expertData = 'test data';
    (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValueOnce({ data:expertData });

  const result = await processData();

  expect(result).toEqual('TEST DATA');
});


declare const global: any;
