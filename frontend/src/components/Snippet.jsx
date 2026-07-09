import { Calendar, Copy, Edit, Eye, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { fetchSnippets, deleteSnippet } from "../redux/snippetSlice";
import { FormatDate } from "../utlis/formatDate";

const Snippet = () => {
  const { snippets, loading, error } = useSelector((state) => state.snippet);
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchSnippets());
  }, [dispatch]);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this snippet?")) {
      try {
        await dispatch(deleteSnippet(id)).unwrap();
        toast.success("Snippet deleted successfully");
      } catch (error) {
        toast.error(error.message || "Failed to delete snippet");
      }
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  const handleCopy = (content) => {
    if (content) {
      navigator.clipboard.writeText(content);
      toast.success("Copied to Clipboard", {
        position: "top-center",
        duration: 2000,
      });
    }
  };

  const filteredSnippets = snippets.filter((snippet) =>
    snippet.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
      <div className="flex flex-col gap-y-3">
        {/* Search */}
        <div className="w-full flex gap-3 px-4 py-2 rounded-[0.3rem] border border-[rgba(128,121,121,0.3)] mt-6">
          <input
            type="search"
            placeholder="Search snippets..."
            className="focus:outline-none w-full bg-transparent text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              Clear
            </button>
          )}
        </div>

        {/* All Snippets */}
        <div className="flex flex-col border border-[rgba(128,121,121,0.3)] py-4 rounded-[0.4rem]">
          <div className="px-4 flex justify-between items-center border-b border-[rgba(128,121,121,0.3)] pb-4">
            <h2 className="text-4xl font-bold text-black dark:text-white">
              All Snippets
            </h2>
            <Link
              to="/create"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Create New Snippet
            </Link>
          </div>
          <div className="w-full px-4 pt-4 flex flex-col gap-y-5">
            {filteredSnippets.length > 0 ? (
              filteredSnippets.map((snippet) => (
                <div
                  key={snippet?._id}
                  className="border border-[rgba(128,121,121,0.3)] w-full gap-y-6 justify-between flex flex-col sm:flex-row p-4 rounded-[0.3rem]"
                >
                  {/* heading and Description */}
                  <div className="w-[50%] flex flex-col space-y-3">
                    <p className="text-4xl font-semibold text-black dark:text-white">
                      {snippet?.title}
                    </p>
                    <p className="text-sm font-normal line-clamp-3 max-w-[80%] text-gray-600 dark:text-gray-300">
                      {snippet?.content}
                    </p>
                  </div>

                  {/* icons */}
                  <div className="flex flex-col gap-y-4 sm:items-end">
                    <div className="flex gap-2 flex-wrap sm:flex-nowrap">
                      <button
                        className="p-2 rounded-[0.2rem] bg-white dark:bg-gray-800 border border-[#c7c7c7] hover:bg-transparent group hover:border-blue-500"
                        onClick={() => handleEdit(snippet?._id)}
                      >
                        <Edit
                          className="text-black dark:text-white group-hover:text-blue-500"
                          size={20}
                        />
                      </button>
                      <button
                        className="p-2 rounded-[0.2rem] bg-white dark:bg-gray-800 border border-[#c7c7c7] hover:bg-transparent group hover:border-red-500"
                        onClick={() => handleDelete(snippet?._id)}
                      >
                        <Trash2
                          className="text-black dark:text-white group-hover:text-red-500"
                          size={20}
                        />
                      </button>
                      <Link
                        to={`/snippet/${snippet?._id}`}
                        className="p-2 rounded-[0.2rem] bg-white dark:bg-gray-800 border border-[#c7c7c7] hover:bg-transparent group hover:border-orange-500"
                      >
                        <Eye
                          className="text-black dark:text-white group-hover:text-orange-500"
                          size={20}
                        />
                      </Link>
                      <button
                        className="p-2 rounded-[0.2rem] bg-white dark:bg-gray-800 border border-[#c7c7c7] hover:bg-transparent group hover:border-green-500"
                        onClick={() => handleCopy(snippet?.content)}
                      >
                        <Copy
                          className="text-black dark:text-white group-hover:text-green-500"
                          size={20}
                        />
                      </button>
                    </div>

                    <div className="gap-x-2 flex text-black dark:text-white">
                      <Calendar size={20} />
                      {FormatDate(snippet?.date)}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-2xl text-center w-full text-gray-600 dark:text-gray-300">
                No Snippets Found
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Snippet;
