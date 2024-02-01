import { useState } from "react";
import "./App.css";
import { Form } from "./Components/Form";
import { FromContext } from "./context/provider";

function App() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  return (
    <>
      <FromContext.Provider value={{ formData, setFormData }}>
        <Form />
      </FromContext.Provider>
    </>
  );
}

export default App;
