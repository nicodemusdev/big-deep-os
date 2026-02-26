import { Calendar, CheckSquare, Users, Music, Radio, BookOpen, Home } from "lucide-react";

interface NavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: Home },
  { id: "timeline", label: "Timeline", icon: Calendar },
  { id: "tasks", label: "Tasks", icon: CheckSquare },
  { id: "partners", label: "Partners", icon: Users },
  { id: "content", label: "Content", icon: Music },
  { id: "cadence", label: "Cadence", icon: Radio },
  { id: "research", label: "Research", icon: BookOpen },
];

export default function Navigation({ activeTab, setActiveTab }: NavigationProps) {
  return (
    <nav className="bg-neutral-900 text-cream border-b-4 border-primary-500 shadow-retro">
      <div className="max-w-7xl mx-auto px-8 py-6">
        <div className="mb-6">
          <h1 className="text-4xl font-serif text-accent-500 mb-1">Big Deep OS</h1>
          <p className="text-sm text-neutral-300">Marketing Planning Dashboard</p>
        </div>

        <div className="flex flex-wrap gap-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-sm border-2 font-semibold transition-all ${
                  isActive
                    ? "bg-primary-500 border-primary-500 text-white shadow-retro"
                    : "bg-transparent border-cream text-cream hover:bg-neutral-800"
                }`}
              >
                <Icon size={18} />
                <span className="hidden sm:inline">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
