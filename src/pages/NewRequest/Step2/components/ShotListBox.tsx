
import { useState } from "react";

import styles from "../../NewRequest.module.scss";

const ShotList = () => {
  const [text, setText] = useState<string>("");
  return (
    <div>
      <div className={styles.nR_shotList_header}>Shot list</div>
      <textarea className={styles.nR_shotList_textArea} placeholder="Add your shot list here..." value={text} onChange={(e) => setText(e.target.value)} />
    </div>
  );
};

export default ShotList;
