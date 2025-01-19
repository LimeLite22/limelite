import styles from "../Settings.module.scss";

const Communication = () => {
    return <div className={styles.settings_communicationContainer}>
        <div className={styles.settings_text} >Consent to Receive Text Updates </div>
        <div className={styles.settings_text2}>By checking this box, you agree to receive text messages
            from LimeLite Videos with information about your projects and plan.
            Message and data rates may apply. You can opt out at any time
        </div>
        <div className={styles.settings_text} >The Terms and Conditions of LimeLite </div>
        <div className={styles.settings_text2}>By proceeding, you agree to our Terms and Conditions. Click the link to review the full details.</div>
    </div>
}


export default Communication;