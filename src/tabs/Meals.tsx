import supabase from "../config/supabaseConfig";
import { useEffect, useState } from "react";
import { Meal } from "../types";

function MealsTab() {
  const [foods, setFoods] = useState<Meal[] | null>([]);
  const [fetchErrors, setFetchErrors] = useState<string | null>(null);

  useEffect(() => {
    getFoods();
  }, []);

  async function getFoods() {
    const { data, error } = await supabase.from("foods").select();
    if (error) {
      setFetchErrors("Could not fetch the foods list");
      setFoods(null);
      console.log(error);
    }
    if (data) {
      setFoods(data);
      setFetchErrors(null);
    }
  }

  return (
    <>
      {fetchErrors && <p>{fetchErrors}</p>}
      {foods && (
        <ul>
          {foods.map((food) => (
            <li key={food.id}>{food.name}</li>
          ))}
        </ul>
      )}
    </>
  );
}

export default MealsTab;
