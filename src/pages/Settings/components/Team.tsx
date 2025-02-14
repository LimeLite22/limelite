import { Add, Close, GapCheck, GapUnCheck, InviteUser, User1Foto, User2Foto, User3Foto, } from "assets/images";
import useWindowWidth from "hooks/useWindowWidth";
import { useState } from "react";
import { createPortal } from "react-dom";

import styles from "../Settings.module.scss";
import TeamItem from "./TeamItem";
import { Sheet } from "react-modal-sheet";



const Team = () => {
    const [members] = useState([

        {
            name: 'Alex',
            foto: User1Foto,
            lastName: 'Smith',
            role: 'Admin (Owner)',
            jobTitle: 'Corporate assurance planner',
            email: 'clayG78@hotmail.com',
            phone: '(689) 514-8821',
            lastLogim: 'Jan 12, 2025 04:31 PM'
        },
        {
            name: 'William',
            foto: User2Foto,
            lastName: 'Doe',
            role: 'Team member',
            jobTitle: 'Human identity coordinator',
            email: 'clayG78@hotmail.com',
            phone: '(689) 514-8821',
            lastLogim: 'Jan 12, 2025 01:38 PM'
        },
        {
            name: 'Gabriel',
            foto: User3Foto,
            lastName: 'Zamora',
            role: 'Team member',
            jobTitle: 'Investor integration liaison',
            email: 'clayG78@hotmail.com',
            phone: '(689) 514-8821',
            lastLogim: 'Jan 12, 2025 01:30 PM'
        },
        {
            name: 'Daniel',
            foto: User2Foto,
            lastName: 'Thomas',
            role: 'Team member',
            jobTitle: 'Human assurance consultant',
            email: 'clayG78@hotmail.com',
            phone: '(689) 514-8821',
            lastLogim: 'Jan 12, 2025 01:30 PM'
        },
        {
            name: 'Daniel',
            foto: User2Foto,
            lastName: 'Thomas',
            role: 'Team member',
            jobTitle: 'Human Directives',
            email: 'clayG78@hotmail.com',
            phone: '(689) 514-8821',
            lastLogim: 'Jan 12, 2025 01:30 PM'
        }

    ]);
    const [isInviteOpened, setIsInviteOpened] = useState(false);
    const [transferRights, setTransferRights] = useState(false);
    const width = useWindowWidth();
    const handleTransferRights = () => {
        setTransferRights(!transferRights);
    }
    const handleOpenInvite = () => {
        setIsInviteOpened(true);
    }
    const handleCloseInvite = () => {
        setIsInviteOpened(false);
    }

    return (
        <>
            <div>
                <div className={styles.team_header}>
                    <div className={styles.team_header_container}>
                        <div className={styles.team_header_title}>Yout Team
                            <ul>
                                <li>6 members</li>
                            </ul>
                        </div>
                        <div className={styles.team_header_subTitle}>Add or manage team members that need to log into Limelite space.</div>
                    </div>
                    <div className={styles.team_invite} onClick={handleOpenInvite}>
                        <img src={InviteUser} alt="" />
                        Invite user</div>
                </div>
                <div className={styles.team_navigation} >
                    <div className={styles.team_navigation_1fr} >Icon</div>
                    <div className={styles.team_navigation_3fr}>Name</div>
                    <div className={styles.team_navigation_3fr}>Job title</div>
                    <div className={styles.team_navigation_3fr}>Email</div>
                    <div className={styles.team_navigation_3fr}>Phone number</div>
                    <div className={styles.team_navigation_3fr}>Last login</div>
                </div>
                {
                    members.map((member: any, index: number) => (
                        <TeamItem member={member} index={index} />
                    ))
                }
            </div>
            {
                isInviteOpened && width > 768 && createPortal(
                    <div className={styles.invite} tabIndex={-1} onClick={handleCloseInvite}>
                        <div className={styles.invite_wrapper} onClick={(e) => e.stopPropagation()}>
                            <div className={styles.invite_wrapper_header}>Invite your team members<div
                                className={styles.invite_closeButton}
                                onClick={handleCloseInvite}
                            >
                                <img src={Close} alt='' />
                            </div></div>
                            <div className={styles.invite_wrapper_subHeader}>Add your colleagues to Limelite space and assign them a role.</div>
                            <div className={styles.invite_wrapper_title}>Email </div>
                            <input className={styles.invite_wrapper_input} type='text' />
                            <div className={styles.invite_wrapper_title2} onClick={handleTransferRights} >
                                <img src={transferRights ? GapCheck : GapUnCheck} alt="" />
                                Transfer administrator rights</div>
                            <div className={styles.invite_wrapper_add}>
                                <img src={Add} alt="" />
                                Add another</div>
                            <div className={styles.invite_wrapper_buttons}>
                                <div className={styles.invite_wrapper_buttons_cancel}>Cancel</div>
                                <div className={styles.invite_wrapper_buttons_save}>Save changes</div>
                            </div>

                        </div>
                    </div>,
                    document.body
                )
            }
            {
                isInviteOpened && width < 768 &&
                <Sheet
                    isOpen={isInviteOpened}
                    onClose={() => setIsInviteOpened(false)}
                    dragVelocityThreshold={500}
                    detent="full-height"
                    style={{
                        backdropFilter: "blur(3px)",
                        WebkitBackdropFilter: "blur(3px)",
                        background: "#11100E99",
                    }}
                    className={styles.settings_sheetMain}
                >
                    <div
                        className={styles.settings_closeArea}
                        onClick={() => setIsInviteOpened(false)}
                    ></div>
                    <Sheet.Container className={`${styles.settings_sheetInvite} `}>
                        <Sheet.Content className={styles.settings_sheetContainer}>
                            <div className={styles.settings_sheetLine}></div>
                            <div className={styles.invite_wrapper_header}>Invite your team members</div>
                            <div className={styles.invite_wrapper_subHeader}>Add your colleagues to Limelite space and assign them a role.</div>
                            <div className={styles.invite_wrapper_title}>Email </div>
                            <input className={styles.invite_wrapper_input} type='text' />
                            <div className={styles.invite_wrapper_title2} onClick={handleTransferRights} >
                                <img src={transferRights ? GapCheck : GapUnCheck} alt="" />
                                Transfer administrator rights</div>
                            <div className={styles.invite_wrapper_add}>
                                <img src={Add} alt="" />
                                Add another</div>
                            <div className={styles.invite_wrapper_buttons}>
                                <div className={styles.invite_wrapper_buttons_cancel} onClick={() => { setIsInviteOpened(false) }} >Cancel</div>
                                <div className={styles.invite_wrapper_buttons_save} onClick={() => { setIsInviteOpened(false) }} >Save changes</div>

                            </div>

                        </Sheet.Content>
                    </Sheet.Container>
                </Sheet>
            }
        </>
    )
}

export default Team;