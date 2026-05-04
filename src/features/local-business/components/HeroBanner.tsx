import { Button } from "@/shared/components/ui/button";

export const HeroBanner = () => {
  return (
    <div className="relative w-full bg-[#0E6EB8] rounded-3xl overflow-hidden min-h-[400px] flex items-center px-12 mb-12">
      {/* Map Pattern Overlay - Using an SVG pattern or CSS mask */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('/assets/map-pattern.svg')] bg-cover" />
      
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center w-full">
        <div className="space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
            Empower your local Business
          </h1>
          <p className="text-white/80 text-lg max-w-md">
            Manage your Google Business Profile and online reviews, 
            automatically post business listings, and get precise local rankings data.
          </p>
          <Button 
            className="bg-[#B7F598] hover:bg-[#a5e089] text-[#1E3A1A] font-bold px-8 h-12 rounded-lg text-base"
          >
            Add your Business
          </Button>
        </div>
        
        <div className="hidden md:flex justify-end">
          <img 
            src="/assets/hero-illustration.svg" 
            alt="Local business growth" 
            className="max-h-[350px] w-auto"
          />
        </div>
      </div>
    </div>
  );
};