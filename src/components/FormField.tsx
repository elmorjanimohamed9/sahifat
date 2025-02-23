import React from 'react';
import { FormikProps } from 'formik';

interface FormFieldProps {
    name: string;
    label: string;
    type?: string;
    as?: any;
    formik: FormikProps<any>;
    required?: boolean;
    [key: string]: any;
}

export const FormField: React.FC<FormFieldProps> = ({ 
    name, 
    label, 
    type = 'text', 
    as: Component = 'input',
    formik,
    required = false,
    className = '',
    ...props 
}) => {
    const baseClassName = `w-full px-4 py-3 rounded-xl
        bg-white/50 dark:bg-amber-950/30
        border-2 ${formik.touched[name] && formik.errors[name] 
            ? 'border-red-300 dark:border-red-800/50' 
            : 'border-amber-200 dark:border-amber-800/50'}
        text-amber-900 dark:text-amber-100
        placeholder:text-amber-400/60 dark:placeholder:text-amber-500/50
        focus:border-amber-500 focus:ring-2 focus:ring-amber-500/30
        transition-all duration-300 outline-none`;

    // Styles spécifiques pour textarea
    const textareaClassName = Component === 'textarea' 
        ? 'min-h-[100px] resize-none' 
        : '';

    return (
        <div className="group">
            <label className="inline-block text-sm font-medium mb-2 
                text-amber-700 dark:text-amber-300 group-focus-within:text-amber-500">
                {label} {required && '*'}
            </label>
            <Component
                id={name}
                name={name}
                type={type}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values[name]}
                className={`${baseClassName} ${textareaClassName} ${className}`}
                {...props}
            />
            {formik.touched[name] && formik.errors[name] && (
                <div className="text-red-500 text-sm mt-1">
                    {formik.errors[name]?.toString()}
                </div>
            )}
        </div>
    );
};