import { createContext, useContext, useEffect, useState } from "react";
import { fetchData } from "../utils/rapidapi";

export const DataContext = createContext();

export default function DataProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [value, setValue] = useState("New");

  useEffect(() => {
    fetchAlldata(value);
  }, [value]);

  const fetchAlldata = (query) => {
    setLoading(true);
    fetchData(`search/?q=${query}`)
      .then(({ contents }) => {
        console.log(contents);
        setData(contents);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <DataContext.Provider value={{ loading, data, value, setValue }}>
      {children}
    </DataContext.Provider>
  );
}

export const useData = () => useContext(DataContext);
