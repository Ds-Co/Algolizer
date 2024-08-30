import React from "react";
import "/src/css/Dropdown.css";

interface DropDownProps {
  sorts: string[];
  onSelectChange: (selectedSortType: string) => void; // New prop
}

const DropDown: React.FC<DropDownProps> = ({ sorts, onSelectChange }) => {
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    onSelectChange(selectedValue); // Notify parent of the selected value
    event.target.blur();  // Remove focus after selection
  };
  

  return (
    <>
      <select 
        className="sort__dropdown" 
        onChange={handleSelectChange}
      >
        {sorts.map((sortOption, index) => (
          <option key={index} value={sortOption}>{sortOption}</option>
        ))}
      </select>
    </>
  );
};

export { DropDown };





