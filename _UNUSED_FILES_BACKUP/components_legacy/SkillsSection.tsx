import { Code2 } from 'lucide-react';

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
                { name: 'HTML5', icon: '🌐', color: 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 border-orange-300 dark:border-orange-500/30', description: 'Semantic structure and accessibility' },
                { name: 'CSS3', icon: '🎨', color: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 border-blue-300 dark:border-blue-500/30', description: 'Responsive layouts using Flexbox and Grid' },
                { name: 'JavaScript', icon: '⚡', color: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400 border-yellow-300 dark:border-yellow-500/30', description: 'Core logic, DOM manipulation, and interactivity' },
                { name: 'C#', icon: '🔷', color: 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 border-purple-300 dark:border-purple-500/30', description: 'Basic OOP and .NET familiarity' },
                { name: 'Java (Beginner)', icon: '☕', color: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 border-red-300 dark:border-red-500/30', description: 'Intro-level understanding' },
                { name: 'Kotlin (Beginner)', icon: '🤖', color: 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 border-orange-300 dark:border-orange-500/30', description: 'Basic syntax and Android familiarity' }
            ]
        },
        {
            name: 'Frameworks & Libraries',
            skills: [
                { name: 'React (Basic)', icon: '⚛️', color: 'bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-400 border-cyan-300 dark:border-cyan-500/30', description: 'Components, props, and hooks for dynamic UIs' },
                { name: '.NET Core', icon: '🧩', color: 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 border-purple-300 dark:border-purple-500/30', description: 'Building basic APIs and MVC apps' },
                { name: 'Tailwind CSS', icon: '💨', color: 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 border-indigo-300 dark:border-indigo-500/30', description: 'Utility-first responsive design for fast development' }
            ]
        },
        {
            name: 'Backend & Data',
            skills: [
                { name: 'MongoDB', icon: '🍃', color: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border-green-300 dark:border-green-500/30', description: 'Efficient NoSQL database management' },
                { name: 'SQL (Azure)', icon: '🗄️', color: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 border-blue-300 dark:border-blue-500/30', description: 'Structured data queries and integration' },
                { name: 'REST APIs', icon: '🔄', color: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border-green-300 dark:border-green-500/30', description: 'Simple and secure data exchange' }
            ]
        },
        {
            name: 'Tools & Design',
            skills: [
                { name: 'Azure (Basic)', icon: '☁️', color: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 border-blue-300 dark:border-blue-500/30', description: 'Cloud hosting and web app deployment' },
                { name: 'Git', icon: '📊', color: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 border-red-300 dark:border-red-500/30', description: 'Version control and collaboration' },
                { name: 'VS Code', icon: '📝', color: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 border-blue-300 dark:border-blue-500/30', description: 'Lightweight, efficient coding environment' },
                { name: 'Visual Studio', icon: '🧰', color: 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 border-indigo-300 dark:border-indigo-500/30', description: 'C# development and project setup' },
                { name: 'Figma (Basic)', icon: '🎭', color: 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 border-purple-300 dark:border-purple-500/30', description: 'Wireframes and user interface prototyping' }
            ]
        }
    ];

    return (
        <section className="relative py-20 md:py-28 lg:py-32 backdrop-blur-sm">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 dark:bg-slate-800/40 backdrop-blur-sm border border-slate-300 dark:border-slate-700/50 text-sm text-slate-700 dark:text-slate-300 mb-6 transition-colors duration-300">
                        <Code2 className="w-4 h-4 text-teal-500 dark:text-teal-400" />
                        <span>Technologies</span>
                    </div>

                    <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-slate-900 dark:text-slate-50 mb-6 transition-colors duration-300">
                        My{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-400">
                            Tech Stack
                        </span>
                    </h2>
                    <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto transition-colors duration-300">
                        The technologies and tools I use to build clean, reliable web solutions.
                    </p>
                </div>

                <div className="space-y-16 max-w-6xl mx-auto">
                    {skillCategories.map((category) => (
                        <div key={category.name} className="space-y-8">
                            <h3 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-slate-900 dark:text-slate-100 text-center transition-colors duration-300">
                                {category.name}
                            </h3>
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 overflow-x-hidden">
                                {category.skills.map((skill) => (
                                    <div
                                        key={skill.name}
                                        className={`p-4 rounded-xl border backdrop-blur-sm ${skill.color} flex flex-col items-center justify-center text-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-105`}
                                    >
                                        <span className="text-3xl mb-2" aria-hidden="true">
                                            {skill.icon}
                                        </span>
                                        <span className="font-semibold text-sm mb-1">{skill.name}</span>
                                        <p className="text-xs text-slate-600 dark:text-slate-400 transition-colors duration-300">{skill.description}</p>
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