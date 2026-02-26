import AnimatedTechSphere from "./AnimatedTechSphere";

export default function About(): React.JSX.Element {
  return (
    <section id="about" className="py-20 px-6 relative overflow-hidden">
      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-2xl md:text-3xl max-w-4xl mx-auto leading-relaxed font-medium">
            My mission is to empower businesses and startups by delivering <span className="text-purple-400 font-semibold">robust, user-centric web solutions</span><br/> <span className="text-lg text-white/70">that drive engagement and growth.</span>
          </h2>
        </div>
        
        {/* Animated Tech Sphere replacing the static image */}
        <AnimatedTechSphere />
        
      </div>
      
      {/* Background glow for the section */}
      <div className="absolute bottom-[-20%] left-1/2 -translate-x-1/2 w-[80%] h-[50%] bg-purple-900/20 blur-[120px] rounded-full pointer-events-none"></div>
    </section>
  );
}

