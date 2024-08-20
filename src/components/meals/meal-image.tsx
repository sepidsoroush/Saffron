import { useState, useEffect, ChangeEvent } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import NoImageMeal from "./no-image-meal";
0;
import CropImage from "./crop-image";

type MealImageProps = {
  onImageChange: (base64: string) => void;
  currentImage?: string;
};

const MealImage = ({ onImageChange, currentImage }: MealImageProps) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [isCropDialogOpen, setIsCropDialogOpen] = useState(false);

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
        setIsCropDialogOpen(true);
      };
      reader.readAsDataURL(file);
    }
    setUploading(false);
  };

  const handleCropComplete = (croppedImage: string) => {
    setPreview(croppedImage);
    onImageChange(croppedImage);
    setIsCropDialogOpen(false);
  };

  const deleteImageHandler = () => {
    setPreview(null);
    onImageChange("");
  };

  return (
    <div className="flex flex-col justify-center items-center">
      {preview ? (
        <>
          <Avatar className="w-[400px] md:w-[300px] h-[300px] object-fill rounded-sm bg-gray-300">
            <AvatarImage src={preview} />
            <AvatarFallback>Meal Image</AvatarFallback>
          </Avatar>
          <div className="flex space-x-2 mt-2">
            <Dialog open={isCropDialogOpen} onOpenChange={setIsCropDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="ghost">Crop image</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogTitle>Crop Image</DialogTitle>
                <DialogDescription>
                  Adjust your image and click "Crop Image" to save.
                </DialogDescription>
                <CropImage
                  imageSrc={preview}
                  onCropComplete={handleCropComplete}
                  onCancel={() => setIsCropDialogOpen(false)}
                />
              </DialogContent>
            </Dialog>
            <Button
              onClick={deleteImageHandler}
              variant="ghost"
              className="text-red-600"
            >
              Delete image
            </Button>
          </div>
        </>
      ) : (
        <>
          <NoImageMeal />
          {uploading ? (
            <Label className="inline-block text-center mt-2">
              Uploading ...
            </Label>
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
      )}
    </div>
  );
};

export default MealImage;
