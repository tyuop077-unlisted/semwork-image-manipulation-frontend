'use client'

import { useState } from 'react'
import TopBar from './components/TopBar'
import ImagePreview from './components/ImagePreview'

export default function ImageProcessingInterface() {
  const [selectedOperation, setSelectedOperation] = useState('noise')
  const [sliderValue, setSliderValue] = useState(0)
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])

  const handleProcess = async () => {
    const processedFiles = await Promise.all(selectedFiles.map(file => handleImage(file)));
    setSelectedFiles(processedFiles);
  }

  const handleImage = async (file: File) => {
    const formData = new FormData()
    formData.append("files", file);

    try {
      const response = await fetch(`http://localhost:8000/process?operation=${selectedOperation}&parameter=${sliderValue}`, {
        method: 'POST',
        body: formData,
      })

      if (response.ok) {
        const blob = await response.blob()
        return new File([blob], file.name, { type: file.type })
      } else {
        console.error(`Файл ${file.name} не удалось обработать`)
        return file
      }
    } catch (error) {
      console.error(error)
      return file
    }
  }

  return (
    <div className="flex flex-col h-screen">
      <TopBar
        selectedOperation={selectedOperation}
        setSelectedOperation={setSelectedOperation}
        sliderValue={sliderValue}
        setSliderValue={setSliderValue}
        onProcess={handleProcess}
      />
      <ImagePreview selectedFiles={selectedFiles} setSelectedFiles={setSelectedFiles} />
    </div>
  )
}
