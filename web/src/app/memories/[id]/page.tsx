import { Memory } from "@/components/Memory";
import { tokenName } from "@/constants/token";
import { api } from "@/lib/api";
import { Edit } from "lucide-react";

import { cookies } from "next/headers";
import Link from "next/link";

interface MemoryDetailProps {
  params: {
    id: string;
  };
}

interface MemoryProps {
  id: string;
  coverUrl: string;
  excerpt: string;
  createdAt: string;
  isPublic: boolean;
}

export default async function MemoryDetail({ params }: MemoryDetailProps) {
  const { id } = params;
  const token = cookies().get(tokenName)?.value;

  const response = await api.get<MemoryProps>(`/memories/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const memory = response.data;

  return (
    <div className="flex flex-col">
      <Link
        href={`memories/${id}/edit`}
        className=" mr-8 flex items-center gap-2 self-end rounded-full bg-gray-300 p-3 text-gray-50 hover:bg-gray-200 hover:text-gray-900 hover:transition-colors"
      >
        <Edit size={16} />
        Editar memória
      </Link>
      <Memory {...memory} isDetail />
    </div>
  );
}
