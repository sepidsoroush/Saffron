import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function ErrorPage() {
  const navigate = useNavigate();
  return (
    <section className="flex flex-col justify-center items-center">
      <img src="error.svg" loading="lazy" />
      <h1 className="text-xl font-semibold tracking-tighter">
        404 - Page Not Found
      </h1>
      <p className="my-4">The page you are looking for does not exist.</p>
      <Button
        variant="link"
        onClick={() => {
          navigate("/");
        }}
      >
        Go back to home page
      </Button>
    </section>
  );
}
