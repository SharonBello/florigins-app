import { useMemo, useState, type JSX } from 'react';
import './Flower.scss';
import type { Answers } from '../../types/Answers';
import { centerShapes, childhoodEnvironmentAccents, continentCombinationGradients, dietAccents, flowerDefinitions, petalShapes, politicalViewAccents, questions, religionAccents, sexualOrientationAccents } from '../../data/appData';
import type { Question } from '../../types/Question';
import Tooltip, { type TooltipProps } from '@mui/material/Tooltip';
import { Typography } from '@mui/material';

interface PetalInfo {
  key: string;
  rotation: number;
  gradientId: string;
  gradientStops: string[];
  ShapeComponent: () => JSX.Element;
}

const petalLayout: Record<string, { rotation: number }> = {
  'origin_p1_grandpa': { rotation: 45 },   // 1st Question -> Top-Right
  'origin_p1_grandma': { rotation: 135 },  // 2nd Question -> Top-Left
  'origin_p2_grandpa': { rotation: 315 },  // 3rd Question -> Bottom-Left
  'origin_p2_grandma': { rotation: 225 },  // 4th Question -> Bottom-Right

  'countryToLive': { rotation: 180 },
  'languageToSpeak': { rotation: 90 },
  'favoriteCuisine': { rotation: 270 },
  'cultureToBelong': { rotation: 0 },
};

const basePetalKeys = new Set(['origin_p1_grandpa', 'origin_p1_grandma', 'origin_p2_grandpa', 'origin_p2_grandma']);

const getTooltipConfig = (rotation: number): { placement: TooltipProps['placement'], offset: [number, number] } => {
  if (rotation === 0) return { placement: 'top', offset: [0, 25] };
  if (rotation === 90) return { placement: 'right', offset: [0, 15] };
  if (rotation === 180) return { placement: 'bottom', offset: [0, 15] };
  if (rotation === 270) return { placement: 'left', offset: [0, -15] };

  if (rotation === 45) return { placement: 'top-end', offset: [140, -70] };
  if (rotation === 135) return { placement: 'bottom-end', offset: [140, -70] };
  if (rotation === 225) return { placement: 'bottom-start', offset: [-150, -70] };
  if (rotation === 315) return { placement: 'top-start', offset: [-150, -70] };

  return { placement: 'top', offset: [0, -15] }; // Default
};

const tooltipLabels: Record<string, string> = {
  'name': 'שם',
  'origin_p1_grandpa': 'מוצא סבא מצד הורה 1',
  'origin_p1_grandma': 'מוצא סבתא מצד הורה 1',
  'origin_p2_grandpa': 'מוצא סבא מצד הורה 2',
  'origin_p2_grandma': 'מוצא סבתא מצד הורה 2',
  'belonging': 'שייכות',
  'countryToLive': 'מדינה למגורים',
  'languageToSpeak': 'שפה מועדפת',
  'favoriteCuisine': 'מטבח אהוב',
  'cultureToBelong': 'תרבות להשתייכות',
  'childhoodEnvironment': 'סביבת ילדות',
  'sexualOrientation': 'נטייה מינית',
  'religion': 'דת',
  'politicalView': 'השקפה פוליטית',
  'diet': 'תזונה',
};

export const Flower = ({ answers, viewBox }: { answers: Answers, viewBox: string }) => {
  const [hoveredKey, setHoveredKey] = useState<string | null>(null);

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

  const childhoodAccentGradient = useMemo((): string[] | null => {
    const belonging = answers.belonging as number;
    if (belonging === 0 || belonging === undefined) return null;

    const side1 = [answers.origin_p1_grandpa, answers.origin_p1_grandma].map(cn => flowerDefinitions.find(f => f.country === cn)?.continent).filter((c): c is string => Boolean(c)).sort();
    const side2 = [answers.origin_p2_grandpa, answers.origin_p2_grandma].map(cn => flowerDefinitions.find(f => f.country === cn)?.continent).filter((c): c is string => Boolean(c)).sort();

    let comboKey: string | null = null;
    if (belonging === -1 && side1.length === 2) comboKey = side1.join('-');
    else if (belonging === 1 && side2.length === 2) comboKey = side2.join('-');

    if (!comboKey) return null;

    const raw = continentCombinationGradients[comboKey];
    if (!raw) return null;
    return raw;
  }, [answers.belonging, answers.origin_p1_grandpa, answers.origin_p1_grandma, answers.origin_p2_grandpa, answers.origin_p2_grandma]);

  // Get the data for each dynamic part of the flower
  const CenterShapeComponent = centerShapes[answers.genderIdentity as string] || null;
  const OrientationAccentComponent = sexualOrientationAccents[answers.sexualOrientation as string] || null;
  const ReligionAccentElement = religionAccents[answers.religion as string] || null;
  const DietAccentComponent = dietAccents[answers.diet as string] || null;
  const ChildhoodComponent = childhoodEnvironmentAccents[answers.childhoodEnvironment as string] || null;

  const innerPetals = allPetals.filter(p => !basePetalKeys.has(p.key));
  const topAndBottomInnerPetals = innerPetals.filter(p => p.rotation === 0 || p.rotation === 180);
  const leftAndRightInnerPetals = innerPetals.filter(p => p.rotation === 90 || p.rotation === 270);
  const PoliticalAccents = politicalViewAccents[answers.politicalView as string] || null;
  const rightPetal = innerPetals.find(p => p.rotation === 270);
  const leftPetal = innerPetals.find(p => p.rotation === 90);

  const getDisplayValue = (question: Question, value: string): string => {
    if (question.type.includes('_select') && value) {
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

  const renderTooltipTitle = (itemKey: string) => {
    const question = questions.find(q => q.id === itemKey);
    const answerValue = answers[itemKey] as string;
    if (!question || !answerValue) return "";

    const displayValue = getDisplayValue(question, answerValue);
    const label = tooltipLabels[itemKey] || question.label;

    return (
      <div>
        <Typography variant="caption" display="block">{label}:</Typography>
        <Typography variant="body2" style={{ fontWeight: 500 }}>{displayValue}</Typography>
      </div>
    );
  };

  return (
    <div className="flower-container">
      {/* Adjusted viewBox for better centering */}
      <svg viewBox={viewBox} preserveAspectRatio="xMidYMid meet">
        <defs>
          {allPetals.map(p => (
            <linearGradient key={p.gradientId} id={p.gradientId} gradientTransform="rotate(90)">
              {p.gradientStops.map((stop, i) => (
                <stop key={i} offset={`${(i / (p.gradientStops.length - 1)) * 100}%`} stopColor={stop} />
              ))}
            </linearGradient>
          ))}
          {childhoodAccentGradient && (
            <linearGradient
              id="childhood-gradient"
              gradientTransform="rotate(90)"
            >
              {childhoodAccentGradient.map((color, i) => (
                <stop
                  key={i}
                  offset={`${(i / (childhoodAccentGradient.length - 1)) * 100}%`}
                  stopColor={color}
                />
              ))}
            </linearGradient>
          )}

          <filter id="drop-shadow" x="-100%" y="-100%" width="300%" height="300%">
            <feDropShadow dx="0.5" dy="1" stdDeviation="1" floodColor="#000000" floodOpacity="0.2" />
          </filter>
        </defs>

        <g className="render-layers">

          <g className="petal-layer">
            {sortedPetals.map(pd => {
              const isBasePetal = basePetalKeys.has(pd.key);
              const scale = isBasePetal ? 0.4 : 0.39;
              const radialOffset = isBasePetal ? -48 : -42;

              const { placement, offset } = getTooltipConfig(pd.rotation);

              return (
                <Tooltip
                  title={renderTooltipTitle(pd.key)}
                  placement={placement}
                  key={pd.key}
                  // --- UPDATED: Use slotProps to apply a custom class ---
                  slotProps={{
                    tooltip: {
                      className: 'custom-tooltip'
                    },
                    popper: {
                      modifiers: [
                        {
                          name: 'offset',
                          options: {
                            offset: offset,
                          },
                        },
                      ],
                    },
                  }}
                >
                  <g
                    className="petal-group"
                    transform={`translate(100, 100) rotate(${pd.rotation}) translate(0, ${radialOffset})`}
                    onMouseEnter={() => setHoveredKey(pd.key)}
                    onMouseLeave={() => setHoveredKey(null)}
                  >
                    <g className={`petal-visuals ${hoveredKey === pd.key ? 'hovered' : ''}`}>
                      <g transform={`scale(${scale})`} filter="url(#drop-shadow)" fill={`url(#${pd.gradientId})`}>
                        <pd.ShapeComponent />
                      </g>
                    </g>
                  </g>
                </Tooltip>
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
            {ChildhoodComponent && innerPetals.map((p): JSX.Element => (
              <g
                key={`c-${p.key}`}
                transform={`translate(100,100) rotate(${p.rotation}) translate(0,-68)`}
              >
                <g transform="scale(0.6)">
                  {/* use the new gradient or fall back to white */}
                  <ChildhoodComponent
                    fill={childhoodAccentGradient ? 'url(#childhood-gradient)' : '#fff'}
                  />
                </g>
              </g>
            ))}
          </g>
        </g>
      </svg>
    </div>
  );
};