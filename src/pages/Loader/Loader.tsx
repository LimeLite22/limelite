import { LoaderGif } from "assets/images";
import { useEffect } from "react";
import { useNavigate } from "react-router";

import styles from "./Loader.module.scss";

const Loader = (): JSX.Element => {
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      navigate("/walkThrough");
    }, 5000);
  }, []);
  return (
    <span key={Math.random()} className={styles.loaderContainer}>
      <img src={LoaderGif} alt={"loader"} />
    </span>
  );
};

export default Loader;
