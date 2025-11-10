import { useNavigate } from "react-router";

const EmptyReload = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center h-[60vh] text-gray-500">
      <img
        src="https://cdn-icons-png.flaticon.com/512/4076/4076502.png"
        alt="No Products"
        className="w-32 mb-4 opacity-70"
      />
      <p className="text-lg font-medium">No Products Available</p>
      <button
        onClick={() => navigate(0)}
        className="mt-4 px-5 py-2 cursor-pointer rounded-full bg-indigo-600 text-white hover:bg-indigo-700 transition"
      >
        Browse Again
      </button>
    </div>
  );
};

export default EmptyReload;
