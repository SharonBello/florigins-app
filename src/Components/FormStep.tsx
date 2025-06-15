import { flowerDefinitions } from "../data/appData";
import type { Question } from "../types/Question";

interface FormStepProps {
    question: Question;
    value: unknown;
    onChange: (value: unknown) => void;
    showLabel?: boolean; // Optional prop
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
                            <button key={option} onClick={() => onChange(option)} className={`tab-button ${value === option ? 'active' : ''}`}>
                                {option}
                            </button>
                        ))}
                    </div>
                );
            case 'country_select':
            case 'language_select':
                return (
                    <select className="input-underline" value={stringValue} onChange={(e) => onChange(e.target.value)}>
                        <option value="" disabled>בחירת מדינה</option>
                        {flowerDefinitions.sort((a, b) => a.countryHebrew.localeCompare(b.countryHebrew)).map(def => (
                            <option key={def.country} value={def.country}>{def.countryHebrew}</option>
                        ))}
                    </select>
                );
            case 'range':
                return (
                    <div className="range-container">
                        <span>{question.options?.[0]}</span>
                        <input type="range" min="-1" max="1" step="1" value={typeof value === 'number' ? value : Number(value) || 0} onChange={(e) => onChange(Number(e.target.value))} />
                        <span>{question.options?.[2]}</span>
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