import { CloseRed, Divider, EditIcon, Success2 } from "assets/images";
import { useState } from "react";
import { useCalculateFinalPrice } from "utils/priceCalculator";

import styles from "../../NewRequest.module.scss";
import AddOnInterviewConduction from "./AddOnInterviewConduction";
import AddOnInterviewQuestions from "./AddOnInterviewQuestions";
import AddOnLocation from "./AddOnLocation";
import AddOnScript from "./AddOnScript";
import AddOnZone from "./AddOnZone";
// isready  не потрібно використовувати бо в контенйнерах буде власна перевірка
const AddOnsContainer = () => {
    const [isEdit, setIsEdit] = useState(false);

    const { list } = useCalculateFinalPrice();
    const handleOnEdit = () => {
        setIsEdit(true);
    }
    const handleDecline = () => {
        setIsEdit(false);
    }
    const handleSave = () => {
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
        <AddOnLocation isEdit={isEdit} setIsEdit={setIsEdit} />
        <AddOnZone isEdit={isEdit} setIsEdit={setIsEdit} />
        <AddOnScript isEdit={isEdit} setIsEdit={setIsEdit} />
        <AddOnInterviewQuestions isEdit={isEdit} setIsEdit={setIsEdit} />
        <AddOnInterviewConduction isEdit={isEdit} setIsEdit={setIsEdit} />
        {
            list.rushDay > 0 &&
            <div className={styles.infoContainer_priceItem}>
                Rush day <p>{list.rushDay}<span>.00</span></p></div>

        }
        {
            list.weekEnd > 0 &&
            <div className={styles.infoContainer_priceItem}>
                Weekend day <p>{list.weekEnd}<span>.00</span></p></div>
        }
        {
            list.rushHour > 0 &&
            <div className={styles.infoContainer_priceItem}>
                Rush hour <p>{list.rushHour}<span>.00</span></p></div>
        }
        {
            list.professionalTruckAuthor > 0 &&
            <div className={styles.infoContainer_priceItem}>
                Professional Truck Author <p>{list.professionalTruckAuthor}<span>.00</span></p></div>
        }
        {
            list.professionalVoiceWriter > 0 &&
            <div className={styles.infoContainer_priceItem}>
                Professional Voice Writer <p>{list.professionalVoiceWriter}<span>.00</span></p></div>
        }
        {
            list.customThumbnail > 0 &&
            <div className={styles.infoContainer_priceItem}>
                Custom Thumbnail <p>{list.customThumbnail}<span>.00</span></p></div>
        }
        {
            list.videoFormats > 0 &&
            <div className={styles.infoContainer_priceItem}>
                Video Formats <p>{list.videoFormats}<span>.00</span></p></div>
        }
        {
            list.addOns > 0 &&
            <div className={styles.infoContainer_priceItem}>
                Add-ons <p>{list.addOns}<span>.00</span></p></div>
        }
        <img src={Divider} alt='' className={styles.infoContainer_divider} />
        <div className={styles.infoContainer_totalPrice}>
            Estimated Price:   <p>1,390<span>.00</span></p>
        </div>



    </div>
};


export default AddOnsContainer;