import { AlertTriangle, CheckCircle2, Lightbulb, ShieldCheck } from "lucide-react"
import type { GuideReport } from "@/types"

type GuidePanelProps = {
  report: GuideReport
}

export default function GuidePanel({ report }: GuidePanelProps) {
  return (
    <aside className="rounded-[2rem] border border-cyan/20 bg-cyan/10 p-5 shadow-2xl shadow-cyan/5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.24em] text-cyan">算法教练</p>
          <h2 className="mt-2 font-display text-3xl font-black">课程清晰度 {report.score}</h2>
        </div>
        <div className="grid h-14 w-14 place-items-center rounded-2xl bg-cyan text-ink shadow-toy">
          <Lightbulb className="h-6 w-6" />
        </div>
      </div>

      <p className="mt-4 text-sm leading-6 text-cream/68">{report.summary}</p>

      <div className="mt-5 rounded-2xl border border-cream/10 bg-ink/40 p-4">
        <div className="flex items-center gap-2 text-sm font-bold">
          <ShieldCheck className="h-4 w-4 text-cyan" />
          {report.publishReady ? "适合发布给孩子" : "建议继续打磨"}
        </div>
        <div className="mt-3 h-2 rounded-full bg-cream/10">
          <div className="h-2 rounded-full bg-cyan" style={{ width: `${report.score}%` }} />
        </div>
      </div>

      <div className="mt-5 space-y-3">
        {report.issues.length === 0 ? (
          <div className="flex gap-3 rounded-2xl border border-cream/10 bg-cream/8 p-4">
            <CheckCircle2 className="mt-0.5 h-5 w-5 text-cyan" />
            <div>
              <h3 className="font-bold">没有发现阻塞问题</h3>
              <p className="mt-1 text-sm text-cream/62">算法目标、挑战规则和孩子能学到什么都已经清楚。</p>
            </div>
          </div>
        ) : report.issues.map((issue) => (
          <div key={issue.title} className="rounded-2xl border border-cream/10 bg-cream/8 p-4">
            <div className="flex gap-3">
              <AlertTriangle className="mt-0.5 h-5 w-5 text-orange" />
              <div>
                <h3 className="font-bold">{issue.title}</h3>
                <p className="mt-1 text-sm text-cream/62">{issue.description}</p>
                <p className="mt-2 text-sm font-semibold text-cyan">{issue.suggestion}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </aside>
  )
}
