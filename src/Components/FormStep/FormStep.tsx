import { useMemo } from "react";
import { flowerDefinitions } from "../../data/appData";
import type { Question } from "../../types/Question";
import "../FormScreen/FormScreen.scss";
import { CustomSelect } from "../CustomSelect/CustomSelect";

interface FormStepProps {
    question: Question;
    value: unknown;
    onChange: (value: unknown) => void;
    showLabel?: boolean;
}

export const FormStep = ({ question, value, onChange, showLabel = true }: FormStepProps) => {
    const stringValue = String(value ?? '');

    const renderInput = () => {
        switch (question.type) {
            case 'text':
                return <input type="text" className="input-underline" placeholder="..." value={stringValue} onChange={(e) => onChange(e.target.value)} />;

            case 'tabs':
                return (
                    <div className="tabs-container">
                        {question.options?.map(option => (
                            <button
                                key={option}
                                onClick={() => onChange(value === option ? undefined : option)}
                                className={`tab-button ${value === option ? 'active' : ''}`}
                            >
                                {option}
                            </button>
                        ))}
                    </div>
                );

            case 'country_select':
                const sortedCountries = useMemo(() =>
                    [...flowerDefinitions].sort((a, b) => a.countryHebrew.localeCompare(b.countryHebrew)),
                    []
                );
                return <CustomSelect options={sortedCountries} value={stringValue} onChange={onChange} displayKey="countryHebrew" />;

            case 'language_select':
                const uniqueLanguages = useMemo(() => {
                    const sorted = [...flowerDefinitions].sort((a, b) => a.languageHebrew.localeCompare(b.languageHebrew));
                    return Array.from(new Map(sorted.map(item => [item.languageHebrew, item])).values());
                }, []);
                return <CustomSelect options={uniqueLanguages} value={stringValue} onChange={onChange} displayKey="languageHebrew" />;

            case 'cuisine_select':
                const uniqueCuisines = useMemo(() => {
                    const sorted = [...flowerDefinitions].sort((a, b) => a.cuisineHebrew.localeCompare(b.cuisineHebrew));
                    return Array.from(new Map(sorted.map(item => [item.cuisineHebrew, item])).values());
                }, []);
                return <CustomSelect options={uniqueCuisines} value={stringValue} onChange={onChange} displayKey="cuisineHebrew" />;

            case 'culture_select':
                const uniqueCultures = useMemo(() => {
                    const sorted = [...flowerDefinitions].sort((a, b) => a.cultureHebrew.localeCompare(b.cultureHebrew));
                    return Array.from(new Map(sorted.map(item => [item.cultureHebrew, item])).values());
                }, []);
                return <CustomSelect options={uniqueCultures} value={stringValue} onChange={onChange} displayKey="cultureHebrew" />;

            case 'range':
                return (
                    <div className="range-container">
                        <span className="range-end range-end--min">{question.options?.[2]}</span>
                        <input
                            className="range-input"
                            type="range"
                            min={-1}
                            max={1}
                            step={1}
                            value={typeof value === 'number' ? value : Number(value) || 0}
                            onChange={e => onChange(Number(e.target.value))}
                        />
                        <span className="range-end range-end--max">{question.options?.[0]}</span>
                        <div className="range-center-label">{question.options?.[1]}</div>
                    </div>
                );
            default:
                return <input type="text" className="input-underline" placeholder="..." value={stringValue} onChange={(e) => onChange(e.target.value)} />;
        }
    };

    return (
        <div className="form-step-container">
            {showLabel && <label className="question-label">{question.label}</label>}
            {renderInput()}
        </div>
    );
};