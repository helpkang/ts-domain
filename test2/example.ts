import axios from "axios";

// example.ts
export async function fetchData(): Promise<string> {
  // fetch data from external API
  const response = await axios.get('https://example.com/data');
  const data = await response.data;

  return data;
}
