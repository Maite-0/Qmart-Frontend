"use client"
import React, {useEffect, useState } from 'react';
import { Col, Flex, Layout, Row } from 'antd';
import styles from './Main.module.scss';
import { useShedule } from '@/app/services/providers/sheduleProvider';
import { GameResultsDto, SheduleDto } from '@/app/services/api';
import SheduleList from '../gameshedules/page';
import { useGameResult } from '@/app/services/providers/gameResultsProvider';
import GameresultsList from '../gameresults/page';
import ProfileList from '../playerprofiles/page';
import { useProfile } from '@/app/services/providers/playerProfileProvider';


const { Header, Content } = Layout;

const App: React.FC = () => {
    const [value, setValue] = React.useState<string>('horizontal');
    const [gameresultList, setGameresultList] = useState([]);
    const [sheduleList, setSheduleList] = useState([]);
    const [profileList, setProfileList] = useState([]);
    const [toggleOption, setToggleOption] = useState<string>('Match Shedules');
    const { getAllShedules, shedules } = useShedule();
    const {getPlayerProfiles,profileresults} = useProfile();
    const { gameresults, getAllGameResults } = useGameResult();
    const [selectedGameResult, setSelectedGameResult] = useState<GameResultsDto | null>(null);
    const [selectedShedule, setSelectedShedule] = useState<SheduleDto | null>(null);

    const handleItemSelect = (gameresult: GameResultsDto, event: React.MouseEvent) => {
        setSelectedGameResult(gameresult);
        event.stopPropagation()
    }

    const handleSheduleItemSelect = (shedule: SheduleDto, event: React.MouseEvent) => {
        setSelectedShedule(shedule);
        event.stopPropagation()
    }

    useEffect(() => {
        getAllShedules();
        getAllGameResults();
        getPlayerProfiles();
    }, [])

    useEffect(() => {
        if (shedules?.state === 'success') {
            setSheduleList(shedules?.value);
        }
        if (gameresults?.state === 'success') {
            setGameresultList(gameresults?.value);
        }
        if(profileresults?.state === 'success'){
            setProfileList(profileresults?.value);
        }
    }, [shedules]);

    return (
        <Layout className={styles.layout}>
            <Header style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <p style={{ color: 'white', fontSize: '20px' }}>Soccer Zone </p>
            </Header>

            <Header style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '0.%', marginBottom: '0.2%' }}>
                <Col style={{ width: '85%', display: 'flex', flexDirection: 'row', gap: '80px', color: 'white', marginLeft: '15%' }}>
                    <p onClick={() => setToggleOption('Match Shedules')} style={{ cursor: 'pointer' }}>Match Shedules</p>
                    <p onClick={() => setToggleOption('Match Results')} style={{ cursor: 'pointer' }}>Match Results</p>
                    <p onClick={() => setToggleOption('Player Profiles')} style={{ cursor: 'pointer' }}>Player Profiles</p>

                </Col>

            </Header>

            <Content className={styles.content}>

                <div className={styles.main_container}
                >
                    <Flex gap="middle" vertical>

                        <Flex vertical={value === 'vertical'} className={styles.flex_container}>
                            <Row className={styles.flex_container2}>
                                <Col style={{ width: '100%', height: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <div className={styles.shedules_text1}>{toggleOption}</div>
                                </Col>

                            </Row>
                        </Flex>
                        <div className={styles.person_list}>
                            {
                                toggleOption === 'Match Shedules' ? (
                                    <SheduleList
                                        shedules={sheduleList}
                                        setSheduleList={setSheduleList}
                                        handleItemClick={handleSheduleItemSelect}
                                    />
                                ) : toggleOption === 'Match Results' ? (
                                    <GameresultsList
                                        gameresults={gameresultList}
                                        setGameresultList={setGameresultList}
                                        handleItemClick={handleItemSelect}
                                    />
                                ) : (
                                    <ProfileList
                                        profiles={profileList}
                                        handleItemClick={() => { }}
                                    />
                                )
                            }

                        </div>
                    </Flex>
                </div>

            </Content>
        </Layout>
    );
};

export default App;