import type { Answers } from "./Answers";

export interface FlowerDefinition {
  country: string;
  countryHebrew: string;
  continent: string;
  continentHebrew: string;
  gradientStops: string[];
}

export interface FlowerProps {
  answers: Answers;
  viewBox: string;
  showTooltip?: boolean;
}