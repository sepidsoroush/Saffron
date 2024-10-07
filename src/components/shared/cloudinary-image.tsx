import { Cloudinary } from "@cloudinary/url-gen";
import { thumbnail } from "@cloudinary/url-gen/actions/resize";
import { autoGravity } from "@cloudinary/url-gen/qualifiers/gravity";
import { format, quality } from "@cloudinary/url-gen/actions/delivery";
import { AdvancedImage, placeholder } from "@cloudinary/react";

// Define the props for the reusable CloudinaryImage component
type CloudinaryImageProps = {
  imageNameOrUrl: string; // This can be a Cloudinary image name or a URL
  width?: number;
  height?: number;
  className?: string;
};

// Initialize the Cloudinary instance
const cld = new Cloudinary({
  cloud: {
    cloudName: import.meta.env.VITE_CLOUD_NAME,
  },
});

// Helper function to check if a string is a valid URL
const isUrl = (string: string) => {
  try {
    new URL(string);
    return true;
  } catch {
    return false;
  }
};

// Reusable CloudinaryImage component
const CloudinaryImage = ({
  imageNameOrUrl,
  width = 500,
  height = 500,
  className = "",
}: CloudinaryImageProps) => {
  if (isUrl(imageNameOrUrl)) {
    // If it's a URL, use a simple <img> tag
    return (
      <img
        src={imageNameOrUrl}
        alt="Image"
        className={className}
        style={{ maxWidth: "100%" }}
      />
    );
  } else {
    // If it's not a URL, assume it's a Cloudinary image name and use Cloudinary transformations
    const image = cld
      .image(`bite board/${imageNameOrUrl}`)
      .resize(thumbnail().width(width).height(height).gravity(autoGravity()))
      .delivery(format("auto"))
      .delivery(quality("auto"));

    return (
      <AdvancedImage
        cldImg={image}
        plugins={[placeholder()]}
        className={className}
        style={{ maxWidth: "100%" }}
      />
    );
  }
};

export default CloudinaryImage;
