import DynamicForm from "@/shared/components/DynamicForm";
import { useOnboardingStore } from "@/shared/store/onboardingStore";
import { workspaceFormSchema } from "../config/form-schema";


export default function WorkspaceStep() {
    const { nextStep, updateStepData, data, prevStep } = useOnboardingStore();

    return (
        <DynamicForm
            schema={workspaceFormSchema}
            initialValues={data.workspace}
            onChange={(val) => updateStepData("workspace", val)}
            onSubmit={(formData) => {
                console.log("Workspace Data:", formData); // for debugging
                updateStepData("workspace", formData);
                nextStep();
            }}
            onClose={() => prevStep()}
        />
    );
}