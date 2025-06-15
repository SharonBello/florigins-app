import { flowerDefinitions, petalShapes } from '../data/appData';
import type { Answers } from '../types/Answers';

// The 'formStep' prop is no longer required here.
interface FlowerProps {
    answers: Answers;
}

const Petal = ({ rotation, gradientId, shapePath }: { rotation: number; gradientId: string; shapePath: string; }) => (
    <g transform={`rotate(${rotation} 50 50)`} style={{ transition: 'transform 0.5s ease-in-out', transformOrigin: '50% 50%' }}>
      <path d={shapePath} fill={`url(#${gradientId})`} transform="translate(0, -40) scale(0.9)"/>
    </g>
);

export const Flower = ({ answers }: FlowerProps) => {
    const getCountryDef = (countryName: string) => flowerDefinitions.find(d => d.country === countryName);
    
    const petalData = [
        { answerKey: 'origin_p1_grandpa', rotation: 0 }, { answerKey: 'origin_p2_grandpa', rotation: 45 },
        { answerKey: 'origin_p1_grandma', rotation: 90 }, { answerKey: 'origin_p2_grandma', rotation: 135 },
        { answerKey: 'countryToLive', rotation: 180 }, { answerKey: 'favoriteCuisine', rotation: 225 },
        { answerKey: 'cultureToBelong', rotation: 270 }, { answerKey: 'languageToSpeak', rotation: 315 },
    ];

    const renderedPetals = petalData.map((data) => {
        const countryName = answers[data.answerKey];
        if (!countryName || typeof countryName !== 'string') return null;

        const countryDef = getCountryDef(countryName);
        if (!countryDef) return null;

        const gradientId = `gradient-${data.answerKey}`;
        const shapePath = petalShapes[countryDef.continent] || petalShapes.default;

        return { ...data, gradientId, shapePath, gradientStops: countryDef.gradientStops };
    }).filter(Boolean);

    return (
        <div className="w-full h-full flex items-center justify-center">
            <svg viewBox="0 0 100 100" className="w-full h-full max-w-md max-h-md">
                <defs>
                    {renderedPetals.map(p => (
                        <linearGradient key={p!.gradientId} id={p!.gradientId} x1="0%" y1="0%" x2="0%" y2="100%">
                            {p!.gradientStops.map((stop, i) => (
                                <stop key={i} offset={`${(i / (p!.gradientStops.length - 1)) * 100}%`} stopColor={stop} />
                            ))}
                        </linearGradient>
                    ))}
                </defs>
                <g>
                    {renderedPetals.map((p, index) => (
                         <g key={index} className="animate-fade-in">
                            <Petal rotation={p!.rotation} gradientId={p!.gradientId} shapePath={p!.shapePath} />
                         </g>
                    ))}
                </g>
                <circle cx="50" cy="50" r="10" fill="white" stroke="#e2e8f0" strokeWidth="1"/>
            </svg>
        </div>
    );
};