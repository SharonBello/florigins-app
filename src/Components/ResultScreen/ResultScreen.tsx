import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { Flower } from '../Flower';

export const ResultScreen = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const answers = location.state?.answers || {};

    const handleReset = () => {
        navigate('/form');
    };

    return (
        <div className="w-full h-full flex flex-col items-center justify-center text-center animate-fade-in p-8" dir="rtl">
            <h1 className="text-4xl font-light mb-2">הפרח של {answers['name'] || 'אלמוני'}</h1>
            <div className="my-8 w-80 h-80">
                <Flower answers={answers} />
            </div>
            <p className="max-w-md mx-auto text-lg mb-8">
                ...טקסט תיאור הפרח יוצג כאן
            </p>
            <div className="flex gap-4">
                <Button onClick={handleReset} className="homepage-button" variant="outlined">
                    צור פרח חדש
                </Button>
                <Button className="homepage-button" variant="contained" color="primary">
                    שתף
                </Button>
            </div>
        </div>
    );
};