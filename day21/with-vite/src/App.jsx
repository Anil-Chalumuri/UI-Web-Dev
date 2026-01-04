/** Without State */
// const App = () => {
//   let email = "";

//   const handleEmailChange = () => {
//     email = "newemail@example.com";
//   };

//   return (
//     <div>
//       <h1>
//         Welcome to App Component {email && "-"} {email}
//       </h1>
//       <input type="text" value={email} />
//       <button onClick={handleEmailChange}>Change Email</button>
//     </div>
//   );
// };

// export default App;

/** With State */
import { useState } from "react";
import Greeting from "./components/Greeting";
const App = () => {
  const [email, setEmail] = useState("");

  const handleEmailChange = () => {
    setEmail("imran.ali@gmail.com");
  };

  return (
    <div>
      <div>
        <input
          type="text"
          value={email}
          onChange={(event) => {
            console.log("Event Value: ", event.target.value);
            setEmail(event.target.value);
          }}
        />
        <button onClick={handleEmailChange}>Change Email</button>
      </div>
      <Greeting email={email} age={28} username="imran" />
    </div>
  );
};

export default App;
