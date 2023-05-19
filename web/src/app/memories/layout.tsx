import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";

export default function MemoriesLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-1 flex-col gap-4">
      <div className="p-8">
        <Link
          href="/"
          className="flex cursor-pointer items-center gap-1 text-sm text-gray-200 hover:text-gray-100"
        >
          <ChevronLeft className="h-4 w-4" />
          voltar a timeline
        </Link>
      </div>

      {children}
    </div>
  );
}
