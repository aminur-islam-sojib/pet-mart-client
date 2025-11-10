import { Loader2 } from "lucide-react";

const Loading = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Loader2 className="w-8 h-8 animate-spin text-rose-500" />
      <span className="ml-2 text-gray-700">Loading...</span>
    </div>
  );
};

export default Loading;
