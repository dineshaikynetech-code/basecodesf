import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { 
  Upload, 
  Edit3, 
  Clock 
} from "lucide-react";

import { withModuleTabs } from '../components/withLocationTabs';
import { LOCATION_TABS } from '@/config/routeConfig';



// The UI Component as shown in the screenshot
export const BusinessInfoContent = () => {
  return (
    <div className="space-y-6">
      {/* Primary Information Card */}
      <Card className="border-border shadow-sm">
        <CardHeader className="border-b border-border py-4">
          <CardTitle className="text-lg font-bold text-foreground">Primary Information</CardTitle>
        </CardHeader>
        <CardContent className="p-0 flex flex-col md:flex-row">
          {/* Business Profile Section */}
          <div className="p-6 flex flex-col items-center justify-center border-r border-border md:w-1/6">
            <div className="relative group">
              <div className="w-16 h-16 bg-[#1a4b6e] rounded-full flex items-center justify-center text-white cursor-pointer overflow-hidden">
                <Upload className="w-6 h-6 opacity-80" />
              </div>
              <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-[10px] font-bold text-white uppercase">Upload</span>
              </div>
            </div>
            <h3 className="mt-4 font-bold text-sm text-foreground">ZTravels</h3>
            <p className="text-xs text-muted">Travels Agency</p>
          </div>

          {/* Business Contact Section */}
          <div className="p-6 border-r border-border md:w-2/6">
            <h4 className="font-bold text-sm mb-6 text-foreground">Business Contact</h4>
            <div className="grid grid-cols-2 gap-y-6">
              <div>
                <p className="text-xs text-muted mb-1">Phone</p>
                <p className="text-sm font-medium">+91 85475214785</p>
              </div>
              <div>
                <p className="text-xs text-muted mb-1">Website</p>
                <p className="text-sm font-medium">+91 85475214785</p>
              </div>
              <div className="col-span-2">
                <p className="text-xs text-muted mb-1">Email ID</p>
                <p className="text-sm font-medium">ztravelsoffical@gmail.com</p>
              </div>
            </div>
          </div>

          {/* Address Details Section */}
          <div className="p-6 border-r border-border md:w-2/6 flex justify-between gap-4">
            <div>
              <h4 className="font-bold text-sm mb-6 text-foreground">Address Details</h4>
              <p className="text-sm leading-relaxed text-foreground opacity-90">
                No:4, 11th street, Neelakani Colony Desingapuram, Anna Nagar, Shanthi Colony, Chennai-600012.
              </p>
            </div>
            <div className="w-24 h-24 rounded-lg overflow-hidden border border-border shrink-0">
               <img src="https://maps.googleapis.com/maps/api/staticmap?center=Padur,Chennai&zoom=13&size=200x200&markers=color:red%7CPadur,Chennai&key=YOUR_KEY" alt="Map Location" className="w-full h-full object-cover" />
            </div>
          </div>

          {/* Service Areas Section */}
          <div className="p-6 md:w-1/6 relative">
             <button className="absolute top-4 right-4 text-muted hover:text-primary">
               <Edit3 className="w-4 h-4" />
             </button>
             <h4 className="font-bold text-sm mb-6 text-foreground">Service areas</h4>
             <ul className="space-y-3">
               <li className="flex items-center gap-2 text-sm text-foreground">
                 <span className="text-primary text-[10px]">▶</span> Chennai, Tamil Nadu, India
               </li>
               <li className="flex items-center gap-2 text-sm text-foreground">
                 <span className="text-primary text-[10px]">▶</span> Madurai, Tamil Nadu, India
               </li>
             </ul>
          </div>
        </CardContent>
      </Card>

      {/* Secondary Information Card */}
      <Card className="border-border shadow-sm">
        <CardHeader className="border-b border-border py-4">
          <CardTitle className="text-lg font-bold text-foreground">Secondary Information</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="p-6 border-b border-border">
            <h4 className="font-bold text-sm mb-4 text-foreground">About Business</h4>
            <p className="text-sm text-foreground opacity-80">Testing GMB</p>
          </div>
          <div className="p-6">
            <div className="flex items-center gap-2 mb-4">
               <Clock className="w-4 h-4 text-foreground" />
               <h4 className="font-bold text-sm text-foreground">About Business</h4>
            </div>
            <p className="text-sm text-foreground mb-6">Today 10:00 AM - 06:00 PM</p>
            <a href="#" className="text-primary text-sm font-bold underline decoration-2 underline-offset-4">
              View all
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};  

export default withModuleTabs({
  WrappedComponent: BusinessInfoContent,
  tabs: LOCATION_TABS,
  moduleKey: "location-hub",
  defaultTab: "business-info",
});