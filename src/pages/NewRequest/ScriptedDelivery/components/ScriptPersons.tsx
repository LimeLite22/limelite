import { Add2 } from "assets/images";
import { useDispatch, useSelector } from "react-redux";
import { TPerson } from "types/types";
import { generateUniqueId } from "utils/generateId";

import {
  selectRequestInfo,
  updateDraftField,
} from "../../../../redux/requests/reducer";
import styles from "../../NewRequest.module.scss";
import ScriptPerson from "./ScriptPerson";

const ScriptPersons = () => {
  const persons = useSelector(selectRequestInfo)?.scriptSettings?.persons || [];
  const dispatch = useDispatch();
  const handleUpdateField = (path: string, value: TPerson[]) => {
    dispatch(
      updateDraftField({
        path,
        value,
      }),
    );
  };

  return (
    <div className={styles.personsContainer}>
      <div className={styles.box_question_header_text}>
        Who will deliver this script on camera?
      </div>
      {persons.map((person, index) => (
        <ScriptPerson key={index} person={person} index={index} />
      ))}
      <div
        className={styles.persons_add}
        onClick={() => {
          handleUpdateField(`scriptSettings.persons`, [
            ...persons,
            { id: generateUniqueId(), name: "", title: "" },
          ]);
        }}
      >
        <img src={Add2} alt="" /> Add person
      </div>
    </div>
  );
};

export default ScriptPersons;
