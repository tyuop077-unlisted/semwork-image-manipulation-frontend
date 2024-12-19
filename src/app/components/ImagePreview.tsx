import { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import Image from 'next/image'

interface ImagePreviewProps {
  selectedFiles: File[]
  setSelectedFiles: (files: File[]) => void
}

export default function ImagePreview({ selectedFiles, setSelectedFiles }: ImagePreviewProps) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    setSelectedFiles(acceptedFiles)
  }, [setSelectedFiles])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: { 'image/*': [] } })

  return (
    <div className="flex-1 p-4 overflow-auto">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-4 text-center ${
          isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
        }`}
      >
        <input {...getInputProps()} />
        {selectedFiles.length > 0 ? (
          <div className="grid grid-cols-3 gap-4">
            {selectedFiles.map((file, index) => (
              <div key={index} className="relative aspect-square">
                <a href={URL.createObjectURL(file)} download={file.name}>
                  <Image
                    src={URL.createObjectURL(file)}
                    alt={`Preview ${index + 1}`}
                    fill
                    className="object-cover rounded-lg"
                  />
                </a>
              </div>
            ))}
          </div>
        ) : (
          <p>{isDragActive ? 'Выбрать файлы...' : 'Переместить или выбрать файлы'}</p>
        )}
      </div>
    </div>
  )
}

