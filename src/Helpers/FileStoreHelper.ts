import { SaveDialogOptions } from 'electron';

export const getFileNameFromType = (type: string): string => {
    return type === 'js' ? 'Javascript' : type === 'scss' ? 'Scss' : '';
};

/**
 * Create a save dialog options based on TFileType type property
 */
export const getSaveDialogOptions = (type: string): SaveDialogOptions => {
    const Language = getFileNameFromType(type);
    return {
        title: `Export ${Language}`,
        filters: [{ name: Language, extensions: [type] }]
    };
};
