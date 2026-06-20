import { Link } from "react-router-dom"
import { BookMarked, Brush, Heart, History } from "lucide-react"
import AppShell from "@/components/AppShell"
import { difficultyLabels, gameTypeLabels } from "@/data/games"
import { useGameStore } from "@/store/useGameStore"

export default function Profile() {
  const games = useGameStore((state) => state.games)
  const drafts = useGameStore((state) => state.drafts)
  const favorites = useGameStore((state) => state.favorites)
  const favoriteGames = games.filter((game) => favorites.includes(game.id))

  return (
    <AppShell>
      <section className="mx-auto max-w-7xl px-5 py-10">
        <div className="rounded-[2.5rem] border border-cream/12 bg-cream/10 p-8">
          <p className="text-xs font-black uppercase tracking-[0.24em] text-cyan">Player Studio</p>
          <h1 className="mt-2 font-display text-6xl font-black">我的创作桌</h1>
          <div className="mt-8 grid gap-4 md:grid-cols-4">
            <Metric icon={Brush} label="草稿" value={drafts.length} />
            <Metric icon={BookMarked} label="已发布" value={games.filter((game) => game.author === "当前创作者").length} />
            <Metric icon={Heart} label="收藏" value={favoriteGames.length} />
            <Metric icon={History} label="复刻来源" value={drafts.filter((draft) => draft.sourceGameId).length} />
          </div>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <section className="rounded-[2rem] border border-cream/10 bg-cream/8 p-5">
            <h2 className="font-display text-3xl font-black">草稿箱</h2>
            <div className="mt-5 space-y-3">
              {drafts.map((draft) => (
                <Link key={draft.id} to={`/create/${draft.id}`} className="block rounded-3xl border border-cream/10 bg-ink/35 p-4 transition hover:border-cyan/45">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <h3 className="font-bold">{draft.title}</h3>
                      <p className="mt-1 text-sm text-cream/55">{gameTypeLabels[draft.gameType]} · {difficultyLabels[draft.difficulty]}</p>
                    </div>
                    <span className="rounded-full bg-cyan px-3 py-1 text-xs font-black text-ink">继续编辑</span>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          <section className="rounded-[2rem] border border-cream/10 bg-cream/8 p-5">
            <h2 className="font-display text-3xl font-black">我的收藏</h2>
            <div className="mt-5 space-y-3">
              {favoriteGames.map((game) => (
                <Link key={game.id} to={`/games/${game.id}`} className="block rounded-3xl border border-cream/10 bg-ink/35 p-4 transition hover:border-cyan/45">
                  <h3 className="font-bold">{game.title}</h3>
                  <p className="mt-1 text-sm text-cream/55">{game.author} · {game.remixCount} 次复刻</p>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </section>
    </AppShell>
  )
}

function Metric({ icon: Icon, label, value }: { icon: typeof Brush; label: string; value: number }) {
  return (
    <div className="rounded-3xl border border-cream/10 bg-ink/35 p-5">
      <Icon className="h-5 w-5 text-cyan" />
      <p className="mt-4 text-sm text-cream/52">{label}</p>
      <p className="font-display text-4xl font-black">{value}</p>
    </div>
  )
}
