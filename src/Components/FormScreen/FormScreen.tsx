import { useRef, useState, type JSX } from 'react';
import { useNavigate } from 'react-router-dom';
import { flowerDefinitions, questions } from "../../data/appData";
import type { Answers } from "../../types/Answers";
import { Flower } from "../Flower/Flower";
import { FormStep } from "../FormStep/FormStep";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Button, IconButton, Typography } from '@mui/material';
import './FormScreen.scss';
import type { Question } from '../../types/Question';
import React from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const PrintableFlower = React.forwardRef<HTMLDivElement, { answers: Answers; summary: string }>((
    { answers, summary }, ref) => (
    <div className="print-layout" ref={ref}>
        <header className="print-header">
            <Typography style={{fontFamily: 'Heebo'}}>{(answers.name as string) || 'הפרח שלך'}</Typography>
            <Typography dir="ltr">Florigins</Typography>
        </header>
        <div className="print-flower-container">
             <Flower answers={answers} viewBox="-50 -50 300 300" />
        </div>
        <footer className="print-footer">
            <Typography className="summary-text">{summary}</Typography>
        </footer>
    </div>
));

export const FormScreen: React.FC = (): JSX.Element => {
    const navigate = useNavigate();
    const [answers, setAnswers] = useState<Answers>({});
    const printComponentRef = useRef<HTMLDivElement>(null);

    const allQuestionsAnswered = React.useMemo(() => {
        const requiredQuestions = questions.filter(q => q.id !== 'name' && q.id !== 'belonging');
        return requiredQuestions.every(question => {
            const answer = answers[question.id];
            if (typeof answer === 'number') return true;
            if (typeof answer === 'string' && answer.trim() !== '') return true;
            return !!answer;
        });
    }, [answers]);

    // --- NEW: Robust PDF export handler ---
    const handleExportPdf = () => {
        if (!allQuestionsAnswered || !printComponentRef.current) {
            console.error("Cannot export, either form is incomplete or ref is not available.");
            return;
        }

        // 1. Open the new window immediately on click. This helps avoid popup blockers.
        const newWindow = window.open();
        if (!newWindow) {
            alert('Popup blocked! Please allow popups for this site to view the PDF.');
            return;
        }
        newWindow.document.write('<h1>Generating your flower PDF...</h1><p>Please wait a moment.</p>');
        newWindow.document.title = 'Generating...';

        html2canvas(printComponentRef.current, {
            scale: 3,
            useCORS: true,
            backgroundColor: null,
        }).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');

            const pdf = new jsPDF({
                orientation: 'landscape',
                unit: 'mm',
                format: 'a4'
            });

            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();

            pdf.setFillColor('#F7F0E6');
            pdf.rect(0, 0, pdfWidth, pdfHeight, 'F');

            const canvasAspectRatio = canvas.width / canvas.height;

            let finalImgWidth, finalImgHeight;
            const margin = 10;
            const printableWidth = pdfWidth - (margin * 2);
            const printableHeight = pdfHeight - (margin * 2);

            if (canvasAspectRatio > (printableWidth / printableHeight)) {
                finalImgWidth = printableWidth;
                finalImgHeight = printableWidth / canvasAspectRatio;
            } else {
                finalImgHeight = printableHeight;
                finalImgWidth = printableHeight * canvasAspectRatio;
            }

            const x = (pdfWidth - finalImgWidth) / 2;
            const y = (pdfHeight - finalImgHeight) / 2;

            pdf.addImage(imgData, 'PNG', x, y, finalImgWidth, finalImgHeight);

            const pdfBlob = pdf.output('blob');
            const pdfUrl = URL.createObjectURL(pdfBlob);

            newWindow.location.href = pdfUrl;
            newWindow.document.title = (answers.name as string) || 'Florigins';

            setTimeout(() => URL.revokeObjectURL(pdfUrl), 1000);

            navigate('/results', { state: { answers } });
        }).catch(err => {
            console.error("Error generating PDF:", err);
            if (newWindow) newWindow.close();
        });
    };

    const handleBack = () => {
        navigate('/');
    };

    const handleReset = () => {
        setAnswers({});
    };

    const handleAnswerChange = (questionId: string, value: unknown) => {
        setAnswers(prev => ({ ...prev, [questionId]: value }));
    };

    function findQuestion(id: string): Question {
        const question = questions.find(q => q.id === id);
        if (!question) {
            throw new Error(`Question with id "${id}" not found.`);
        }
        return question;
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

    const summaryString = questions
        .map(q => {
            const answer = answers[q.id];
            if (answer && q.id !== 'name' && q.id !== 'belonging') {
                return getDisplayValue(findQuestion(q.id), answer as string);
            }
            return null;
        })
        .filter(Boolean)
        .join(' * ');

    const belongingQuestion = findQuestion('belonging');

    return (
        <div className="form-screen-container">
            <style>
                {`
                    .offscreen-print-wrapper {
                        position: absolute;
                        left: -9999px; /* Move it off-screen */
                        top: 0;
                        /* A4 landscape aspect ratio (297/210) at a reasonable size */
                        width: 1123px;
                        height: 794px;
                    }

                    .print-layout {
                        width: 100%;
                        height: 100%;
                        display: flex;
                        flex-direction: column;
                        justify-content: space-between;
                        align-items: center;
                        padding: 3rem;
                        box-sizing: border-box;
                        background-color: #F7F0E6;
                    }
                     .print-header {
                       width: 100%;
                       display: flex;
                       justify-content: space-between;
                       align-items: center;
                       border-bottom: 1px solid #ccc;
                       padding-bottom: 1rem;
                       font-family: 'Heebo', sans-serif;
                       flex-shrink: 0;
                       color: #333;
                    }
                    .print-flower-container {
                       flex-grow: 1;
                       width: 100%;
                       height: 1px;
                       display: flex;
                       align-items: center;
                       justify-content: center;
                    }
                    .print-flower-container svg {
                       max-height: 95%;
                       max-width: 95%;
                    }
                    .print-footer {
                       width: 100%;
                       border-top: 1px solid #ccc;
                       padding-top: 1rem;
                       text-align: center;
                       flex-shrink: 0;
                    }
                    .summary-text {
                       font-family: 'Heebo', sans-serif;
                       font-size: 14pt;
                       color: #333;
                       letter-spacing: 0.05em;
                    }
                `}
            </style>

            {/* The printable component is rendered in a sized, off-screen wrapper */}
            <div className="offscreen-print-wrapper">
                <PrintableFlower ref={printComponentRef} answers={answers} summary={summaryString} />
            </div>

            <div className="form-panel">
                <section className="form-header">
                    <div onClick={handleBack} className="back-button">
                        <article className="back-icon-container">
                            <span>חזרה</span>
                            <IconButton className="back-icon-button" size="small" aria-label="back">
                                <ArrowBackIcon />
                            </IconButton>
                        </article>
                    </div>
                </section>
                <hr className="section-divider" />

                <main className="form-main-content">
                    {/* Section: שם */}
                    <div className="form-name-section">
                        <FormStep question={findQuestion('name')} value={answers['name']} onChange={(v) => handleAnswerChange('name', v)} />
                    </div>
                    <hr className="section-divider" />

                    {/* Section: זהות מגדרית */}
                    <div className="form-genderId-section">
                        <h3 className="section-title">זהות מגדרית</h3>
                        <FormStep question={findQuestion('genderIdentity')} value={answers['genderIdentity']} onChange={(v) => handleAnswerChange('genderIdentity', v)} showLabel={false} />
                    </div>
                    <hr className="section-divider" />

                    {/* Section: מוצא */}
                    <div className="form-legacy-country-section">
                        <h3 className="section-title">מוצא</h3>
                        <FormStep question={findQuestion('origin_p1_grandpa')} value={answers['origin_p1_grandpa']} onChange={(v) => handleAnswerChange('origin_p1_grandpa', v)} />
                        <FormStep question={findQuestion('origin_p1_grandma')} value={answers['origin_p1_grandma']} onChange={(v) => handleAnswerChange('origin_p1_grandma', v)} />
                        <FormStep question={findQuestion('origin_p2_grandpa')} value={answers['origin_p2_grandpa']} onChange={(v) => handleAnswerChange('origin_p2_grandpa', v)} />
                        <FormStep question={findQuestion('origin_p2_grandma')} value={answers['origin_p2_grandma']} onChange={(v) => handleAnswerChange('origin_p2_grandma', v)} />
                    </div>
                    <hr className="section-divider" />

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
                                    {/* <h3 className="question-label">{question.label}</h3> */}
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

                        <Button onClick={handleExportPdf} className="print-button" disabled={!allQuestionsAnswered}>
                            הדפס
                        </Button>
                    </div>
                </div>
            </div>

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
                <Flower answers={answers} viewBox="-95 -95 390 390" />
                <div className="form-footer-container screen-only">
                    <hr className="form-border" />
                </div>
            </div>
        </div>
    );
};