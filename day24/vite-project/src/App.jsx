import { Fragment, useRef, useState } from "react";

const App = () => {
  const inputRef = useRef(null);
  const boxRef = useRef(null);
  const counterRef = useRef(0);
  const [count, setCount] = useState(0);

  counterRef.current = counterRef.current + 1;

  const handleFocus = () => {
    console.log("Ref: ", inputRef);
    inputRef.current.focus();
  };

  const handleScroll = () => {
    boxRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Fragment>
      {/* Input Focus */}
      {/* <div>
        <input type="text" ref={inputRef} />
        <button onClick={handleFocus}>Focus</button>
      </div> */}

      {/* Scroll Behaviour */}
      {/* <button onClick={handleScroll}>Scroll</button>
      <div style={{ height: "1000px" }}></div>
      <div ref={boxRef}>
        <h1>I am Targated Div</h1>
      </div> */}

      {/* Prevent Re-Render Triggers */}
      <div>
        <h1>Re-Render - {counterRef.current}</h1>
        <button onClick={() => setCount(count + 1)}>Increase Count</button>
      </div>
    </Fragment>
  );
};

export default App;
