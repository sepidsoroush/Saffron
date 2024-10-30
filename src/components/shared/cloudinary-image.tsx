import { useState } from "react";
import { Cloudinary } from "@cloudinary/url-gen";
import { thumbnail } from "@cloudinary/url-gen/actions/resize";
import { autoGravity } from "@cloudinary/url-gen/qualifiers/gravity";
import { format, quality } from "@cloudinary/url-gen/actions/delivery";
import { AdvancedImage, placeholder } from "@cloudinary/react";

type CloudinaryImageProps = {
  imageNameOrUrl: string; // This can be a Cloudinary image name or a URL
  width?: number;
  height?: number;
  className?: string;
};

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

const CloudinaryImage = ({
  imageNameOrUrl,
  width = 500,
  height = 500,
  className = "",
}: CloudinaryImageProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleLoad = () => setImageLoaded(true);

  if (isUrl(imageNameOrUrl)) {
    return (
      <img
        src={imageNameOrUrl}
        alt="Image"
        className={className}
        style={{
          maxWidth: "100%",
          filter: imageLoaded ? "none" : "blur(5px)",
          transition: "filter 0.1s ease-out",
        }}
        onLoad={handleLoad}
      />
    );
  } else {
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
        style={{
          maxWidth: "100%",
          filter: imageLoaded ? "none" : "blur(5px)",
          transition: "filter 0.1s ease-out",
        }}
        onLoad={handleLoad}
      />
    );
  }
};

export default CloudinaryImage;
