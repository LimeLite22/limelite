import { Delete, Settings, Settings2 } from "assets/images";
import { useState } from "react";
import styles from "../Settings.module.scss";

const TeamItem = ({ member, index }: any) => {

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    return (
        <div key={index} className={styles.team_member}>
            <div className={styles.team_member_1fr}>
                <img className={styles.team_member_1fr} src={member.foto} alt="" />
            </div>

            <div className={`${styles.team_member_3fr} ${styles.team_member_container}`}>
                <div className={styles.team_member_container_title}>  {member.name} {member.lastName}</div>
                <div className={styles.team_member_container_subTitle}>{member.role}</div>
            </div>
            <div className={styles.team_member_3fr}>{member.jobTitle}</div>
            <div className={styles.team_member_3fr}>{member.email}</div>
            <div className={styles.team_member_3fr}>{member.phone}</div>
            <div className={styles.team_member_3fr} style={{ whiteSpace: 'nowrap' }}>{member.lastLogim}</div>
            <div
                className={`
                ${styles.team_member_06fr} 
                ${styles.team_member_settings} 
                ${isMenuOpen ? styles.team_member_settings_opened : ''}`}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                tabIndex={0}
                onBlur={() => setIsMenuOpen(false)}
            >
                <img src={Settings} alt="" />
                {isMenuOpen && <div className={styles.team_member_settingsMenu}>
                    <div className={styles.team_member_settingsMenu_item}>
                        <img src={Settings2} alt="" />
                        Transfer admin rights</div>
                    <div className={styles.team_member_settingsMenu_item}>
                        <img src={Delete} alt="" />
                        Delete account</div>
                </div>}
            </div>
        </div>
    )
}


export default TeamItem