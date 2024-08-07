import { useState, useEffect, ChangeEvent } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import NoImageMeal from "./no-image-meal";

type Props = {
  onImageChange: (base64: string) => void;
  currentImage?: string;
};

const MealImage = ({ onImageChange, currentImage }: Props) => {
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
        onImageChange(base64String);
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
        <Avatar className="w-full h-[300px] rounded-sm bg-gray-300">
          <AvatarImage src={preview} />
          <AvatarFallback>Meal Image</AvatarFallback>
        </Avatar>
      ) : (
        <NoImageMeal />
      )}
      <>
        {uploading ? (
          <Label className="inline-block text-center">Uploading ...</Label>
        ) : preview ? (
          <Button
            onClick={deleteImageHandler}
            variant="ghost"
            className="text-red-600"
          >
            Delete image
          </Button>
        ) : (
          <Label className="inline-block mt-2" htmlFor="image">
            Add Image
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
    </div>
  );
};

export default MealImage;
