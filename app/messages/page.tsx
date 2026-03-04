import { MessageSquare } from "lucide-react";

export default function MessagesPage() {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-4 text-gray-400 py-24">
      <MessageSquare className="w-14 h-14 text-emerald-300" />
      <p className="text-2xl font-bold text-gray-700">Messages</p>
      <p className="text-sm text-gray-400">Mock page — Patient messages will appear here.</p>
    </div>
  );
}
