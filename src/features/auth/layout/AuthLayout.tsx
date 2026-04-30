import LeftHeroCarousel from "../components/LeftHeroCarousel";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen flex overflow-hidden bg-background">
      {/* LEFT HERO (unchanged) */}
      <div className="relative hidden lg:flex flex-1 bg-gradient-to-br from-primary/10 to-background items-center justify-center p-12 overflow-hidden">
        <div
          className="absolute top-0 left-0 w-[120px] h-[120px] bg-gradient-to-br from-[#d1fae5] via-[#6ee7b7] to-[#2dd4bf]"
          style={{ clipPath: "polygon(0% 0%, 100% 0%, 100% 33%, 66% 33%, 66% 66%, 33% 66%, 33% 100%, 0% 100%)" }}
        />
        <div
          className="absolute bottom-0 right-0 w-[190px] h-[120px] bg-gradient-to-tl from-[#d1fae5] via-[#6ee7b7] to-[#2dd4bf]"
          style={{ clipPath: "polygon(100% 100%, 0% 100%, 0% 66%, 33% 66%, 33% 33%, 66% 33%, 66% 0%, 100% 0%)" }}
        />
        <div className="absolute top-24 right-12 grid grid-cols-3 gap-1">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="w-5 h-5 bg-gradient-to-br from-[#7ef1d3] to-[#39d39f]"
              style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%)" }}
            />
          ))}
        </div>

        <LeftHeroCarousel />
      </div>

      {/* RIGHT */}
      <div className="flex-1 h-screen overflow-y-auto custom-scrollbar flex flex-col">
        <div className="m-auto w-full max-w-md p-8 flex flex-col items-center">
          <div className="mb-8">
            <h2 className="text-h1 text-[#1e293b]">Storefries</h2>
          </div>

          {children}
        </div>
      </div>
    </div>
  );
}