import { useUserContext } from "../../contexts/userContext";

function PopUp() {
  const { popup, error, color } = useUserContext();

  if (!popup) return null; // Don't render anything if show is false

  const popUpContainer = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "fixed",
    minWidth: "120px",
    maxHeight: "35px",
    height: "35px",
    top: "54px",
    right: "10px",
    backgroundColor: "#fff",
    padding: "2px 10px",
    borderRadius: "5px",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.2)",
    zIndex: 1000,
    fontFamily: "sans-serif",
  };

  const popUpMessage = {
    color: color,
  };

  return (
    <div style={popUpContainer}>
      <p style={popUpMessage}>{error}</p>
    </div>
  );
}

export default PopUp;
