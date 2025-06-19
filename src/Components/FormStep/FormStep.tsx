import { flowerDefinitions } from "../../data/appData";
import type { Question } from "../../types/Question";
import "../FormScreen/FormScreen.scss";

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
                        <option value="" disabled>...</option>
                        {flowerDefinitions.sort((a, b) => a.countryHebrew.localeCompare(b.countryHebrew)).map(def => (
                            <option key={def.country} value={def.country}>{def.countryHebrew}</option>
                        ))}
                    </select>
                );
            case 'range':
                return (
                    <div className="range-container">
                        {/* left label */}
                        <span className="range-end range-end--min">
                            {question.options?.[2]}
                        </span>

                        {/* the actual slider */}
                        <input
                            className="range-input"
                            type="range"
                            min={-1}
                            max={1}
                            step={1}
                            value={typeof value === 'number' ? value : Number(value) || 0}
                            onChange={e => onChange(Number(e.target.value))}
                        />

                        {/* right label */}
                        <span className="range-end range-end--max">
                            {question.options?.[0]}
                        </span>

                        {/* center text under the diamond */}
                        <div className="range-center-label">
                            {question.options?.[1]}
                        </div>
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