import { useState } from "react";
import supabase from "@/config/supabaseConfig";
import CloudinaryImage from "@/components/shared/cloudinary-image";

import { Avocado, Cherries, Bread } from "@phosphor-icons/react";

const AuthPage = () => {
  const [error, setError] = useState<string | null>(null);

  // Social Sign-in
  const handleOAuthSignIn = async (provider: "google" | "facebook") => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: { redirectTo: window.location.origin },
    });
    if (error) setError(error.message);
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen overflow-hidden bg-gradient-to-t from-orange-50 to-white px-8 md:px-0 gap-36">
      <div className="relative h-52 max-w-[320px] w-full">
        <div className="absolute overflow-hidden w-[108px] h-[142px] top-0 left-4 rotate-6 shadow-combined border-[6px] border-white rounded-2xl">
          <CloudinaryImage
            imageNameOrUrl="app/jnnolhpitynbvgdxiizm"
            width={600}
            height={600}
            className="object-cover h-full"
          />
        </div>
        <div className="absolute overflow-hidden w-[129px] h-[157px] bottom-0 left-24 bg-cover shadow-combined border-[6px] border-white rounded-2xl z-10">
          <CloudinaryImage
            imageNameOrUrl="app/urswbl6jcraksqdit5v8"
            width={600}
            height={600}
            className="object-cover h-full"
          />
        </div>
        <div className="absolute overflow-hidden w-[108px] h-[108px] top-5 right-4 bg-cover -rotate-6 shadow-combined border-[6px] border-white rounded-2xl">
          <CloudinaryImage
            imageNameOrUrl="app/lkdfldikmnekm341rove"
            width={600}
            height={600}
            className="object-cover h-full"
          />
        </div>
        <div className="p-3 rounded-full bg-green-200 shadow-icon rotate-[27deg] absolute top-0 right-0 z-10">
          <Avocado size={27} color="#16A34A" weight="fill" />
        </div>
        <div className="p-4 rounded-full bg-orange-200 shadow-icon absolute bottom-8 left-0 z-10">
          <Bread size={32} color="#B45309" weight="fill" />
        </div>
        <div className="p-2 rounded-full bg-rose-200 shadow-icon absolute bottom-4 right-12 z-10">
          <Cherries size={20} color="#DB2777" weight="fill" />
        </div>
      </div>
      <div>
        <div className="mb-10 text-neutral-800 text-center text-xl leading-7 font-[Rethink Sans] font-medium ">
          Plan meals, explore recipes, and savor flavors all week!
        </div>
        <div className="flex flex-col items-center justify-center gap-4">
          <div className="w-full px-5 py-3 bg-white shadow-combined rounded-2xl overflow-hidden inline-flex justify-center items-center gap-1 max-w-[320px]">
            <div className="relative">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1.2em"
                height="1.2em"
                viewBox="0 0 48 48"
              >
                <path
                  fill="#ffc107"
                  d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917"
                />
                <path
                  fill="#ff3d00"
                  d="m6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C16.318 4 9.656 8.337 6.306 14.691"
                />
                <path
                  fill="#4caf50"
                  d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.9 11.9 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44"
                />
                <path
                  fill="#1976d2"
                  d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002l6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917"
                />
              </svg>
            </div>
            <button
              onClick={() => handleOAuthSignIn("google")}
              className="text-black text-[17px] font-[600] leading-[22px] font-[Rethink Sans] break-words"
            >
              Sign in with Google
            </button>
          </div>
          <div className="w-full px-5 py-3 bg-white shadow-combined rounded-2xl overflow-hidden inline-flex justify-center items-center gap-1 max-w-[320px]">
            <div className="relative">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1.2em"
                height="1.2em"
                viewBox="0 0 256 256"
              >
                <path
                  fill="#1877f2"
                  d="M256 128C256 57.308 198.692 0 128 0S0 57.308 0 128c0 63.888 46.808 116.843 108 126.445V165H75.5v-37H108V99.8c0-32.08 19.11-49.8 48.348-49.8C170.352 50 185 52.5 185 52.5V84h-16.14C152.959 84 148 93.867 148 103.99V128h35.5l-5.675 37H148v89.445c61.192-9.602 108-62.556 108-126.445"
                />
                <path
                  fill="#fff"
                  d="m177.825 165l5.675-37H148v-24.01C148 93.866 152.959 84 168.86 84H185V52.5S170.352 50 156.347 50C127.11 50 108 67.72 108 99.8V128H75.5v37H108v89.445A129 129 0 0 0 128 256a129 129 0 0 0 20-1.555V165z"
                />
              </svg>
            </div>
            <button
              onClick={() => handleOAuthSignIn("facebook")}
              className="text-black text-[17px] font-[600] leading-[22px] font-[Rethink Sans] break-words"
            >
              Sign in with Facebook
            </button>
          </div>
          {error && <p className="error">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
