import { CloseRed, Divider, EditIcon } from "assets/images";
import { useState } from "react";
import { useCalculateFinalPrice } from "utils/priceCalculator";

import styles from "../../NewRequest.module.scss";
import AddOnAdditionalFormats from "./AddOnAdditionalFormats";
import AddOnDate from "./AddOnDate";
import AddOnInterviewConduction from "./AddOnInterviewConduction";
import AddOnInterviewQuestions from "./AddOnInterviewQuestions";
import AddOnLocation from "./AddOnLocation";
import AddOnScript from "./AddOnScript";
import AddOnThumbnail from "./AddOnThumbnail";
import AddOnTime from "./AddOnTime";
import AddOnVoiceoverScript from "./AddOnVoiceoverScript";
import AddOnVoiceoverTrack from "./AddOnVoiceoverTrack";
import AddOnZone from "./AddOnZone";
// isready  не потрібно використовувати бо в контенйнерах буде власна перевірка
const AddOnsContainer = () => {
    const [isEdit, setIsEdit] = useState(false);

    const { list, price } = useCalculateFinalPrice();
    const handleOnEdit = () => {
        setIsEdit(true);
    }
    const handleDecline = () => {
        setIsEdit(false);
    }

    return <div className={styles.infoContainer}>
        <div className={styles.infoContainer_header}>Requested Add-ons
            {!isEdit &&
                <div className={styles.infoContainer_header_edit} onClick={handleOnEdit}>
                    <img src={EditIcon} alt='' />
                    Edit</div>}
            {isEdit &&
                <div className={styles.infoContainer_header_buttons}>
                    <div
                        className={styles.infoContainer_header_decline}
                        onClick={handleDecline}><img src={CloseRed} alt='' /><div>Decline</div></div>
                </div>}
        </div>
        <AddOnLocation isEdit={isEdit} />
        <AddOnZone isEdit={isEdit} />
        <AddOnDate isEdit={isEdit} />
        <AddOnTime isEdit={isEdit} />
        <AddOnScript isEdit={isEdit} />
        <AddOnInterviewQuestions isEdit={isEdit} />
        <AddOnInterviewConduction isEdit={isEdit} />
        <AddOnVoiceoverScript isEdit={isEdit} />
        <AddOnVoiceoverTrack isEdit={isEdit} />
        <AddOnThumbnail isEdit={isEdit} />
        <AddOnAdditionalFormats isEdit={isEdit} />
        {
            list.rushHour > 0 &&
            <div className={styles.infoContainer_priceItem}>
                Rush hour <p>{list.rushHour}<span>.00</span></p></div>
        }
        {
            list.addOns > 0 &&
            <div className={styles.infoContainer_priceItem}>
                Add-ons <p>{list.addOns}<span>.00</span></p></div>
        }
        <img src={Divider} alt='' className={styles.infoContainer_divider} />
        <div className={styles.infoContainer_totalPrice}>
            Estimated Price:   <p>{price}<span>.00</span></p>
        </div>



    </div>
};


export default AddOnsContainer;