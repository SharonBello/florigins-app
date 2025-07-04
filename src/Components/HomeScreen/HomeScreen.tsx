import { useNavigate } from 'react-router-dom';
import { Button, Typography } from '@mui/material';
import './HomeScreen.scss';
import { useEffect, useState } from 'react';
import homePageVideo from '../../assets/icons/homePageVideo.mp4';

export const HomeScreen = () => {
    const navigate = useNavigate();
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

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
                    <video
                        className="homepage-video"
                        src={homePageVideo}
                        autoPlay
                        loop
                        muted
                        playsInline
                    />
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
                <div className="homepage-flower-container">
                    <video
                        className="homepage-video"
                        src={homePageVideo}
                        autoPlay
                        loop
                        muted
                        playsInline
                    />
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