import { useNavigate } from "react-router-dom"
import { ArrowRight, Brain, FlaskConical, Sparkles } from "lucide-react"
import AppShell from "@/components/AppShell"
import GameBoard from "@/components/GameBoard"
import GameCard from "@/components/GameCard"
import { useGameStore } from "@/store/useGameStore"

export default function Home() {
  const navigate = useNavigate()
  const games = useGameStore((state) => state.games)
  const favorites = useGameStore((state) => state.favorites)
  const toggleFavorite = useGameStore((state) => state.toggleFavorite)
  const createRemix = useGameStore((state) => state.createRemix)
  const featured = games[0]

  const handleRemix = (gameId: string) => {
    const draft = createRemix(gameId)
    if (draft) navigate(`/create/${draft.id}`)
  }

  return (
    <AppShell>
      <section className="mx-auto grid max-w-7xl gap-8 px-5 py-12 lg:grid-cols-[1.05fr_0.95fr] lg:py-20">
        <div className="flex flex-col justify-center">
          <div className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-cyan/25 bg-cyan/10 px-4 py-2 text-sm font-bold text-cyan">
            <Sparkles className="h-4 w-4" />
            玩经典游戏，学真正算法
          </div>
          <h1 className="max-w-4xl font-display text-6xl font-black leading-[0.9] tracking-tight text-cream md:text-8xl">
            让小学生用游戏看懂算法
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-cream/68">
            脑力小工坊把迷宫、汉诺塔、数独这些经典脑力游戏拆成孩子能理解的算法课。先玩懂规律，再看动画复盘，最后进入实验室改规则、造关卡。
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <button className="toy-button px-6 py-4" onClick={() => navigate("/create")}>
              <FlaskConical className="h-5 w-5" />
              进入算法实验室
            </button>
            <button className="toy-button bg-cream text-ink px-6 py-4" onClick={() => navigate(`/play/${featured.id}`)}>
              上第一节算法课
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -left-6 top-8 hidden rotate-[-8deg] rounded-3xl bg-orange px-5 py-3 font-display text-xl font-black text-ink shadow-toy lg:block">
            今日算法课
          </div>
          <div className="rounded-[2.5rem] border border-cream/12 bg-cream/10 p-5 shadow-2xl shadow-black/30">
            <GameBoard config={featured.config} />
            <div className="mt-5 flex items-center justify-between gap-4 rounded-[1.5rem] bg-ink/60 p-5">
              <div>
                <p className="text-sm font-bold text-cyan">{featured.algorithm}</p>
                <h2 className="mt-1 font-display text-3xl font-black">{featured.title}</h2>
              </div>
              <button className="icon-button" onClick={() => handleRemix(featured.id)} aria-label="进入精选算法实验">
                <Brain className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-20">
        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.28em] text-orange">Algorithm Games</p>
            <h2 className="mt-2 font-display text-4xl font-black">经典算法游戏库</h2>
          </div>
          <p className="max-w-xl text-sm leading-6 text-cream/58">每个游戏都对应一个经典算法：先挑战，再复盘，再实验。后续可接 Supabase 记录学习进度、老师班级和孩子作品。</p>
        </div>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {games.map((game) => (
            <GameCard
              key={game.id}
              game={game}
              liked={favorites.includes(game.id)}
              onFavorite={toggleFavorite}
              onRemix={handleRemix}
            />
          ))}
        </div>
      </section>
    </AppShell>
  )
}
