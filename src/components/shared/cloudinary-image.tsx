import { Cloudinary } from "@cloudinary/url-gen";
import { thumbnail } from "@cloudinary/url-gen/actions/resize";
import { autoGravity } from "@cloudinary/url-gen/qualifiers/gravity";
import { format, quality } from "@cloudinary/url-gen/actions/delivery";
import { AdvancedImage, placeholder } from "@cloudinary/react";

type Props = {
  imageName: string;
  width?: number;
  height?: number;
  className?: string;
};

const cld = new Cloudinary({
  cloud: {
    cloudName: import.meta.env.VITE_CLOUD_NAME,
  },
});

const CloudinaryImage = ({
  imageName,
  width = 500,
  height = 500,
  className = "",
}: Props) => {
  const image = cld
    .image(`bite board/${imageName}`)
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
};

export default CloudinaryImage;
