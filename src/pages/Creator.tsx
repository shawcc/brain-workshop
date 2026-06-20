import { useMemo } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { GraduationCap, Save } from "lucide-react"
import AppShell from "@/components/AppShell"
import GameBoard from "@/components/GameBoard"
import GuidePanel from "@/components/GuidePanel"
import { difficultyLabels, gameTypeLabels } from "@/data/games"
import { useGameStore } from "@/store/useGameStore"
import type { Difficulty, GameType } from "@/types"
import { createGuideReport } from "@/utils/guide"

export default function Creator() {
  const { draftId } = useParams()
  const navigate = useNavigate()
  const drafts = useGameStore((state) => state.drafts)
  const updateDraft = useGameStore((state) => state.updateDraft)
  const publishDraft = useGameStore((state) => state.publishDraft)
  const draft = drafts.find((item) => item.id === draftId) ?? drafts[0]
  const report = useMemo(() => createGuideReport(draft), [draft])

  const publish = () => {
    const game = publishDraft(draft.id)
    if (game) navigate(`/games/${game.id}`)
  }

  return (
    <AppShell>
      <section className="mx-auto grid max-w-7xl gap-6 px-5 py-10 xl:grid-cols-[340px_1fr_360px]">
        <aside className="rounded-[2rem] border border-cream/10 bg-cream/8 p-5">
          <p className="text-xs font-black uppercase tracking-[0.24em] text-orange">Level Maker</p>
          <h1 className="mt-2 font-display text-4xl font-black">自己造关卡</h1>
          <div className="mt-6 space-y-4">
            <Field label="关卡名称">
              <input
                value={draft.title}
                onChange={(event) => updateDraft(draft.id, { title: event.target.value })}
                className="input"
              />
            </Field>
            <Field label="玩法说明">
              <textarea
                value={draft.description}
                onChange={(event) => updateDraft(draft.id, { description: event.target.value })}
                className="input min-h-24 resize-none"
              />
            </Field>
            <Field label="玩法模板">
              <select
                value={draft.gameType}
                onChange={(event) => updateDraft(draft.id, { gameType: event.target.value as GameType })}
                className="input"
              >
                {Object.entries(gameTypeLabels).map(([value, label]) => (
                  <option key={value} value={value}>{label}</option>
                ))}
              </select>
            </Field>
            <Field label="难度">
              <select
                value={draft.difficulty}
                onChange={(event) => updateDraft(draft.id, { difficulty: event.target.value as Difficulty })}
                className="input"
              >
                {Object.entries(difficultyLabels).map(([value, label]) => (
                  <option key={value} value={value}>{label}</option>
                ))}
              </select>
            </Field>
            <Field label="玩完后揭晓的方法">
              <input
                value={draft.algorithm}
                onChange={(event) => updateDraft(draft.id, { algorithm: event.target.value })}
                className="input"
              />
            </Field>
            <Field label="最佳解法提示">
              <textarea
                value={draft.concept}
                onChange={(event) => updateDraft(draft.id, { concept: event.target.value })}
                className="input min-h-24 resize-none"
              />
            </Field>
            <Field label="胜利目标">
              <textarea
                value={draft.config.goal}
                onChange={(event) => updateDraft(draft.id, { config: { ...draft.config, goal: event.target.value } })}
                className="input min-h-24 resize-none"
              />
            </Field>
            <Field label="步数限制">
              <input
                type="number"
                value={draft.config.movesLimit}
                onChange={(event) => updateDraft(draft.id, { config: { ...draft.config, movesLimit: Number(event.target.value) } })}
                className="input"
              />
            </Field>
          </div>
        </aside>

        <section className="rounded-[2.5rem] border border-cream/12 bg-cream/10 p-5 md:p-8">
          <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-sm font-bold text-cyan">关卡预览 · {gameTypeLabels[draft.gameType]}</p>
              <h2 className="mt-1 font-display text-4xl font-black">{draft.title}</h2>
            </div>
            <span className="rounded-full border border-cream/10 bg-ink/50 px-4 py-2 text-sm text-cream/62">
              {draft.updatedAt}保存
            </span>
          </div>
          <GameBoard config={draft.config} />
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <button className="toy-button justify-center px-5 py-4" onClick={() => updateDraft(draft.id, {})}>
              <Save className="h-5 w-5" />
              保存关卡
            </button>
            <button className="toy-button justify-center bg-cream text-ink px-5 py-4" onClick={publish} disabled={!report.publishReady}>
              <GraduationCap className="h-5 w-5" />
              {report.publishReady ? "发布关卡" : "补全后发布"}
            </button>
          </div>
        </section>

        <GuidePanel report={report} />
      </section>
    </AppShell>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-bold text-cream/70">{label}</span>
      {children}
    </label>
  )
}
