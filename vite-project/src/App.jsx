import { Button } from "@/components/ui/button";
import { Card, CardAction } from "@/components/ui/card";
import { useEffect, useState } from "react";

const App = () => {
  const URL = "https://jsonplaceholder.typicode.com/todos";
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);

  // Valid approach but not good approach
  // useEffect(() => {
  //   fetch(URL)
  //     .then((resp) => {
  //       setLoading(true);
  //       return resp.json();
  //     })
  //     .then((data) => {
  //       console.log(data);
  //       setTodos(data);
  //     })
  //     .catch((error) => {
  //       console.log("Error:", error);
  //     })
  //     .finally(() => {
  //       console.log("Fetch attempt finished.");
  //       setLoading(false);
  //     });
  // }, []);

  const fetchTodos = async () => {
    try {
      setLoading(true);
      const response = await fetch(URL);
      const data = await response.json();
      setTodos(data);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Mounting Phase
    fetchTodos();
  }, []); // [] -> Dependency array

  // useEffect(() => {
  //   fetchTodos();
  // }); // Without Dependency Array - try avoiding it if possible otherwise infinite loop may occur

  // useEffect(() => { // Mounting Phase + Updating Phase
  //   fetchTodos();
  // }, [URL]); // Component will re-mount if value in dependency array changes || URL changes

  // useEffect(() => {
  //   // Unmounting Phase
  //   const handleResize = () => {
  //     console.log(
  //       "Window resized to: ",
  //       window.innerWidth,
  //       "x",
  //       window.innerHeight
  //     );
  //   };

  //   window.addEventListener("resize", handleResize);

  //   return () => {
  //     // cleanup function
  //     console.log("Component Unmounted");
  //     window.removeEventListener("resize", handleResize);
  //   };
  // }, []);

  /**
   * Empty Dependency Array will make sure ki apka component sirf ek baar mount hone
   */

  return (
    <div>
      {loading ? (
        <h2>Loading...</h2>
      ) : (
        <div>
          {todos.map((todo) => {
            return (
              <Card key={todo.id} className={"my-5 p-5"}>
                {todo.title}
                <CardAction>
                  <Button>Edit</Button>
                  <Button className={"bg-red-500"}>Delete</Button>
                </CardAction>
              </Card>
            );
          })}
        </div>
      )}
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
