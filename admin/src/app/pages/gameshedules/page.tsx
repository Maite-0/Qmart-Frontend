import React from 'react';
import { Row, Col, Avatar } from 'antd'; // Assuming you are using Ant Design for components
import styles from './SheduleList.module.scss';
import { SheduleDto } from '@/app/services/api';

interface SheduleListProps {
    shedules: SheduleDto[];
    setSheduleList: (persons: SheduleDto[]) => void;
    handleItemClick: (person: SheduleDto,event: React.MouseEvent) => void;
}

const SheduleList: React.FC<SheduleListProps> = ({ shedules,setSheduleList ,handleItemClick}) => {

    return (
        <>
            {shedules?.map((shedule, index) => (
                <div key={shedule?.opponent} className={styles.wrap_container}>
                    <Row className={styles.row_container} onClick={(event)=>handleItemClick(shedule,event)}  >
                        <Col xs={3} sm={2} md={1} className={styles.column_container}>
                       
                        </Col>
                        <Col xs={8} sm={5} md={4} className={styles.column_container1}>
                            <div className={styles.column_text}>{shedule?.opponent}</div>
                        </Col>
                        <Col xs={8} sm={5} md={4} className={styles.column_text1}>
                            <div className={styles.column_text}>{shedule?.time}</div>
                        </Col>
                        <Col xs={5} sm={4} md={3} className={styles.column_text1}>
                            <div className={styles.column_text}>{shedule?.date}</div>
                        </Col>
                        <Col xs={5} sm={4} md={3} className={styles.column_text1}>
                            <div className={styles.column_text}>{shedule?.venue}</div>
                        </Col>
                    </Row>
                    
                </div>
            ))}
        </>
    );
};

export default SheduleList;
