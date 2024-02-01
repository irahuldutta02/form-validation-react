import { useContext, useRef, useState } from "react";
import { FromContext } from "../context/provider";
import { Input } from "./Input";
import { validateEmail } from "../helper/validateEmail";
import { validatePassword } from "../helper/validatePassword";

export function Form() {
  const { formData } = useContext(FromContext);
  const [submitted, setSubmitted] = useState(false);

  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  function handleFormSubmit(event) {
    event.preventDefault();

    if (
      !validateEmail(formData.email) &&
      !validatePassword(formData.password)
    ) {
      console.log("Form submitted successfully" + JSON.stringify(formData));
      setSubmitted(true);
      return;
    } else {
      if (validatePassword(formData.password)) {
        passwordRef.current.focus();
        passwordRef.current.setInvalid();
        console.log("Password is invalid");
      }
      if (validateEmail(formData.email)) {
        emailRef.current.focus();
        emailRef.current.setInvalid();
        console.log("Email is invalid");
      }
      return;
    }
  }

  function handleBlur(name) {
    if (name === "email") {
      if (validateEmail(formData.email)) {
        emailRef.current.setInvalid();
      }
    } else if (name === "password") {
      if (validatePassword(formData.password)) {
        passwordRef.current.setInvalid();
      }
    }
  }

  return (
    <>
      <div className="flex justify-center items-center w-[100vw] h-[100vh] p-4 ">
        {submitted && (
          <div className="mx-auto w-fit p-8 border flex justify-center items-center  border-gray-300 rounded-md sm:w-96">
            <div className="w-full flex justify-center items-center">
              <h1 className="text-2xl font-bold text-green-400 text-center">
                Signed in successfully
              </h1>
            </div>
          </div>
        )}
        {!submitted && (
          <form className="mx-auto w-fit p-8 border  border-gray-300 rounded-md sm:w-96">
            <div className="mb-14 w-full">
              <h1 className="text-2xl font-bold text-white text-center">
                Sign in
              </h1>
            </div>
            <div className="mb-4 w-full">
              <Input
                className={
                  "border-2 border-solid rounded-md p-2 outline-none w-full"
                }
                id={"email-input"}
                type={"text"}
                name={"email"}
                ref={emailRef}
                onBlurEvent={handleBlur}
              />
            </div>
            <div className="mb-4 w-full">
              <Input
                className={
                  "border-2 border-solid rounded-md p-2 outline-none w-full"
                }
                id={"password-input"}
                type={"password"}
                name={"password"}
                ref={passwordRef}
                onBlurEvent={handleBlur}
              />
            </div>
            <div className="mb-4 flex justify-center items-center">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={(e) => {
                  e.preventDefault();
                  handleFormSubmit(e);
                }}
              >
                Submit
              </button>
            </div>
          </form>
        )}
      </div>
    </>
  );
}
