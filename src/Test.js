import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

export default function Test() {
  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the files
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()} className="text-white">
      <input {...getInputProps()} />

      <p>Drag 'n' drop some files here, or click to select files</p>
    </div>
  );
}
