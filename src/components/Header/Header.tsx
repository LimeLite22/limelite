import { useEffect, useState } from "react";

import styles from "./Header.module.scss";

const Header = () => {
  const [openedNotification] = useState(true);
  const [textToshow, setTextToshow] = useState(" Summer is here!☀️");
  useEffect(() => {
    setTimeout(() => {
      setTextToshow(
        "Submit your requests early to avoid scheduling conflicts.",
      );
    }, 6000);
  }, []);
  return (
    <div className={styles.headerContainer}>
      {openedNotification && (
        <div className={styles.notification}>
          {textToshow}
        </div>
      )}
      <div className={styles.header}>
        <div className={styles.header_logo} />
      </div>
    </div>
  );
};

export default Header;
