import { useState } from "react";

import styles from "../../NewRequest.module.scss";

const ShotList = () => {
  const [text, setText] = useState<string>("");
  return (
    <div>
      <div className={styles.nR_shotList_header}>Project overview / Details*</div>
      <textarea
        className={styles.nR_shotList_textArea}
        placeholder="Add a brief overview of the project here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
    </div>
  );
};

export default ShotList;
