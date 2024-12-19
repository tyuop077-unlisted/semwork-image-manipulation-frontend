import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select"
import { Slider } from "@/app/components/ui/slider"
import { Button } from "@/app/components/ui/button"

interface TopBarProps {
  selectedOperation: string
  setSelectedOperation: (operation: string) => void
  sliderValue: number
  setSliderValue: (value: number) => void
  onProcess: () => void
}

const params: Record<string, [boolean, number, number, number]> = {
  "noise": [true, 1, 0, 100],
  "noise_removal": [true, 2, 1, 31],
  "equalization": [false, 0, 0, 0],
  "color_correction": [false, 0, 0, 0],
  "scaling": [true, 1, 1, 2000],
  "rotation": [true, 1, -90, 90], // 0 360
  "glass_effect": [true, 1, 1, 50],
  "motion_blur": [true, 1, 1, 100]
};

export default function TopBar({
                                 selectedOperation,
                                 setSelectedOperation,
                                 sliderValue,
                                 setSliderValue,
                                 onProcess,
                               }: TopBarProps) {
  return (
    <div className="flex items-center justify-between p-4 bg-gray-100">
      <Select value={selectedOperation} onValueChange={setSelectedOperation}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select operation" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="noise">Зашумление</SelectItem>
          <SelectItem value="noise_removal">Удаление шума</SelectItem>
          <SelectItem value="equalization">Эквализация</SelectItem>
          <SelectItem value="color_correction">Цветокоррекция</SelectItem>
          <SelectItem value="scaling">Масштабирование</SelectItem>
          <SelectItem value="rotation">Поворот</SelectItem>
          <SelectItem value="glass_effect">Эффект &quot;Стекла&quot;</SelectItem>
          <SelectItem value="motion_blur">Motion blur</SelectItem>
        </SelectContent>
      </Select>
      {params[selectedOperation]![0] && <div className="flex items-center space-x-4">
          <span className="text-sm font-medium w-[25px]">{sliderValue}</span>
          <Slider
              min={params[selectedOperation]![2]}
              max={params[selectedOperation]![3]}
              step={params[selectedOperation]![1]}
              value={[sliderValue]}
              onValueChange={(value) => setSliderValue(value[0])}
              className="w-[200px]"
          />
          <span className="text-sm font-medium">{params[selectedOperation]![2]} - {params[selectedOperation]![3]}</span>
      </div>}
      <Button onClick={onProcess}>Обработать</Button>
    </div>
  )
}

