import "/src/css/Dropdown.css";

const DropDown = ({sorts} : {sorts:string[]}) => {
  return (
    <>
    <select className="sort__dropdown">
      {sorts.map((SortOption,index) => (<option key={index}>{SortOption}</option>))}
      </select>
    </>
  );
};

export {DropDown} ;