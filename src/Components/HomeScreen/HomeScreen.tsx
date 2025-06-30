import { useNavigate } from 'react-router-dom';
import { Button, Typography } from '@mui/material';
import './HomeScreen.scss';
import { Flower } from '../../Components/Flower/Flower';
import { useEffect, useState } from 'react';
import { db } from '../../../firebase';
import { collection, onSnapshot } from 'firebase/firestore';
import type { Answers } from '../../types/Answers';
import { HomePageFlowerIcon } from '../../assets/icons/HomePageFlowerIcon';


export const HomeScreen = () => {
    const navigate = useNavigate();
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const [allFlowers, setAllFlowers] = useState<Answers[]>([]);

    useEffect(() => {
        const flowersCollectionRef = collection(db, "submittedFlowers");

        const unsubscribe = onSnapshot(flowersCollectionRef, (querySnapshot) => {
            const flowersFromDb: Answers[] = [];
            querySnapshot.forEach((doc) => {
                flowersFromDb.push({ ...doc.data(), id: doc.id } as Answers);
            });

            // Ensure we only display unique flowers
            const uniqueFlowersMap = new Map<string, Answers>();
            flowersFromDb.forEach(flower => {
                const flowerDataForSignature = { ...flower };
                delete (flowerDataForSignature as any).id;
                const signature = JSON.stringify(flowerDataForSignature);

                if (!uniqueFlowersMap.has(signature)) {
                    uniqueFlowersMap.set(signature, flower);
                }
            });

            setAllFlowers(Array.from(uniqueFlowersMap.values()));
        });

        return () => unsubscribe();
    }, []);


    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const handleStart = () => {
        navigate('/form');
    };

    const handleGallery = () => {
        navigate('/gallery');
    };

    if (isMobile) {
        return (
            <div className="mobile-blocker-container" dir="rtl">
                <div className="homepage-flower-container">
                    <HomePageFlowerIcon />
                </div>
                <Typography className="mobile-blocker-message">
                    יש לפתוח את האפליקציה במחשב
                </Typography>
            </div>
        );
    }

    return (
        <div className="homepage-container" dir="rtl">
            <header className="home-header-container">
                <Typography className="app-name" dir="ltr">Florigins</Typography>
                <hr className="border" />
            </header>

            <main className="main-content">
                <div className="homepage-flower-container is-unfiltered">
                    {allFlowers.map((flower, index) => {
                        const angle = (index / allFlowers.length) * 2 * Math.PI;
                        const radius = Math.pow(Math.random(), 0.4) * Math.min(allFlowers.length * 12, 220);
                        const x = Math.cos(angle) * radius;
                        const y = Math.sin(angle) * radius;
                         const style: React.CSSProperties = {
                           transform: `translate(-50%, -50%) translate(${x}px, ${y}px) rotate(${(Math.random() - 0.5) * 35}deg)`,
                           zIndex: index,
                        };
                        return (
                           <div key={flower.id || index} className="homepage-flower-item" style={style}>
                                 <Flower answers={flower} viewBox="-20 -20 250 250" showTooltip={false} />
                           </div>
                        )
                    })}
                </div>
                <div className="btn-container">
                    <Button onClick={handleStart} className="homepage-button">צור פרח חדש</Button>
                    <Button onClick={handleGallery} className="homepage-button">מאגר הפרחים</Button>
                </div>
            </main>

            <footer className="footer-container">
                <hr className="border" />
            </footer>
        </div>
    );
};