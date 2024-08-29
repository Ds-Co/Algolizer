import "/src/css/Dropdown.css";

const DropDown = ({ sorts }: { sorts: string[] }) => {
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    event.target.blur();  // Remove focus after selection
  };

  return (
    <>
      <select 
        className="sort__dropdown" 
        onChange={handleSelectChange}
      >
        {sorts.map((SortOption, index) => (
          <option key={index}>{SortOption}</option>
        ))}
      </select>
    </>
  );
};

export { DropDown };
