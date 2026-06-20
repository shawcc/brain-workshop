import { Link, useNavigate, useParams } from "react-router-dom"
import { ArrowLeft, Brain, FlaskConical, Heart, Play } from "lucide-react"
import AppShell from "@/components/AppShell"
import GameBoard from "@/components/GameBoard"
import { difficultyLabels, gameTypeLabels } from "@/data/games"
import { useGameStore } from "@/store/useGameStore"

export default function GameDetail() {
  const { gameId } = useParams()
  const navigate = useNavigate()
  const games = useGameStore((state) => state.games)
  const favorites = useGameStore((state) => state.favorites)
  const toggleFavorite = useGameStore((state) => state.toggleFavorite)
  const createRemix = useGameStore((state) => state.createRemix)
  const game = games.find((item) => item.id === gameId) ?? games[0]

  const handleRemix = () => {
    const draft = createRemix(game.id)
    if (draft) navigate(`/create/${draft.id}`)
  }

  return (
    <AppShell>
      <section className="mx-auto grid max-w-7xl gap-8 px-5 py-10 lg:grid-cols-[0.95fr_1.05fr]">
        <div>
          <Link to="/" className="mb-6 inline-flex items-center gap-2 text-sm font-bold text-cream/62 hover:text-cyan">
            <ArrowLeft className="h-4 w-4" />
            返回算法课
          </Link>
          <div className="rounded-[2.5rem] border border-cream/12 bg-cream/10 p-5">
            <GameBoard config={game.config} interactive={false} />
          </div>
        </div>

        <div className="flex flex-col justify-center">
          <div className="flex flex-wrap gap-2">
            <span className="rounded-full bg-cyan px-4 py-2 text-sm font-black text-ink">{gameTypeLabels[game.gameType]}</span>
            <span className="rounded-full bg-orange px-4 py-2 text-sm font-black text-ink">{difficultyLabels[game.difficulty]}</span>
          </div>
          <h1 className="mt-6 font-display text-6xl font-black leading-none">{game.title}</h1>
          <p className="mt-5 text-lg leading-8 text-cream/68">{game.description}</p>
          <p className="mt-4 text-sm text-cream/52">{game.ageRange} · {game.author} · 发布于 {game.publishedAt}</p>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            <Stat label="游玩" value={game.playCount.toLocaleString()} />
            <Stat label="实验" value={String(game.remixCount)} />
            <Stat label="收藏" value={String(game.favoriteCount + (favorites.includes(game.id) ? 1 : 0))} />
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link to={`/play/${game.id}`} className="toy-button px-6 py-4">
              <Play className="h-5 w-5" />
              开始挑战
            </Link>
            <button className="toy-button bg-cream text-ink px-6 py-4" onClick={handleRemix}>
              <FlaskConical className="h-5 w-5" />
              进入实验室
            </button>
            <button className="icon-button h-14 w-14" onClick={() => toggleFavorite(game.id)} aria-label="收藏游戏">
              <Heart className={favorites.includes(game.id) ? "h-5 w-5 fill-red text-red" : "h-5 w-5"} />
            </button>
          </div>

          <div className="mt-8 rounded-[2rem] border border-cream/10 bg-cream/8 p-5">
            <h2 className="font-display text-2xl font-black">挑战规则</h2>
            <p className="mt-3 text-cream/64">{game.config.goal}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {game.tags.map((tag) => (
                <span key={tag} className="rounded-full border border-cream/10 px-3 py-1 text-sm text-cream/62">{tag}</span>
              ))}
            </div>
          </div>

          <div className="mt-5 rounded-[2rem] border border-cyan/20 bg-cyan/10 p-5">
            <h2 className="flex items-center gap-2 font-display text-2xl font-black">
              <Brain className="h-6 w-6 text-cyan" />
              背后的算法：{game.algorithm}
            </h2>
            <p className="mt-3 text-cream/72">{game.concept}</p>
            <p className="mt-3 text-sm leading-6 text-cream/58">{game.lesson}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {game.skills.map((skill) => (
                <span key={skill} className="rounded-full bg-cyan px-3 py-1 text-xs font-black text-ink">{skill}</span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </AppShell>
  )
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-3xl border border-cream/10 bg-cream/8 p-5">
      <p className="text-sm text-cream/52">{label}</p>
      <p className="mt-1 font-display text-3xl font-black text-cyan">{value}</p>
    </div>
  )
}
