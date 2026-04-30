import { z } from "zod";
export type FieldType =
    | "text"
    | "select"
    | "file"
    | "textarea";

export type FileConfig = {
    accept: string[]; // ["image/*", "application/pdf"]
    maxSizeMB?: number;
    multiple?: boolean;
    provider?: "uppy"; // extensible
};

export type FormField = {
    name: string;
    label: string;
    type: FieldType;

    placeholder?: string;

    options?: { label: string; value: string }[];

    colSpan?: number;

    // UI control
    variant?: "default" | "muted" | "outline";

    // File-specific
    fileConfig?: FileConfig;
    validation?: {
        required?: boolean;
        minLength?: number;
        message?: string;           // ← Custom message
    };
};

export type FormSchema = {
    title: string;
    description?: string;
    columns: number;
    fields: FormField[];
    submitLabel?: string;
};