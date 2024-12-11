import { LoaderGif } from "assets/images";
import { useEffect } from "react";
import { useNavigate } from "react-router";

import styles from "./Loader.module.scss";
interface IProps{
  isWelcome?: boolean
}

const Loader = ({isWelcome}:IProps) => {
  
  const navigate = useNavigate();
  useEffect(() => {

    !isWelcome &&  setTimeout(() => {
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
