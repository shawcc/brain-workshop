import { NavLink } from "react-router-dom"
import { Gamepad2, Hammer, LibraryBig, Sparkles, UserRound } from "lucide-react"
import { cn } from "@/lib/utils"

type AppShellProps = {
  children: React.ReactNode
}

const navItems = [
  { href: "/", label: "发现", icon: LibraryBig },
  { href: "/create", label: "创造", icon: Hammer },
  { href: "/me", label: "我的", icon: UserRound },
]

export default function AppShell({ children }: AppShellProps) {
  return (
    <div className="min-h-screen overflow-hidden bg-ink text-cream">
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_15%_10%,rgba(62,243,216,0.24),transparent_28%),radial-gradient(circle_at_80%_15%,rgba(255,92,108,0.22),transparent_30%),linear-gradient(135deg,#0b1020_0%,#15192d_52%,#27160f_100%)]" />
      <div className="fixed inset-0 -z-10 opacity-[0.08] [background-image:linear-gradient(#f7f0dc_1px,transparent_1px),linear-gradient(90deg,#f7f0dc_1px,transparent_1px)] [background-size:44px_44px]" />

      <header className="sticky top-0 z-40 border-b border-cream/10 bg-ink/78 backdrop-blur-xl">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
          <NavLink to="/" className="group flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-2xl border border-cyan/50 bg-cyan/15 shadow-toy">
              <Gamepad2 className="h-5 w-5 text-cyan" />
            </span>
            <span>
              <span className="block font-display text-xl font-black tracking-tight">脑力小工坊</span>
              <span className="block text-xs text-cream/58">小学生思维训练乐园</span>
            </span>
          </NavLink>

          <div className="hidden items-center gap-2 rounded-full border border-cream/10 bg-cream/6 p-1 md:flex">
            {navItems.map((item) => {
              const Icon = item.icon
              return (
                <NavLink
                  key={item.href}
                  to={item.href}
                  className={({ isActive }) => cn(
                    "flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition",
                    isActive ? "bg-cream text-ink shadow-toy" : "text-cream/70 hover:bg-cream/10 hover:text-cream",
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </NavLink>
              )
            })}
          </div>

          <NavLink to="/auth" className="toy-button hidden items-center gap-2 px-4 py-2 text-sm md:flex">
            <Sparkles className="h-4 w-4" />
            连接 Supabase
          </NavLink>
        </nav>
      </header>

      <main>{children}</main>
    </div>
  )
}
