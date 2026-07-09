import { Copy, ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../services/api";
import CodeBlock from "./CodeBlock";

const ViewSnippet = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [snippet, setSnippet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSnippet = async () => {
      try {
        const response = await api.getSnippet(id);
        setSnippet(response.data);
        setError(null);
      } catch (err) {
        setError(err.message || "Failed to fetch snippet");
      } finally {
        setLoading(false);
      }
    };

    fetchSnippet();
  }, [id]);

  const handleCopy = () => {
    if (snippet?.content) {
      navigator.clipboard.writeText(snippet.content);
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

  if (!snippet) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="text-2xl text-gray-500 dark:text-gray-400">
          Snippet not found
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full py-10 max-w-[1200px] mx-auto px-5 lg:px-0">
      <div className="flex flex-col gap-y-5 items-start">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white mb-4"
        >
          <ArrowLeft size={20} />
          Back
        </button>

        <div className="w-full flex flex-row gap-x-4 justify-between items-center">
          <input
            type="text"
            placeholder="Snippet Title"
            value={snippet.title}
            readOnly
            className="w-[80%] text-black dark:text-white bg-transparent border border-input rounded-md p-2 placeholder-gray-500 dark:placeholder-gray-400"
          />
          <button
            onClick={handleCopy}
            className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <Copy size={20} />
          </button>
        </div>

        <div className="w-full p-4 border border-input rounded-md">
          <CodeBlock code={snippet.content} />
        </div>
      </div>
    </div>
  );
};

export default ViewSnippet;
