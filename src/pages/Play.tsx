import { Link, useNavigate, useParams } from "react-router-dom"
import { ArrowLeft, Copy, RotateCcw, Trophy } from "lucide-react"
import AppShell from "@/components/AppShell"
import GameBoard from "@/components/GameBoard"
import { difficultyLabels } from "@/data/games"
import { useGameStore } from "@/store/useGameStore"

export default function Play() {
  const { gameId } = useParams()
  const navigate = useNavigate()
  const games = useGameStore((state) => state.games)
  const createRemix = useGameStore((state) => state.createRemix)
  const game = games.find((item) => item.id === gameId) ?? games[0]

  const handleRemix = () => {
    const draft = createRemix(game.id)
    if (draft) navigate(`/create/${draft.id}`)
  }

  return (
    <AppShell>
      <section className="mx-auto grid max-w-7xl gap-7 px-5 py-10 lg:grid-cols-[1fr_360px]">
        <div className="rounded-[2.5rem] border border-cream/12 bg-cream/10 p-5 md:p-8">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <Link to={`/games/${game.id}`} className="inline-flex items-center gap-2 text-sm font-bold text-cream/62 hover:text-cyan">
              <ArrowLeft className="h-4 w-4" />
              游戏详情
            </Link>
            <span className="rounded-full bg-orange px-4 py-2 text-sm font-black text-ink">{difficultyLabels[game.difficulty]}</span>
          </div>
          <GameBoard config={game.config} />
        </div>

        <aside className="space-y-4">
          <div className="rounded-[2rem] border border-cream/10 bg-cream/8 p-5">
            <p className="text-xs font-black uppercase tracking-[0.24em] text-cyan">Now Playing</p>
            <h1 className="mt-2 font-display text-4xl font-black leading-none">{game.title}</h1>
            <p className="mt-4 text-sm leading-6 text-cream/62">{game.config.goal}</p>
          </div>

          <div className="rounded-[2rem] border border-cream/10 bg-cream/8 p-5">
            <h2 className="flex items-center gap-2 font-bold">
              <Trophy className="h-4 w-4 text-cyan" />
              本局任务
            </h2>
            <ul className="mt-4 space-y-3 text-sm text-cream/64">
              <li>在 {game.config.movesLimit} 步内完成目标。</li>
              <li>点击与空位相邻的棋子移动。</li>
              <li>如果卡住，可以复刻成草稿调整难度。</li>
            </ul>
          </div>

          <div className="grid gap-3">
            <button className="toy-button justify-center px-5 py-4" onClick={() => window.location.reload()}>
              <RotateCcw className="h-5 w-5" />
              重新开始
            </button>
            <button className="toy-button justify-center bg-cream text-ink px-5 py-4" onClick={handleRemix}>
              <Copy className="h-5 w-5" />
              复刻这个玩法
            </button>
          </div>
        </aside>
      </section>
    </AppShell>
  )
}
