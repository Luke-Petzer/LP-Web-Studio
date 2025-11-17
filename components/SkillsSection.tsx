interface Skill {
    name: string;
    icon: string;
    color: string;
    description: string;
}
interface SkillCategory {
    name: string;
    skills: Skill[];
}

export function SkillsSection() {
    const skillCategories: SkillCategory[] = [
        {
            name: 'Languages',
            skills: [
                { name: 'HTML5', icon: '🌐', color: 'bg-orange-100 text-orange-600', description: 'Semantic structure and accessibility' },
                { name: 'CSS3', icon: '🎨', color: 'bg-blue-100 text-blue-600', description: 'Responsive layouts using Flexbox and Grid' },
                { name: 'JavaScript', icon: '⚡', color: 'bg-yellow-100 text-yellow-600', description: 'Core logic, DOM manipulation, and interactivity' },
                { name: 'C#', icon: '🔷', color: 'bg-purple-100 text-purple-600', description: 'Basic OOP and .NET familiarity' },
                { name: 'Java (Beginner)', icon: '☕', color: 'bg-red-100 text-red-600', description: 'Intro-level understanding' },
                { name: 'Kotlin (Beginner)', icon: '🤖', color: 'bg-orange-100 text-orange-600', description: 'Basic syntax and Android familiarity' }
            ]
        },
        {
            name: 'Frameworks & Libraries',
            skills: [
                { name: 'React (Basic)', icon: '⚛️', color: 'bg-cyan-100 text-cyan-600', description: 'Components, props, and hooks for dynamic UIs' },
                { name: '.NET Core', icon: '🧩', color: 'bg-purple-100 text-purple-700', description: 'Building basic APIs and MVC apps' },
                { name: 'Tailwind CSS', icon: '💨', color: 'bg-indigo-100 text-indigo-600', description: 'Utility-first responsive design for fast development' }
            ]
        },
        {
            name: 'Backend & Data',
            skills: [
                { name: 'MongoDB', icon: '🍃', color: 'bg-green-100 text-green-600', description: 'Efficient NoSQL database management' },
                { name: 'SQL (Azure)', icon: '🗄️', color: 'bg-blue-100 text-blue-600', description: 'Structured data queries and integration' },
                { name: 'REST APIs', icon: '🔄', color: 'bg-green-100 text-green-700', description: 'Simple and secure data exchange' }
            ]
        },
        {
            name: 'Tools & Design',
            skills: [
                { name: 'Azure (Basic)', icon: '☁️', color: 'bg-blue-100 text-blue-700', description: 'Cloud hosting and web app deployment' },
                { name: 'Git', icon: '📊', color: 'bg-red-100 text-red-600', description: 'Version control and collaboration' },
                { name: 'VS Code', icon: '📝', color: 'bg-blue-100 text-blue-700', description: 'Lightweight, efficient coding environment' },
                { name: 'Visual Studio', icon: '🧰', color: 'bg-indigo-100 text-indigo-700', description: 'C# development and project setup' },
                { name: 'Figma (Basic)', icon: '🎭', color: 'bg-purple-100 text-purple-600', description: 'Wireframes and user interface prototyping' }
            ]
        }
    ];

    return (
        <section className="py-16 md:py-20 lg:py-24 bg-white">
            <div className="container mx-auto px-4 md:px-6">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-center">My Tech Stack</h2>
                <p className="text-base sm:text-lg text-gray-600 mb-10 text-center max-w-3xl mx-auto">
                    The technologies and tools I use to build clean, reliable web solutions.
                </p>
                <div className="space-y-16 max-w-6xl mx-auto">
                    {skillCategories.map((category) => (
                        <div key={category.name} className="space-y-6">
                            <h3 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-800 text-center">
                                {category.name}
                            </h3>
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 overflow-x-hidden">
                                {category.skills.map((skill) => (
                                    <div
                                        key={skill.name}
                                        className={`p-4 rounded-lg ${skill.color} flex flex-col items-center justify-center text-center shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 focus-within:ring-2 focus-within:ring-orange-500 focus-within:ring-offset-2`}
                                    >
                    <span className="text-3xl mb-2" aria-hidden="true">
                      {skill.icon}
                    </span>
                                        <span className="font-medium text-sm">{skill.name}</span>
                                        <p className="text-xs mt-2 text-gray-600">{skill.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}