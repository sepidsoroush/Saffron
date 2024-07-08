import supabase from "./config/supabaseConfig";
import { useEffect, useState } from "react";

export interface Food {
  id: string;
  name: string;
  ingredients?: string[];
  lastCooked?: Date;
  type?: string;
}

function App() {
  const [foods, setFoods] = useState<Food[] | null>([]);
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

export default App;
