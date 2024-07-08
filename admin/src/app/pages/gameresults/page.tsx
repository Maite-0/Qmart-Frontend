import React from 'react';
import { Row, Col, Avatar } from 'antd'; // Assuming you are using Ant Design for components
import styles from './GameResultList.module.scss';
import { GameResultsDto, SheduleDto } from '@/app/services/api';

interface GameResultListProps {
    gameresults: GameResultsDto[];
    setGameresultList: (gameresults: GameResultsDto[]) => void;
    handleItemClick: (gameresult: GameResultsDto, event: React.MouseEvent) => void;
}

const GameresultsList: React.FC<GameResultListProps> = ({ gameresults, setGameresultList, handleItemClick }) => {

    return (
        <>
            {gameresults?.map((gameresult, index) => (
                <div key={gameresult?.opponent} className={styles.wrap_container}>
                    <Row className={styles.row_container} onClick={(event) => handleItemClick(gameresult, event)}  >
                        <Col xs={3} sm={2} md={1} className={styles.column_container}></Col>
                        <Col xs={8} sm={5} md={4} className={styles.column_container1}>
                            <div className={styles.column_text}>{gameresult?.score}</div>
                        </Col>
                        <Col xs={8} sm={5} md={4} className={styles.column_text1}>
                            <div className={styles.column_text}>{gameresult?.date}</div>
                        </Col>
                        <Col xs={5} sm={4} md={3} className={styles.column_text1}>
                            <div className={styles.column_text}>{gameresult?.opponent}</div>
                        </Col>
                        <Col xs={5} sm={4} md={3} className={styles.column_text1}>
                            <div className={styles.column_text} style={{ paddingRight: '20px' }}>
                                <a href={gameresult?.highlights_url} target="_blank" rel="noopener noreferrer">
                                    Highlights
                                </a>
                            </div>
                        </Col>
                    </Row>

                </div>
            ))}
        </>
    );
};

export default GameresultsList;
