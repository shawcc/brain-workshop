import { create } from "zustand"
import { demoGames, starterDraft } from "@/data/games"
import type { DraftGame, Game } from "@/types"

type GameStore = {
  games: Game[]
  drafts: DraftGame[]
  favorites: string[]
  currentUser: string
  toggleFavorite: (gameId: string) => void
  createRemix: (gameId: string) => DraftGame | undefined
  updateDraft: (draftId: string, changes: Partial<DraftGame>) => void
  publishDraft: (draftId: string) => Game | undefined
}

export const useGameStore = create<GameStore>((set, get) => ({
  games: demoGames,
  drafts: [starterDraft],
  favorites: ["maze-bfs"],
  currentUser: "当前学习者",
  toggleFavorite: (gameId) => {
    set((state) => ({
      favorites: state.favorites.includes(gameId)
        ? state.favorites.filter((id) => id !== gameId)
        : [...state.favorites, gameId],
    }))
  },
  createRemix: (gameId) => {
    const source = get().games.find((game) => game.id === gameId)
    if (!source) return undefined

    const draft: DraftGame = {
      id: `remix-${source.id}-${Date.now()}`,
      title: `${source.title} 的实验版`,
      description: `基于「${source.title}」改造的新算法实验。`,
      author: get().currentUser,
      gameType: source.gameType,
      algorithm: source.algorithm,
      concept: source.concept,
      ageRange: source.ageRange,
      lesson: source.lesson,
      skills: [...source.skills],
      difficulty: source.difficulty,
      tags: [...source.tags, "实验"],
      config: { ...source.config, tiles: [...source.config.tiles], path: source.config.path ? [...source.config.path] : undefined },
      sourceGameId: source.id,
      updatedAt: "刚刚",
    }

    set((state) => ({
      drafts: [draft, ...state.drafts],
      games: state.games.map((game) => (
        game.id === gameId ? { ...game, remixCount: game.remixCount + 1 } : game
      )),
    }))

    return draft
  },
  updateDraft: (draftId, changes) => {
    set((state) => ({
      drafts: state.drafts.map((draft) => (
        draft.id === draftId ? { ...draft, ...changes, updatedAt: "刚刚" } : draft
      )),
    }))
  },
  publishDraft: (draftId) => {
    const draft = get().drafts.find((item) => item.id === draftId)
    if (!draft) return undefined

    const game: Game = {
      ...draft,
      id: `game-${Date.now()}`,
      playCount: 0,
      remixCount: 0,
      favoriteCount: 0,
      publishedAt: new Date().toISOString().slice(0, 10),
    }

    set((state) => ({
      games: [game, ...state.games],
      drafts: state.drafts.filter((item) => item.id !== draftId),
    }))

    return game
  },
}))
