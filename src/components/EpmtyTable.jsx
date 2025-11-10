import { Inbox } from "lucide-react";

export default function EmptyField({
  title = "No Data Found",
  message = "There’s nothing to show here yet.",
}) {
  return (
    <div className=" min-h-screen w-full flex flex-col items-center justify-center text-center py-16 px-4">
      {/* Icon */}
      <div className="bg-rose-100 text-rose-600 p-5 rounded-full mb-4 shadow-sm">
        <Inbox size={40} />
      </div>

      {/* Text */}
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">{title}</h2>
      <p className="text-gray-500 max-w-md">{message}</p>

      {/* Optional Action Button */}
      <button className="mt-6 bg-rose-500/70 text-white px-5 py-2 rounded-lg hover:bg-rose-500 transition-all">
        Add New Item
      </button>
    </div>
  );
}
