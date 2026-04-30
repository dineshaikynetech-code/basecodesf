import { useState } from "react";
import type { FormSchema } from "../lib/types";
import { cn } from "../lib/utils";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import FileUploader from "@/features/onboarding/components/FileUploader";
import { GradientButton } from "./ui/gradient-button";
import { X } from 'lucide-react';
import { buildZodSchema } from "@/features/onboarding/lib/utils";
import { useMemo } from "react";
export default function DynamicForm({
    schema,
    initialValues = {},
    onChange,
    onSubmit,
    onClose
}: {
    schema: FormSchema;
    initialValues?: Record<string, any>;
    onChange?: (data: Record<string, any>) => void;
    onSubmit: (data: Record<string, any>) => void;
    onClose?: () => void;
}) {

    const defaultValues = useMemo(() => {
        const defaults: Record<string, string> = {};
        schema.fields.forEach(field => {
            defaults[field.name] = initialValues[field.name] || "";
        });
        return defaults;
    }, [schema, initialValues]);
    const [formData, setFormData] = useState(defaultValues);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const zodSchema = useMemo(() => buildZodSchema(schema), [schema]);



    const update = (name: string, value: any) => {
        const updated = { ...formData, [name]: value };
        setFormData(updated);
        onChange?.(updated);
    };

    const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        const result = zodSchema.safeParse(formData);
        console.log("Validation result:", result);

        if (!result.success) {
            const fieldErrors: Record<string, string> = {};

            // Correct way: use .issues instead of .errors
            result.error.issues.forEach((issue) => {
                const fieldName = issue.path[0] as string;
                if (fieldName) {
                    fieldErrors[fieldName] = issue.message;
                }
            });

            setErrors(fieldErrors);
            return;
        }

        // Success case
        setErrors({});
        onSubmit(formData);
    };

    return (


        <div className="w-full max-w-[900px] bg-card border border-border rounded-[var(--radius-lg)] shadow-sm overflow-hidden">
            {/* Header Section */}
            <div className="flex items-center justify-between px-6 pt-6 pb-4">
                <h2 className="text-h3 font-semibold text-[#1e293b]">{schema.title}</h2>
                <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors cursor-pointer">
                    <X className="w-5 h-5" />
                </button>
            </div>

            <div className="border-b border-border w-full mb-6" />

            {/* Form Fields Section */}

            <form onSubmit={handleSubmit} className="px-8 pb-8 max-h-[80vh] overflow-y-auto">
                <div
                    className="grid gap-6"
                    style={{
                        gridTemplateColumns: `repeat(${schema.columns || 1}, minmax(0,1fr))`,
                    }}
                >
                    {schema.fields.map((field) => (
                        <div key={field.name} className="flex flex-col gap-2">
                            <Label className="text-sm font-medium text-slate-600">
                                {field.label}
                                {field.validation?.required && <span className="text-destructive text-base">*</span>}
                            </Label>


                            {field.type === "text" && (
                                <Input
                                    value={formData[field.name] || ""}
                                    placeholder={field.placeholder}
                                    className={cn(
                                        "bg-[#f4f7f9] border-none h-11 focus-visible:ring-1",
                                        errors[field.name] && "ring-1 ring-destructive"
                                    )}
                                    onChange={(e) => update(field.name, e.target.value)}
                                />
                            )}

                            {/* Added Select logic for TimeZone style in screenshot */}
                            {field.type === "select" && (
                                <div className="relative">
                                    <select
                                        className="w-full bg-[#f4f7f9] border-none h-11 px-3 rounded-md appearance-none text-sm"
                                        value={formData[field.name] || ""}
                                        onChange={(e) => update(field.name, e.target.value)}
                                    >
                                        <option value="">Select {field.label}</option>
                                        {field.options?.map((option: string | { label: string; value: string }) => {
                                            const value = typeof option === 'string' ? option : option.value;
                                            const label = typeof option === 'string' ? option : option.label;
                                            return (
                                                <option key={value} value={value}>
                                                    {label}
                                                </option>
                                            );
                                        })}
                                    </select>
                                    <div className="absolute right-3 top-4 pointer-events-none">
                                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                    </div>
                                </div>
                            )}

                            {field.type === "file" && field.fileConfig && (
                                <FileUploader
                                // config={field.fileConfig}
                                // onChange={(files) => update(field.name, files)}
                                />
                            )}

                            {errors[field.name] && (
                                <span className="text-caption text-destructive">
                                    {errors[field.name]}
                                </span>
                            )}
                        </div>
                    ))}
                </div>

                <div className="mt-10 flex justify-center">
                    <div className="w-[120px]">
                        <GradientButton
                            type="submit"
                            isLoading={false}
                            className={'w-full'}
                        >
                            {schema.submitLabel || "Next"}
                        </GradientButton>
                    </div>
                </div>

            </form>
        </div>
    );
}