"use client";

import { Camera } from "lucide-react";
import { MediaPicker } from "./MediaPicker";
import { FormEvent } from "react";
import { api } from "@/lib/api";
import Cookie from "js-cookie";
import { tokenName } from "@/constants/token";
import { useRouter } from "next/navigation";

interface NewMemoryFormProps {
  initialValues?: {
    coverUrl: string;
    isPublic: boolean;
    content: string;
    id: string;
  };
}

export function NewMemoryForm({ initialValues }: NewMemoryFormProps) {
  const router = useRouter();

  async function handleCreateOrUpdateMemory(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const fileToUpload = formData.get("coverUrl") as File;

    let coverUrl = initialValues?.coverUrl;

    if (fileToUpload && fileToUpload.size > 0) {
      const uploadFormData = new FormData();
      uploadFormData.set("file", fileToUpload);

      const uploadResponse = await api.post("/upload", uploadFormData);

      coverUrl = uploadResponse.data.fileUrl;
    }

    const data = {
      coverUrl,
      content: formData.get("content"),
      isPublic: formData.get("isPublic"),
    };

    const options = {
      headers: {
        Authorization: `Bearer ${Cookie.get(tokenName)}`,
      },
    };

    if (initialValues)
      await api.put(`/memories/${initialValues.id}`, data, options);
    else await api.post("/memories", data, options);

    router.push("/");
  }

  return (
    <form
      onSubmit={handleCreateOrUpdateMemory}
      className="flex flex-1 flex-col gap-2 px-8"
    >
      <div className="flex items-center gap-4">
        <label
          htmlFor="media"
          className="flex cursor-pointer items-center gap-1.5 text-sm text-gray-200 hover:text-gray-100"
        >
          <Camera className="h-4 w-4" />
          Anexar mídia
        </label>

        <label
          htmlFor="isPublic"
          className="flex items-center gap-1.5 text-sm text-gray-200 hover:text-gray-100"
        >
          <input
            type="checkbox"
            name="isPublic"
            id="isPublic"
            value="true"
            className="h-4 w-4 rounded border-gray-400 bg-gray-700 text-purple-500"
            defaultChecked={initialValues?.isPublic}
          />
          Tornar memória pública
        </label>
      </div>
      <MediaPicker initialPreview={initialValues?.coverUrl} />
      <textarea
        name="content"
        spellCheck={false}
        className="w-full flex-1 resize-none rounded border-0 bg-transparent p-0 text-lg leading-relaxed text-gray-100 placeholder:text-gray-400 focus:ring-0"
        placeholder="Fique livre para adicionar fotos, vídeos e relatos sobre essa experiência que você quer lembrar para sempre."
        defaultValue={initialValues?.content}
      />

      <button
        type="submit"
        className="mb-5 mt-5 inline-block self-end rounded-full bg-green-500 px-5 py-3 font-alt text-sm uppercase leading-none text-black hover:bg-green-600"
      >
        Salvar
      </button>
    </form>
  );
}
