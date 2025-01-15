import scrimba from "@/public/images/scrimba.jpg"
import Image from "next/image"
export default function Sponsors() {
    return (
      <section className="bg-black text-white py-20 font-geist">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-normal text-center mb-12 animate-fade-in">Our Sponsors</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[1, 2, 3].map((sponsor, index) => (
              <div 
                key={sponsor}
                className="aspect-square border border-white/10 rounded-lg flex items-center justify-center p-8 hover:border-white/20 transition-all duration-300 hover:scale-105 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <Image
                  src={scrimba}
                  alt={`Sponsor ${sponsor}`}
                  className="max-w-full h-auto opacity-75 hover:opacity-100 transition-opacity duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }
  
  