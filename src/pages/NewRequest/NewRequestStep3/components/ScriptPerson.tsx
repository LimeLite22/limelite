import { Remove } from "assets/images";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { deletePerson, updatePerson } from "../../../../redux/requests/reducer";
import styles from "../../NewRequest.module.scss";
interface IProps {
    person: {
        id: string;
        name: string;
        title: string;
    }
    index: number
}

const ScriptPerson = ({ person, index }: IProps) => {

    const [nameError, setNameError] = useState(false);
    const [titleError, setTitleError] = useState(false);
    const dispatch = useDispatch();
    const containerRef = useRef<HTMLDivElement>(null);
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

    const updatePersonName = (updateName: string) => {
        if (updateName.length === 0) {
            setNameError(true);
        } else {
            setNameError(false);
        }
        dispatch(updatePerson({
            id: person.id,
            name: updateName,
            title: person.title
        }));
    }

    const updatePersonTitle = (updateTitle: string) => {
        if (updateTitle.length === 0) {
            setTitleError(true);
        } else {
            setTitleError(false);
        }
        dispatch(updatePerson({
            id: person.id,
            name: person.name,
            title: updateTitle
        }));
    }
    return (

        <div ref={containerRef} key={index} className={styles.persons_item} tabIndex={0} onBlur={handleBlur} >
            <div className={styles.persons_title}><span>Person # {index + 1}</span> {index > 0 && <img onClick={() => {
                dispatch(deletePerson(person.id))
            }} src={Remove} alt=""
            />}</div>
            <input
                className={styles.persons_item_input} type="text" value={person.name} onChange={(e) => {
                    updatePersonName(e.target.value);
                }}
                style={{ border: nameError ? '1px solid var(--red-dark)' : '' }}
                placeholder="Full name (For Lower Thirds)"
            />
            <input
                className={styles.persons_item_input} type="text" value={person.title} onChange={(e) => {
                    updatePersonTitle(e.target.value);
                }}
                style={{ border: titleError ? '1px solid var(--red-dark)' : '' }}
                placeholder="Title (For Lower Thirds)"
            />
            {(nameError || titleError)
                && <div className={styles.persons_error}>Please complete the fields before proceeding.</div>}
        </div>
    )
}

export default ScriptPerson;