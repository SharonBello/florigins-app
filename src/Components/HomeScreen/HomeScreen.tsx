import { useNavigate } from 'react-router-dom';
import { HomePageFlower } from "../../assets/icons/HomePageFlower.tsx";
import { Button, Typography } from '@mui/material';
import './HomeScreen.scss';


export const HomeScreen = () => {
    const navigate = useNavigate();

    const handleStart = () => {
        navigate('/form');
    };

    return (
        <div className="homepage-container" dir="rtl">
            <header className="home-header-container">
                <Typography className="app-name" dir="ltr">Florigins</Typography>
                <hr className="border" />
            </header>

            <main className="main-content">
                <div className="flower-container">
                    <HomePageFlower />
                </div>
                <div className="btn-container">
                    <Button onClick={handleStart} className="homepage-button">צור פרח חדש</Button>
                    <Button className="homepage-button">מאגר הפרחים</Button>
                </div>
            </main>

            <footer className="footer-container">
                <hr className="border" />
            </footer>
        </div>
    );
};
