import Cup from "./cup.svg";

export default function EmptyStateMeals() {
  return (
    <section className="h-[calc(100vh-160px)] w-full flex flex-col justify-center items-center">
      <img src={Cup} className="z-10" />
      <p className="text-[#4A4A4A] font-bold mb-2">No meals</p>
      <p className="text-[#4A4A4A] font-light">
        Start creating your favorite meals.
      </p>
    </section>
  );
}
