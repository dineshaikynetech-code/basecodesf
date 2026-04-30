import type { FormSchema } from "@/shared/lib/types";


export const workspaceFormSchema: FormSchema = {
  title: "New Workspace",
  columns: 1,
  submitLabel: "Next",
  fields: [
    {
      name: "workspaceName",
      label: "Workspace Name",
      type: "text",
      placeholder: "Enter workspace name...",
      validation: {
        required: true,
        message: "Workspace name is required and should be meaningful"
      }
    },
    {
      name: "admin",
      label: "Super Admin ",
      type: "text",
      placeholder: "Balaji Kumar",
      validation: {
        required: true,
        message: "Admin name is required"
      }
    },
    {
      name: "timezone",
      label: "Workspace Time Zone ",
      type: "select",
      placeholder: "Select timezone...",
      options: [{ label: "(GMT-07:00) Arizona", value: "az" }],
      validation: {
        required: true,
        message: "Please select a valid timezone"
      }
    },
    {
      name: "logo",
      label: "Workspace Logo",
      type: "file",
      fileConfig: {
        accept: ["image/*"],
        multiple: false,
      },
      // validation: z.any().optional(),
    },
  ],
} as const;


export const enterpriseFormSchema: FormSchema = {
  title: "let's get to know about your Enterprise",
  columns: 2,
  submitLabel: "Get Started",
  fields: [
    {
      name: "organisationName",
      label: "Organisation Name",
      type: "text",
      validation: { 
        required: true,
        message: "Organisation name is required" 
        //true 
      }
    },
    {
      name: "locations",
      label: "No . of Location",
      type: "select",
      validation: { required: false
        //true
         }
    },
    {
      name: "category",
      label: "Business Category",
      type: "select",
      validation: { required: false
        //true 
        }
    },
    {
      name: "employees",
      label: "No. of Employees",
      type: "select",
      validation: { required: false }
    },
    {
      name: "address",
      label: "Address",
      type: "text",
      validation: { required: false }
    },
    {
      name: "city",
      label: "City",
      type: "text",
      validation: { required: false
        //true 
        }
    },
    {
      name: "zipcode",
      label: "Zipcode",
      type: "text",
      validation: { required: false
        //true
         }
    },
    {
      name: "state",
      label: "State",
      type: "text",
      validation: { required: false
        //true 
        }
    },
    {
      name: "country",
      label: "Country",
      type: "text",
      validation: { required: false
        //true 
        }
    },
  ],
};