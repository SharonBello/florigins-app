import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Flower } from '../Flower/Flower';
import type { Answers } from '../../types/Answers';
import { flowerDefinitions, questions } from '../../data/appData';
import { Button, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import './GalleryScreen.scss';
import { db } from '../../../firebase';
import { collection, onSnapshot } from "firebase/firestore";

// --- MOCK DATA (for testing without a database) ---
const mockFlowers: Answers[] = [
    // 0: יעל (Philippines/Ukraine)
    // {
    //     name: 'יעל',
    //     genderIdentity: 'אשה',
    //     origin_p1_grandpa: 'Philippines',
    //     origin_p1_grandma: 'Philippines',
    //     origin_p2_grandpa: 'Ukraine',
    //     origin_p2_grandma: 'Poland',
    //     belonging: -1,
    //     countryToLive: 'United States',
    //     languageToSpeak: 'Switzerland',
    //     favoriteCuisine: 'Japan',
    //     cultureToBelong: 'United States',
    //     childhoodEnvironment: 'עיר',
    //     sexualOrientation: 'ביסקסואל',
    //     religion: 'יהודי',
    //     politicalView: 'שמאל מרכז',
    //     diet: 'אוכל הכל'
    // },
    // 1: יעל (Armenia/USA)
    // {
    //     name: 'יעל',
    //     genderIdentity: 'אשה',
    //     origin_p1_grandpa: 'Armenia',
    //     origin_p1_grandma: 'Bosnia and Herzegovina',
    //     origin_p2_grandpa: 'United States',
    //     origin_p2_grandma: 'South Korea',
    //     belonging: -1,
    //     countryToLive: 'Austria',
    //     languageToSpeak: 'Iceland',
    //     favoriteCuisine: 'Uganda',
    //     cultureToBelong: 'Ecuador',
    //     childhoodEnvironment: 'עיר',
    //     sexualOrientation: 'הטרוסקסואל',
    //     religion: 'נוצרי',
    //     politicalView: 'שמאל מרכז',
    //     diet: 'טבעוני'
    // },
    // 2: קירן
    // {
    //     name: 'קירן',
    //     genderIdentity: 'גבר',
    //     origin_p1_grandpa: 'Bulgaria',
    //     origin_p1_grandma: 'Brazil',
    //     origin_p2_grandpa: 'Israel',
    //     origin_p2_grandma: 'Israel',
    //     belonging: 0, // Assuming 0 for 'no preference'
    //     countryToLive: 'Israel',
    //     languageToSpeak: 'Israel',
    //     favoriteCuisine: 'Israel',
    //     cultureToBelong: 'Israel',
    //     childhoodEnvironment: 'מושב',
    //     sexualOrientation: 'הטרוסקסואל',
    //     religion: 'יהודי',
    //     politicalView: 'מרכז',
    //     diet: 'אוכל הכל'
    // },
    // // 3: דורית
    // {
    //     name: 'דורית',
    //     genderIdentity: 'אשה',
    //     origin_p1_grandpa: 'Iran',
    //     origin_p1_grandma: 'Iran',
    //     origin_p2_grandpa: 'Iran',
    //     origin_p2_grandma: 'Iran',
    //     belonging: 1,
    //     countryToLive: 'Israel',
    //     languageToSpeak: 'San Marino',
    //     favoriteCuisine: 'Libya',
    //     cultureToBelong: 'Israel',
    //     childhoodEnvironment: 'עיר',
    //     sexualOrientation: 'הטרוסקסואל',
    //     religion: 'יהודי',
    //     politicalView: 'ימין',
    //     diet: 'אוכל כשרות'
    // },
    // 4: sharon
    {
        name: 'sharon',
        genderIdentity: 'אשה',
        origin_p1_grandpa: 'North Macedonia',
        origin_p1_grandma: 'Bulgaria',
        origin_p2_grandpa: 'Ukraine',
        origin_p2_grandma: 'Brazil',
        belonging: 1,
        countryToLive: 'Solomon Islands',
        languageToSpeak: 'San Marino',
        favoriteCuisine: 'Israel',
        cultureToBelong: 'United States',
        childhoodEnvironment: 'עיר',
        sexualOrientation: 'הטרוסקסואל',
        religion: 'יהודי',
        politicalView: 'מרכז',
        diet: 'אוכל הכל'
    },
    // 5: אופיר
    {
        name: 'אופיר',
        genderIdentity: 'גבר',
        origin_p1_grandpa: 'Austria',
        origin_p1_grandma: 'Angola',
        origin_p2_grandpa: 'Botswana',
        origin_p2_grandma: 'United Kingdom',
        belonging: -1,
        countryToLive: 'Austria',
        languageToSpeak: 'Malta',
        favoriteCuisine: 'Trinidad and Tobago',
        cultureToBelong: 'Mauritius',
        childhoodEnvironment: 'מושב',
        sexualOrientation: 'פאנסקסואל',
        religion: 'מוסלמי',
        politicalView: 'שמאל מרכז',
        diet: 'טבעוני'
    },
    // 6: מרליי
    // {
    //     name: 'מרליי',
    //     genderIdentity: 'אשה',
    //     origin_p1_grandpa: 'Poland',
    //     origin_p1_grandma: 'Poland',
    //     origin_p2_grandpa: 'Moldova',
    //     origin_p2_grandma: 'Moldova',
    //     belonging: -1,
    //     countryToLive: 'Israel',
    //     languageToSpeak: 'Yemen',
    //     favoriteCuisine: 'China',
    //     cultureToBelong: 'Israel',
    //     childhoodEnvironment: 'מושב',
    //     sexualOrientation: 'הטרוסקסואל',
    //     religion: 'יהודי',
    //     politicalView: 'שמאל מרכז',
    //     diet: 'אוכל הכל'
    // },
    // // 7: דליה
    // {
    //     name: 'דליה',
    //     genderIdentity: 'אשה',
    //     origin_p1_grandpa: 'Yemen',
    //     origin_p1_grandma: 'Yemen',
    //     origin_p2_grandpa: 'Yemen',
    //     origin_p2_grandma: 'Yemen',
    //     belonging: -1,
    //     countryToLive: 'Italy',
    //     languageToSpeak: 'Monaco',
    //     favoriteCuisine: 'Italy',
    //     cultureToBelong: 'Israel',
    //     childhoodEnvironment: 'עיר',
    //     sexualOrientation: 'הטרוסקסואל',
    //     religion: 'יהודי',
    //     politicalView: 'שמאל מרכז',
    //     diet: 'אוכל הכל'
    // }
];

const groupableQuestionIDs = [
    'genderIdentity', 'origin', 'belonging', 'sexualOrientation', 'religion', 'politicalView', 'diet', 'childhoodEnvironment', 'countryToLive', 'languageToSpeak', 'favoriteCuisine', 'cultureToBelong'
];
// const groupableQuestionIDs = [
//     'genderIdentity', 'origin', 'sexualOrientation', 'religion', 'politicalView', 'diet', 'childhoodEnvironment'
// ];

export const GalleryScreen: React.FC = () => {
    const navigate = useNavigate();
    const [allFlowers, setAllFlowers] = useState<Answers[]>(mockFlowers);
    const [groupByKey, setGroupByKey] = useState<keyof Answers>('genderIdentity');

    // useEffect(() => {
    //     const flowersCollectionRef = collection(db, "submittedFlowers");

    //     const unsubscribe = onSnapshot(flowersCollectionRef, (querySnapshot) => {
    //         const flowersFromDb: Answers[] = [];
    //         querySnapshot.forEach((doc) => {
    //             flowersFromDb.push({ ...doc.data(), id: doc.id } as Answers);
    //         });

    //         // --- THIS IS THE FIX ---
    //         // Create a Map to store flowers, ensuring each one is unique based on its content.
    //         const uniqueFlowersMap = new Map<string, Answers>();

    //         flowersFromDb.forEach(flower => {
    //             // We create a "signature" of the flower's data, ignoring the unique ID.
    //             const flowerDataForSignature = { ...flower };
    //             delete (flowerDataForSignature as any).id; // Temporarily remove ID for comparison.

    //             const signature = JSON.stringify(flowerDataForSignature);

    //             // If we have not seen this signature before, add the flower to our map.
    //             if (!uniqueFlowersMap.has(signature)) {
    //                 uniqueFlowersMap.set(signature, flower);
    //             }
    //         });

    //         // Get the unique flowers from the map.
    //         const uniqueFlowers = Array.from(uniqueFlowersMap.values());

    //         // --- END OF FIX ---

    //         // Set the state with the de-duplicated array.
    //         setAllFlowers(uniqueFlowers);
    //     });

    //     return () => unsubscribe();
    // }, []);

    // In GalleryScreen.tsx

    const groupedFlowers = useMemo(() => {
        const groups: { [key: string]: Answers[] } = {};

        if (groupByKey === 'origin') {
            // --- FINAL CORRECTED LOGIC FOR 'ORIGIN' FILTER ---
            allFlowers.forEach(flower => {
                // Use a Set to get a unique list of a flower's origins
                const uniqueOrigins = new Set<string>();

                // This new check ensures the value is a non-empty string before adding it.
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
                    // If there are no origins, place it in a default group
                    if (!groups["לא ידוע"]) groups["לא ידוע"] = [];
                    groups["לא ידוע"].push(flower);
                } else {
                    // Add the ORIGINAL, UNMODIFIED flower to each group it belongs to
                    uniqueOrigins.forEach(originCountry => {
                        if (!groups[originCountry]) {
                            groups[originCountry] = [];
                        }
                        groups[originCountry].push(flower); // Push the real flower
                    });
                }
            });
        } else {
            // --- STANDARD LOGIC FOR ALL OTHER FILTERS ---
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

    const handleFlowerClick = (answers: Answers) => {
        navigate('/results', { state: { answers } });
    };

    const handleBack = () => {
        navigate('/');
    };

    return (
        <div className="gallery-screen-container">
            <div className="gallery-main-panel">
                <header className="gallery-header">
                    <Typography className="app-name" dir="ltr">Florigins</Typography>
                    <hr />
                </header>
                <div className="gallery-content">
                    {groupedFlowers.map(([groupName, flowersInGroup]: [string, Answers[]]) => (
                        <div key={groupName} className="gallery-group">
                            <Typography variant="h5" className="gallery-group-title">{groupName}</Typography>
                            <div className="gallery-bunch-container">
                                {flowersInGroup.map((flowerAnswers: Answers, index: number) => {
                                    return (
                                        <div
                                            key={typeof flowerAnswers.id === 'string' || typeof flowerAnswers.id === 'number' ? flowerAnswers.id : `${groupName}-${index}`}
                                            className={`gallery-item`}
                                            style={{
                                                transform: `translateY(${index % 2 === 0 ? '-20px' : '10px'})`,
                                                transition: 'transform 0.8s',
                                                zIndex: 10 + (flowersInGroup.length - index),
                                            }}
                                            onClick={() => handleFlowerClick(flowerAnswers)}
                                        >
                                            <Flower answers={flowerAnswers} viewBox="-20 -20 250 250" showTooltip={false} />
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )
                    )}
                </div>
            </div>
            <div className="gallery-filter-panel">
                <header className="filter-header">
                    <Button onClick={handleBack} className="back-button">
                        <ArrowBackIcon style={{ transform: 'rotate(180deg)' }} />
                        <span>חזרה</span>
                    </Button>
                    <Typography variant="h6">סינון</Typography>
                </header>
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
                                onClick={() => setGroupByKey(question.id as keyof Answers)}
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