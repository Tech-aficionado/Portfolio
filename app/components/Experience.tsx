import Image from "next/image";
import Link from "next/link";

interface ExperienceCard {
  id: number;
  title: string;
  description: string;
  icon: string;
}

const experienceCards: ExperienceCard[] = [
  {
    id: 1,
    title: "Full Stack Developer - Intern",
    description: "TedForge Solutions Pvt. Ltd. (Dec 2023 – May 2025). Built robust and scalable web solutions, optimizing performance and user experience.",
    icon: "/cards/card-1.png",
  },
  {
    id: 2,
    title: "Frontend Development",
    description: "Crafting responsive and intuitive user interfaces using modern frameworks such as Angular and React for cross-browser compatibility.",
    icon: "/cards/card-2.png",
  },
  {
    id: 3,
    title: "Backend Development",
    description: "Building robust, scalable server-side solutions using Node.js and Python. Developing secure APIs with optimal performance.",
    icon: "/cards/card-3.png",
  },
  {
    id: 4,
    title: "Database Server Management",
    description: "Designing efficient databases using SQL and NoSQL systems like MySQL and MongoDB, ensuring optimal data storage and retrieval.",
    icon: "/cards/card-4.png",
  },
];

export default function Experience(): React.JSX.Element {
  return (
    <section id="experience" className="py-20 px-6">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-4xl lg:text-5xl font-bold text-white mb-12 text-center">
          Work Experience
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {experienceCards.map((card) => (
            <div
              key={card.id}
              className="bg-gradient-to-r from-slate-950 via-purple-950 to-slate-950  backdrop-blur-sm rounded-xl p-6 border-t-3 border-purple-700 hover:shadow-2xl hover:shadow-purple-900 flex items-center gap-4"
            >
              <div className="mb-4 ">
                <Image
                  src={card.icon}
                  alt={card.title}
                  width={160}
                  height={160}
                  className="object-contain"
                />
              </div>
              <div>
              <h3 className="text-xl font-semibold text-white mb-2">
                {card.title}
              </h3>
              <p className="text-white/70 text-sm mb-4">
                {card.description}
              </p>
              <Link
                href="#lab"
                className="text-purple-400 hover:text-purple-300 font-medium text-sm transition-colors inline-block"
              >
                LEARN MORE →
              </Link>
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

