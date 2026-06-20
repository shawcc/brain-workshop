import { useNavigate } from "react-router-dom"
import { ArrowRight, Beaker, Copy, Sparkles } from "lucide-react"
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
            玩、复刻、创造，一条龙完成
          </div>
          <h1 className="max-w-4xl font-display text-6xl font-black leading-[0.9] tracking-tight text-cream md:text-8xl">
            把脑洞变成可以玩的益智小游戏
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-cream/68">
            脑力小工坊是一个给小学生锻炼脑子的益智小游戏乐园。孩子可以立即开玩，看到有趣玩法就复刻改造，创作时由智能指导检查规则、难度和表达是否清楚。
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <button className="toy-button px-6 py-4" onClick={() => navigate("/create")}>
              <Beaker className="h-5 w-5" />
              开始创造
            </button>
            <button className="toy-button bg-cream text-ink px-6 py-4" onClick={() => navigate(`/play/${featured.id}`)}>
              试玩精选
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -left-6 top-8 hidden rotate-[-8deg] rounded-3xl bg-orange px-5 py-3 font-display text-xl font-black text-ink shadow-toy lg:block">
            精选机关
          </div>
          <div className="rounded-[2.5rem] border border-cream/12 bg-cream/10 p-5 shadow-2xl shadow-black/30">
            <GameBoard config={featured.config} />
            <div className="mt-5 flex items-center justify-between gap-4 rounded-[1.5rem] bg-ink/60 p-5">
              <div>
                <p className="text-sm font-bold text-cyan">{featured.author}</p>
                <h2 className="mt-1 font-display text-3xl font-black">{featured.title}</h2>
              </div>
              <button className="icon-button" onClick={() => handleRemix(featured.id)} aria-label="复刻精选游戏">
                <Copy className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-20">
        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.28em] text-orange">Game Shelf</p>
            <h2 className="mt-2 font-display text-4xl font-black">今日可复刻作品</h2>
          </div>
          <p className="max-w-xl text-sm leading-6 text-cream/58">首版以内置示例数据演示完整体验，后续可接 Supabase 保存真实用户、草稿、发布与收藏。</p>
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
