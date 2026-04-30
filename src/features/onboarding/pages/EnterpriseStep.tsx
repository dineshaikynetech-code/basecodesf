
import DynamicForm from "@/shared/components/DynamicForm";
import { useOnboardingStore } from "@/shared/store/onboardingStore";
import { useNavigate } from "react-router-dom";
import { enterpriseFormSchema } from "../config/form-schema";

export default function EnterpriseStep() {
  const { data, setOnboarded, reset,updateStepData,prevStep ,completeOnboarding} = useOnboardingStore();
  const navigate = useNavigate();

  // const handleSubmit = async (formData: any) => {
  //   updateStepData("enterprise", formData);

  //   const payload = {
  //     ...data,
  //     enterprise: formData,
  //   };

  //   // await onboardingApi.submit(payload);

  //   setOnboarded(true);
  //   navigate("/");
  //   reset();

  // };

  const handleSubmit = (formData: any) => {
    updateStepData("enterprise", formData);

    // Mark onboarding as complete
    completeOnboarding();

    // Navigate to main dashboard
    navigate("/location/listing-dashboard", { replace: true });
  };

  return (
    <DynamicForm
      schema={enterpriseFormSchema}
      initialValues={data.enterprise}
      onChange={(val) => updateStepData("enterprise", val)}
      onSubmit={handleSubmit}
      onClose={() => prevStep()}
    />
  );
}