import { Code, Server, Wrench, Braces } from "lucide-react";

const skillsData = [
  {
    title: "Programming Languages",
    icon: <Braces className="w-6 h-6 text-primary" />,
    skills: ["C","JavaScript","Python"],
  },
  {
    title: "Frontend",
    icon: <Code className="w-6 h-6 text-primary" />,
    skills: ["HTML", "CSS", "JavaScript", "React","Redux", "Tailwind CSS"],
  },
  {
    title: "Backend",
    icon: <Server className="w-6 h-6 text-primary" />,
    skills: ["Node.js", "Express", "MongoDB", "REST API"],
  },
  {
    title: "Tools",
    icon: <Wrench className="w-6 h-6 text-primary" />,
    skills: ["Git", "GitHub", "VS Code", "Postman", "Jupyter Notebook","Linux"],
  },
];

export const Skills = () => {
  return (
    <section id="skills" className="py-24">
      <div className="container mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold">
            My <span className="text-primary">Skills</span>
          </h2>
          <p className="text-muted-foreground mt-3">
            Technologies and languages I work with
          </p>
        </div>

      {/* Skill Cards */}
<div className="grid gap-8 md:grid-cols-3">
  {skillsData.map((item, index) => (
    <div
      key={index}
      className={`glass rounded-2xl p-6 transition-all duration-300
        hover:scale-[1.03]
        ${
          index === 3
            ? "md:col-span-3 md:max-w-md md:mx-auto md:p-8 md:scale-[1.05] border border-primary/30 shadow-lg"
            : ""
        }
      `}
    >
      <div className="flex items-center gap-3 mb-4">
        {item.icon}
        <h3 className="text-lg font-semibold">{item.title}</h3>
      </div>

      <div className="flex flex-wrap gap-2">
        {item.skills.map((skill, i) => (
          <span
            key={i}
            className="px-3 py-1 text-sm rounded-full bg-surface text-foreground"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  ))}
</div>


      </div>
    </section>
  );
};
