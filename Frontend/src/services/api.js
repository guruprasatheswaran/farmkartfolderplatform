const BASE_URL =
  import.meta.env.VITE_API_URL || 'http://localhost:8080/api';


async function request(path, options = {}) {
  const response = await fetch(`${BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers
    },
    ...options
  });

  const body = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(
      body.message || 'Server unavailable. Please try again.'
    );
  }

  return body;
}


export const api = {

  // Get all crops
  crops: (category) =>
    request(
      `/crops${
        category
          ? `?category=${encodeURIComponent(category)}`
          : ''
      }`
    ),

  // Get one crop by ID
  crop: (id) =>
    request(`/crops/${id}`),

  // Register user
  register: (data) =>
    request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data)
    }),

  // Login user
  login: (data) =>
    request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(data)
    }),

  // Calculate profit
  calculateProfit: (data) =>
    request('/profit/calculate', {
      method: 'POST',
      body: JSON.stringify(data)
    })
};