"use client";

import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface MemoryProps {
  id: string;
  createdAt: string;
  coverUrl: string;
  excerpt?: string;
  content?: string;
  isDetail?: boolean;
}

export function Memory(props: MemoryProps) {
  return (
    <div className="space-y-4 p-8">
      <time className="-ml-8 flex items-center gap-2 text-sm text-gray-100 before:h-px before:w-5 before:bg-gray-50">
        {new Intl.DateTimeFormat("pt-BR", { dateStyle: "long" }).format(
          new Date(props.createdAt)
        )}
      </time>

      <Image
        src={props.coverUrl}
        width={592}
        height={280}
        className="aspect-video w-full rounded-lg object-cover"
        alt=""
      />

      <p className="text-lg leading-relaxed text-gray-100">
        {props.excerpt ?? props.content}
      </p>

      {!props.isDetail && (
        <Link
          href={`/memories/${props.id}`}
          className="flex items-center gap-2 text-sm text-gray-200 hover:text-gray-100"
        >
          Ler mais
          <ArrowRight size={16} />
        </Link>
      )}
    </div>
  );
}
