import { API_URL } from './appConst';
type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

const apiClient = async (url: string, method: HttpMethod = 'GET', body: any | null = null, headers: HeadersInit = {}) => {
  try {
    const defaultHeaders = {
      'Content-Type': 'application/json',
      ...headers,
    };
    const options = {
      method,
      headers: defaultHeaders,
      body: body
    };
    if (body) {
      options.body = JSON.stringify(body);
    }
    const response = await fetch(`${API_URL}${url}`, options);
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('API error:', error);
    throw error;
  }
};


// GET request
export const getData = (url: string) => apiClient(url, 'GET');

// POST request
export const postData = (url: string, body: any) => apiClient(url, 'POST', body);

// PUT request
export const putData = (url: string, body: any) => apiClient(url, 'PUT', body);

// DELETE request
export const deleteData = (url: string) => apiClient(url, 'DELETE');

export default apiClient;
