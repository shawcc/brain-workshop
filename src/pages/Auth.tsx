import { Github, KeyRound, Mail, Rocket } from "lucide-react"
import AppShell from "@/components/AppShell"

export default function Auth() {
  return (
    <AppShell>
      <section className="mx-auto grid min-h-[calc(100vh-80px)] max-w-6xl place-items-center px-5 py-10">
        <div className="grid w-full overflow-hidden rounded-[2.5rem] border border-cream/12 bg-cream/10 shadow-2xl shadow-black/25 lg:grid-cols-[1fr_0.9fr]">
          <div className="p-8 md:p-12">
            <p className="text-xs font-black uppercase tracking-[0.24em] text-cyan">Supabase Ready</p>
            <h1 className="mt-3 font-display text-6xl font-black leading-none">连接账号系统</h1>
            <p className="mt-5 max-w-xl text-cream/66">
              当前版本先演示前端闭环。接入 Supabase 后，这里会承载邮箱登录、GitHub 登录、用户资料创建和草稿云同步。
            </p>
            <div className="mt-8 grid gap-3">
              <button className="toy-button justify-center px-5 py-4">
                <Github className="h-5 w-5" />
                使用 GitHub 登录
              </button>
              <button className="toy-button justify-center bg-cream text-ink px-5 py-4">
                <Mail className="h-5 w-5" />
                发送邮箱魔法链接
              </button>
            </div>
          </div>
          <div className="bg-ink/60 p-8 md:p-12">
            <h2 className="font-display text-3xl font-black">上线前检查</h2>
            <div className="mt-6 space-y-4">
              <Check icon={KeyRound} title="Supabase 环境变量" text="配置 VITE_SUPABASE_URL 与 VITE_SUPABASE_ANON_KEY。" />
              <Check icon={Rocket} title="Vercel 自动部署" text="GitHub 主分支推送后自动部署生产环境。" />
              <Check icon={Github} title="GitHub 工作流" text="功能分支通过 Pull Request 生成预览部署。" />
            </div>
          </div>
        </div>
      </section>
    </AppShell>
  )
}

function Check({ icon: Icon, title, text }: { icon: typeof KeyRound; title: string; text: string }) {
  return (
    <div className="flex gap-4 rounded-3xl border border-cream/10 bg-cream/8 p-4">
      <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-cyan text-ink">
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <h3 className="font-bold">{title}</h3>
        <p className="mt-1 text-sm text-cream/58">{text}</p>
      </div>
    </div>
  )
}
