export type GameType = "sliding_puzzle" | "number_merge" | "path_connect"

export type Difficulty = "easy" | "medium" | "hard"

export type GameConfig = {
  boardSize: number
  goal: string
  movesLimit: number
  palette: string
  tiles: number[]
  path?: number[]
}

export type Game = {
  id: string
  title: string
  description: string
  author: string
  gameType: GameType
  algorithm: string
  concept: string
  ageRange: string
  lesson: string
  skills: string[]
  difficulty: Difficulty
  tags: string[]
  config: GameConfig
  playCount: number
  remixCount: number
  favoriteCount: number
  sourceGameId?: string
  publishedAt: string
}

export type DraftGame = {
  id: string
  title: string
  description: string
  author: string
  gameType: GameType
  algorithm: string
  concept: string
  ageRange: string
  lesson: string
  skills: string[]
  difficulty: Difficulty
  tags: string[]
  config: GameConfig
  sourceGameId?: string
  updatedAt: string
}

export type GuideIssue = {
  level: "info" | "warning" | "error"
  title: string
  description: string
  suggestion: string
}

export type GuideReport = {
  score: number
  summary: string
  publishReady: boolean
  issues: GuideIssue[]
}
