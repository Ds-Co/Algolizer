import React from "react";
import "/src/css/Dropdown.css";

interface DropDownProps {
  sorts: string[];
  onSelectChange: (selectedSortType: string) => void;
  isAnimating: boolean;
}

const DropDown: React.FC<DropDownProps> = ({ sorts, onSelectChange,isAnimating }) => {
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    onSelectChange(selectedValue);
    event.target.blur();
  };

  return (
    <>
      <select className="sort__dropdown" onChange={handleSelectChange} disabled={isAnimating}>
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
