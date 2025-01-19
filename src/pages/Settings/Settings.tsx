import { useState } from "react";
import styles from "./Settings.module.scss";
import Team from "./components/Team";
import EditProfile from "./components/EditProfile";
import PasswordUpdate from "./components/PasswordUpdate";

const Settings = () => {
    const [menu, setMenu] = useState('edit');

    return (
        <div className={styles.settings} >
            <div className={styles.settings_header}>Setting </div>
            <div className={styles.settings_navigation}>
                <div
                    className={`
                    ${styles.settings_navigation_item} ${menu === 'edit' && styles.settings_navigation_selected}`}
                    onClick={() => setMenu('edit')}
                >Profile edit</div>
                <div
                    onClick={() => setMenu('team')}
                    className={`${styles.settings_navigation_item} 
                    ${menu === 'team' && styles.settings_navigation_selected}`}>Team Management </div>
                <div
                    onClick={() => setMenu('password')}
                    className={`${styles.settings_navigation_item} 
                    ${menu === 'password' && styles.settings_navigation_selected}`}>Password </div>
                <div className={

                    `${styles.settings_navigation_item} 
                    ${menu === 'communication' && styles.settings_navigation_selected}`}
                    onClick={() => setMenu('communication')}
                >Communication Preferences
                </div>
            </div>

            {menu === 'edit' && <EditProfile /> }
            {menu === 'password' && <PasswordUpdate />}
            {  menu === 'team' && <Team /> }
            {
                menu === 'communication' &&
                <div className={styles.settings_communicationContainer}>
                    <div className={styles.settings_text} >Consent to Receive Text Updates </div>
                    <div className={styles.settings_text2}>By checking this box, you agree to receive text messages
                        from LimeLite Videos with information about your projects and plan.
                        Message and data rates may apply. You can opt out at any time
                    </div>
                    <div className={styles.settings_text} >The Terms and Conditions of LimeLite </div>
                    <div className={styles.settings_text2}>By proceeding, you agree to our Terms and Conditions. Click the link to review the full details.</div>
                </div>

            }

        </div>
    );
};

export default Settings;