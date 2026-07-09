import { Copy } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import {
  createSnippet,
  updateSnippet,
  updateDraft,
  clearDraft,
} from "../redux/snippetSlice";

const Home = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const snippetId = searchParams.get("snippetId");
  const { snippets, loading, error, draft } = useSelector(
    (state) => state.snippet
  );
  const dispatch = useDispatch();
  const { isDarkMode } = useSelector((state) => state.theme);

  const handleSubmit = async () => {
    if (!draft.title.trim() || !draft.content.trim()) {
      toast.error("Title and content are required");
      return;
    }

    const snippetData = {
      title: draft.title.trim(),
      content: draft.content.trim(),
      date: new Date().toISOString(),
    };

    try {
      if (snippetId) {
        await dispatch(updateSnippet({ id: snippetId, snippetData })).unwrap();
        toast.success("Snippet updated successfully");
      } else {
        await dispatch(createSnippet(snippetData)).unwrap();
        toast.success("Snippet created successfully");
      }
      dispatch(clearDraft());
      setSearchParams({});
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    }
  };

  const handleCopy = () => {
    if (draft.content) {
      navigator.clipboard.writeText(draft.content);
      toast.success("Copied to Clipboard", {
        position: "top-center",
        duration: 2000,
      });
    }
  };

  useEffect(() => {
    if (snippetId) {
      const snippet = snippets.find((p) => p._id === snippetId);
      if (snippet) {
        dispatch(
          updateDraft({ title: snippet.title, content: snippet.content })
        );
      }
    }
  }, [snippetId, snippets, dispatch]);

  if (loading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="text-2xl text-gray-500 dark:text-gray-400">
          Loading...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="text-2xl text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="w-full h-full py-10 max-w-[1200px] mx-auto px-5 lg:px-0">
      <div className="flex flex-col gap-y-5 items-start">
        <div className="w-full flex flex-row gap-x-4 justify-between items-center">
          <input
            type="text"
            placeholder="Snippet Title"
            value={draft.title}
            onChange={(e) => dispatch(updateDraft({ title: e.target.value }))}
            className="w-[80%] text-black dark:text-white bg-transparent border border-input rounded-md p-2 placeholder-gray-500 dark:placeholder-gray-400"
            style={{
              caretColor: isDarkMode ? "#fff" : "#000",
            }}
          />
          <button
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading
              ? "Loading..."
              : snippetId
              ? "Update Snippet"
              : "Create Snippet"}
          </button>
        </div>

        <div className="w-full relative">
          <textarea
            placeholder="Enter your code here..."
            value={draft.content}
            onChange={(e) => dispatch(updateDraft({ content: e.target.value }))}
            className="w-full h-[400px] text-black dark:text-white bg-transparent border border-input rounded-md p-2 placeholder-gray-500 dark:placeholder-gray-400 resize-none font-mono"
            style={{
              caretColor: isDarkMode ? "#fff" : "#000",
            }}
          />
          <button
            onClick={handleCopy}
            className="absolute top-2 right-2 p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <Copy size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
