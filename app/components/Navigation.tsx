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
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-sm border-b border-neutral-200/50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="mb-4">
          <h1 className="text-2xl font-semibold text-primary-600 mb-0.5">Big Deep OS</h1>
          <p className="text-xs text-neutral-500">Marketing Planning Dashboard</p>
        </div>

        <div className="flex flex-wrap gap-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg font-medium text-sm transition-all duration-200 ease-out ${
                  isActive
                    ? "bg-primary-500 text-white shadow-md"
                    : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200 hover:text-neutral-700"
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
