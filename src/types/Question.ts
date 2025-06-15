export interface Question {
    id: string;
    label: string;
    type: 'text' | 'tabs' | 'country_select' | 'language_select' | 'range';
    options?: string[];
}