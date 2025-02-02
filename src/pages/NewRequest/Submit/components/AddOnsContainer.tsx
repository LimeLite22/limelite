import { Divider, EditIcon } from "assets/images";
import { useCalculateFinalPrice } from "utils/priceCalculator";

import styles from "../../NewRequest.module.scss";

const AddOnsContainer = () => {

    const { list } = useCalculateFinalPrice();

    return <div className={styles.infoContainer}>
        <div className={styles.infoContainer_header}>Requested Add-ons
            <div className={styles.infoContainer_header_edit}>
                <img src={EditIcon} alt='' />
                Edit</div>
        </div>
        {list.location > 0 &&
            <div className={styles.infoContainer_priceItem}>
                Location <p>{list.location}<span>.00</span></p></div>
        }
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
            list.locationType2 > 0 &&
            <div className={styles.infoContainer_priceItem}>
                Location Type  2 <p>{list.locationType2}<span>.00</span></p></div>
        }
        {
            list.locationType3 > 0 &&
            <div className={styles.infoContainer_priceItem}>
                Location Type 3 <p>{list.locationType3}<span>.00</span></p></div>

        }
        {
            list.professionalScriptWriter > 0 &&
            <div className={styles.infoContainer_priceItem}>
                Professional Script Writer <p>{list.professionalScriptWriter}<span>.00</span></p></div>
        }{
            list.professionalQuestionWriter > 0 &&
            <div className={styles.infoContainer_priceItem}>
                Professional Question Writer <p>{list.professionalQuestionWriter}<span>.00</span></p></div>
        }{
            list.virtualQuestion > 0 &&
            <div className={styles.infoContainer_priceItem}>
                Virtual  Question <p>{list.virtualQuestion}<span>.00</span></p></div>
        }{
            list.virtualInterview > 0 &&
            <div className={styles.infoContainer_priceItem}>
                Virtual Interview <p>{list.virtualInterview}<span>.00</span></p></div>
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
            <div className={styles.infoContainer_text}>
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