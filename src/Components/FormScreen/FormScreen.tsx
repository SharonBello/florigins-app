import { useState, type JSX } from 'react';
import { useNavigate } from 'react-router-dom';
import { questions } from "../../data/appData";
import type { Answers } from "../../types/Answers";
import { Flower } from "../Flower";
import { FormStep } from "../FormStep/FormStep";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Button, IconButton, Typography } from '@mui/material';
import './FormScreen.scss';
import type { Question } from '../../types/Question';
import React from 'react';

export const FormScreen: React.FC = (): JSX.Element => {
    const navigate = useNavigate();
    const [answers, setAnswers] = useState<Answers>({});

    const allQuestionsAnswered = React.useMemo(() => {
        return questions.every(question => {
            const answer = answers[question.id];

            if (typeof answer === 'number') {
                return true;
            }

            if (typeof answer === 'string' && answer.trim() !== '') {
                return true;
            }

            if (answer) {
                return true;
            }

            return false;
        });
    }, [answers]);

    const handleSubmit = () => {
        if (!allQuestionsAnswered) {
            console.error("Submit called on an invalid form.");
            return;
        }
        navigate('/results', { state: { answers } });
    };

    const handleBack = () => {
        navigate('/');
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

    const belongingQuestion = findQuestion('belonging');

    return (
        <div className="form-screen-container">
            <div className="form-panel">
                <section className="form-header">
                    <button onClick={handleBack} className="back-button">
                        <article className="back-icon-container">
                            <span>חזרה</span>
                            <IconButton className="back-icon-button" size="small" aria-label="back">
                                <ArrowBackIcon />
                            </IconButton>
                        </article>
                    </button>
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
                            <div className="form-childhoodEnvironment-section">
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
                            <div className="form-sexualOrientation-section">
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
                            <div className="form-religion-section">
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
                            <div className="form-politicalView-section">
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
                            <div className="form-diet-section">
                                <h3 className="section-title">{question.label}</h3>
                                <FormStep question={findQuestion('diet')} value={answers['diet']} onChange={(v) => handleAnswerChange('diet', v)} showLabel={false} />
                            </div>
                        )
                    })}
                    <hr className="section-divider" />
                </main>

                <div className="form-footer">
                    <Typography variant="caption" className={`validation-message ${allQuestionsAnswered ? 'is-hidden' : ''}`}>
                        יש למלא את כל השדות כדי להמשיך
                    </Typography>

                    <Button onClick={handleSubmit} className="submit-button" disabled={!allQuestionsAnswered}>
                        סיימתי!
                    </Button>
                </div>
            </div>

            <div className="flower-panel">
                <header className="form-header-container">
                    <Typography className="app-name" dir="ltr">Florigins</Typography>
                    <hr className="form-border" />
                </header>
                <Flower answers={answers} />
                <div className="form-footer-container">
                    <hr className="form-border" />
                </div>
            </div>
        </div>
    );
};