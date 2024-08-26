import sortIcon from "/assets/sort_icon.png";
import { TopBar } from "./components/TopBar";
import { SideBar } from "./components/SideBar";

const ArrayGenerator: React.FC = () => (
  <>
    <div className="sidebar__array-size">
      <h4 className="sidebar__array-size-text">Array Size:</h4>
      <input
        className="sidebar__array-size-input"
        type="number"
        placeholder="Enter Size"
      />
    </div>
    <div className="sidebar__duplicate">
      <a className="sidebar__duplicate-text">Duplicates</a>
      <input className="sidebar__duplicate-checkbox" type="checkbox" />
    </div>
  </>
);

const App = () => {
  const sorts: string[] = [
    "Bubble Sort",
    "Bogo Sort",
    "Quick Sort",
    "Insertion Sort",
    "Selection Sort",
    "Sleep Sort",
    "Merge Sort",
    "Heap Sort",
  ];

  const sortingsProps = {
    text: "Sorting",
    icon: sortIcon,
  };

  return (
    <div>
      <TopBar dropdownmenu={sorts} sortingsProps={sortingsProps}></TopBar>
      <SideBar ArrayGenerator={ArrayGenerator}></SideBar>
    </div>
  );
};

export { App };
