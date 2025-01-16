import { InviteUser, Settings, User1Foto, User2Foto, User3Foto, User4Foto } from "assets/images";
import { useState } from "react";
import styles from "../Settings.module.scss";
import TeamItem from "./TeamItem";



const Team = () => {
    const [members, setMembers] = useState([

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
    return (
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
                <div className={styles.team_invite}>
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
    )
}

export default Team;