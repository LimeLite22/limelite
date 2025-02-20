

import { useSelector } from "react-redux";
import { selectRequestInfo } from "../../../redux/requests/reducer";
import styles from "../ProjectsPage.module.scss";
import { OWN_SCRIPT, PROFESSIONAL_SCRIPT } from "consts/consts";
import DivRowCount from "pages/NewRequest/components/TextArea";
import { testRequest } from "../../../redux/requests/consts";
const ScriptSettings = () => {
    const selectedRequest = testRequest;
    const scriptSettings = { ...selectedRequest?.scriptSettings }
    return (
        <div className={styles.infoContainer}>
            <div className={styles.infoContainer_header}>Scripted Delivery
            </div>
            <div className={styles.infoContainer_text}><p>Script Writer:</p>{scriptSettings?.scriptWriter} </div>
            {selectedRequest?.scriptSettings.scriptWriter === OWN_SCRIPT &&
                <>
                    <div className={styles.infoContainer_text}><p>Script Status:</p>
                        {selectedRequest?.scriptSettings.scriptStatus}
                    </div>
                    <div className={styles.infoContainer_text}><p className={`
                ${styles.infoContainer_detailsHeader}
                `}
                    >Script:</p>
                        <DivRowCount text={selectedRequest?.scriptSettings.ownText} />
                    </div>
                </>
            }
            {selectedRequest?.scriptSettings.scriptWriter === PROFESSIONAL_SCRIPT &&
                <>
                    <div className={styles.infoContainer_text}><p>Subject matter expert :</p>
                        {scriptSettings?.name}

                    </div>

                    <div className={styles.infoContainer_text}><p>Phone:</p>
                        {scriptSettings?.phone}
                    </div>

                    <div className={styles.infoContainer_text}><p>Email:</p>
                        {scriptSettings?.email}
                    </div>
                    <div className={styles.infoContainer_text}><p>Background information for interview(s):</p>
                        <DivRowCount text={scriptSettings?.backgroundInfo ? scriptSettings?.backgroundInfo : ''} />
                    </div>
                </>
            }
            <div className={styles.infoContainer_text}><p>Teleprompter:</p>
                {scriptSettings?.teleprompter ? "Yes" : "No"}
            </div>
            <div className={styles.infoContainer_text}><p>Script delivers:</p>

                {<div>
                    {selectedRequest?.scriptSettings?.persons?.map((person, index) => {

                        return <div>
                            {person.name}({person.title})
                            {(selectedRequest?.scriptSettings?.persons?.length - 1 === index &&
                                selectedRequest?.scriptSettings?.persons.length > 1) ? ',' : ''}</div>
                    })}
                </div>}
            </div>
        </div >
    )
}

export default ScriptSettings;