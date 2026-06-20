import type { DraftGame, GuideReport } from "@/types"

export function createGuideReport(draft: DraftGame): GuideReport {
  const issues = []
  const hasClearGoal = draft.config.goal.trim().length >= 12
  const hasEnoughMoves = draft.config.movesLimit >= draft.config.boardSize * 2
  const hasTags = draft.tags.length >= 2
  const hasDescription = draft.description.trim().length >= 18
  const hasAlgorithm = draft.algorithm.trim().length >= 4 && draft.concept.trim().length >= 12

  if (!hasAlgorithm) {
    issues.push({
      level: "error" as const,
      title: "算法主题还不够清楚",
      description: "孩子需要知道这节游戏课到底在学哪种思考方法。",
      suggestion: "写清楚算法名称和一句孩子能理解的解释，例如“BFS 就是一圈一圈找最近的路”。",
    })
  }

  if (!hasClearGoal) {
    issues.push({
      level: "error" as const,
      title: "挑战目标还不够清楚",
      description: "孩子需要在开始前知道怎样才算完成挑战。",
      suggestion: "把目标写成一句可验证的话，例如“用最少步数从入口走到出口”。",
    })
  }

  if (!hasEnoughMoves) {
    issues.push({
      level: "warning" as const,
      title: "挑战步数可能偏紧",
      description: "当前限制容易让孩子只关注失败，而不是观察算法思路。",
      suggestion: "启蒙课程先放宽限制，让孩子有余地尝试和复盘。",
    })
  }

  if (!hasTags) {
    issues.push({
      level: "info" as const,
      title: "能力标签可以更丰富",
      description: "标签会帮助家长和老师理解这节课训练什么能力。",
      suggestion: "增加“空间方向”“逻辑排除”“分解问题”等学习标签。",
    })
  }

  if (!hasDescription) {
    issues.push({
      level: "warning" as const,
      title: "课程介绍略短",
      description: "好的介绍能帮助家长和孩子理解为什么要玩这关。",
      suggestion: "补充一句游戏玩法亮点和一句算法学习目标。",
    })
  }

  const score = 100 - issues.reduce((total, issue) => {
    if (issue.level === "error") return total + 26
    if (issue.level === "warning") return total + 14
    return total + 6
  }, 0)

  return {
    score: Math.max(score, 36),
    summary: issues.length === 0 ? "算法主题、挑战目标和学习说明都很清楚，适合作为一节启蒙课。" : "算法实验已经成型，还可以继续优化孩子能学到什么、怎么验证成功、难度是否友好。",
    publishReady: issues.every((issue) => issue.level !== "error") && score >= 72,
    issues,
  }
}
