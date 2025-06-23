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
        const container = flowerRef.current
        if (!container) return
        const svgEl = container.querySelector('svg') as SVGSVGElement | null
        if (!svgEl) return

        // Serialize SVG → string
        const serializer = new XMLSerializer()
        const svgString = serializer.serializeToString(svgEl)

        // Make a Blob+URL for <img>
        const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' })
        const url = URL.createObjectURL(svgBlob)
        const img = new Image()

        img.onload = async (): Promise<void> => {
            // 1) get rendered size
            const rect = svgEl.getBoundingClientRect()
            const width = rect.width
            const height = rect.height

            // 2) choose scale factor (for Retina, etc.)
            const scale = window.devicePixelRatio || 1

            // 3) setup a higher-res canvas
            const canvas = document.createElement('canvas')
            canvas.width = width * scale
            canvas.height = height * scale
            // keep CSS size correct
            canvas.style.width = `${width}px`
            canvas.style.height = `${height}px`

            const ctx = canvas.getContext('2d')
            if (!ctx) return

            // 4) scale the drawing context
            ctx.scale(scale, scale)
            ctx.drawImage(img, 0, 0, width, height)

            // 5) export to PNG
            canvas.toBlob(async (blob) => {
                if (!blob) return
                const file = new File([blob], 'flower.png', { type: 'image/png' })

                if (navigator.canShare?.({ files: [file] })) {
                    try {
                        await navigator.share({
                            files: [file],
                            title: `הפרח של ${answers.name || 'אלמוני'}`,
                            text: 'ראו את הפרח שיצרתי ב-Florigins!',
                        })
                    } catch (err) {
                        console.error('Share failed:', err)
                    }
                } else {
                    // fallback: download
                    const dlUrl = URL.createObjectURL(blob)
                    const a = document.createElement('a')
                    a.href = dlUrl
                    a.download = 'flower.png'
                    a.click()
                    URL.revokeObjectURL(dlUrl)
                }

                // cleanup
                URL.revokeObjectURL(url)
            }, 'image/png')
        }

        img.src = url
    }
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
