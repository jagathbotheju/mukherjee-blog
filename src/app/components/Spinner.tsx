import { ProgressBar } from "react-loader-spinner";

const Spinner = () => {
  return (
    <ProgressBar
      height={100}
      width={120}
      ariaLabel="loader"
      borderColor="#000"
      barColor="#fff"
      wrapperStyle={{ display: "block", margin: "auto" }}
    />
  );
};

export default Spinner;
