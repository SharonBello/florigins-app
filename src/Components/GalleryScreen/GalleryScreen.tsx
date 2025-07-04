import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Flower } from '../Flower/Flower';
import type { Answers } from '../../types/Answers';
import { flowerDefinitions, questions } from '../../data/appData';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { IconButton, Typography } from '@mui/material';
import './GalleryScreen.scss';
import { db } from '../../../firebase';
import { collection, onSnapshot } from "firebase/firestore";

const groupableQuestionIDs = [
    'name', 'genderIdentity', 'origin', 'belonging', 'sexualOrientation', 'religion', 'politicalView', 'diet', 'childhoodEnvironment', 'countryToLive', 'languageToSpeak', 'favoriteCuisine', 'cultureToBelong'
];

const getHebrewName = (value: string, key: keyof Answers): string => {
    const definition = flowerDefinitions.find(def => def.country === value);
    if (!definition) return value; // Fallback to the original value if no definition is found
    switch (key) {
        case 'countryToLive': return definition.countryHebrew;
        case 'languageToSpeak': return definition.languageHebrew;
        case 'favoriteCuisine': return definition.cuisineHebrew;
        case 'cultureToBelong': return definition.cultureHebrew;
        default: return value;
    }
};

export const GalleryScreen: React.FC = () => {
    const navigate = useNavigate();
    const [allFlowers, setAllFlowers] = useState<Answers[]>([]);
    const [groupByKey, setGroupByKey] = useState<keyof Answers | null>(null);
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    useEffect(() => {
        const flowersCollectionRef = collection(db, "submittedFlowers");

        const unsubscribe = onSnapshot(flowersCollectionRef, (querySnapshot) => {
            const flowersFromDb: Answers[] = [];
            querySnapshot.forEach((doc) => {
                flowersFromDb.push({ ...doc.data(), id: doc.id } as Answers);
            });

            const uniqueFlowersMap = new Map<string, Answers>();

            flowersFromDb.forEach(flower => {
                const flowerDataForSignature = { ...flower };
                delete (flowerDataForSignature).id;

                const signature = JSON.stringify(flowerDataForSignature);

                if (!uniqueFlowersMap.has(signature)) {
                    uniqueFlowersMap.set(signature, flower);
                }
            });

            const uniqueFlowers = Array.from(uniqueFlowersMap.values());
            setAllFlowers(uniqueFlowers);
        });

        return () => unsubscribe();
    }, []);

    const groupedFlowers = useMemo(() => {
        const groups: { [key: string]: Answers[] } = {};
        const countryBasedFilters = new Set(['countryToLive', 'languageToSpeak', 'favoriteCuisine', 'cultureToBelong']);

        if (!groupByKey) {
            groups['כל הפרחים'] = allFlowers;
            return Object.entries(groups);
        }

        if (groupByKey === 'origin') {
            allFlowers.forEach(flower => {
                const uniqueOrigins = new Set<string>();
                if (typeof flower.origin_p1_grandpa === 'string' && flower.origin_p1_grandpa.trim() !== '') {
                    uniqueOrigins.add(flower.origin_p1_grandpa);
                }
                if (typeof flower.origin_p1_grandma === 'string' && flower.origin_p1_grandma.trim() !== '') {
                    uniqueOrigins.add(flower.origin_p1_grandma);
                }
                if (typeof flower.origin_p2_grandpa === 'string' && flower.origin_p2_grandpa.trim() !== '') {
                    uniqueOrigins.add(flower.origin_p2_grandpa);
                }
                if (typeof flower.origin_p2_grandma === 'string' && flower.origin_p2_grandma.trim() !== '') {
                    uniqueOrigins.add(flower.origin_p2_grandma);
                }
                if (uniqueOrigins.size === 0) {
                    if (!groups["לא ידוע"]) groups["לא ידוע"] = [];
                    groups["לא ידוע"].push(flower);
                } else {
                    uniqueOrigins.forEach(originCountry => {
                        const countryDef = flowerDefinitions.find(def => def.country === originCountry);
                        const hebrewName = countryDef ? countryDef.countryHebrew : originCountry;

                        if (!groups[hebrewName]) {
                            groups[hebrewName] = [];
                        }
                        groups[hebrewName].push(flower);
                    });
                }
            });
        } else if (groupByKey === 'belonging') {
            const belongingQuestion = questions.find(q => q.id === 'belonging');
            const belongingOptions = belongingQuestion?.options || ['הורה 1', 'אין העדפה', 'הורה 2'];

            allFlowers.forEach(flower => {
                const belongingValue = flower.belonging as number;
                let groupName = "לא הוגדר";

                switch (belongingValue) {
                    case -1:
                        groupName = belongingOptions[0]; // הורה 1
                        break;
                    case 0:
                        groupName = belongingOptions[1]; // אין העדפה
                        break;
                    case 1:
                        groupName = belongingOptions[2]; // הורה 2
                        break;
                    default:
                        groupName = belongingOptions[1];
                        break;
                }

                if (!groups[groupName]) {
                    groups[groupName] = [];
                }
                groups[groupName].push(flower);
            });
        } else if (countryBasedFilters.has(groupByKey)) {
            allFlowers.forEach(flower => {
                const value = flower[groupByKey] as string;
                if (value) {
                    const groupName = getHebrewName(value, groupByKey as keyof Answers);
                    if (!groups[groupName]) {
                        groups[groupName] = [];
                    }
                    groups[groupName].push(flower);
                } else {
                    if (!groups["ללא הגדרה"]) groups["ללא הגדרה"] = [];
                    groups["ללא הגדרה"].push(flower);
                }
            });
        } else {
            allFlowers.forEach(flower => {
                const groupValue = (flower[groupByKey] as string) || "ללא הגדרה";
                if (!groups[groupValue]) {
                    groups[groupValue] = [];
                }
                groups[groupValue].push(flower);
            });
        }

        return Object.entries(groups).sort((a, b) => a[0].localeCompare(b[0]));

    }, [allFlowers, groupByKey]);

    const handleFlowerClick = (flowerAnswers: Answers): void => {
        navigate('/form', { state: { answers: flowerAnswers } })
    };

    const handleBack = () => {
        navigate('/');
    };

    const handleFilterClick = (id: keyof Answers) => {
        setGroupByKey(prevKey => (prevKey === id ? null : id));
    };

    return (
        <div className="gallery-screen-container">
            <div className="gallery-main-panel">
                <header className="gallery-header">
                    <Typography className="app-name" dir="ltr">Florigins</Typography>
                    <hr />
                </header>
                <div className={`gallery-content ${!groupByKey ? 'is-unfiltered' : ''}`}>
                    {groupedFlowers.map(([groupName, flowersInGroup]) => (
                        <div key={groupName} className="gallery-group">
                            {groupByKey && (
                                <Typography variant="h5" className="gallery-group-title">
                                    {groupName}
                                </Typography>
                            )}
                            <div className="gallery-bunch-container">
                                {flowersInGroup.map((flowerAnswers, index) => {
                                    const isUnfiltered: boolean = !groupByKey
                                    const angle: number = (index / flowersInGroup.length) * 2 * Math.PI
                                    const baseRadius: number = Math.pow(Math.random(), 0.4) * Math.min(flowersInGroup.length * 18, 290)

                                    // only use push logic when unfiltered
                                    let transform: string
                                    let zIndexVal: number
                                    let transitionVal: string

                                    if (isUnfiltered) {
                                        // --- neighbor‐push parameters ---
                                        const pushFactor: number = 1.4    // how far immediate neighbors move
                                        const defaultFactor: number = 1.0 // others stay at baseRadius

                                        const radius: number = hoveredIndex === null
                                            ? baseRadius
                                            : hoveredIndex === index
                                                ? baseRadius
                                                : Math.abs(index - hoveredIndex) <= 1
                                                    ? baseRadius * pushFactor   // only direct neighbors get pushed
                                                    : baseRadius * defaultFactor

                                        const x: number = Math.cos(angle) * radius
                                        const y: number = Math.sin(angle) * radius
                                        const rotation: number = (Math.random() - 0.6) * 30

                                        transform = `translate(-50%, -50%) translate(${x}px, ${y}px) rotate(${rotation}deg)`

                                        // scale hovered one
                                        if (hoveredIndex === index) {
                                            transform += ' scale(1.6)'
                                        }

                                        zIndexVal = hoveredIndex === index ? 1000 : 1
                                        transitionVal = 'transform 0.3s ease-out'

                                    } else {
                                        // grouped mode: keep your translateY logic
                                        transform = `translateY(${index % 2 === 0 ? '-20px' : '10px'})`
                                        zIndexVal = 10 + (flowersInGroup.length - index)
                                        transitionVal = 'transform 0.8s ease-out'
                                    }

                                    const style: React.CSSProperties = {
                                        position: isUnfiltered ? 'absolute' : undefined,
                                        top: isUnfiltered ? 0 : undefined,
                                        left: isUnfiltered ? 0 : undefined,
                                        transform,
                                        zIndex: zIndexVal,
                                        transition: transitionVal,
                                        transformOrigin: 'center center',
                                    }

                                    return (
                                        <div
                                            key={flowerAnswers.id ?? index}
                                            className="gallery-item"
                                            style={style}
                                            onMouseEnter={() => setHoveredIndex(index)}
                                            onMouseLeave={() => setHoveredIndex(null)}
                                            onClick={() => handleFlowerClick(flowerAnswers)}
                                        >
                                            <Flower answers={flowerAnswers} viewBox="-20 -20 250 250" showTooltip={false} />
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="gallery-filter-panel">
                <header className="filter-header">
                    <div onClick={handleBack} className="back-button">
                        <article className="back-icon-container">
                            <span>חזרה</span>
                            <IconButton className="back-icon-button" size="small" aria-label="back">
                                <ArrowBackIcon />
                            </IconButton>
                        </article>
                    </div>
                    <Typography variant="h6">סינון</Typography>
                </header>
                <hr className="section-divider" />
                <div className="filter-list">
                    {groupableQuestionIDs.map(id => {
                        const question = id === 'origin'
                            ? { id: 'origin', label: 'מוצא' }
                            : questions.find(q => q.id === id)!;

                        if (!question) return null;

                        return (
                            <div
                                key={question.id}
                                className={`filter-label-item ${groupByKey === question.id ? 'active' : ''}`}
                                onClick={() => handleFilterClick(question.id as keyof Answers)}
                            >
                                <Typography>{question.label}</Typography>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    );
};