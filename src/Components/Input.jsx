import {
  forwardRef,
  useContext,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { FromContext } from "../context/provider";

const Input = forwardRef(function InputComponent(
  { type, id, className, name, onBlurEvent },
  ref
) {
  const { formData, setFormData } = useContext(FromContext);
  const [isValid, setIsValid] = useState(true);
  const [shake, setShake] = useState(false);

  const localRef = useRef(null);

  useEffect(() => {
    setIsValid(true);
    setShake(false);
  }, [formData]);

  useImperativeHandle(
    ref,
    () => {
      return {
        focus: () => {
          localRef.current.focus();
        },
        setInvalid: () => {
          setIsValid(false);
          setShake(true);
        },
        setValid: () => {
          setIsValid(true);
          setShake(false);
        },
      };
    },
    []
  );

  return (
    <>
      <input
        className={`${className} ${!isValid ? "border-red-500" : ""} ${
          shake ? "animate-shake" : ""
        }`}
        ref={localRef}
        type={type}
        id={id}
        placeholder={name}
        value={formData[name]}
        name={name}
        onBlur={() => {
          if (formData[name] !== "") {
            onBlurEvent(name);
          }
        }}
        onChange={(e) => {
          setFormData({
            ...formData,
            [name]: e.target.value,
          });
        }}
      />
      <br />
      <span className="text-red-500 text-sm">
        {!isValid
          ? `${name} is invalid ${
              name == "email" ? "(example@example.com)" : ""
            }
        ${name == "password" ? "(Example@10)" : ""}`
          : ""}
      </span>
    </>
  );
});

export { Input };
