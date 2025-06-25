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

    const handleShare = async (): Promise<void> => {
        const container = flowerRef.current;
        if (!container) return;

        const svgEl = container.querySelector('svg') as SVGSVGElement | null;
        if (!svgEl) return;

        // Serialize SVG → string
        const serializer = new XMLSerializer();
        const svgString = serializer.serializeToString(svgEl);

        // Create Blob & Image
        const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
        const url = URL.createObjectURL(svgBlob);
        const img = new Image();

        img.onload = async (): Promise<void> => {
            const rect = svgEl.getBoundingClientRect();
            const width = rect.width;
            const height = rect.height;
            const headerHeight = 10;
            const scale = window.devicePixelRatio || 1;

            const canvas = document.createElement('canvas');
            canvas.width = width * scale;
            canvas.height = (height + headerHeight) * scale;
            canvas.style.width = `${width}px`;
            canvas.style.height = `${height + headerHeight}px`;

            const ctx = canvas.getContext('2d');
            if (!ctx) return;

            // Fill background
            ctx.fillStyle = '#F7F0E6';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Header text
            ctx.fillStyle = '#000000';
            ctx.font = `${24 * scale}px Heebo`;
            ctx.textAlign = 'center';

            // Draw "Florigins" (LTR)
            ctx.direction = 'ltr';
            ctx.fillText('Florigins', (width * scale) / 2, 70 * scale);

            // Draw name (RTL)
            // ctx.direction = 'rtl';
            // ctx.fillText((answers.name as string) || 'הפרח שלך', (width * scale) / 2, 40 * scale);

            // Draw SVG image below header
            ctx.scale(scale, scale);
            ctx.drawImage(img, 0, headerHeight, width, height);

            // Export PNG
            canvas.toBlob(async (blob) => {
                if (!blob) return;
                const file = new File([blob], 'flower.png', { type: 'image/png' });

                if (navigator.canShare?.({ files: [file] })) {
                    try {
                        await navigator.share({
                            files: [file],
                            title: `הפרח של ${answers.name || 'אלמוני'}`,
                            text: 'ראו את הפרח שיצרתי ב-Florigins!',
                        });
                    } catch (err) {
                        console.error('Share failed:', err);
                    }
                } else {
                    // fallback: download
                    const dlUrl = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = dlUrl;
                    a.download = 'flower.png';
                    a.click();
                    URL.revokeObjectURL(dlUrl);
                }

                URL.revokeObjectURL(url);
            }, 'image/png');
        };

        img.src = url;
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
