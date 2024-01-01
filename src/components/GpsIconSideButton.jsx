import SearchBarSideButton from "./SearchBarSideButton";
import { MdGpsFixed } from "react-icons/md";
import { useDispatch } from "react-redux";
import { updateLocationMode } from "../store";
import { generatePayload } from "../util";

function GpsIconSideButton() {
  const dispatch = useDispatch();

  const handleGpsClick = () => {
    const payload = generatePayload();
    dispatch(updateLocationMode(payload));
  };
  return (
    <SearchBarSideButton
      type="button"
      className="p-2"
      icon={<MdGpsFixed />}
      onClick={handleGpsClick}
    />
  );
}

export default GpsIconSideButton;
