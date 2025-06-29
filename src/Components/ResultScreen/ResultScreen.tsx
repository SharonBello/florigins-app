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

const genderedTerms: Record<string, { pronoun: string; unique: string; sharing: string; adjectiveSuffix: string }> = {
    'אשה': { pronoun: 'את', unique: 'היחידה', sharing: 'אחת', adjectiveSuffix: 'ת' },
    'אשה טראנסית': { pronoun: 'את', unique: 'היחידה', sharing: 'אחת', adjectiveSuffix: 'ת' },
    'גבר': { pronoun: 'אתה', unique: 'היחיד', sharing: 'אחד', adjectiveSuffix: '' },
    'גבר טראנס': { pronoun: 'אתה', unique: 'היחיד', sharing: 'אחד', adjectiveSuffix: '' },
    'א-בינארי': { pronoun: 'את/ה', unique: 'היחיד/ה', sharing: 'אחד/ת', adjectiveSuffix: 'ת' },
    'ללא הגדרה': { pronoun: 'את/ה', unique: 'היחיד/ה', sharing: 'אחד/ת', adjectiveSuffix: 'ת' },
    'default': { pronoun: 'את/ה', unique: 'היחיד/ה', sharing: 'אחד/ת', adjectiveSuffix: 'ת' }
};

const politicalAdjectives: Record<string, string> = {
    'ימין': 'ימנית',
    'ימין מרכז': 'ימין-מרכז',
    'מרכז': 'מרכזית',
    'שמאל מרכז': 'שמאל-מרכז',
    'שמאל': 'שמאלנית',
};

function getCombinations<T>(arr: T[], size: number): T[][] {
    const result: T[][] = [];
    function combine(startIndex: number, combination: T[]) {
        if (combination.length === size) {
            result.push([...combination]);
            return;
        }
        for (let i = startIndex; i < arr.length; i++) {
            combination.push(arr[i]);
            combine(i + 1, combination);
            combination.pop();
        }
    }
    combine(0, []);
    return result;
}
const shuffleArray = <T,>(array: T[]): T[] => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

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
            if (!answers.id) {
                setDescription("לא התקבל מידע על הפרח.");
                return;
            }

            try {
                const querySnapshot = await getDocs(collection(db, "submittedFlowers"));
                const allOtherFlowers: Answers[] = [];
                querySnapshot.forEach((doc) => {
                    if (doc.id !== answers.id) {
                        allOtherFlowers.push({ id: doc.id, ...doc.data() });
                    }
                });

                if (allOtherFlowers.length === 0) {
                    setDescription('הפרח שלך הוא הראשון מסוגו במאגר!');
                    return;
                }

                const possibleTraits: (keyof Answers)[] = [
                    'origin_p1_grandpa', 'origin_p1_grandma', 'origin_p2_grandpa', 'origin_p2_grandma',
                    'childhoodEnvironment', 'favoriteCuisine', 'countryToLive', 'politicalView', 'diet', 'religion'
                ];

                const validUserTraits = possibleTraits.filter(trait => answers[trait]);
                let bestCombination: (keyof Answers)[] = [];
                let bestMatchCount = 0;

                const checkCombination = (traits: (keyof Answers)[]) => {
                    if (traits.length === 0) return 0;
                    return allOtherFlowers.filter(flower => {
                        return traits.every(trait => flower[trait] === answers[trait]);
                    }).length;
                };

                for (let comboSize = 3; comboSize >= 1; comboSize--) {
                    if (validUserTraits.length >= comboSize) {
                        const combinations = getCombinations(validUserTraits, comboSize);
                        const shuffledCombinations = shuffleArray(combinations);

                        for (const combination of shuffledCombinations) {
                            const count = checkCombination(combination);
                            if (count > 0) {
                                bestCombination = combination;
                                bestMatchCount = count;
                                break;
                            }
                        }
                    }
                    if (bestCombination.length > 0) {
                        break;
                    }
                }


                if (bestCombination.length > 0) {
                    const gender = (answers.genderIdentity as string) || 'default';
                    const terms = genderedTerms[gender] || genderedTerms.default;

                    const descriptivePhrases = bestCombination.map(trait => {
                        const question = findQuestion(trait as string)!;
                        const value = answers[trait] as string;
                        const valueDisplay = getDisplayValue(question, value);

                        if (trait.toString().includes('origin')) {
                            return `מוצא מ${valueDisplay}`;
                        }
                        if (trait === 'favoriteCuisine') {
                            return `חיבה למטבח ${valueDisplay}`;
                        }
                        if (trait === 'countryToLive') {
                            return `רצון לגור ב${valueDisplay}`;
                        }
                        if (trait === 'politicalView') {
                            const baseAdjective = politicalAdjectives[value] || value;
                            const finalAdjective = baseAdjective.endsWith('י')
                                ? baseAdjective.slice(0, -1) + terms.adjectiveSuffix
                                : baseAdjective;
                            return `השקפה פוליטית ${finalAdjective}`;
                        }
                        return valueDisplay;
                    });

                    const uniquePhrases = [...new Set(descriptivePhrases)];
                    const totalMatches = bestMatchCount + 1;

                    let finalSentence = '';

                     if (uniquePhrases.length === 1) {
                        const singleTraitDescription = uniquePhrases[0];
                         if (totalMatches <= 1) {
                            finalSentence = `${terms.pronoun} ${terms.unique} עם ${singleTraitDescription}.`;
                        } else {
                            finalSentence = `${terms.pronoun} ${terms.sharing} מתוך ${totalMatches} עם ${singleTraitDescription}.`;
                        }
                    } else {
                        // FIX: Manually construct the list string for perfect Hebrew grammar
                        const allButLast = uniquePhrases.slice(0, -1).join(', ');
                        const last = uniquePhrases.slice(-1)[0];
                        const traitsDescription = `${allButLast} ו${last}`;

                        if (totalMatches <= 1) {
                           finalSentence = `${terms.pronoun} ${terms.unique} עם השילוב של ${traitsDescription}.`;
                        } else {
                            finalSentence = `${terms.pronoun} ${terms.sharing} מתוך ${totalMatches} שחולקים את השילוב של ${traitsDescription}.`;
                        }
                    }
                    setDescription(finalSentence);
                } else {
                    setDescription('הפרח שלך ייחודי בדרכו שלו, לא מצאנו שילובים דומים במאגר!');
                }


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
