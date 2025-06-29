import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { Flower } from '../Flower/Flower';
import { useEffect, useRef, useState } from 'react';
import ShareIcon from '@mui/icons-material/Share';
import './ResultScreen.scss'
import type { Question } from '../../types/Question';
import { flowerDefinitions, questions } from '../../data/appData';
import type { Answers } from '../../types/Answers';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../firebase';

const traitDisplayNames: Record<string, string> = {
    origin_p1_grandpa: 'מוצא',
    origin_p1_grandma: 'מוצא',
    origin_p2_grandpa: 'מוצא',
    origin_p2_grandma: 'מוצא',
    childhoodEnvironment: 'סביבת ילדות',
    favoriteCuisine: 'מטבח אהוב',
    countryToLive: 'מדינת מגורים מועדפת',
    politicalView: 'השקפה פוליטית',
    diet: 'תזונה',
    religion: 'דת',
};

export const ResultScreen = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const answers = location.state?.answers || {};
    const flowerRef = useRef<HTMLDivElement>(null);
    const [description, setDescription] = useState('...טוען נתונים סטטיסטיים');

    const findQuestion = (id: string): Question | undefined => {
        return questions.find(q => q.id === id);
    }

    const getDisplayValue = (question: Question, value: string): string => {
        if (!value) return '';
        if (question.type.includes('_select')) {
            const definition = flowerDefinitions.find(def => def.country === value);
            if (definition) {
                switch (question.type) {
                    case 'country_select': return definition.countryHebrew;
                    case 'language_select': return definition.languageHebrew;
                    case 'cuisine_select': return definition.cuisineHebrew;
                    case 'culture_select': return definition.cultureHebrew;
                    default: return value;
                }
            }
        }
        return value;
    };

    useEffect(() => {
        const generateStats = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "submittedFlowers"));
                const allFlowers: Answers[] = [];
                querySnapshot.forEach((doc) => {
                    allFlowers.push({ id: doc.id, ...doc.data() });
                });

                if (allFlowers.length < 2) {
                    setDescription('הפרח שלך הוא הראשון מסוגו במאגר!');
                    return;
                }

                const primaryTraits: (keyof Answers)[] = ['origin_p1_grandpa', 'origin_p1_grandma', 'origin_p2_grandpa', 'origin_p2_grandma', 'childhoodEnvironment'];
                const secondaryTraits: (keyof Answers)[] = ['favoriteCuisine', 'countryToLive', 'politicalView', 'diet', 'religion'];

                const validPrimaryTraits = primaryTraits.filter(trait => answers[trait]);
                const validSecondaryTraits = secondaryTraits.filter(trait => answers[trait]);

                if (validPrimaryTraits.length === 0 || validSecondaryTraits.length < 2) {
                    setDescription('הפרח שלך ייחודי בדרכו שלו.');
                    return;
                }

                const primaryTrait = validPrimaryTraits[Math.floor(Math.random() * validPrimaryTraits.length)];

                const shuffledSecondary = validSecondaryTraits.sort(() => 0.5 - Math.random());
                const secondaryTrait1 = shuffledSecondary[0];
                const secondaryTrait2 = shuffledSecondary[1];

                const primaryValue = answers[primaryTrait];
                const secondaryValue1 = answers[secondaryTrait1];
                const secondaryValue2 = answers[secondaryTrait2];

                const primaryQuestion = findQuestion(primaryTrait as string);
                const secondaryQuestion1 = findQuestion(secondaryTrait1 as string);
                const secondaryQuestion2 = findQuestion(secondaryTrait2 as string);

                if (!primaryQuestion || !secondaryQuestion1 || !secondaryQuestion2) {
                    setDescription("טקסט תיאור הפרח יוצג כאן...");
                    return;
                }

                // FIX: Use the new display name mapping
                const primaryTraitDisplay = traitDisplayNames[primaryTrait as string] || primaryQuestion.label;
                const secondaryTrait1Display = traitDisplayNames[secondaryTrait1 as string] || secondaryQuestion1.label;
                const secondaryTrait2Display = traitDisplayNames[secondaryTrait2 as string] || secondaryQuestion2.label;

                const primaryDisplay = getDisplayValue(primaryQuestion, primaryValue as string);
                const secondaryDisplay1 = getDisplayValue(secondaryQuestion1, secondaryValue1 as string);
                const secondaryDisplay2 = getDisplayValue(secondaryQuestion2, secondaryValue2 as string);

                const totalWithPrimaryTrait = allFlowers.filter(flower => flower[primaryTrait] === primaryValue).length;
                const matchingSubset = allFlowers.filter(flower =>
                    flower[primaryTrait] === primaryValue &&
                    flower[secondaryTrait1] === secondaryValue1 &&
                    flower[secondaryTrait2] === secondaryValue2
                ).length;

                let finalSentence = '';
                if (matchingSubset <= 1) {
                    if (totalWithPrimaryTrait <= 1) {
                        finalSentence = `את/ה היחיד/ה עם ${primaryTraitDisplay} של ${primaryDisplay} וגם היחיד/ה שאוהב/ת ${secondaryTrait1Display} (${secondaryDisplay1}) ו${secondaryTrait2Display} (${secondaryDisplay2}).`;
                    } else {
                        finalSentence = `מבין ${totalWithPrimaryTrait} אנשים עם ${primaryTraitDisplay} של ${primaryDisplay}, את/ה היחיד/ה שאוהב/ת גם ${secondaryTrait1Display} (${secondaryDisplay1}) וגם ${secondaryTrait2Display} (${secondaryDisplay2}).`;
                    }
                } else {
                    finalSentence = `מבין ${totalWithPrimaryTrait} אנשים עם ${primaryTraitDisplay} של ${primaryDisplay}, את/ה אחד/ת מתוך ${matchingSubset} שחולקים אהבה ל${secondaryTrait1Display} (${secondaryDisplay1}) וגם ל${secondaryTrait2Display} (${secondaryDisplay2}).`;
                }

                setDescription(finalSentence);

            } catch (error) {
                console.error("Error generating stats: ", error);
                setDescription('...לא ניתן היה לטעון נתונים סטטיסטיים');
            }
        };

        generateStats();
    }, [answers]);

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
                    <Flower answers={answers} viewBox="-50 -40 300 300" />
                </div>

                <p className="result-description">
                    {description}
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
                <hr className="results-border" />
            </div>
        </>
    );
};
