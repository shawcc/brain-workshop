import type { DraftGame, Game } from "@/types"

export const gameTypeLabels = {
  sliding_puzzle: "滑块拼图",
  number_merge: "数字合成",
  path_connect: "路径连接",
} as const

export const difficultyLabels = {
  easy: "轻松",
  medium: "烧脑",
  hard: "专家",
} as const

export const demoGames: Game[] = [
  {
    id: "clockwork-tiles",
    title: "钟表工坊滑块",
    description: "移动错位齿轮，把所有时间碎片归位。适合第一次体验复刻与改关卡。",
    author: "木盒实验员",
    gameType: "sliding_puzzle",
    difficulty: "easy",
    tags: ["空间", "入门", "可复刻"],
    config: {
      boardSize: 3,
      goal: "把数字按 1 到 8 排列，空位留在右下角。",
      movesLimit: 42,
      palette: "amber",
      tiles: [1, 2, 3, 4, 0, 6, 7, 5, 8],
    },
    playCount: 12840,
    remixCount: 382,
    favoriteCount: 1260,
    publishedAt: "2026-06-11",
  },
  {
    id: "neon-sum",
    title: "霓虹合成 128",
    description: "把相同数字相撞合成更高分，限定步数内点亮终点数字。",
    author: "数字炼金师",
    gameType: "number_merge",
    difficulty: "medium",
    tags: ["数字", "策略", "高分"],
    config: {
      boardSize: 4,
      goal: "在 28 步内合成 128。",
      movesLimit: 28,
      palette: "cyan",
      tiles: [2, 0, 4, 0, 0, 8, 0, 2, 4, 0, 16, 0, 0, 2, 0, 4],
    },
    playCount: 9340,
    remixCount: 215,
    favoriteCount: 880,
    publishedAt: "2026-06-14",
  },
  {
    id: "garden-route",
    title: "花园一笔通",
    description: "从起点穿过所有花砖，不能重复走格子，最后抵达温室出口。",
    author: "路径园丁",
    gameType: "path_connect",
    difficulty: "hard",
    tags: ["路径", "逻辑", "挑战"],
    config: {
      boardSize: 5,
      goal: "一笔连接所有高亮格子并到达出口。",
      movesLimit: 18,
      palette: "rose",
      tiles: [1, 1, 0, 1, 2, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 3, 1, 1, 1, 1],
      path: [0, 1, 6, 11, 12, 13, 18, 23, 24],
    },
    playCount: 7120,
    remixCount: 144,
    favoriteCount: 650,
    publishedAt: "2026-06-17",
  },
]

export const starterDraft: DraftGame = {
  id: "starter-draft",
  title: "我的第一款机关谜题",
  description: "一个正在打磨中的益智游戏草稿，准备加入更清晰的目标和难度曲线。",
  author: "当前创作者",
  gameType: "sliding_puzzle",
  difficulty: "easy",
  tags: ["草稿", "新手"],
  config: {
    boardSize: 3,
    goal: "让所有棋子回到正确位置。",
    movesLimit: 36,
    palette: "amber",
    tiles: [1, 2, 3, 4, 5, 6, 0, 7, 8],
  },
  updatedAt: "刚刚",
}
