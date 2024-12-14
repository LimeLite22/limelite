import { Remove } from "assets/images";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectRequestInfo, updateDraftField } from "../../../../redux/requests/reducer";
import styles from "../../NewRequest.module.scss";
interface IProps {
    person: {
        id: string;
        name: string;
        title: string;
    }
    index: number
}
const InterviewPerson = ({ person, index }: IProps) => {

    const [nameError, setNameError] = useState(false);
    const [titleError, setTitleError] = useState(false);
    const dispatch = useDispatch();
    const containerRef = useRef<HTMLDivElement>(null);
    const persons = useSelector(selectRequestInfo)?.interviewSettings?.persons || [];

    const handleUpdateField = (path: string, value: string) => {
        dispatch(
            updateDraftField({
                path,
                value,
            })
        );
    };
    const handleDeletePerson = (id: string) => {
        const filteredPersons = persons.filter((p) => p.id !== person.id);
        dispatch(
            updateDraftField({
                path: `interviewSettings.persons`,
                value: filteredPersons,
            })
        );
    }
    const handleBlur = (event: React.FocusEvent<HTMLDivElement>) => {
        if (
            containerRef.current &&
            containerRef.current.contains(event.relatedTarget as Node)
        ) {
            return;
        }
        setNameError(person.name.length === 0);
        setTitleError(person.title.length === 0);
    };
    return (

        <div ref={containerRef} key={index} className={styles.persons_item} tabIndex={0} onBlur={handleBlur} >
            <div className={styles.persons_title}><span>Person # {index + 1}</span> {index > 0 && <img onClick={() => {
                handleDeletePerson(person.id);
            }} src={Remove} alt=""
            />}</div>
            <input
                className={styles.persons_item_input} type="text" value={person.name} onChange={(e) => {
                    if (e.target.value.length === 0) {
                        setNameError(true);
                    } else {
                        setNameError(false);
                    }
                    handleUpdateField(`interviewSettings.persons.${index}.name`, e.target.value);
                }}
                style={{ border: nameError ? '1px solid var(--red-dark)' : '' }}
                placeholder="Full name (For Lower Thirds)"
            />
            <input
                className={styles.persons_item_input} type="text" value={person.title} onChange={(e) => {
                    if (e.target.value.length === 0) {
                        setTitleError(true);
                    } else {
                        setTitleError(false);
                    }
                    handleUpdateField(`interviewSettings.persons.${index}.title`, e.target.value);
                }}
                style={{ border: titleError ? '1px solid var(--red-dark)' : '' }}
                placeholder="Title (For Lower Thirds)"
            />
            {(nameError || titleError)
                && <div className={styles.persons_error}>Please complete the fields before proceeding.</div>}
        </div>
    )
}

export default InterviewPerson;