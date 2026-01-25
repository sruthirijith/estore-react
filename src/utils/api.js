import { BASE_URL } from '../config';

// Helper function to get auth headers
const getAuthHeaders = () => {
  const token = localStorage.getItem('access_token');
  return {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` })
  };
};

// API call wrapper
export const apiCall = async (endpoint, options = {}) => {
  const url = `${BASE_URL}${endpoint}`;
  const config = {
    ...options,
    headers: {
      ...getAuthHeaders(),
      ...options.headers,
    },
  };

  try {
    const response = await fetch(url, config);
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.detail?.error?.message || 'API request failed');
    }
    
    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

// Auth API functions
export const loginUser = async (email, password) => {
  return apiCall('/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
};

export const registerUser = async (userData) => {
  return apiCall('/register', {
    method: 'POST',
    body: JSON.stringify(userData),
  });
};

export const logoutUser = async () => {
  return apiCall('/user_logout', {
    method: 'POST',
  });
};

// Categories API functions
export const getCategories = async () => {
  return apiCall('/categories');
};

export const getSubcategories = async (categoryId) => {
  return apiCall(`/categories/${categoryId}/subcategories`);
};

// Products API
export const getProductsBySubcategory = async (subcategoryId) => {
  return apiCall(`/by-subcategory/${subcategoryId}`);
};

// ---------------- CART APIs ----------------

// ADD TO CART
export const addToCart = async (productId, quantity = 1) => {
  return apiCall("/cart/add", {
    method: "POST",
    body: JSON.stringify({
      product_id: productId,
      quantity: quantity,
    }),
  });
};

// GET CART
export const getCart = async () => {
  return apiCall("/cart", {
    method: "GET",
  });
};

// DELETE CART ITEM
export const deleteCartItem = async (productId) => {
  return apiCall(`/cart/item/${productId}`, {
    method: "DELETE",
  });
};
