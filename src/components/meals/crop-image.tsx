import { useState, useCallback } from "react";
import Cropper, { Area } from "react-easy-crop";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { getCroppedImg } from "@/lib/getCoppedImg";

type CropImageProps = {
  imageSrc: string;
  onCropComplete: (croppedImage: string) => void;
  onCancel: () => void;
};

const CropImage = ({ imageSrc, onCropComplete, onCancel }: CropImageProps) => {
  const [crop, setCrop] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

  const onCropCompleteHandler = useCallback(
    (_: Area, croppedAreaPixels: Area) => {
      setCroppedAreaPixels(croppedAreaPixels);
    },
    []
  );

  const showCroppedImage = async () => {
    if (croppedAreaPixels) {
      try {
        const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels);
        onCropComplete(croppedImage);
      } catch (e) {
        console.error(e);
      }
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-full h-[300px] bg-gray-300">
        <Cropper
          image={imageSrc}
          crop={crop}
          zoom={zoom}
          aspect={4 / 3}
          onCropChange={setCrop}
          onCropComplete={onCropCompleteHandler}
          onZoomChange={setZoom}
        />
      </div>
      <div className="flex flex-col mt-4">
        <div className="flex items-center space-x-2">
          <span>Zoom</span>
          <Slider
            className="relative flex items-center select-none touch-none w-[200px] h-5"
            value={[zoom]}
            min={1}
            max={3}
            step={0.1}
            onValueChange={(value) => setZoom(value[0])}
          />
        </div>

        <div className="flex space-x-4 mt-4">
          <Button onClick={showCroppedImage} variant="default">
            Select
          </Button>
          <Button onClick={onCancel} variant="ghost" className="text-red-600">
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CropImage;
