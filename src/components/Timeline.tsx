import { PenTool, Feather, BookOpen, Palette, Sparkles } from "lucide-react";

interface Milestone {
  phase: string;
  discipline: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  status: "active" | "milestone" | "future";
}

export const Timeline: React.FC = () => {
  const milestones: Milestone[] = [
    {
      phase: "First Expression",
      discipline: "Writing & Prose",
      description:
        "Writing articles, reflective prose, and exploring thoughts through words, articulating emotions and philosophical perspectives.",
      icon: PenTool,
      status: "milestone",
    },
    {
      phase: "Verses & Rhythm",
      discipline: "Poetry Collection",
      description:
        "Weaving personal experiences, silent contemplations, friendship, hope, and vulnerability into a growing anthology of original poems.",
      icon: Feather,
      status: "milestone",
    },
    {
      phase: "Published Author",
      discipline: "That Day is Inevitable",
      description:
        "Author of That Day is Inevitable — an exploration of mortality, overcoming the fear of death, and living with deeper meaning and love.",
      icon: BookOpen,
      status: "milestone",
    },
    {
      phase: "Psychological Inquiry",
      discipline: "Musings & Zentangle Practice",
      description:
        "Reflective journals exploring non-linear fractal thought patterns, mental mindfulness, and original pencil Zentangle drawings as therapy.",
      icon: Palette,
      status: "active",
    },
    {
      phase: "Beyond the Horizon",
      discipline: "Future Works",
      description:
        "Upcoming anthologies, expanded poetry volumes, and continuous artistic exploration. [Milestones to be updated upon release]",
      icon: Sparkles,
      status: "future",
    },
  ];

  return (
    <div className="relative border-l border-[#E5DDCF] ml-4 sm:ml-8 pl-6 sm:pl-10 space-y-12 my-8">
      {milestones.map((item, index) => {
        const IconComponent = item.icon;
        return (
          <div key={index} className="relative group">
            {/* Timeline Dot / Icon */}
            <div className="absolute -left-[35px] sm:-left-[51px] top-0 w-8 h-8 rounded-full bg-[#FDFBF7] border border-[#B89F7B] flex items-center justify-center text-[#856E4E] group-hover:bg-[#856E4E] group-hover:text-white transition-all shadow-sm">
              <IconComponent className="w-3.5 h-3.5" />
            </div>

            {/* Content Box */}
            <div className="space-y-1.5">
              <span className="text-[11px] uppercase tracking-[0.2em] font-mono text-[#856E4E]">
                {item.phase}
              </span>
              <h4 className="font-serif text-xl sm:text-2xl text-[#221E1B] font-medium">
                {item.discipline}
              </h4>
              <p className="font-serif text-sm sm:text-base text-[#5C564E] max-w-xl leading-relaxed">
                {item.description}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
