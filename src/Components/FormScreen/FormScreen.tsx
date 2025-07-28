import React, { forwardRef, useEffect, useRef, useState, type ReactElement } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'
import { flowerDefinitions, questions } from '../../data/appData';
import type { Answers } from '../../types/Answers';
import { Flower } from '../Flower/Flower';
import { FormStep } from '../FormStep/FormStep';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Button, IconButton, Typography } from '@mui/material';
import './FormScreen.scss';
import type { Question } from '../../types/Question';
import { db } from '../../../firebase';
import { collection, addDoc } from 'firebase/firestore';

interface PrintableFlowerProps {
    answers: Answers;
    summary: string;
}

type LocationState = {
    answers?: Answers;
    source?: 'gallery';
}

const PrintableFlower = forwardRef<HTMLDivElement, PrintableFlowerProps>(
    ({ answers, summary }, ref): ReactElement => (
        <div className="print-layout" ref={ref}>
            <header className="print-header">
                <Typography style={{ fontFamily: 'Heebo' }}>
                    {(answers.name as string) || 'הפרח שלך'}
                </Typography>
                <Typography dir="ltr">Florigins</Typography>
            </header>
            <div className="print-flower-container">
                <Flower answers={answers} viewBox="-40 -60 380 360" />
            </div>
            <footer className="print-footer">
                <Typography className="summary-text">{summary}</Typography>
            </footer>
        </div>
    )
);

PrintableFlower.displayName = 'PrintableFlower';

export const FormScreen: React.FC = (): ReactElement => {
    const navigate = useNavigate();
    const location = useLocation()
    const state = (location.state as LocationState) ?? {}
    const [answers, setAnswers] = useState<Answers>(state.answers ?? {})
    const printableRef = useRef<HTMLDivElement>(null);
    const displayRef = useRef<HTMLDivElement>(null);
    const cameFromGallery = state.source === 'gallery';
    const backLabel: string = cameFromGallery ? 'למאגר' : 'חזרה';

    useEffect((): void => {
        if (state.answers) {
            setAnswers(state.answers)
        }
    }, [state.answers])

    const handleBack = (): void => {
        if (cameFromGallery) {
            navigate('/gallery');
        } else {
            navigate('/');
        }
    };

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

    const allQuestionsAnswered: boolean = questions.filter((q) => q.id !== 'name' && q.id !== 'belonging').every((q) => {
        const ans = answers[q.id];
        if (typeof ans === 'number') return true;
        if (typeof ans === 'string') return ans.trim() !== '';
        return Boolean(ans);
    });

    const handleFinishAndNavigate = async (): Promise<void> => {
        if (!allQuestionsAnswered && !cameFromGallery) return;
        if (cameFromGallery) {
            // SCENARIO 1: Came from Gallery.
            navigate('/results', {
                state: { answers: answers },
                replace: true
            });
        } else {
            // SCENARIO 2: Creating a new flower.
            try {
                const docRef = await addDoc(collection(db, 'submittedFlowers'), answers);
                const updatedAnswers = { ...answers, id: docRef.id };
                navigate('/results', {
                    state: { answers: updatedAnswers },
                    replace: true
                });

            } catch (e) {
                console.error('Error saving flower:', e);
                alert('שגיאה בשמירת הפרח. אנא נסה שוב.');
            }
        }
    };

    const handleReset = (): void => {
        setAnswers({});
    };

    const handleAnswerChange = (questionId: string, value: unknown): void => {
        setAnswers((prev) => ({ ...prev, [questionId]: value }));
    };

    function findQuestion(id: string): Question {
        const q = questions.find((q) => q.id === id);
        if (!q) {
            throw new Error(`Question with id "${id}" not found.`);
        }
        return q;
    }
    const belongingQuestion: Question = findQuestion('belonging');

    return (
        <div className="form-screen-container">
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
                    letter-spacing: 0.2em;
                    color: #333;
                }

                .print-flower-container {
                    flex-grow: 1;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-bottom: 1px solid #ccc;
                    padding-bottom: 1rem;
                }

                .print-flower-container svg {
                    width: 100%;
                    height: 100%;
                }

                .print-footer {
                    width: 100%;
                    padding-top: 0.5rem;
                    border-top: none;
                    text-align: center;
                }

                .summary-text {
                    font-family: 'Heebo', sans-serif;
                    font-size: 14pt;
                    letter-spacing: 0.05em;
                    color: #333;
                }
            `}
            </style>
            {/* Off-screen printable layout */}
            <div className="offscreen-print-wrapper">
                <PrintableFlower
                    ref={printableRef}
                    answers={answers}
                    summary={summaryString}
                />
            </div>

            {/* Your existing form panel */}
            <div className="form-panel">
                <section className="form-header">
                    <div onClick={handleBack} className="back-button">
                        <article className="back-icon-container">
                            <span>{backLabel}</span>
                            <IconButton
                                className="back-icon-button"
                                size="small"
                                aria-label={cameFromGallery ? 'back to gallery' : 'back to home'}
                            >
                                <ArrowBackIcon />
                            </IconButton>
                        </article>
                    </div>
                </section>
                <hr className="section-divider" />

                <main className="form-main-content">
                    {/* 1) Name */}
                    <div className="form-name-section">
                        <FormStep question={findQuestion('name')} value={answers['name']} onChange={(v) => handleAnswerChange('name', v)} />
                    </div>
                    <hr className="section-divider" />

                    {/* 2) Gender Identity */}
                    <div className="form-genderId-section">
                        <h3 className="section-title">זהות מגדרית</h3>
                        <FormStep question={findQuestion('genderIdentity')} value={answers['genderIdentity']} onChange={(v) => handleAnswerChange('genderIdentity', v)} showLabel={false} />
                    </div>
                    <hr className="section-divider" />

                    {/* 3) Origins */}
                    <div className="form-legacy-country-section">
                        <h3 className="section-title">מוצא</h3>
                        <FormStep question={findQuestion('origin_p1_grandpa')} value={answers['origin_p1_grandpa']} onChange={(v) => handleAnswerChange('origin_p1_grandpa', v)} />
                        <FormStep question={findQuestion('origin_p1_grandma')} value={answers['origin_p1_grandma']} onChange={(v) => handleAnswerChange('origin_p1_grandma', v)} />
                        <FormStep question={findQuestion('origin_p2_grandpa')} value={answers['origin_p2_grandpa']} onChange={(v) => handleAnswerChange('origin_p2_grandpa', v)} />
                        <FormStep question={findQuestion('origin_p2_grandma')} value={answers['origin_p2_grandma']} onChange={(v) => handleAnswerChange('origin_p2_grandma', v)} />
                    </div>
                    <hr className="section-divider" />

                    {/* 4) Belonging */}
                    <div className="form-belonging-section">
                        <h3 className="section-title">שייכות</h3>
                        <FormStep question={belongingQuestion} value={answers['belonging']} onChange={v => handleAnswerChange('belonging', v)}
                            showLabel={true}
                        />
                    </div>
                    <hr className="section-divider" />

                    {/* Section: שייכות & other single questions */}
                    {['countryToLive', 'languageToSpeak', 'favoriteCuisine', 'cultureToBelong'].map((id, index, arr) => {
                        const question = findQuestion(id);
                        return (
                            <React.Fragment key={id}>
                                <div className={`${arr[index]}`}>
                                    <FormStep question={question} value={answers[id]} onChange={(v) => handleAnswerChange(id, v)} showLabel={true} />
                                </div>
                                {index < arr.length - 1 && <hr className="section-divider" />}
                            </React.Fragment>
                        )
                    })}
                    <hr className="section-divider" />
                    {/* Section: סביבה*/}
                    {['childhoodEnvironment'].map((id) => {
                        const question = findQuestion(id);
                        return (
                            <div key={id} className="form-childhoodEnvironment-section">
                                <h3 className="section-title">{question.label}</h3>
                                <FormStep question={findQuestion('childhoodEnvironment')} value={answers['childhoodEnvironment']} onChange={(v) => handleAnswerChange('childhoodEnvironment', v)} showLabel={false} />
                            </div>
                        )
                    })}
                    <hr className="section-divider" />

                    {/* Section: נטייה מינית*/}
                    {['sexualOrientation'].map((id) => {
                        const question = findQuestion(id);
                        return (
                            <div key={id} className="form-sexualOrientation-section">
                                <h3 className="section-title">{question.label}</h3>
                                <FormStep question={findQuestion('sexualOrientation')} value={answers['sexualOrientation']} onChange={(v) => handleAnswerChange('sexualOrientation', v)} showLabel={false} />
                            </div>
                        )
                    })}
                    <hr className="section-divider" />

                    {/* Section:  דת*/}
                    {['religion'].map((id) => {
                        const question = findQuestion(id);
                        return (
                            <div key={id} className="form-religion-section">
                                <h3 className="section-title">{question.label}</h3>
                                <FormStep question={findQuestion('religion')} value={answers['religion']} onChange={(v) => handleAnswerChange('religion', v)} showLabel={false} />
                            </div>
                        )
                    })}
                    <hr className="section-divider" />

                    {/* Section:  פוליטיקה*/}
                    {['politicalView'].map((id) => {
                        const question = findQuestion(id);
                        return (
                            <div key={id} className="form-politicalView-section">
                                <h3 className="section-title">{question.label}</h3>
                                <FormStep question={findQuestion('politicalView')} value={answers['politicalView']} onChange={(v) => handleAnswerChange('politicalView', v)} showLabel={false} />
                            </div>
                        )
                    })}
                    <hr className="section-divider" />

                    {/* Section:  תזונה*/}
                    {['diet'].map((id) => {
                        const question = findQuestion(id);
                        return (
                            <div key={id} className="form-diet-section">
                                <h3 className="section-title">{question.label}</h3>
                                <FormStep question={findQuestion('diet')} value={answers['diet']} onChange={(v) => handleAnswerChange('diet', v)} showLabel={false} />
                            </div>
                        )
                    })}
                    <hr className="section-divider" />
                </main>

                <div className="form-footer">
                    <Button onClick={handleReset} className="reset-form-button">
                        התחל מחדש
                    </Button>
                    <div className='print-container'>
                        <Typography variant="caption" className={`validation-message ${allQuestionsAnswered ? 'is-hidden' : ''}`}>
                            יש למלא את כל השדות כדי להמשיך
                        </Typography>

                        <Button
                            onClick={handleFinishAndNavigate}
                            className="gotToResults-button"
                            disabled={!allQuestionsAnswered}
                        >
                            סיום
                        </Button>
                    </div>
                </div>
            </div>

            {/* On-screen flower preview */}
            <div className="flower-panel">
                <header className="form-header-container">
                    <div className='header-title-container'>
                        <Typography className="creator-name">
                            {answers.name as string}
                        </Typography>
                        <Typography className="app-name" dir="ltr">Florigins</Typography>
                    </div>
                    <hr className="form-border" />
                </header>
                <div ref={displayRef} className="flower-display-wrapper">
                    <Flower answers={answers} viewBox="-100 -90 390 390" />
                    <div className="form-footer-container screen-only">
                        <hr className="form-border" />
                    </div>
                </div>
            </div>
        </div>
    );
};
