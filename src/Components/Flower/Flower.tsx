import React, { type JSX } from 'react';
import './Flower.scss';
import type { Answers } from '../../types/Answers';
import { centerShapes, childhoodEnvironmentAccents, dietAccents, flowerDefinitions, petalShapes, politicalViewAccents, religionAccents, sexualOrientationAccents } from '../../data/appData';

// The PetalInfo interface can be simplified as we build it dynamically
interface PetalInfo {
  key: string;
  rotation: number;
  gradientId: string;
  gradientStops: string[];
  ShapeComponent: () => JSX.Element;
}

// --- LAYOUT CONFIGURATION ---
// This object maps each answer key to its fixed position on the flower.
// You can adjust the rotation values here to change the layout.
const petalLayout: Record<string, { rotation: number }> = {
  // Base Petals (Grandparents) - In order of the questions
  'origin_p1_grandpa': { rotation: 45 },   // 1st Question -> Top-Right
  'origin_p1_grandma': { rotation: 135 },  // 2nd Question -> Top-Left
  'origin_p2_grandpa': { rotation: 315 },  // 3rd Question -> Bottom-Left
  'origin_p2_grandma': { rotation: 225 },  // 4th Question -> Bottom-Right

  // Inner Petals
  'countryToLive': { rotation: 180 },
  'languageToSpeak': { rotation: 90 },
  'favoriteCuisine': { rotation: 270 },
  'cultureToBelong': { rotation: 0 },
};

const basePetalKeys = new Set(['origin_p1_grandpa', 'origin_p1_grandma', 'origin_p2_grandpa', 'origin_p2_grandma']);



// --- THE MAIN FLOWER COMPONENT ---
export const Flower = ({ answers }: { answers: Answers }) => {
  console.log('Answers received by Flower component:', answers);

  // Dynamically build the list of petals based on the provided answers
  const allPetals = Object.keys(answers).map((key): PetalInfo | null => {
    const countryName = answers[key] as string;
    const layoutInfo = petalLayout[key];
    if (!countryName || !layoutInfo) return null;

    const def = flowerDefinitions.find(d => d.country === countryName);
    if (!def) return null;

    const ShapeComponent = petalShapes[def.continent] || petalShapes.default;

    return { key, rotation: layoutInfo.rotation, gradientId: `g-${key}`, gradientStops: def.gradientStops, ShapeComponent };
  })
    .filter((p): p is PetalInfo => p !== null);

  const sortedPetals = allPetals.sort((a, b) => {
    const aIsBase = basePetalKeys.has(a.key);
    const bIsBase = basePetalKeys.has(b.key);
    if (aIsBase && !bIsBase) return 1;  // a (base) comes after b (inner)
    if (!aIsBase && bIsBase) return -1; // a (inner) comes before b (base)
    return 0;
  });

  // Get the data for each dynamic part of the flower
  const CenterShapeComponent = centerShapes[answers.genderIdentity as string] || null;
  // ... (the rest of your accent logic remains the same)
  const OrientationAccentComponent = sexualOrientationAccents[answers.sexualOrientation as string] || null;
  const ReligionAccentElement = religionAccents[answers.religion as string] || null;
  const DietAccentComponent = dietAccents[answers.diet as string] || null;
  const childhoodAccentElement = childhoodEnvironmentAccents[answers.childhoodEnvironment as string] || null;

  const innerPetals = allPetals.filter(p => !basePetalKeys.has(p.key));
  const topAndBottomInnerPetals = innerPetals.filter(p => p.rotation === 0 || p.rotation === 180);
  const leftAndRightInnerPetals = innerPetals.filter(p => p.rotation === 90 || p.rotation === 270);
  const PoliticalAccents = politicalViewAccents[answers.politicalView as string] || null;
  const rightPetal = innerPetals.find(p => p.rotation === 270);
  const leftPetal = innerPetals.find(p => p.rotation === 90);

  return (
    <div className="flower-container">
      {/* Adjusted viewBox for better centering */}
      <svg viewBox="-75 -125 450 450" preserveAspectRatio="xMidYMid meet">
        <defs>
          {allPetals.map(p => (
            <linearGradient key={p.gradientId} id={p.gradientId} gradientTransform="rotate(90)">
              {p.gradientStops.map((stop, i) => (
                <stop key={i} offset={`${(i / (p.gradientStops.length - 1)) * 100}%`} stopColor={stop} />
              ))}
            </linearGradient>
          ))}
          <filter id="drop-shadow" x="-100%" y="-100%" width="300%" height="300%">
            <feDropShadow dx="0.5" dy="1" stdDeviation="1" floodColor="#000000" floodOpacity="0.2" />
          </filter>
        </defs>

        <g className="render-layers">

          <g className="petal-layer">
            {sortedPetals.map(pd => {
              const isBasePetal = basePetalKeys.has(pd.key);
              const scale = isBasePetal ? 0.4 : 0.3; // Made petals smaller
              const radialOffset = isBasePetal ? -48 : -42; // Brought them closer to the center

              return (
                <g key={pd.key} transform={`translate(100, 100) rotate(${pd.rotation}) translate(0, ${radialOffset})`} filter="url(#drop-shadow)" fill={`url(#${pd.gradientId})`}>
                  <g transform={`scale(${scale})`}>
                    <pd.ShapeComponent />
                  </g>
                </g>
              );
            })}
          </g>

          <g className="center-layer" transform="translate(100, 100) scale(0.8)" filter="url(#drop-shadow)">
            {CenterShapeComponent && (
              <g className="center-enter">
                <CenterShapeComponent />
              </g>
            )}
          </g>

          {/* --- ACCENT LAYERS (No Shadow) --- */}
          <g className="accent-layer" fill="none" stroke="#333" strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round">

            {/* Sexual Orientation Accents - On tips of outer petals */}
            {OrientationAccentComponent && topAndBottomInnerPetals.map((petal: { key: any; rotation: any; gradientId: any; }) => (
              // We iterate over the new filtered list
              <g key={`so-${petal.key}`} transform={`translate(100, 100) rotate(${petal.rotation}) translate(25, -68)`}>
                <OrientationAccentComponent fill={`url(#${petal.gradientId})`} />
              </g>
            ))}

            {/* Political View Accents - On sides of horizontal outer petals */}
            {PoliticalAccents && PoliticalAccents.right && rightPetal && (
              <g transform={`translate(100, 100) rotate(90) translate(65, 0) rotate(${PoliticalAccents.rightTilt || 0})`}>
                <g transform="scale(0.8)">
                  <PoliticalAccents.right fill={`url(#${rightPetal.gradientId})`} />
                </g>
              </g>
            )}
            {PoliticalAccents && PoliticalAccents.left && leftPetal && (
              <g transform={`translate(100, 100) rotate(270) translate(65, 0) rotate(${PoliticalAccents.leftTilt || 0})`}>
                <g transform="scale(0.8)">
                  <PoliticalAccents.left fill={`url(#${leftPetal.gradientId})`} />
                </g>
              </g>
            )}

            {DietAccentComponent && leftAndRightInnerPetals.map((petal: { key: any; rotation: any; gradientId: any; }) => (
              <g key={`r-${petal.key}`} transform={`translate(100, 100) rotate(${petal.rotation}) translate(0, -35)`}>
                <g transform="scale(0.8)">
                  <DietAccentComponent fill={`url(#${petal.gradientId})`} />
                </g>
              </g>
            ))}

            {/* Religion Accents - Between inner and outer petals */}
            {ReligionAccentElement && leftAndRightInnerPetals.map((petal: { key: any; rotation: any; gradientId: any; }) => (
              <g key={`r-${petal.key}`} transform={`translate(100, 100) rotate(${petal.rotation}) translate(0, -35)`}>
                <g transform="scale(0.8)">
                  <ReligionAccentElement fill={`url(#${petal.gradientId})`} />
                </g>
              </g>
            ))}

            {/* Childhood Accents - Inside inner petals */}
            {childhoodAccentElement && innerPetals.map(p => {
              return (
                <g key={`c-${p.key}`} transform={`translate(100, 100) rotate(${p.rotation}) translate(0, -65)`}>
                  <g transform="scale(0.5)">
                    {childhoodAccentElement}
                  </g>
                </g>
              );
            })}
          </g>
        </g>
      </svg>
    </div>
  );
};