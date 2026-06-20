import { Link } from "react-router-dom"
import { Copy, Heart, Play, UsersRound } from "lucide-react"
import { difficultyLabels, gameTypeLabels } from "@/data/games"
import type { Game } from "@/types"
import GameBoard from "@/components/GameBoard"

type GameCardProps = {
  game: Game
  liked: boolean
  onFavorite: (gameId: string) => void
  onRemix: (gameId: string) => void
}

export default function GameCard({ game, liked, onFavorite, onRemix }: GameCardProps) {
  return (
    <article className="group relative overflow-hidden rounded-[2rem] border border-cream/12 bg-cream/8 p-4 shadow-2xl shadow-black/20 transition duration-300 hover:-translate-y-1 hover:border-cyan/45">
      <div className="absolute right-5 top-5 z-10 rounded-full bg-ink/80 px-3 py-1 text-xs font-black text-cyan">
        {difficultyLabels[game.difficulty]}
      </div>
      <div className="rounded-[1.5rem] bg-ink/60 p-4">
        <GameBoard config={game.config} size="sm" interactive={false} />
      </div>

      <div className="mt-5 space-y-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-cyan">{gameTypeLabels[game.gameType]}</p>
          <h3 className="mt-2 font-display text-2xl font-black leading-tight text-cream">{game.title}</h3>
          <p className="mt-2 line-clamp-2 text-sm text-cream/62">{game.description}</p>
        </div>

        <div className="flex flex-wrap gap-2">
          {game.tags.map((tag) => (
            <span key={tag} className="rounded-full border border-cream/10 bg-cream/8 px-3 py-1 text-xs text-cream/70">
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between text-xs text-cream/58">
          <span className="flex items-center gap-1">
            <UsersRound className="h-3.5 w-3.5" />
            {game.playCount.toLocaleString()} 次游玩
          </span>
          <span>{game.remixCount} 次复刻</span>
        </div>

        <div className="grid grid-cols-[1fr_auto_auto] gap-2">
          <Link to={`/play/${game.id}`} className="toy-button justify-center px-4 py-3 text-sm">
            <Play className="h-4 w-4" />
            开玩
          </Link>
          <button className="icon-button" onClick={() => onRemix(game.id)} aria-label="复刻游戏">
            <Copy className="h-4 w-4" />
          </button>
          <button className="icon-button" onClick={() => onFavorite(game.id)} aria-label="收藏游戏">
            <Heart className={liked ? "h-4 w-4 fill-red text-red" : "h-4 w-4"} />
          </button>
        </div>
      </div>
    </article>
  )
}
