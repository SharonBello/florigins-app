import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Flower } from '../Flower/Flower';
import type { Answers } from '../../types/Answers';
import { questions } from '../../data/appData';
import { Button, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import './GalleryScreen.scss';

// --- MOCK DATA (for testing without a database) ---
const mockFlowers: Answers[] = [
      { name: "יעל", genderIdentity: "אשה", origin_p1_grandpa: "Poland", origin_p1_grandma: "Ukraine", origin_p2_grandpa: "Morocco", origin_p2_grandma: "Egypt", belonging: -1, countryToLive: "Brazil", languageToSpeak: "Japan", favoriteCuisine: "Italy", cultureToBelong: "Israel", childhoodEnvironment: "עיר", sexualOrientation: "ביסקסואל", religion: "יהודי", politicalView: "שמאל מרכז", diet: "אוכל הכל" },
  { name: "דני", genderIdentity: "גבר", origin_p1_grandpa: "Germany", origin_p1_grandma: "France", origin_p2_grandpa: "United States", origin_p2_grandma: "Canada", belonging: 1, countryToLive: "Australia", languageToSpeak: "Spain", favoriteCuisine: "Mexico", cultureToBelong: "United States", childhoodEnvironment: "קיבוץ", sexualOrientation: "הטרוסקסואל", religion: "אתאיסט", politicalView: "מרכז", diet: "טבעוני" },
  { name: "מאיה", genderIdentity: "א-בינארי", origin_p1_grandpa: "China", origin_p1_grandma: "Japan", origin_p2_grandpa: "Brazil", origin_p2_grandma: "Argentina", belonging: 0, countryToLive: "New Zealand", languageToSpeak: "South Korea", favoriteCuisine: "Thailand", cultureToBelong: "Japan", childhoodEnvironment: "מושב", sexualOrientation: "פאנסקסואל", religion: "בודהיסט", politicalView: "שמאל", diet: "צמחוני" },
  { name: "איתי", genderIdentity: "גבר טראנס", origin_p1_grandpa: "Russia", origin_p1_grandma: "Nigeria", origin_p2_grandpa: "India", origin_p2_grandma: "Australia", belonging: 1, countryToLive: "Canada", languageToSpeak: "Germany", favoriteCuisine: "India", cultureToBelong: "United Kingdom", childhoodEnvironment: "אחר", sexualOrientation: "הומוסקסואל", religion: "נוצרי", politicalView: "ימין", diet: "אוכל כשרות" },
    { name: "יעל", genderIdentity: "אשה", origin_p1_grandpa: "Poland", origin_p1_grandma: "Ukraine", origin_p2_grandpa: "Morocco", origin_p2_grandma: "Egypt", belonging: -1, countryToLive: "Brazil", languageToSpeak: "Japanese", favoriteCuisine: "Italian", cultureToBelong: "Israeli", childhoodEnvironment: "עיר", sexualOrientation: "ביסקסואל", religion: "יהודי", politicalView: "שמאל מרכז", diet: "אוכלת הכל" },
    { name: "דני", genderIdentity: "גבר", origin_p1_grandpa: "Germany", origin_p1_grandma: "France", origin_p2_grandpa: "United States", origin_p2_grandma: "Canada", belonging: 1, countryToLive: "Australia", languageToSpeak: "Spanish", favoriteCuisine: "Mexican", cultureToBelong: "American", childhoodEnvironment: "קיבוץ", sexualOrientation: "הטרוסקסואל", religion: "אתאיסט", politicalView: "מרכז", diet: "טבעוני" },
    { name: "מאיה", genderIdentity: "א-בינארי", origin_p1_grandpa: "China", origin_p1_grandma: "Japan", origin_p2_grandpa: "Brazil", origin_p2_grandma: "Argentina", belonging: 0, countryToLive: "New Zealand", languageToSpeak: "Korean", favoriteCuisine: "Thai", cultureToBelong: "Japanese", childhoodEnvironment: "מושב", sexualOrientation: "פאנסקסואל", religion: "בודהיסט", politicalView: "שמאל", diet: "צמחוני" },
    { name: "איתי", genderIdentity: "גבר טראנס", origin_p1_grandpa: "Russia", origin_p1_grandma: "Nigeria", origin_p2_grandpa: "India", origin_p2_grandma: "Australia", belonging: 1, countryToLive: "Canada", languageToSpeak: "German", favoriteCuisine: "Indian", cultureToBelong: "British", childhoodEnvironment: "אחר", sexualOrientation: "הומוסקסואל", religion: "נוצרי", politicalView: "ימין", diet: "אוכל כשרות" },
    { name: "נועה", genderIdentity: "אשה טראנסית", origin_p1_grandpa: "Italy", origin_p1_grandma: "Greece", origin_p2_grandpa: "Turkey", origin_p2_grandma: "Iran", belonging: -1, countryToLive: "Spain", languageToSpeak: "French", favoriteCuisine: "Greek", cultureToBelong: "French", childhoodEnvironment: "עיר", sexualOrientation: "הטרוסקסואל", religion: "מוסלמי", politicalView: "ימין מרכז", diet: "אוכלת הכל" },
    { name: "יונתן", genderIdentity: "ללא הגדרה", origin_p1_grandpa: "South Africa", origin_p1_grandma: "Namibia", origin_p2_grandpa: "Ireland", origin_p2_grandma: "United Kingdom", belonging: 1, countryToLive: "Ireland", languageToSpeak: "English", favoriteCuisine: "British", cultureToBelong: "Irish", childhoodEnvironment: "קיבוץ", sexualOrientation: "א-מיני", religion: "אתאיסט", politicalView: "שמאל", diet: "טבעוני" },
    { name: "תמר", genderIdentity: "אשה", origin_p1_grandpa: "Egypt", origin_p1_grandma: "Libya", origin_p2_grandpa: "Syria", origin_p2_grandma: "Lebanon", belonging: 0, countryToLive: "United Arab Emirates", languageToSpeak: "Arabic", favoriteCuisine: "Lebanese", cultureToBelong: "Egyptian", childhoodEnvironment: "עיר", sexualOrientation: "ביסקסואל", religion: "יהודי", politicalView: "מרכז", diet: "צמחוני" },
    { name: "עומר", genderIdentity: "גבר", origin_p1_grandpa: "Argentina", origin_p1_grandma: "Chile", origin_p2_grandpa: "Spain", origin_p2_grandma: "Portugal", belonging: -1, countryToLive: "Portugal", languageToSpeak: "Portuguese", favoriteCuisine: "Argentinian", cultureToBelong: "Spanish", childhoodEnvironment: "מושב", sexualOrientation: "הטרוסקסואל", religion: "נוצרי", politicalView: "ימין מרכז", diet: "אוכל הכל" },
    { name: "אלה", genderIdentity: "א-בינארי", origin_p1_grandpa: "Vietnam", origin_p1_grandma: "Thailand", origin_p2_grandpa: "Netherlands", origin_p2_grandma: "Belgium", belonging: 1, countryToLive: "Netherlands", languageToSpeak: "Dutch", favoriteCuisine: "Vietnamese", cultureToBelong: "Thai", childhoodEnvironment: "עיר", sexualOrientation: "פאנסקסואל", religion: "בודהיסט", politicalView: "שמאל", diet: "טבעוני" },
    { name: "אריאל", genderIdentity: "גבר טראנס", origin_p1_grandpa: "Mexico", origin_p1_grandma: "Cuba", origin_p2_grandpa: "Sweden", origin_p2_grandma: "Norway", belonging: 0, countryToLive: "Sweden", languageToSpeak: "Swedish", favoriteCuisine: "Mexican", cultureToBelong: "Cuban", childhoodEnvironment: "אחר", sexualOrientation: "הומוסקסואל", religion: "אתאיסט", politicalView: "ימין", diet: "אוכל כשרות" },
    { name: "רומי", genderIdentity: "אשה", origin_p1_grandpa: "Ethiopia", origin_p1_grandma: "Eritrea", origin_p2_grandpa: "Somalia", origin_p2_grandma: "Sudan", belonging: -1, countryToLive: "Ethiopia", languageToSpeak: "Amharic", favoriteCuisine: "Ethiopian", cultureToBelong: "Somali", childhoodEnvironment: "עיר", sexualOrientation: "הטרוסקסואל", religion: "מוסלמי", politicalView: "מרכז", diet: "אוכלת הכל" },
    { name: "דוד", genderIdentity: "גבר", origin_p1_grandpa: "India", origin_p1_grandma: "Pakistan", origin_p2_grandpa: "Bangladesh", origin_p2_grandma: "Sri Lanka", belonging: 1, countryToLive: "India", languageToSpeak: "Hindi", favoriteCuisine: "Pakistani", cultureToBelong: "Indian", childhoodEnvironment: "קיבוץ", sexualOrientation: "ביסקסואל", religion: "בודהיסט", politicalView: "שמאל מרכז", diet: "צמחוני" },
    { name: "אביגיל", genderIdentity: "אשה טראנסית", origin_p1_grandpa: "Hungary", origin_p1_grandma: "Romania", origin_p2_grandpa: "Austria", origin_p2_grandma: "Switzerland", belonging: 0, countryToLive: "Austria", languageToSpeak: "Hungarian", favoriteCuisine: "Austrian", cultureToBelong: "Romanian", childhoodEnvironment: "מושב", sexualOrientation: "פאנסקסואל", religion: "נוצרי", politicalView: "מרכז", diet: "טבעוני" },
    { name: "ליהי", genderIdentity: "ללא הגדרה", origin_p1_grandpa: "Peru", origin_p1_grandma: "Bolivia", origin_p2_grandpa: "Ecuador", origin_p2_grandma: "Colombia", belonging: -1, countryToLive: "Colombia", languageToSpeak: "Spanish", favoriteCuisine: "Peruvian", cultureToBelong: "Colombian", childhoodEnvironment: "אחר", sexualOrientation: "א-מיני", religion: "אתאיסט", politicalView: "שמאל", diet: "אוכל כשרות" },
    { name: "אורי", genderIdentity: "גבר", origin_p1_grandpa: "Finland", origin_p1_grandma: "Denmark", origin_p2_grandpa: "Iceland", origin_p2_grandma: "Norway", belonging: 1, countryToLive: "Norway", languageToSpeak: "Finnish", favoriteCuisine: "Danish", cultureToBelong: "Norwegian", childhoodEnvironment: "עיר", sexualOrientation: "הטרוסקסואל", religion: "נוצרי", politicalView: "ימין", diet: "אוכלת הכל" },
    { name: "שירה", genderIdentity: "אשה", origin_p1_grandpa: "Iraq", origin_p1_grandma: "Syria", origin_p2_grandpa: "Jordan", origin_p2_grandma: "Saudi Arabia", belonging: 0, countryToLive: "United Arab Emirates", languageToSpeak: "Arabic", favoriteCuisine: "Iraqi", cultureToBelong: "Syrian", childhoodEnvironment: "קיבוץ", sexualOrientation: "ביסקסואל", religion: "מוסלמי", politicalView: "מרכז", diet: "צמחוני" },
    { name: "אדם", genderIdentity: "גבר", origin_p1_grandpa: "Philippines", origin_p1_grandma: "Malaysia", origin_p2_grandpa: "Indonesia", origin_p2_grandma: "Singapore", belonging: -1, countryToLive: "Singapore", languageToSpeak: "Malay", favoriteCuisine: "Filipino", cultureToBelong: "Indonesian", childhoodEnvironment: "מושב", sexualOrientation: "הומוסקסואל", religion: "בודהיסט", politicalView: "שמאל מרכז", diet: "טבעוני" },
    { name: "עלמה", genderIdentity: "אשה טראנסית", origin_p1_grandpa: "Czech Republic", origin_p1_grandma: "Slovakia", origin_p2_grandpa: "Croatia", origin_p2_grandma: "Serbia", belonging: 1, countryToLive: "Croatia", languageToSpeak: "Czech", favoriteCuisine: "Slovak", cultureToBelong: "Croatian", childhoodEnvironment: "עיר", sexualOrientation: "פאנסקסואל", religion: "נוצרי", politicalView: "ימין מרכז", diet: "אוכל כשרות" },
    { name: "איתן", genderIdentity: "ללא הגדרה", origin_p1_grandpa: "New Zealand", origin_p1_grandma: "Fiji", origin_p2_grandpa: "Samoa", origin_p2_grandma: "Tonga", belonging: 0, countryToLive: "New Zealand", languageToSpeak: "Samoan", favoriteCuisine: "Fijian", cultureToBelong: "Tongan", childhoodEnvironment: "אחר", sexualOrientation: "א-מיני", religion: "אתאיסט", politicalView: "מרכז", diet: "אוכלת הכל" },
    { name: "הילה", genderIdentity: "אשה", origin_p1_grandpa: "Nigeria", origin_p1_grandma: "Ghana", origin_p2_grandpa: "Cameroon", origin_p2_grandma: "Ivory Coast", belonging: -1, countryToLive: "Ghana", languageToSpeak: "French", favoriteCuisine: "Nigerian", cultureToBelong: "Ghanaian", childhoodEnvironment: "עיר", sexualOrientation: "הטרוסקסואל", religion: "נוצרי", politicalView: "שמאל", diet: "טבעוני" },
    { name: "גיא", genderIdentity: "גבר", origin_p1_grandpa: "Algeria", origin_p1_grandma: "Tunisia", origin_p2_grandpa: "Egypt", origin_p2_grandma: "Libya", belonging: 1, countryToLive: "Egypt", languageToSpeak: "Arabic", favoriteCuisine: "Tunisian", cultureToBelong: "Algerian", childhoodEnvironment: "קיבוץ", sexualOrientation: "ביסקסואל", religion: "מוסלמי", politicalView: "ימין", diet: "צמחוני" },
    { name: "ליבי", genderIdentity: "א-בינארי", origin_p1_grandpa: "Kazakhstan", origin_p1_grandma: "Uzbekistan", origin_p2_grandpa: "Turkmenistan", origin_p2_grandma: "Kyrgyzstan", belonging: 0, countryToLive: "Kazakhstan", languageToSpeak: "Russian", favoriteCuisine: "Uzbek", cultureToBelong: "Kazakh", childhoodEnvironment: "מושב", sexualOrientation: "פאנסקסואל", religion: "אתאיסט", politicalView: "מרכז", diet: "אוכל כשרות" },
    { name: "רועי", genderIdentity: "גבר טראנס", origin_p1_grandpa: "Belarus", origin_p1_grandma: "Lithuania", origin_p2_grandpa: "Latvia", origin_p2_grandma: "Estonia", belonging: -1, countryToLive: "Lithuania", languageToSpeak: "Belarusian", favoriteCuisine: "Lithuanian", cultureToBelong: "Latvian", childhoodEnvironment: "עיר", sexualOrientation: "הומוסקסואל", religion: "נוצרי", politicalView: "שמאל מרכז", diet: "אוכלת הכל" },
    { name: "שני", genderIdentity: "אשה", origin_p1_grandpa: "Angola", origin_p1_grandma: "Mozambique", origin_p2_grandpa: "Cabo Verde", origin_p2_grandma: "Portugal", belonging: 1, countryToLive: "Portugal", languageToSpeak: "Portuguese", favoriteCuisine: "Angolan", cultureToBelong: "Mozambican", childhoodEnvironment: "קיבוץ", sexualOrientation: "הטרוסקסואל", religion: "אתאיסט", politicalView: "ימין מרכז", diet: "טבעוני" },
    { name: "עמרי", genderIdentity: "גבר", origin_p1_grandpa: "Guatemala", origin_p1_grandma: "Honduras", origin_p2_grandpa: "Nicaragua", origin_p2_grandma: "El Salvador", belonging: 0, countryToLive: "Guatemala", languageToSpeak: "Spanish", favoriteCuisine: "Honduran", cultureToBelong: "Nicaraguan", childhoodEnvironment: "מושב", sexualOrientation: "ביסקסואל", religion: "נוצרי", politicalView: "מרכז", diet: "צמחוני" },
    { name: "אגם", genderIdentity: "אשה טראנסית", origin_p1_grandpa: "Ireland", origin_p1_grandma: "Scotland", origin_p2_grandpa: "Wales", origin_p2_grandma: "England", belonging: -1, countryToLive: "Ireland", languageToSpeak: "Gaelic", favoriteCuisine: "Scottish", cultureToBelong: "Welsh", childhoodEnvironment: "עיר", sexualOrientation: "פאנסקסואל", religion: "אתאיסט", politicalView: "שמאל", diet: "אוכל כשרות" },
    { name: "נדב", genderIdentity: "ללא הגדרה", origin_p1_grandpa: "Iran", origin_p1_grandma: "Iraq", origin_p2_grandpa: "Afghanistan", origin_p2_grandma: "Pakistan", belonging: 1, countryToLive: "Iran", languageToSpeak: "Persian", favoriteCuisine: "Iraqi", cultureToBelong: "Afghan", childhoodEnvironment: "אחר", sexualOrientation: "א-מיני", religion: "מוסלמי", politicalView: "ימין", diet: "אוכלת הכל" },
    { name: "ליאן", genderIdentity: "אשה", origin_p1_grandpa: "Jamaica", origin_p1_grandma: "Haiti", origin_p2_grandpa: "Dominican Republic", origin_p2_grandma: "Cuba", belonging: 0, countryToLive: "Jamaica", languageToSpeak: "Patois", favoriteCuisine: "Haitian", cultureToBelong: "Cuban", childhoodEnvironment: "קיבוץ", sexualOrientation: "הטרוסקסואל", religion: "נוצרי", politicalView: "מרכז", diet: "טבעוני" },
    { name: "עידו", genderIdentity: "גבר", origin_p1_grandpa: "Austria", origin_p1_grandma: "Hungary", origin_p2_grandpa: "Czech Republic", origin_p2_grandma: "Slovakia", belonging: -1, countryToLive: "Austria", languageToSpeak: "German", favoriteCuisine: "Hungarian", cultureToBelong: "Czech", childhoodEnvironment: "מושב", sexualOrientation: "ביסקסואל", religion: "אתאיסט", politicalView: "שמאל מרכז", diet: "צמחוני" },
    { name: "מיכל", genderIdentity: "א-בינארי", origin_p1_grandpa: "Morocco", origin_p1_grandma: "Algeria", origin_p2_grandpa: "Tunisia", origin_p2_grandma: "Libya", belonging: 1, countryToLive: "Morocco", languageToSpeak: "Berber", favoriteCuisine: "Moroccan", cultureToBelong: "Tunisian", childhoodEnvironment: "עיר", sexualOrientation: "פאנסקסואל", religion: "יהודי", politicalView: "ימין מרכז", diet: "אוכל כשרות" },
     { name: "יעל", genderIdentity: "אשה", origin_p1_grandpa: "Poland", origin_p1_grandma: "Ukraine", origin_p2_grandpa: "Morocco", origin_p2_grandma: "Egypt", belonging: -1, countryToLive: "Brazil", languageToSpeak: "Japan", favoriteCuisine: "Italy", cultureToBelong: "Israel", childhoodEnvironment: "עיר", sexualOrientation: "ביסקסואל", religion: "יהודי", politicalView: "שמאל מרכז", diet: "אוכלת הכל" },
  { name: "דני", genderIdentity: "גבר", origin_p1_grandpa: "Germany", origin_p1_grandma: "France", origin_p2_grandpa: "United States", origin_p2_grandma: "Canada", belonging: 1, countryToLive: "Australia", languageToSpeak: "Spain", favoriteCuisine: "Mexico", cultureToBelong: "United States", childhoodEnvironment: "קיבוץ", sexualOrientation: "הטרוסקסואל", religion: "אתאיסט", politicalView: "מרכז", diet: "טבעוני" },
  { name: "מאיה", genderIdentity: "א-בינארי", origin_p1_grandpa: "China", origin_p1_grandma: "Japan", origin_p2_grandpa: "Brazil", origin_p2_grandma: "Argentina", belonging: 0, countryToLive: "New Zealand", languageToSpeak: "South Korea", favoriteCuisine: "Thailand", cultureToBelong: "Japan", childhoodEnvironment: "מושב", sexualOrientation: "פאנסקסואל", religion: "בודהיסט", politicalView: "שמאל", diet: "צמחוני" },
  { name: "איתי", genderIdentity: "גבר טראנס", origin_p1_grandpa: "Russia", origin_p1_grandma: "Nigeria", origin_p2_grandpa: "India", origin_p2_grandma: "Australia", belonging: 1, countryToLive: "Canada", languageToSpeak: "Germany", favoriteCuisine: "India", cultureToBelong: "United Kingdom", childhoodEnvironment: "אחר", sexualOrientation: "הומוסקסואל", religion: "נוצרי", politicalView: "ימין", diet: "אוכל כשרות" },
  { name: "נועה", genderIdentity: "אשה טראנסית", origin_p1_grandpa: "Italy", origin_p1_grandma: "Greece", origin_p2_grandpa: "Turkey", origin_p2_grandma: "Iran", belonging: -1, countryToLive: "Spain", languageToSpeak: "France", favoriteCuisine: "Greece", cultureToBelong: "France", childhoodEnvironment: "עיר", sexualOrientation: "הטרוסקסואל", religion: "מוסלמי", politicalView: "ימין מרכז", diet: "אוכלת הכל" },
  { name: "יונתן", genderIdentity: "ללא הגדרה", origin_p1_grandpa: "South Africa", origin_p1_grandma: "Namibia", origin_p2_grandpa: "Ireland", origin_p2_grandma: "United Kingdom", belonging: 1, countryToLive: "Ireland", languageToSpeak: "United Kingdom", favoriteCuisine: "United Kingdom", cultureToBelong: "Ireland", childhoodEnvironment: "קיבוץ", sexualOrientation: "א-מיני", religion: "אתאיסט", politicalView: "שמאל", diet: "טבעוני" },
  { name: "תמר", genderIdentity: "אשה", origin_p1_grandpa: "Egypt", origin_p1_grandma: "Libya", origin_p2_grandpa: "Syria", origin_p2_grandma: "Lebanon", belonging: 0, countryToLive: "United Arab Emirates", languageToSpeak: "United Arab Emirates", favoriteCuisine: "Lebanon", cultureToBelong: "Egypt", childhoodEnvironment: "עיר", sexualOrientation: "ביסקסואל", religion: "יהודי", politicalView: "מרכז", diet: "צמחוני" },
  { name: "עומר", genderIdentity: "גבר", origin_p1_grandpa: "Argentina", origin_p1_grandma: "Chile", origin_p2_grandpa: "Spain", origin_p2_grandma: "Portugal", belonging: -1, countryToLive: "Portugal", languageToSpeak: "Portugal", favoriteCuisine: "Argentina", cultureToBelong: "Spain", childhoodEnvironment: "מושב", sexualOrientation: "הטרוסקסואל", religion: "נוצרי", politicalView: "ימין מרכז", diet: "אוכל הכל" },
  { name: "אלה", genderIdentity: "א-בינארי", origin_p1_grandpa: "Vietnam", origin_p1_grandma: "Thailand", origin_p2_grandpa: "Netherlands", origin_p2_grandma: "Belgium", belonging: 1, countryToLive: "Netherlands", languageToSpeak: "Netherlands", favoriteCuisine: "Vietnam", cultureToBelong: "Thailand", childhoodEnvironment: "עיר", sexualOrientation: "פאנסקסואל", religion: "בודהיסט", politicalView: "שמאל", diet: "טבעוני" },
  { name: "אריאל", genderIdentity: "גבר טראנס", origin_p1_grandpa: "Mexico", origin_p1_grandma: "Cuba", origin_p2_grandpa: "Sweden", origin_p2_grandma: "Norway", belonging: 0, countryToLive: "Sweden", languageToSpeak: "Sweden", favoriteCuisine: "Mexico", cultureToBelong: "Cuba", childhoodEnvironment: "אחר", sexualOrientation: "הומוסקסואל", religion: "אתאיסט", politicalView: "ימין", diet: "אוכל כשרות" }
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
    const [groupByKey, setGroupByKey] = useState<keyof Answers>('genderIdentity'); // Default group by gender

    useEffect(() => {
        // TODO: Implement Firestore fetching logic here.
    }, []);

    // --- NEW: Logic to group flowers by the selected key ---
    const groupedFlowers = useMemo(() => {
        const groups: { [key: string]: Answers[] } = {};

        allFlowers.forEach(flower => {
            let groupValue = flower[groupByKey] as string;

            // Special handling for 'origin' to group by the first grandparent found
            if (groupByKey === 'origin') {
                groupValue = (flower.origin_p1_grandpa || flower.origin_p1_grandma || flower.origin_p2_grandpa || flower.origin_p2_grandma || "לא ידוע") as string;
            }

            if (!groupValue) {
                groupValue = "ללא הגדרה";
            }

            if (!groups[groupValue]) {
                groups[groupValue] = [];
            }
            groups[groupValue].push(flower);
        });

        // Convert to array and sort groups alphabetically
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
                    {groupedFlowers.map(([groupName, flowersInGroup]) => (
                        <div key={groupName} className="gallery-group">
                            <Typography variant="h5" className="gallery-group-title">{groupName}</Typography>
                            <div className="gallery-bunch-container">
                                {flowersInGroup.map((flowerAnswers, index) => (
                                    <div
                                        key={index}
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
                                ))}
                            </div>
                        </div>
                    ))}
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