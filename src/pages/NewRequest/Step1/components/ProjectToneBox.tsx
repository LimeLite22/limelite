import { useDispatch, useSelector } from "react-redux";

import { selectRequestInfo } from "../../../../redux/requests/reducer";
import styles from "../NewRequestStep1.module.scss";

const ProjectToneBox = () => {
  const selectedRequest = useSelector(selectRequestInfo);
  const projectTone = selectedRequest?.projectTone;
  return (
    <div className={styles.nR_inputContainer}>
      <div className={styles.nR_inputContainer_header}>
        {" "}
        What is the tone for this project?*
      </div>
      <input
        value={projectTone}
        className={styles.nR_inputContainer_input}
        type="text"
        placeholder="Select your project tone..."
      />
    </div>
  );
};
export default ProjectToneBox;
