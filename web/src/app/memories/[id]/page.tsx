import { Memory } from "@/components/Memory";
import { tokenName } from "@/constants/token";
import { api } from "@/lib/api";
import { cookies } from "next/headers";

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

  return <Memory {...memory} isDetail />;
}
