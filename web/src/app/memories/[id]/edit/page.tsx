import { NewMemoryForm } from "@/components/NewMemoryForm";
import { RegisterMemory } from "@/components/RegisterMemory";
import { tokenName } from "@/constants/token";
import { api } from "@/lib/api";
import { cookies } from "next/headers";

interface MemoryProps {
  id: string;
  coverUrl: string;
  content: string;
  createdAt: string;
  isPublic: boolean;
}

export default async function EditMemory({
  params,
}: {
  params: { id: string };
}) {
  const token = cookies().get(tokenName)?.value;

  if (!token) return <RegisterMemory />;

  const { id } = params;

  const response = await api.get<MemoryProps>(`/memories/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const memory = response.data;

  return (
    <NewMemoryForm
      initialValues={{
        content: memory.content,
        coverUrl: memory.coverUrl,
        isPublic: memory.isPublic,
        id: memory.id,
      }}
    />
  );
}
