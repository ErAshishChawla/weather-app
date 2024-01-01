import { BsSearch } from "react-icons/bs";
import SearchBarSideButton from "./SearchBarSideButton";
function SearchIconSideButton() {
  return (
    <SearchBarSideButton
      className="p-2 mr-4"
      icon={<BsSearch />}
      type="submit"
    />
  );
}

export default SearchIconSideButton;
