import { Add2} from "assets/images";
import { useDispatch, useSelector } from "react-redux";
import { generateUniqueId } from "utils/generateId";
import { selectRequestInfo, setPersons } from "../../../../redux/requests/reducer";
import styles from "../../NewRequest.module.scss";
import ScriptPerson from "./ScriptPerson";


const ScriptPersons = () => {
    const persons = useSelector(selectRequestInfo)?.scriptSettings?.persons || [];
    const dispatch = useDispatch();

    return (
        <div >
            <div className={styles.box_question_header_text}>How many people will deliver this script?*</div>
            {persons.map((person, index) => (
                <ScriptPerson key={index} person={person} index={index} />
            ))}
            <div className={styles.persons_add} onClick={() => {
                dispatch(setPersons([...persons, { id: generateUniqueId(), name: '', title: '' }]))
            }}><img src={Add2} /> Add person</div>
        </div>
    )
}

export default ScriptPersons;