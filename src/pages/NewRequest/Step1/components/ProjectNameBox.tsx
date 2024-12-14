import { useDispatch, useSelector } from "react-redux";

import {
  selectRequestInfo,
  updateDraftField,
} from "../../../../redux/requests/reducer";
import styles from "../NewRequestStep1.module.scss";

interface IProps {
  isError: boolean;
  setIsError: React.Dispatch<React.SetStateAction<boolean>>;
}

const ProjectNameBox = ({ isError, setIsError }: IProps) => {
  const dispatch = useDispatch();
  const selectedRequest = useSelector(selectRequestInfo);
  const projectName = selectedRequest?.projectName;
  return (
    <div
      className={styles.nR_inputContainer}
      id="projectNameInput"
      tabIndex={0}
      onBlur={() => {
        if (!projectName) {
          setIsError(true);
        }
      }}
    >
      <div className={styles.nR_inputContainer_header}>
        {" "}
        What is the name of this project?*
      </div>
      <input
        style={{ borderColor: isError ? "var(--red-dark)" : "" }}
        value={projectName}
        onChange={(e) => {
          setIsError(false);
          dispatch(
            updateDraftField({
              path: "projectName",
              value: e.target.value,
            })
          );
        }}
        className={styles.nR_inputContainer_input}
        placeholder="Please provide the project name..."
        type="text"
      />
      {isError && (
        <div className={styles.nR_inputContainer_error}>
          Please fill out all required fields to submit the form
        </div>
      )}
    </div>
  );
};

export default ProjectNameBox;
