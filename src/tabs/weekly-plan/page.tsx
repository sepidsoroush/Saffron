import { useEffect, useState } from "react";
import { columns } from "./columns";
import { WeeklyPlan } from "@/types";
import { DataTable } from "./data-table";

async function getData(): Promise<WeeklyPlan[]> {
  // Fetch data from your API here.
  return [
    {
      id: 1,
      day: "Monday",
      meal: "Pasta Alfredo",
    },
    {
      id: 2,
      day: "Tuesday",
      meal: "Salmon and salad",
    },
    {
      id: 3,
      day: "Wednesday",
      meal: "Hamburger and fries",
    },
    {
      id: 4,
      day: "Thursday",
      meal: "Beef stroganoff",
    },
    {
      id: 5,
      day: "Friday",
      meal: "Fajita",
    },
    {
      id: 6,
      day: "Saturday",
      meal: "Pizza margarita",
    },
    {
      id: 7,
      day: "Sunday",
      meal: "Steak",
    },
  ];
}

function WeeklyPlanTab() {
  const [data, setData] = useState<WeeklyPlan[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchData() {
      const data = await getData();
      setData(data);
      setLoading(false);
    }
    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}

export default WeeklyPlanTab;
