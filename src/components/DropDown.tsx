const DropDown = ({sorts} : {sorts:string[]}) => {
  return (
    <>
    <select className="sort-dropdown">
      {sorts.map((SortOption,index) => (<option key={index}>{SortOption}</option>))}
      </select>
    </>
  );
};

export default DropDown;