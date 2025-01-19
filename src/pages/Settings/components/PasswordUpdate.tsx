import styles from "../Settings.module.scss";

const PasswordUpdate = () => {
    return (
       <>
            <div className={styles.settings_title}>Change password</div>
            <div className={styles.settings_passwordContainer}>
                <div className={styles.settings_inputContainer2}>
                    <div className={styles.settings_text}>Old password</div>
                    <input type="text" placeholder="" />
                </div>
                <div className={styles.settings_inputContainer2}>
                    <div className={styles.settings_text} >Password</div>
                    <input type="text" placeholder="Must be 8 characters " />
                </div>
            </div>
            <div className={styles.settings_buttons}>
            <div>
            </div>
            <div className={styles.settings_buttons_container}>
                <div className={styles.settings_buttons_save} >Save changes</div>
            </div>
        </div>
       </>
    )
}

export default PasswordUpdate;