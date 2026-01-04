import { useQuery } from "@tanstack/react-query";
import { getAllTodos } from "./services/todoService";

const App = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["todos"],
    queryFn: () => getAllTodos(),
  });

  if (isError) {
    return <h2>Error: {JSON.stringify(error, null, 2)}</h2>;
  }

  if (isLoading) {
    return <h2>Loading...</h2>;
  }
  return (
    <div>
      <ol>
        {data.map((todo) => {
          return <li key={todo.id}>{todo.title}</li>;
        })}
      </ol>
    </div>
  );
};

export default App;

/**
 * React ka Flow
 * 1. Component render hota hai (JSX)
 * 2. DOM Update hota hai
 * 3. useEffect chalega
 */

// Why hooks cann't be called outside component
