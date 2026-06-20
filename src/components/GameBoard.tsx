import { useMemo, useState } from "react"
import { cn } from "@/lib/utils"
import type { GameConfig } from "@/types"

type GameBoardProps = {
  config: GameConfig
  size?: "sm" | "lg"
  interactive?: boolean
}

export default function GameBoard({ config, size = "lg", interactive = true }: GameBoardProps) {
  const [tiles, setTiles] = useState(config.tiles)
  const [moves, setMoves] = useState(0)
  const boardStyle = useMemo(() => ({ gridTemplateColumns: `repeat(${config.boardSize}, minmax(0, 1fr))` }), [config.boardSize])

  const emptyIndex = tiles.indexOf(0)
  const canMove = (index: number) => {
    const row = Math.floor(index / config.boardSize)
    const col = index % config.boardSize
    const emptyRow = Math.floor(emptyIndex / config.boardSize)
    const emptyCol = emptyIndex % config.boardSize
    return Math.abs(row - emptyRow) + Math.abs(col - emptyCol) === 1
  }

  const moveTile = (index: number) => {
    if (!interactive || !canMove(index)) return
    const next = [...tiles]
    next[emptyIndex] = next[index]
    next[index] = 0
    setTiles(next)
    setMoves((value) => value + 1)
  }

  return (
    <div className="space-y-4">
      <div
        className={cn(
          "grid gap-2 rounded-[1.7rem] border border-cream/10 bg-black/20 p-3 shadow-inner",
          size === "sm" ? "aspect-square" : "mx-auto aspect-square w-full max-w-[520px]",
        )}
        style={boardStyle}
      >
        {tiles.map((tile, index) => {
          const isPath = config.path?.includes(index)
          return (
            <button
              key={`${tile}-${index}`}
              type="button"
              disabled={!interactive || tile === 0}
              onClick={() => moveTile(index)}
              className={cn(
                "relative grid place-items-center rounded-2xl border font-display font-black transition duration-200",
                size === "sm" ? "text-lg" : "text-3xl md:text-5xl",
                tile === 0 && "border-dashed border-cream/15 bg-cream/5",
                tile !== 0 && "border-cream/16 bg-cream text-ink shadow-tile hover:-translate-y-0.5",
                canMove(index) && interactive && tile !== 0 && "cursor-pointer hover:bg-cyan",
                isPath && tile !== 0 && "bg-cyan text-ink",
              )}
            >
              {tile !== 0 ? tile : ""}
            </button>
          )
        })}
      </div>
      {interactive && (
        <div className="mx-auto flex max-w-[520px] items-center justify-between rounded-2xl border border-cream/10 bg-cream/8 px-4 py-3 text-sm text-cream/70">
          <span>已移动 {moves} 步</span>
          <span>目标 {config.movesLimit} 步内完成</span>
        </div>
      )}
    </div>
  )
}
