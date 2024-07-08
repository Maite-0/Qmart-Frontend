import React from 'react';
import { Row, Col, Avatar } from 'antd'; // Assuming you are using Ant Design for components
import styles from './ProfileList.module.scss';
import {PlayerProfileDto } from '@/app/services/api';
import Image from 'next/image';


interface PlayerProfileListProps {
    profiles: PlayerProfileDto[];
    handleItemClick: (gameresult: PlayerProfileDto, event: React.MouseEvent) => void;
}

const ProfileList: React.FC<PlayerProfileListProps> = ({ profiles, handleItemClick }) => {

    return (
        <>
            {profiles?.map((profile, index) => (
                <div key={profile?.name} className={styles.wrap_container}>
                    <Row className={styles.row_container} onClick={(event) => handleItemClick(profile, event)}  >
                        <Col xs={3} sm={2} md={1} className={styles.column_container}></Col>
                        <Col xs={8} sm={5} md={4} className={styles.column_container1}>
                        <Col xs={5} sm={4} md={3} className={styles.column_text1}>
                            <div className={styles.column_text}>
                                {/* <Image src={profile?.google_image_url} alt={profile?.name} width={100} height={100} /> */}
                            </div>
                        </Col>
                            <div className={styles.column_text}>{profile?.name}</div>
                        </Col>
                        <Col xs={8} sm={5} md={4} className={styles.column_text1}>
                            <div className={styles.column_text}>{profile?.age}</div>
                        </Col>
                        <Col xs={5} sm={4} md={3} className={styles.column_text1}>
                            <div className={styles.column_text}>{profile?.position}</div>
                        </Col>
                        <Col xs={5} sm={4} md={3} className={styles.column_text1}>
                            <div className={styles.column_text}>{profile?.rank}</div>
                        </Col>
                        <Col xs={5} sm={4} md={3} className={styles.column_text1}>
                            <div className={styles.column_text}>{profile?.start_date}</div>
                        </Col>
                        <Col xs={5} sm={4} md={3} className={styles.column_text1}>
                            <div className={styles.column_text}>{profile?.start_date}</div>
                        </Col>
                    </Row>

                </div>
            ))}
        </>
    );
};

export default ProfileList;
