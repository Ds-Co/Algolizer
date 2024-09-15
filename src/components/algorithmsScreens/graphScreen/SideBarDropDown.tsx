import React, { useState } from "react";
import "/src/css/Dropdown.css";

interface SideBarDropDownProps {
  id?: string;
  options: string[];
  selectedValue: string;
  onSelectChange: (selectedOption: string) => void;
  isAnimating: boolean;
}

const SideBarDropDown: React.FC<SideBarDropDownProps> = ({
  id,
  options,
  selectedValue,
  onSelectChange,
  isAnimating,
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
      disabled={isAnimating}
    >
      {options.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};

export { SideBarDropDown };
