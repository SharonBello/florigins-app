import { useState, useMemo, useEffect } from 'react';
import { type FlowerDefinition } from "../../data/appData";
import "../FormScreen/FormScreen.scss";
import "../FormScreen/FormScreen.scss";

import React from 'react';

export const CustomSelect = ({ options, value, onChange, displayKey }: { options: FlowerDefinition[], value: string, onChange: (value: unknown) => void, displayKey: keyof FlowerDefinition }) => {
    const isPredefinedValue = useMemo(() => options.some(opt => opt.country === value), [options, value]);
    const [isOtherSelected, setIsOtherSelected] = useState(!isPredefinedValue && value !== '');

    useEffect(() => {
        const isCustom = !options.some(opt => opt.country === value) && value !== '';
        setIsOtherSelected(isCustom);
    }, [value, options]);


    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = e.target.value;
        if (selectedValue === '--other--') {
            setIsOtherSelected(true);
            onChange('');
        } else {
            setIsOtherSelected(false);
            onChange(selectedValue);
        }
    };

    return (
        <div className="custom-select-wrapper">
            <select
                className="input-underline"
                value={isOtherSelected ? '--other--' : value}
                onChange={handleSelectChange}
            >
                <option value="" disabled>...</option>
                {options.map(def => (
                    <option key={def.country} value={def.country}>{def[displayKey] as string}</option>
                ))}
                <option value="--other--">אחר</option>
            </select>

            {isOtherSelected && (
                <input
                    type="text"
                    className="input-underline other-input"
                    placeholder="הזן ערך אחר"
                    value={isPredefinedValue ? '' : value}
                    onChange={(e) => onChange(e.target.value)}
                    autoFocus
                />
            )}
        </div>
    );
};
