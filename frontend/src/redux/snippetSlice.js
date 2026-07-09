import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../services/api";

// Async thunks
export const fetchSnippets = createAsyncThunk(
  "snippet/fetchSnippets",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.getSnippets();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createSnippet = createAsyncThunk(
  "snippet/createSnippet",
  async (snippetData, { rejectWithValue }) => {
    try {
      const response = await api.createSnippet(snippetData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateSnippet = createAsyncThunk(
  "snippet/updateSnippet",
  async ({ id, snippetData }, { rejectWithValue }) => {
    try {
      const response = await api.updateSnippet(id, snippetData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteSnippet = createAsyncThunk(
  "snippet/deleteSnippet",
  async (id, { rejectWithValue }) => {
    try {
      await api.deleteSnippet(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  snippets: [],
  loading: false,
  error: null,
  draft: {
    title: "",
    content: "",
  },
};

const snippetSlice = createSlice({
  name: "snippet",
  initialState,
  reducers: {
    resetSnippet: (state) => {
      state.snippets = [];
      state.loading = false;
      state.error = null;
    },
    updateDraft: (state, action) => {
      state.draft = {
        ...state.draft,
        ...action.payload,
      };
    },
    clearDraft: (state) => {
      state.draft = {
        title: "",
        content: "",
      };
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch snippets
      .addCase(fetchSnippets.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSnippets.fulfilled, (state, action) => {
        state.loading = false;
        state.snippets = action.payload;
      })
      .addCase(fetchSnippets.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create snippet
      .addCase(createSnippet.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createSnippet.fulfilled, (state, action) => {
        state.loading = false;
        state.snippets.push(action.payload);
        state.draft = { title: "", content: "" }; // Clear draft after successful creation
      })
      .addCase(createSnippet.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update snippet
      .addCase(updateSnippet.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateSnippet.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.snippets.findIndex(
          (s) => s._id === action.payload._id
        );
        if (index !== -1) {
          state.snippets[index] = action.payload;
        }
        state.draft = { title: "", content: "" }; // Clear draft after successful update
      })
      .addCase(updateSnippet.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete snippet
      .addCase(deleteSnippet.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteSnippet.fulfilled, (state, action) => {
        state.loading = false;
        state.snippets = state.snippets.filter((s) => s._id !== action.payload);
      })
      .addCase(deleteSnippet.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetSnippet, updateDraft, clearDraft } = snippetSlice.actions;
export default snippetSlice.reducer;
