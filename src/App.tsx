import sortIcon from "/assets/sort_icon.png";
import {TopBar} from "./components/TopBar";
import {SideBar} from "./components/SideBar";
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
      <TopBar dropdownmenu ={sorts} sortingsProps={sortingsProps}></TopBar>
      <SideBar></SideBar>
    </div>
  );
};

export {App};
