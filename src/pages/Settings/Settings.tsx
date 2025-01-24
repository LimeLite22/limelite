import { SETTING_COMMUNICATION_SECTION, SETTING_EDIT_SECTION, SETTING_PASSWORD_SECTION, SETTING_TEAM_SECTION } from "consts/consts";
import { useState } from "react";

import Communication from "./components/Communication";
import EditProfile from "./components/EditProfile";
import PasswordUpdate from "./components/PasswordUpdate";
import Team from "./components/Team";
import styles from "./Settings.module.scss";

const Settings = () => {
    const [menu, setMenu] = useState(SETTING_EDIT_SECTION);

    return (
        <div className={styles.settings} >
            <div className={styles.settings_header}>Setting </div>
            <div className={styles.settings_navigation}>
                <div
                    className={`
                    ${styles.settings_navigation_item} ${menu === SETTING_EDIT_SECTION && styles.settings_navigation_selected}`}
                    onClick={() => setMenu(SETTING_EDIT_SECTION)}
                >Profile edit</div>
                <div
                    onClick={() => setMenu(SETTING_TEAM_SECTION)}
                    className={`${styles.settings_navigation_item} 
                    ${menu === SETTING_TEAM_SECTION && styles.settings_navigation_selected}`}>Team Management </div>
                <div
                    onClick={() => setMenu(SETTING_PASSWORD_SECTION)}
                    className={`${styles.settings_navigation_item} 
                    ${menu === SETTING_PASSWORD_SECTION && styles.settings_navigation_selected}`}>Password </div>
                <div className={

                    `${styles.settings_navigation_item} 
                    ${menu === SETTING_COMMUNICATION_SECTION && styles.settings_navigation_selected}`}
                    onClick={() => setMenu(SETTING_COMMUNICATION_SECTION)}
                >Communication Preferences
                </div>
            </div>

            {menu === SETTING_EDIT_SECTION && <EditProfile />}
            {menu === SETTING_PASSWORD_SECTION && <PasswordUpdate />}
            {menu === SETTING_TEAM_SECTION && <Team />}
            {menu === SETTING_COMMUNICATION_SECTION && <Communication />
            }

        </div>
    );
};

export default Settings;