import { useNavigate } from "react-router-dom";

function Error() {
  const navigate = useNavigate();
  const handleReturn = () => {
    navigate(-1);
  };
  return (
    <>
      <h1>SomeThing went wrong</h1>
      <button onClick={handleReturn}>return</button>
    </>
  );
}
export default Error;
