import React, { useState } from "react";
import "/src/css/Dropdown.css";

interface NewDropDownProps {
  id?: string;
  options: string[];
  selectedValue: string;
  onSelectChange: (selectedOption: string) => void;
}

const NewDropDown: React.FC<NewDropDownProps> = ({
  id,
  options,
  selectedValue,
  onSelectChange,
}) => {
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOption = event.target.value;
    onSelectChange(selectedOption);
    event.target.blur();
  };

  return (
    <select
      id={id}
      className="sort__dropdown"
      value={selectedValue}
      onChange={handleSelectChange}
    >
      {options.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};

export { NewDropDown };
