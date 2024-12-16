import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import Loader from "../Loader/Loader";

const Demo = () => {
  const [isLoaded] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (!isLoaded) {
      setTimeout(() => {
        navigate("/walkThrough");
      }, 6000);
    }
  }, [isLoaded, navigate]);
  return <Loader />;
};

export default Demo;
