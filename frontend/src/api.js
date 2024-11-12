import axios from 'axios';

const API_URL = 'http://localhost:8000';

export async function fetchProductPrices() {
  try {
    const response = await axios.get(`${API_URL}/prices`);
    return response.data;
  } catch (error) {
    console.error('Error fetching product prices:', error);
    return [];
  }
}
