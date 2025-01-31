import { Add2 } from "assets/images";
import { TPerson } from "types/types";
import { generateUniqueId } from "utils/generateId";
import styles from "../../NewRequest.module.scss";
import ScriptPerson from "./ScriptPerson";

interface IProps {
  persons: TPerson[] | undefined;
  setPersons: (persons: TPerson[]) => void
}
const ScriptPersons: React.FC<IProps> = ({ persons, setPersons }) => {

  return (
    <div className={styles.personsContainer}>
      {persons?.map((person, index) => (
        <ScriptPerson key={index} index={index} person={person}
         onDelete={(index) => {
          const newPersons = [...persons];
          newPersons.splice(index, 1);
          setPersons(newPersons);
         }}
         onUpdate={(person) => {
          const newPersons = [...persons];
          newPersons[index] = person;
          setPersons(newPersons);
        }} />
      ))}
      <div
        className={styles.persons_add}
        onClick={() => {
          persons && setPersons([...persons, { id: generateUniqueId(), name: "", title: "" }]);
        }}
      >
        <img src={Add2} alt="" /> Add person
      </div>
    </div>
  );
};

export default ScriptPersons;
