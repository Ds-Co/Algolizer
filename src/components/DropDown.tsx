import React, { useState } from "react";

function Dropdown({ sorts }: { sorts: string[] }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="dropdown">
      <button
        onClick={toggleDropdown}
        className="btn btn-secondary dropdown-toggle"
        type="button"
        data-bs-toggle="dropdown"
        data-bs-auto-close="true"
        aria-expanded={"false"}
      >
        Sorting Algorithms{" "}
      </button>
      {isOpen && (
        <ul className="dropdown-content">
          {sorts.map((sort, index) => (
            <li>
              <a key={index} href="#">
                {sort}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Dropdown;
