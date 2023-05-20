import { Memory } from "@/components/Memory";
import { RegisterMemory } from "@/components/RegisterMemory";
import { tokenName } from "@/constants/token";
import { api } from "@/lib/api";
import { cookies } from "next/headers";

interface MemoryProps {
  id: string;
  coverUrl: string;
  excerpt: string;
  createdAt: string;
  isPublic: boolean;
}

export const cache = "no-store";

export default async function Home() {
  const isAuthenticated = cookies().has(tokenName);

  if (!isAuthenticated) {
    return <RegisterMemory />;
  }

  const token = cookies().get(tokenName)?.value;
  const response = await api.get<MemoryProps[]>("/memories", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const memories = response.data;

  if (memories.length === 0) return <RegisterMemory />;

  return (
    <div className="flex flex-col gap-10">
      {memories.map((memory) => (
        <Memory key={memory.id} {...memory} />
      ))}
    </div>
  );
}
