import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { Flower } from '../Flower/Flower';
import { useRef } from 'react';
import ShareIcon from '@mui/icons-material/Share';
import './ResultScreen.scss'

export const ResultScreen = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const answers = location.state?.answers || {};
    const flowerRef = useRef<HTMLDivElement>(null);

    const handleStartOver = () => {
        navigate('/form');
    };

    const handleGallery = () => {
        navigate('/gallery');
    };

    const handleShare = async () => {
        const shareData = {
            title: `הפרח של ${answers['name'] || 'אלמוני'}`,
            text: 'ראו את פרח המקורות שיצרתי ב-Florigins! בואו ליצור גם את שלכם.',
            url: window.location.href, // This will share the URL of the results page
        };

        if (navigator.share) {
            try {
                await navigator.share(shareData);
                console.log('Content shared successfully');
            } catch (err) {
                console.error('Error sharing:', err);
            }
        } else {
            // Fallback for desktop or browsers that don't support the Web Share API
            navigator.clipboard.writeText(shareData.url).then(() => {
                alert('הקישור לפרח הועתק! אפשר לשתף אותו עם חברים.');
            }, (err) => {
                console.error('Could not copy text: ', err);
                alert('לא ניתן להעתיק את הקישור.');
            });
        }
    };


    return (
        <>
            <div className="result-screen-container">
                <header className="result-header">
                    <div className="results-title-container">
                        <span className="result-title">{answers['name'] || 'הפרח שלך'}</span>
                        <span className="result-title" style={{ direction: 'ltr' }}>Florigins</span>
                    </div>
                    <hr className="results-border" />
                </header>

                <div ref={flowerRef} className="flower-display-container">
                    <Flower answers={answers} viewBox="-40 -50 280 280" />
                </div>

                <p className="result-description">
                    ...טקסט תיאור הפרח יוצג כאן
                </p>

                <div className="result-actions">
                    <div className="share-btn-container">
                        <Button onClick={handleShare} className="result-button" variant="outlined" startIcon={<ShareIcon />}>
                            שתף
                        </Button>
                    </div>
                    <div className="footer-btn-container">
                        <Button onClick={handleStartOver} className="result-button" variant="outlined">
                            צור פרח חדש
                        </Button>
                        <Button onClick={handleGallery} className="result-button" variant="outlined">
                            מאגר הפרחים
                        </Button>
                    </div>
                </div>
            </div>
            <hr className="results-border" />
        </>
    );
};
