import scrimba from "@/public/images/scrimba.jpg"
import aecc from "@/public/images/aecc.png"
import Image from "next/image"
export default function Sponsors() {
    const sponsors=[
      { name: "Scrimba", link: "https://scrimba.com/home", img: scrimba },
      { name: "aecc", link: "https://www.aeccglobal.com/", img:aecc},
    ];
    return (
      <section className="bg-black text-white py-20 font-geist">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-normal text-center mb-12 animate-fade-in">Our Sponsors</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {sponsors.map((sponsor, index) => (
              <div 
                key={index}
                className="aspect-square border border-white/10 rounded-lg flex flex-col items-center justify-center p-8 hover:border-white/20 transition-all duration-300 hover:scale-105 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="bg-slate-100 h-full w-full aspect-square flex flex-col items-center justify-center ">
                <a href={sponsor.link} className="m-1" >
                <Image
                  src={sponsor.img}
                  alt={`Sponsor ${sponsor}`}
                  className="max-w-full h-auto opacity-75 hover:opacity-100 transition-opacity duration-300"
                />
                </a>
                {/* <p className="text-2xl sm:text-3xl md:text-4xl">{sponsor.name}</p> */}
                </div>
              </div>
              
            ))}
          </div>
        </div>
      </section>
    )
  }
  
  