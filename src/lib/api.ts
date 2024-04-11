const BASE_URL = import.meta.env.VITE_BASE_API || 'http://localhost/3000';

const API = {
  get: (url: string) => {
    return fetch(`${BASE_URL}${url}`);
  },
  post: <T>(url: string, data?: T) => {
    return fetch(`${BASE_URL}${url}`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
  },
};

export default API;
