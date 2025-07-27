import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { Flower } from '../Flower/Flower';
import { forwardRef, memo, useCallback, useEffect, useMemo, useRef, useState, type ReactElement } from 'react';
import ShareIcon from '@mui/icons-material/Share';
import './ResultScreen.scss'
import type { Question } from '../../types/Question';
import { flowerDefinitions, questions } from '../../data/appData';
import type { Answers } from '../../types/Answers';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../firebase';
import html2canvas from 'html2canvas';

interface PrintableFlowerProps {
    answers: Answers;
    summary: string;
}

const PrintableFlower = memo(forwardRef<HTMLDivElement, PrintableFlowerProps>(
    ({ answers, summary }, ref): ReactElement => (
        <div className="print-layout" ref={ref}>
            <header className="print-header">
                <span style={{ fontFamily: 'Heebo' }}>
                    {(answers.name as string)}
                </span>
                <span dir="ltr">Florigins</span>
            </header>
            <div className="print-flower-container">
                <Flower answers={answers} viewBox="-40 -60 380 360" />
            </div>
            <footer className="print-footer">
                <span className="summary-text">{summary}</span>
            </footer>
        </div>
    )
));

PrintableFlower.displayName = 'PrintableFlower';

const genderedTerms: Record<string, { pronoun: string; unique: string; sharing: string; adjectiveSuffix: string }> = {
    'אשה': { pronoun: 'את', unique: 'היחידה', sharing: 'אחת', adjectiveSuffix: 'ת' },
    'אשה טראנסית': { pronoun: 'את', unique: 'היחידה', sharing: 'אחת', adjectiveSuffix: 'ת' },
    'גבר': { pronoun: 'אתה', unique: 'היחיד', sharing: 'אחד', adjectiveSuffix: '' },
    'גבר טראנס': { pronoun: 'אתה', unique: 'היחיד', sharing: 'אחד', adjectiveSuffix: '' },
    'א-בינארי': { pronoun: 'את/ה', unique: 'היחיד/ה', sharing: 'אחד/ת', adjectiveSuffix: 'ת' },
    'ללא הגדרה': { pronoun: 'את/ה', unique: 'היחיד/ה', sharing: 'אחד/ת', adjectiveSuffix: 'ת' },
    'default': { pronoun: 'את/ה', unique: 'היחיד/ה', sharing: 'אחד/ת', adjectiveSuffix: 'ת' }
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
    const answers = useMemo(() => location.state?.answers || {}, [location.state?.answers]);
    const flowerRef = useRef<HTMLDivElement>(null);
    const printableRef = useRef<HTMLDivElement>(null);
    const [description, setDescription] = useState('...טוען נתונים סטטיסטיים');
    // const [isPrinting, setIsPrinting] = useState<boolean>(false);

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
                    'favoriteCuisine', 'countryToLive', 'diet'
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

    const summaryString: string = questions.map((q): string | null => {
        if (q.id === 'name' || q.id === 'belonging') return null;
        const ans = answers[q.id];
        if (!ans) return null;
        if (typeof ans === 'string' && ans.trim() === '') return null;

        if (q.type.includes('_select')) {
            const def = flowerDefinitions.find((d) => d.country === ans);
            if (def) {
                switch (q.type) {
                    case 'country_select':
                        return def.countryHebrew;
                    case 'language_select':
                        return def.languageHebrew;
                    case 'cuisine_select':
                        return def.cuisineHebrew;
                    case 'culture_select':
                        return def.cultureHebrew;
                }
            }
        }

        return String(ans);
    }).filter((s): s is string => Boolean(s)).join(' * ');

    // const printWithCanvasCapture = useCallback(async (): Promise<void> => {
    //     const printContent = printableRef.current;
    //     if (!printContent) return;

    //     try {
    //         // Create a very small loading indicator that doesn't interfere
    //         const miniLoader = document.createElement('div');
    //         miniLoader.style.cssText = `
    //         position: fixed; top: 10px; right: 10px; background: #333; color: white;
    //         padding: 4px 8px; border-radius: 3px; font-size: 12px; z-index: 10000;
    //     `;
    //         miniLoader.textContent = 'מכין...';
    //         document.body.appendChild(miniLoader);

    //         // Wait a moment for SVG to be ready
    //         await new Promise(resolve => setTimeout(resolve, 200));

    //         // Capture the print area as image
    //         const canvas = await html2canvas(printContent, {
    //             scale: 2,
    //             useCORS: true,
    //             backgroundColor: '#F7F0E6',
    //             width: printContent.scrollWidth,
    //             height: printContent.scrollHeight,
    //         });

    //         const imgDataUrl = canvas.toDataURL('image/png');

    //         // Remove loader
    //         document.body.removeChild(miniLoader);

    //         const printWindow = window.open('', '_blank');
    //         if (!printWindow) {
    //             alert('Popup נחסם! אנא אפשר popups להדפסה.');
    //             return;
    //         }

    //         printWindow.document.write(`
    //         <!DOCTYPE html>
    //         <html>
    //         <head>
    //             <title>הדפסה - ${(answers.name as string) || 'Florigins'}</title>
    //             <style>
    //                 @page { size: A4 landscape; margin: 0; }
    //                 body { margin: 0; padding: 0; display: flex; justify-content: center; align-items: center; min-height: 100vh; }
    //                 img { max-width: 100%; max-height: 100%; width: auto; height: auto; }
    //                 @media print { body { margin: 0; padding: 0; } img { width: 100vw; height: 100vh; object-fit: contain; } }
    //             </style>
    //         </head>
    //         <body>
    //             <img src="${imgDataUrl}" alt="Flower Print" />
    //             <script>
    //                 let printAttempted = false;
    //                 function attemptPrint() {
    //                     if (printAttempted) return;
    //                     printAttempted = true;
    //                     try {
    //                         window.focus();
    //                         window.print();
    //                     } catch (e) {
    //                         console.log('Print failed:', e);
    //                     }
    //                 }
    //                 window.onafterprint = () => setTimeout(() => window.close(), 500);
    //                 window.onload = () => setTimeout(attemptPrint, 800);
    //                 document.addEventListener('keydown', (e) => {
    //                     if (e.key === 'Escape') window.close();
    //                 });
    //                 window.focus();
    //             </script>
    //         </body>
    //         </html>
    //     `);

    //         printWindow.document.close();

    //     } catch (error) {
    //         console.error('Canvas print failed:', error);
    //         alert('ההדפסה נכשלה. אנא נסה שוב.');
    //     }
    // }, [answers]);

    const printViaIframe = useCallback(async (): Promise<void> => {
        const printContent = printableRef.current;
        if (!printContent) return;

        try {
            const miniLoader = document.createElement('div');
            miniLoader.style.cssText = `
            position: fixed; top: 10px; right: 10px; background: #333; color: white;
            padding: 4px 8px; border-radius: 3px; font-size: 12px; z-index: 10000;
        `;
            miniLoader.textContent = 'מכין...';
            document.body.appendChild(miniLoader);

            await new Promise(resolve => setTimeout(resolve, 300));

            const canvas = await html2canvas(printContent, {
                scale: 2,
                useCORS: true,
                backgroundColor: '#F7F0E6',
                allowTaint: false,
                foreignObjectRendering: false,
                width: printContent.scrollWidth,
                height: printContent.scrollHeight,
            });

            const imgDataUrl = canvas.toDataURL('image/png');
            document.body.removeChild(miniLoader);

            // Create hidden iframe
            const iframe = document.createElement('iframe');
            iframe.style.cssText = 'position: absolute; left: -9999px; top: -9999px; width: 1px; height: 1px;';
            document.body.appendChild(iframe);

            const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
            if (iframeDoc) {
                iframeDoc.open();
                iframeDoc.write(`
                <!DOCTYPE html>
                <html>
                <head>
                    <title>הדפסה - ${(answers.name as string) || 'Florigins'}</title>
                    <style>
                        @page { size: A4 landscape; margin: 0; }
                        * { margin: 0; padding: 0; box-sizing: border-box; }
                        body { margin: 0; padding: 0; background: white; }
                        img { width: 100vw; height: 100vh; object-fit: contain; display: block; }
                    </style>
                </head>
                <body>
                    <img src="${imgDataUrl}" alt="Flower Print" />
                </body>
                </html>
            `);
                iframeDoc.close();

                // Print from iframe
                setTimeout(() => {
                    try {
                        iframe.contentWindow?.focus();
                        iframe.contentWindow?.print();

                        // Clean up after print
                        setTimeout(() => {
                            document.body.removeChild(iframe);
                        }, 2000);
                    } catch (e) {
                        console.log('Iframe print failed:', e);
                        document.body.removeChild(iframe);
                    }
                }, 800);
            }

        } catch (error) {
            console.error('Print failed:', error);
            alert('ההדפסה נכשלה. אנא נסה שוב.');
        }
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
            <style>
                {`
                .offscreen-print-wrapper {
                    position: absolute;
                    left: -9999px;
                    top: 0;
                    width: 297mm;
                    height: 210mm;
                    overflow: visible; 
                }

                .print-layout {
                    width: 297mm;
                    min-height: 210mm;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    align-items: center;
                    padding: 15mm;
                    box-sizing: border-box;
                    background-color: #F7F0E6;
                    border: 3px solid #000000;
                    overflow: visible;
                }

                .print-header {
                    width: 100%;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding-bottom: 0.5rem;
                    border-bottom: 1px solid #ccc;
                    font-family: 'Heebo', sans-serif;
                    font-size: 16pt;
                    letter-spacing: 0.2em;
                    color: #333;
                    margin-bottom: 1rem;
                }

                .print-flower-container {
                    flex-grow: 1;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 100%;
                    min-height: 300px;
                    padding: 20px 0;
                }

                .print-flower-container svg {
                    width: 100%;
                    height: 100%;
                    max-width: 400px;
                    max-height: 400px;
                    display: block;
                }

                .print-footer {
                    width: 100%;
                    padding-top: 0.5rem;
                    border-top: 1px solid #ccc;
                    text-align: center;
                    margin-top: 1rem;
                }

                .summary-text {
                    font-family: 'Heebo', sans-serif;
                    font-size: 14pt;
                    letter-spacing: 0.05em;
                    color: #333;
                    line-height: 1.3;
                }
            `}
            </style>
            <div className="offscreen-print-wrapper">
                <PrintableFlower
                    ref={printableRef}
                    answers={answers}
                    summary={summaryString}
                />
            </div>
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
                        {/* <Button
                            onClick={printWithCanvasCapture}
                            className="result-button"
                            variant="outlined"
                        >
                            🖨️ הדפס
                        </Button> */}

                        <Button onClick={printViaIframe} className="result-button" variant="outlined">
                            הדפס
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
