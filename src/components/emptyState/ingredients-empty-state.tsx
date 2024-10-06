import Docs from "/docs.svg";

export default function EmptyStateIngredients() {
  return (
    <section className="h-[calc(100vh-160px)] w-full flex flex-col justify-center items-center">
      <img src={Docs} className="z-10" alt="Documentation" />
      <p className="text-[#4A4A4A] font-bold mb-2">No Ingredients</p>
      <p className="text-[#4A4A4A] font-light">
        Start creating your grocery shopping list
      </p>
    </section>
  );
}
