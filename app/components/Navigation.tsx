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
    <nav className="sticky top-0 z-50 bg-white border-b border-neutral-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-5">
        <div className="mb-5">
          <h1 className="text-3xl font-semibold text-primary-600 mb-1">Big Deep OS</h1>
          <p className="text-sm text-neutral-500">Marketing Planning Dashboard</p>
        </div>

        <div className="flex flex-wrap gap-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg font-medium transition-all duration-150 ${
                  isActive
                    ? "bg-primary-500 text-white shadow-md hover:shadow-lg"
                    : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
                }`}
              >
                <Icon size={18} />
                <span className="hidden sm:inline text-sm">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
