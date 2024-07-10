import supabase from "../config/supabaseConfig";
import { useEffect, useState } from "react";
import { Ingredient } from "../types";

function GroceryTab() {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);

  useEffect(() => {
    getIngredients();
  }, []);

  async function getIngredients() {
    const { data } = await supabase.from("ingredients").select();

    if (data) {
      setIngredients(data);
    }
  }

  return (
    <>
      {ingredients && (
        <ul>
          {ingredients.map((item) => (
            <li key={item.id}>{item.name}</li>
          ))}
        </ul>
      )}
    </>
  );
}

export default GroceryTab;