import { Copy } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { updateSnippet } from "../redux/snippetSlice";

const EditSnippet = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { snippets, loading, error } = useSelector((state) => state.snippet);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { isDarkMode } = useSelector((state) => state.theme);

  useEffect(() => {
    const snippet = snippets.find((s) => s._id === id);
    if (snippet) {
      setTitle(snippet.title);
      setContent(snippet.content);
    }
  }, [id, snippets]);

  const handleSubmit = async () => {
    if (!title.trim() || !content.trim()) {
      toast.error("Title and content are required");
      return;
    }

    const snippetData = {
      title: title.trim(),
      content: content.trim(),
      date: new Date().toISOString(),
    };

    try {
      await dispatch(updateSnippet({ id, snippetData })).unwrap();
      toast.success("Snippet updated successfully");
      navigate("/snippets");
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    }
  };

  const handleCopy = () => {
    if (content) {
      navigator.clipboard.writeText(content);
      toast.success("Copied to Clipboard", {
        position: "top-center",
        duration: 2000,
      });
    }
  };

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
            value={title}
            onChange={(e) => setTitle(e.target.value)}
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
            {loading ? "Loading..." : "Update Snippet"}
          </button>
        </div>

        <div className="w-full relative">
          <textarea
            placeholder="Enter your code here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
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

export default EditSnippet;
