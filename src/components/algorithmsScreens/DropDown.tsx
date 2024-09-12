import React from "react";
import "/src/css/Dropdown.css";

interface DropDownProps {
  sorts: string[];
  onSelectChange: (selectedSortType: string) => void;
}

const DropDown: React.FC<DropDownProps> = ({ sorts, onSelectChange }) => {
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    onSelectChange(selectedValue);
    event.target.blur();
  };

  return (
    <>
      <select className="sort__dropdown" onChange={handleSelectChange}>
        {sorts.map((sortOption, index) => (
          <option key={index} value={sortOption}>
            {sortOption}
          </option>
        ))}
      </select>
    </>
  );
};

export { DropDown };
