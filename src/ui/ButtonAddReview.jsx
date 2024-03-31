import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import Button from "./Button";

function ButtonAddReview({ setShowForm }) {
  const { isAuthorized } = useAppContext();
  const navigate = useNavigate();

  function handleClick() {
    if (!isAuthorized) {
      sessionStorage.setItem(
        "redirectTo",
        `${window.location.href}#reviews-section`
      );
      navigate(`/login`);

      return;
    }

    setShowForm(true);
  }

  return <Button onClick={handleClick}>Add review</Button>;
}

export default ButtonAddReview;
