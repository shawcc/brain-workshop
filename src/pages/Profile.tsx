import { Link } from "react-router-dom"
import { BookMarked, Brain, FlaskConical, Heart } from "lucide-react"
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
          <p className="text-xs font-black uppercase tracking-[0.24em] text-cyan">Learning Record</p>
          <h1 className="mt-2 font-display text-6xl font-black">我的学习档案</h1>
          <div className="mt-8 grid gap-4 md:grid-cols-4">
            <Metric icon={FlaskConical} label="自制关卡" value={drafts.length} />
            <Metric icon={BookMarked} label="玩过游戏" value={games.length} />
            <Metric icon={Heart} label="收藏游戏" value={favoriteGames.length} />
            <Metric icon={Brain} label="解锁方法" value={new Set(games.map((game) => game.algorithm)).size} />
          </div>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <section className="rounded-[2rem] border border-cream/10 bg-cream/8 p-5">
            <h2 className="font-display text-3xl font-black">我的关卡</h2>
            <div className="mt-5 space-y-3">
              {drafts.map((draft) => (
                <Link key={draft.id} to={`/create/${draft.id}`} className="block rounded-3xl border border-cream/10 bg-ink/35 p-4 transition hover:border-cyan/45">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <h3 className="font-bold">{draft.title}</h3>
                      <p className="mt-1 text-sm text-cream/55">{draft.algorithm} · {gameTypeLabels[draft.gameType]} · {difficultyLabels[draft.difficulty]}</p>
                    </div>
                    <span className="rounded-full bg-cyan px-3 py-1 text-xs font-black text-ink">继续实验</span>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          <section className="rounded-[2rem] border border-cream/10 bg-cream/8 p-5">
            <h2 className="font-display text-3xl font-black">收藏游戏</h2>
            <div className="mt-5 space-y-3">
              {favoriteGames.map((game) => (
                <Link key={game.id} to={`/games/${game.id}`} className="block rounded-3xl border border-cream/10 bg-ink/35 p-4 transition hover:border-cyan/45">
                  <h3 className="font-bold">{game.title}</h3>
                  <p className="mt-1 text-sm text-cream/55">{game.algorithm} · {game.ageRange}</p>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </section>
    </AppShell>
  )
}

function Metric({ icon: Icon, label, value }: { icon: typeof Brain; label: string; value: number }) {
  return (
    <div className="rounded-3xl border border-cream/10 bg-ink/35 p-5">
      <Icon className="h-5 w-5 text-cyan" />
      <p className="mt-4 text-sm text-cream/52">{label}</p>
      <p className="font-display text-4xl font-black">{value}</p>
    </div>
  )
}
