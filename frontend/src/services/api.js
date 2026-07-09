const API_URL = "http://localhost:3001/api/snippet";

// Helper function to handle API responses
const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Something went wrong");
  }
  // Return null for 204 responses (no content)
  if (response.status === 204) {
    return null;
  }
  return response.json();
};

// API functions
export const api = {
  // Get all snippets
  getSnippets: async () => {
    const response = await fetch(API_URL);
    return handleResponse(response);
  },

  // Get a single snippet
  getSnippet: async (id) => {
    const response = await fetch(`${API_URL}/${id}`);
    return handleResponse(response);
  },

  // Create a new snippet
  createSnippet: async (snippetData) => {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(snippetData),
    });
    return handleResponse(response);
  },

  // Update a snippet
  updateSnippet: async (id, snippetData) => {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(snippetData),
    });
    return handleResponse(response);
  },

  // Delete a snippet
  deleteSnippet: async (id) => {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });
    return handleResponse(response);
  },
};
