import React from "react";

// const Greeting = (props) => {
const Greeting = ({ email, age, username }) => {
  //   console.log("Props: ", props);
  console.log(email, age, username);
  return (
    <div>
      <h1>
        Welcome to App Component {email && "-"} {email}
      </h1>
      {/* <h1>
        Welcome to App Component {props.email && "-"} {props.email}
      </h1> */}
    </div>
  );
};

export default Greeting;
