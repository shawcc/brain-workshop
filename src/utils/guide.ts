import type { DraftGame, GuideReport } from "@/types"

export function createGuideReport(draft: DraftGame): GuideReport {
  const issues = []
  const hasClearGoal = draft.config.goal.trim().length >= 12
  const hasEnoughMoves = draft.config.movesLimit >= draft.config.boardSize * draft.config.boardSize * 3
  const hasTags = draft.tags.length >= 2
  const hasDescription = draft.description.trim().length >= 18

  if (!hasClearGoal) {
    issues.push({
      level: "error" as const,
      title: "胜利目标还不够清楚",
      description: "玩家需要在开始前知道怎样才算完成谜题。",
      suggestion: "把目标写成一句可验证的话，例如“在 36 步内让所有棋子回到顺序位置”。",
    })
  }

  if (!hasEnoughMoves) {
    issues.push({
      level: "warning" as const,
      title: "步数限制可能偏紧",
      description: "当前步数限制容易让新玩家过早失败。",
      suggestion: "首个版本可以把步数提高 20%，发布后再根据完成率调难度。",
    })
  }

  if (!hasTags) {
    issues.push({
      level: "info" as const,
      title: "标签可以更丰富",
      description: "标签会影响首页推荐和玩家理解。",
      suggestion: "增加“空间”“数字”“路径”“新手”等玩法标签。",
    })
  }

  if (!hasDescription) {
    issues.push({
      level: "warning" as const,
      title: "作品介绍略短",
      description: "好的介绍能帮助玩家决定是否开玩或复刻。",
      suggestion: "补充一句玩法亮点和一句适合人群说明。",
    })
  }

  const score = 100 - issues.reduce((total, issue) => {
    if (issue.level === "error") return total + 26
    if (issue.level === "warning") return total + 14
    return total + 6
  }, 0)

  return {
    score: Math.max(score, 36),
    summary: issues.length === 0 ? "玩法目标清晰，难度和发布信息都已准备好。" : "玩法已经成型，还可以继续优化目标表达、难度曲线和发布包装。",
    publishReady: issues.every((issue) => issue.level !== "error") && score >= 72,
    issues,
  }
}
