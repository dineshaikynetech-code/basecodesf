import React from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/shared/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { 
  Info, 
  BarChart3, 
  MessageSquare, 
  ShieldCheck, 
  Users, 
  Upload, 
  Edit3, 
  Clock 
} from "lucide-react";

// The HOC to wrap business pages with the tabbed navigation
export function withBusinessTabs<P extends object>(
  WrappedComponent: React.ComponentType<P>,
  activeTab: string = "business-info"
) {
  return (props: P) => (
    <div className="w-full min-h-screen bg-[var(--background)] p-4 md:p-6 space-y-6">
      <Tabs defaultValue={activeTab} className="w-full">
        <TabsList className="w-full justify-start h-14 bg-white border-b border-[var(--border)] rounded-none px-0 overflow-x-auto no-scrollbar">
          <TabsTrigger value="business-info" className="flex items-center gap-2 px-6 h-full border-b-2 border-transparent data-[state=active]:border-[var(--primary)] data-[state=active]:bg-[var(--primary)]/5 data-[state=active]:text-[var(--primary)] rounded-none">
            <Info className="w-4 h-4" /> Business info
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center gap-2 px-6 h-full border-b-2 border-transparent data-[state=active]:border-[var(--primary)] data-[state=active]:text-[var(--primary)] rounded-none">
            <BarChart3 className="w-4 h-4" /> Analytics
          </TabsTrigger>
          <TabsTrigger value="reviews" className="flex items-center gap-2 px-6 h-full border-b-2 border-transparent data-[state=active]:border-[var(--primary)] data-[state=active]:text-[var(--primary)] rounded-none">
            <MessageSquare className="w-4 h-4" /> Reviews
          </TabsTrigger>
          <TabsTrigger value="reputation" className="flex items-center gap-2 px-6 h-full border-b-2 border-transparent data-[state=active]:border-[var(--primary)] data-[state=active]:text-[var(--primary)] rounded-none">
            <ShieldCheck className="w-4 h-4" /> Reputation
          </TabsTrigger>
          <TabsTrigger value="competitors" className="flex items-center gap-2 px-6 h-full border-b-2 border-transparent data-[state=active]:border-[var(--primary)] data-[state=active]:text-[var(--primary)] rounded-none">
            <Users className="w-4 h-4" /> Competitors
          </TabsTrigger>
        </TabsList>

        <TabsContent value="business-info" className="pt-6">
          <WrappedComponent {...props} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

// The UI Component as shown in the screenshot
export const BusinessInfoContent = () => {
  return (
    <div className="space-y-6">
      {/* Primary Information Card */}
      <Card className="border-[var(--border)] shadow-sm">
        <CardHeader className="border-b border-[var(--border)] py-4">
          <CardTitle className="text-lg font-bold text-[var(--foreground)]">Primary Information</CardTitle>
        </CardHeader>
        <CardContent className="p-0 flex flex-col md:flex-row">
          {/* Business Profile Section */}
          <div className="p-6 flex flex-col items-center justify-center border-r border-[var(--border)] md:w-1/6">
            <div className="relative group">
              <div className="w-16 h-16 bg-[#1a4b6e] rounded-full flex items-center justify-center text-white cursor-pointer overflow-hidden">
                <Upload className="w-6 h-6 opacity-80" />
              </div>
              <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-[10px] font-bold text-white uppercase">Upload</span>
              </div>
            </div>
            <h3 className="mt-4 font-bold text-sm text-[var(--foreground)]">ZTravels</h3>
            <p className="text-xs text-[var(--muted)]">Travels Agency</p>
          </div>

          {/* Business Contact Section */}
          <div className="p-6 border-r border-[var(--border)] md:w-2/6">
            <h4 className="font-bold text-sm mb-6 text-[var(--foreground)]">Business Contact</h4>
            <div className="grid grid-cols-2 gap-y-6">
              <div>
                <p className="text-xs text-[var(--muted)] mb-1">Phone</p>
                <p className="text-sm font-medium">+91 85475214785</p>
              </div>
              <div>
                <p className="text-xs text-[var(--muted)] mb-1">Website</p>
                <p className="text-sm font-medium">+91 85475214785</p>
              </div>
              <div className="col-span-2">
                <p className="text-xs text-[var(--muted)] mb-1">Email ID</p>
                <p className="text-sm font-medium">ztravelsoffical@gmail.com</p>
              </div>
            </div>
          </div>

          {/* Address Details Section */}
          <div className="p-6 border-r border-[var(--border)] md:w-2/6 flex justify-between gap-4">
            <div>
              <h4 className="font-bold text-sm mb-6 text-[var(--foreground)]">Address Details</h4>
              <p className="text-sm leading-relaxed text-[var(--foreground)] opacity-90">
                No:4, 11th street, Neelakani Colony Desingapuram, Anna Nagar, Shanthi Colony, Chennai-600012.
              </p>
            </div>
            <div className="w-24 h-24 rounded-lg overflow-hidden border border-[var(--border)] shrink-0">
               <img src="https://maps.googleapis.com/maps/api/staticmap?center=Padur,Chennai&zoom=13&size=200x200&markers=color:red%7CPadur,Chennai&key=YOUR_KEY" alt="Map Location" className="w-full h-full object-cover" />
            </div>
          </div>

          {/* Service Areas Section */}
          <div className="p-6 md:w-1/6 relative">
             <button className="absolute top-4 right-4 text-[var(--muted)] hover:text-[var(--primary)]">
               <Edit3 className="w-4 h-4" />
             </button>
             <h4 className="font-bold text-sm mb-6 text-[var(--foreground)]">Service areas</h4>
             <ul className="space-y-3">
               <li className="flex items-center gap-2 text-sm text-[var(--foreground)]">
                 <span className="text-[var(--primary)] text-[10px]">▶</span> Chennai, Tamil Nadu, India
               </li>
               <li className="flex items-center gap-2 text-sm text-[var(--foreground)]">
                 <span className="text-[var(--primary)] text-[10px]">▶</span> Madurai, Tamil Nadu, India
               </li>
             </ul>
          </div>
        </CardContent>
      </Card>

      {/* Secondary Information Card */}
      <Card className="border-[var(--border)] shadow-sm">
        <CardHeader className="border-b border-[var(--border)] py-4">
          <CardTitle className="text-lg font-bold text-[var(--foreground)]">Secondary Information</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="p-6 border-b border-[var(--border)]">
            <h4 className="font-bold text-sm mb-4 text-[var(--foreground)]">About Business</h4>
            <p className="text-sm text-[var(--foreground)] opacity-80">Testing GMB</p>
          </div>
          <div className="p-6">
            <div className="flex items-center gap-2 mb-4">
               <Clock className="w-4 h-4 text-[var(--foreground)]" />
               <h4 className="font-bold text-sm text-[var(--foreground)]">About Business</h4>
            </div>
            <p className="text-sm text-[var(--foreground)] mb-6">Today 10:00 AM - 06:00 PM</p>
            <a href="#" className="text-[var(--primary)] text-sm font-bold underline decoration-2 underline-offset-4">
              View all
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default withBusinessTabs(BusinessInfoContent);