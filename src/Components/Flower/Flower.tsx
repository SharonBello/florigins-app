import { useMemo, useState, type JSX, useId } from 'react';
import { centerShapes, childhoodEnvironmentAccents, continentCombinationGradients, dietAccents, flowerDefinitions, petalShapes, politicalViewAccents, questions, religionAccents, sexualOrientationAccents } from '../../data/appData';
import type { Question } from '../../types/Question';
import Tooltip, { type TooltipProps } from '@mui/material/Tooltip';
import { Typography } from '@mui/material';
import type { FlowerProps } from '../../types/FlowerDefinition';
import './Flower.scss';

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
  if (rotation === 270) return { placement: 'left', offset: [0, 10] };

  if (rotation === 45) return { placement: 'top-end', offset: [140, -50] };
  if (rotation === 135) return { placement: 'bottom-end', offset: [140, -50] };
  if (rotation === 225) return { placement: 'bottom-start', offset: [-150, -50] };
  if (rotation === 315) return { placement: 'top-start', offset: [-150, -70] };

  return { placement: 'top', offset: [0, -15] }; // Default
};

const tooltipLabels: Record<string, string> = {
  'name': 'שם',
  'genderIdentity': 'זהות מגדרית',
  'origin_p1_grandpa': 'מוצא סבא מצד הורה 1',
  'origin_p1_grandma': 'מוצא סבתא מצד הורה 1',
  'origin_p2_grandpa': 'מוצא סבא מצד הורה 2',
  'origin_p2_grandma': 'מוצא סבתא מצד הורה 2',
  'belonging': 'שייכות',
  'countryToLive': 'באיזה מדינה היית רוצה לגור',
  'languageToSpeak': 'איזה שפה היית רוצה לדבר',
  'favoriteCuisine': 'מטבח אהוב',
  'cultureToBelong': 'לאיזה תרבות היית רוצה להשתייך',
  'childhoodEnvironment': 'באיזו סביבה גדלת',
  'sexualOrientation': 'נטייה מינית',
  'religion': 'דת',
  'politicalView': 'השקפה פוליטית',
  'diet': 'תזונה',
};

const TooltipWrapper = ({
  showTooltip,
  title,
  placement,
  offset,
  children,
}: {
  showTooltip: boolean;
  title: JSX.Element | string;
  placement: TooltipProps['placement'];
  offset: [number, number];
  children: JSX.Element;
}) => {
  if (!showTooltip) return children;

  return (
    <Tooltip
      title={title}
      placement={placement}
      slotProps={{
        tooltip: {
          sx: {
            backgroundColor: '#fff',
            color: 'rgba(0, 0, 0, 0.87)',
            borderRadius: '25px',
            padding: '6px 12px',
            textAlign: 'right',
            direction: 'rtl',
            minWidth: '8rem',
            '& .MuiTypography-root': {
              fontFamily: "'Heebo', sans-serif",
              letterSpacing: '0.2em',
              fontWeight: 300,
              color: '#333',
            },
            '& .MuiTypography-caption': {
              fontSize: '0.8rem',
              opacity: 0.8,
            },
            '& .MuiTypography-body2': {
              fontSize: '0.8rem',
              fontWeight: 700,
            },
          },
        },
        popper: {
          modifiers: [{ name: 'offset', options: { offset } }],
        },
      }}
    >
      {children}
    </Tooltip>
  );
};

export const Flower = ({ answers, viewBox, showTooltip = true }: FlowerProps) => {
  const [hoveredKey, setHoveredKey] = useState<string | null>(null);

  const uniqueId = useId();

  const allPetals = Object.keys(answers).map((key): PetalInfo | null => {
    const countryName = answers[key] as string;
    const layoutInfo = petalLayout[key];
    if (!countryName || !layoutInfo) return null;

    const def = flowerDefinitions.find(d => d.country === countryName);
    if (!def) return null;

    const ShapeComponent = petalShapes[def.continent] || petalShapes.default;

    return { key, rotation: layoutInfo.rotation, gradientId: `g-${uniqueId}-${key}`, gradientStops: def.gradientStops, ShapeComponent };

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
            <linearGradient id={`childhood-gradient-${uniqueId}`} gradientTransform="rotate(90)">
              {childhoodAccentGradient.map((color, i) => (
                <stop key={`${i}-${color}`} offset={`${(i / (childhoodAccentGradient.length - 1)) * 100}%`} stopColor={color} />
              ))}
            </linearGradient>
          )}
          <filter id={`drop-shadow-${uniqueId}`} x="-100%" y="-100%" width="300%" height="300%">
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
              const petalNode = (
                <g
                  key={`${pd.key}-${pd.rotation}`}
                  className="petal-group"
                  transform={`translate(100, 100) rotate(${pd.rotation}) translate(0, ${radialOffset})`}
                  onMouseEnter={() => setHoveredKey(pd.key)}
                  onMouseLeave={() => setHoveredKey(null)}
                >
                  <g className={`petal-visuals ${hoveredKey === pd.key ? 'hovered' : ''}`}>
                    <g transform={`scale(${scale})`} filter={`url(#drop-shadow-${uniqueId})`} fill={`url(#${pd.gradientId})`}>
                      <pd.ShapeComponent />
                    </g>
                  </g>
                </g>
              );
              return (
                <TooltipWrapper key={pd.key} showTooltip={showTooltip} title={renderTooltipTitle(pd.key)} placement={placement} offset={offset}>
                  {petalNode}
                </TooltipWrapper>
              );
            })}
          </g>

          <g className="center-layer" transform="translate(100, 100) scale(0.8)" filter={`url(#drop-shadow-${uniqueId})`}>
            {CenterShapeComponent && (
              <TooltipWrapper showTooltip={showTooltip} title={renderTooltipTitle('genderIdentity')} placement="right" offset={[-100, 250]}>
                <g className="center-enter">
                  <CenterShapeComponent fill={childhoodAccentGradient ? `url(#childhood-gradient-${uniqueId})` : '#fff'} />
                </g>
              </TooltipWrapper>
            )}
          </g>

          <g className="accent-layer" fill="none" stroke="#333" strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round">
            {OrientationAccentComponent && (
              <TooltipWrapper showTooltip={showTooltip} title={renderTooltipTitle('sexualOrientation')} placement="top" offset={[100, -15]}>
                <g>
                  {topAndBottomInnerPetals.map(petal => (
                    <g key={`so-${petal.key}-${petal.rotation}`} transform={`translate(100, 100) rotate(${petal.rotation}) translate(25, -68)`}>
                      <OrientationAccentComponent fill={`url(#${petal.gradientId})`} />
                    </g>
                  ))}
                </g>
              </TooltipWrapper>
            )}

            {PoliticalAccents && (
              <TooltipWrapper showTooltip={showTooltip} title={renderTooltipTitle('politicalView')} placement="right" offset={[-75, -15]}>
                <g>
                  {PoliticalAccents.right && rightPetal && (
                    <g transform={`translate(100, 100) rotate(90) translate(65, 0) rotate(${PoliticalAccents.rightTilt || 0})`}>
                      <g transform="scale(0.8)">
                        <PoliticalAccents.right fill={`url(#${rightPetal.gradientId})`} />
                      </g>
                    </g>
                  )}
                  {PoliticalAccents.left && leftPetal && (
                    <g transform={`translate(100, 100) rotate(270) translate(65, 0) rotate(${PoliticalAccents.leftTilt || 0})`}>
                      <g transform="scale(0.8)">
                        <PoliticalAccents.left fill={`url(#${leftPetal.gradientId})`} />
                      </g>
                    </g>
                  )}
                </g>
              </TooltipWrapper>
            )}

            {DietAccentComponent && (
              <TooltipWrapper showTooltip={showTooltip} title={renderTooltipTitle('diet')} placement="right" offset={[-75, -15]}>
                <g>
                  {leftAndRightInnerPetals.map(petal => (
                    <g key={`r-${petal.key}-${petal.rotation}`} transform={`translate(100, 100) rotate(${petal.rotation}) translate(0, -35)`}>
                      <g transform="scale(0.8)">
                        <DietAccentComponent fill={`url(#${petal.gradientId})`} />
                      </g>
                    </g>
                  ))}
                </g>
              </TooltipWrapper>
            )}

            {ReligionAccentElement && (
              <TooltipWrapper showTooltip={showTooltip} title={renderTooltipTitle('religion')} placement="right" offset={[-75, -15]}>
                <g>
                  {leftAndRightInnerPetals.map(petal => (
                    <g key={`r-${petal.key}-${petal.rotation}`} transform={`translate(100, 100) rotate(${petal.rotation}) translate(0, -35)`}>
                      <g transform="scale(0.8)">
                        <ReligionAccentElement fill={`url(#${petal.gradientId})`} />
                      </g>
                    </g>
                  ))}
                </g>
              </TooltipWrapper>
            )}

            {ChildhoodComponent && (
              <TooltipWrapper showTooltip={showTooltip} title={renderTooltipTitle('childhoodEnvironment')} placement="right" offset={[-150, 150]}>
                <g>
                  {innerPetals.map(p => (
                    <g key={`c-${p.key}-${p.rotation}`} transform={`translate(100,100) rotate(${p.rotation}) translate(0,-68)`}>
                      <g transform="scale(0.6)">
                        <ChildhoodComponent fill={childhoodAccentGradient ? `url(#childhood-gradient-${uniqueId})` : '#fff'} />
                      </g>
                    </g>
                  ))}
                </g>
              </TooltipWrapper>
            )}
          </g>
        </g>
      </svg>
    </div>
  );
};