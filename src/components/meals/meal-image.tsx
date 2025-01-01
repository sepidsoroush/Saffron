import { useState, useEffect, ChangeEvent } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { CloseFill } from "@/components/shared/icons";
import NoImageMeal from "./no-image-meal";

type MealImageProps = {
  onImageChange: (base64: string) => void;
  currentImage?: string;
};

const MealImage = ({ onImageChange, currentImage }: MealImageProps) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (currentImage) {
      setPreview(currentImage);
    }
  }, [currentImage]);

  const imageUploadHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setUploading(true);

    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setPreview(base64String);
      };
      reader.readAsDataURL(file);
    }
    setUploading(false);
  };

  const deleteImageHandler = () => {
    setPreview(null);
    onImageChange("");
  };

  return (
    <div className="flex flex-col justify-center items-center">
      {preview ? (
        <>
          <div className="relative">
            <Avatar className="h-[60px] w-[60px] rounded-xl bg-neutral-300">
              <AvatarImage src={preview} />
              <AvatarFallback>Meal Image</AvatarFallback>
            </Avatar>
            <div
              onClick={deleteImageHandler}
              className="w-5 h-5 rounded-full backdrop-blur-sm bg-white/30 text-white z-30 absolute top-0 right-0 flex justify-center items-center m-1"
            >
              <CloseFill width={12} height={12} />
            </div>
          </div>

          <div className="flex space-x-2 mt-2"></div>
        </>
      ) : (
        <>
          {uploading ? (
            <Label className="inline-block text-center mt-2">
              Uploading ...
            </Label>
          ) : (
            <Label className="inline-block mt-2" htmlFor="image">
              <NoImageMeal className="h-[60px] w-[60px]" />
            </Label>
          )}
          <Input
            type="file"
            id="image"
            name="imageUrl"
            accept="image/*"
            onChange={imageUploadHandler}
            className="hidden absolute"
          />
        </>
      )}
    </div>
  );
};

export default MealImage;
