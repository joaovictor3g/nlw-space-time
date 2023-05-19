"use client";

import { ChangeEvent, useState } from "react";

export function MediaPicker() {
  const [preview, setPreview] = useState<string | null>(null);
  const [previewVideo, setPreviewVideo] = useState<string | null>(null);

  function onFileSelected(event: ChangeEvent<HTMLInputElement>) {
    const { files } = event.target;
    if (!files) return;
    const file = files[0];
    const fileType = file.type;

    const previewUrl = URL.createObjectURL(file);

    if (fileType.includes("image")) setPreview(previewUrl);
    else setPreviewVideo(previewUrl);
  }

  return (
    <div>
      <input
        type="file"
        id="media"
        name="coverUrl"
        className="invisible h-0 w-0"
        onChange={onFileSelected}
        accept="image/*,video/*"
      />

      {preview && (
        // eslint-disable-next-line
        <img
          src={preview}
          alt=""
          className="aspect-video w-full rounded-lg object-cover"
        />
      )}

      {previewVideo && (
        <video
          src={previewVideo}
          className="aspect-video w-full rounded-lg object-cover"
          autoPlay
          controls
        />
      )}
    </div>
  );
}
