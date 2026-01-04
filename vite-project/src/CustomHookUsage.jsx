import React from "react";
import { useFetch } from "./hooks/useFetch";

const CustomHookUsage = () => {
  const { data, loading, error } = useFetch(
    "https://jsonplaceholder.typicode.com/todos"
  );

  console.log("data: ", data, loading, error);
  return <div>CustomHookUsage</div>;
};

export default CustomHookUsage;
