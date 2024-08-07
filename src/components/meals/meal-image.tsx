import { useState, useEffect, ChangeEvent } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CookingPot } from "lucide-react";

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
    <div>
      {preview ? (
        <Avatar className="w-full h-[300px] rounded-sm bg-gray-300">
          <AvatarImage src={preview} />
          <AvatarFallback>Meal Image</AvatarFallback>
        </Avatar>
      ) : (
        <div className="w-[150px] h-[150px] rounded-full bg-gray-300">
          <CookingPot size={150} color="#ffffff" className="p-8" />
        </div>
      )}
      <div style={{ width: 300 }}>
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
          <Label className="inline-block text-center" htmlFor="image">
            Set new image
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
      </div>
    </div>
  );
};

export default MealImage;
