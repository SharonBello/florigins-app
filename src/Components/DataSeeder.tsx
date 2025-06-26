import { useState } from 'react';
import { db } from '../../firebase'; // Make sure this path is correct
import { collection, addDoc } from "firebase/firestore";
import { Button } from '@mui/material';
import type { Answers } from '../types/Answers';

// The full list of mock flowers to be added
const mockFlowers: Answers[] = [
    { name: "יעל", genderIdentity: "אשה", origin_p1_grandpa: "Poland", origin_p1_grandma: "Ukraine", origin_p2_grandpa: "Morocco", origin_p2_grandma: "Egypt", belonging: -1, countryToLive: "Brazil", languageToSpeak: "Japan", favoriteCuisine: "Italy", cultureToBelong: "Israel", childhoodEnvironment: "עיר", sexualOrientation: "ביסקסואל", religion: "יהודי", politicalView: "שמאל מרכז", diet: "אוכלת הכל" },
    { name: "דני", genderIdentity: "גבר", origin_p1_grandpa: "Germany", origin_p1_grandma: "France", origin_p2_grandpa: "United States", origin_p2_grandma: "Canada", belonging: 1, countryToLive: "Australia", languageToSpeak: "Spain", favoriteCuisine: "Mexico", cultureToBelong: "American", childhoodEnvironment: "קיבוץ", sexualOrientation: "הטרוסקסואל", religion: "אתאיסט", politicalView: "מרכז", diet: "טבעוני"  },
    { name: "מאיה", genderIdentity: "א-בינארי", origin_p1_grandpa: "China", origin_p1_grandma: "Japan", origin_p2_grandpa: "Brazil", origin_p2_grandma: "Argentina", belonging: 0, countryToLive: "New Zealand", languageToSpeak: "South Korea", favoriteCuisine: "Thailand", cultureToBelong: "Japanese", childhoodEnvironment: "מושב", sexualOrientation: "פאנסקסואל", religion: "בודהיסט", politicalView: "שמאל", diet: "צמחוני"  },
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
    { name: "הילה", genderIdentity: "אשה", origin_p1_grandpa: "Nigeria", origin_p1_grandma: "Ghana", origin_p2_grandpa: "Cameroon", origin_p2_grandma: "Ivory Coast", belonging: -1, countryToLive: "Ghana", languageToSpeak: "French", favoriteCuisine: "Nigerian", cultureToBelong: "Ghanaian", childhoodEnvironment: "עיר", sexualOrientation: "הטרוסקסואל", religion: "נוצרי", politicalView: "שמאל", diet: "טבעוני" }
];

export const DataSeeder = () => {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handleSeedDatabase = async () => {
        setLoading(true);
        setMessage('Adding flowers to the database...');

        try {
            const flowersCollection = collection(db, 'submittedFlowers');
            for (const flowerData of mockFlowers) {
                await addDoc(flowersCollection, flowerData);
            }
            setMessage(`${mockFlowers.length} flowers successfully added! You can now remove this component.`);
        } catch (error) {
            console.error("Error seeding database: ", error);
            setMessage('An error occurred. Check the console for details.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ padding: '2rem', textAlign: 'center' }}>
            <Button
                variant="contained"
                onClick={handleSeedDatabase}
                disabled={loading}
            >
                {loading ? 'Adding...' : 'Add Mock Flowers to DB'}
            </Button>
            {message && <p style={{ marginTop: '1rem' }}>{message}</p>}
        </div>
    );
};
