import { Add2} from "assets/images";
import { IPerson } from "interfaces/interfaces";
import { useDispatch, useSelector } from "react-redux";
import { generateUniqueId } from "utils/generateId";
import { selectRequestInfo,updateDraftField } from "../../../../redux/requests/reducer";
import styles from "../../NewRequest.module.scss";
import InterviewPerson from "./InterviewPerson";


const InterviewPersons = () => {
    const persons = useSelector(selectRequestInfo)?.interviewSettings?.persons || [];
    const dispatch = useDispatch();
    const handleUpdateField = (path: string, value: IPerson[]) => {
        dispatch(
            updateDraftField({
                path,
                value,
            })
        );
    };

    return (
        <div >
            <div className={styles.box_question_header_text}>How many people will deliver this script?*</div>
            {persons.map((person, index) => (
                <InterviewPerson key={index} person={person} index={index} />
            ))}
            <div className={styles.persons_add} onClick={() => {
                handleUpdateField("interviewSettings.persons", [...persons, { id: generateUniqueId(), name: '', title: '' }])
            }}><img src={Add2} alt="" /> Add person</div>
        </div>
    )
}

export default InterviewPersons;