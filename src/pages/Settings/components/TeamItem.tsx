import { Close, Delete, Settings, Settings2, Transfer, User1Foto, User3Foto } from "assets/images";
import { useState } from "react";
import { createPortal } from "react-dom";
import styles from "../Settings.module.scss";

const TeamItem = ({ member, index }: any) => {

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isTransferOpened, setIsTransferOpened] = useState(false);
    const handleOpenTransfer = () => {
        setIsTransferOpened(true);
    }
    const handleCloseTransfer = () => {
        setIsTransferOpened(false);
    }
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
                    <div className={styles.team_member_settingsMenu_item} onClick={handleOpenTransfer}>
                        <img src={Settings2} alt="" />
                        Transfer admin rights</div>
                    <div className={styles.team_member_settingsMenu_item}>
                        <img src={Delete} alt="" />
                        Delete account</div>
                </div>}
            </div>
            {
                isTransferOpened && createPortal(
                    <div className={styles.invite} tabIndex={-1} onClick={handleCloseTransfer}>
                        <div className={styles.invite_wrapper} onClick={(e) => e.stopPropagation()}>
                            <div className={styles.invite_wrapper_header}>Confirm transfer of Admin rights
                                <div className={styles.settings_closeButton} onClick={handleCloseTransfer}>
                                    <img src={Close} alt='' />
                                </div></div>
                            <div className={styles.invite_wrapper_subHeader}>You are about to transfer admin rights to <span>{member.name} {member.lastName}</span>
                                This action will make them the new administrator, and your access level
                                will change. Do you want to proceed?</div>
                            <div className={styles.invite_wrapper_transfer}>
                                <div className={styles.invite_wrapper_transfer_user}>
                                    <img src={User1Foto} alt={''} />
                                    <div className={styles.invite_wrapper_transfer_user_container}>
                                        <div className={styles.invite_wrapper_transfer_user_header}>
                                            Alex Smith</div>
                                        <div className={styles.invite_wrapper_transfer_user_subHeader}>clayG78@hotmail.com</div>
                                    </div>
                                </div>
                                <img className={styles.invite_wrapper_transfer_img} src={Transfer} />
                                <div className={styles.invite_wrapper_transfer_user}>
                                    <img src={User3Foto} alt={''} />
                                    <div className={styles.invite_wrapper_transfer_user_container}>
                                        <div className={styles.invite_wrapper_transfer_user_header}> {member.name} {member.lastName}</div>
                                        <div className={styles.invite_wrapper_transfer_user_subHeader} >{member.email}</div>
                                    </div>
                                </div>

                            </div>
                            <div className={styles.invite_wrapper_buttons}>
                                <div className={styles.invite_wrapper_buttons_cancel} onClick={handleCloseTransfer}>No, Keep my role</div>
                                <div className={styles.invite_wrapper_buttons_save}>Yes, Transfer rights</div>
                            </div>

                        </div>
                    </div>,
                    document.body
                )
            }
        </div>
    )
}


export default TeamItem