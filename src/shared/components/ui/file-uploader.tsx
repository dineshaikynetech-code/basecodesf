"use client";

import { useEffect, useRef } from "react";
import Uppy from "@uppy/core";
import Dashboard from "@uppy/dashboard";
import GoogleDrive from "@uppy/google-drive";
import Dropbox from "@uppy/dropbox";

import "@uppy/core/dist/style.css";
import "@uppy/dashboard/dist/style.css";

type Props = {
  onChange: (files: File[]) => void;
  config: {
    accept: string[];
    multiple?: boolean;
  };
};

export default function FileUploader({ onChange, config }: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const uppy = new Uppy({
      restrictions: {
        allowedFileTypes: config.accept,
        maxNumberOfFiles: config.multiple ? 5 : 1,
      },
    });

    uppy.use(Dashboard, {
      inline: true,
      target: containerRef.current, 
      height: 200,
    });

    uppy.use(GoogleDrive, {
      companionUrl: "https://companion.uppy.io",
    });

    uppy.use(Dropbox, {
      companionUrl: "https://companion.uppy.io",
    });

    uppy.on("complete", (result: any) => {
      const files = (result?.successful ?? []).map(
        (f: any) => f.data as File
      );
      onChange(files);
    });

    return () => {
      uppy.destroy(); 
    };
  }, [config, onChange]);

  return <div ref={containerRef} />;
}