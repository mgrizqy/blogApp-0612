"use client";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
interface IFormInput {
  type: string;
  name: string;
  label?: string;
  placeholder?: string;
  onChange?: (e: any) => void;
  ref?: any;
  value?: string;
}

const FormInput: React.FC<IFormInput> = ({
  type,
  name,
  label,
  placeholder,
  onChange,
  ref,
  value,
}) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  if (type === "password") {
    let icon;
    let activeType;
    if (isVisible) {
      icon = <FaRegEye style={{ margin: "auto" }} />;
      activeType = "text";
    } else {
      icon = <FaRegEyeSlash style={{ margin: "auto" }} />;
      activeType = "password";
    }
    return (
      <div className="flex flex-col gap-2">
        <label className="font-medium">{label}</label>
        <div className="relative">
          <input
            id={name}
            name={name}
            ref={ref}
            type={activeType}
            placeholder={placeholder}
            className="w-full border border-gray-100 px-3 py-2 rounded-md shadow"
            onChange={onChange}
          />
          <Button
            type="button"
            className="absolute right-1 top-1 w-12 p-1 rounded-md border"
            onClick={() => setIsVisible(!isVisible)}
          >
            {icon}
          </Button>
        </div>
      </div>
    );
  }
  return (
    <div className="flex flex-col w-full gap-2">
      <label className="font-medium">{label}</label>
      <input
        id={name}
        name={name}
        type={type}
        ref={ref}
        placeholder={placeholder}
        className="w-full border border-gray-100 px-3 py-2 rounded-md shadow"
        onChange={onChange}
        value={value}
      />
    </div>
  );
};

export default FormInput;
