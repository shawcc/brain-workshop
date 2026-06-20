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
      title: "最佳解法还不够清楚",
      description: "孩子玩完后需要知道这关有没有更聪明的解法。",
      suggestion: "写清楚方法名称和一句孩子能理解的解释，例如“一圈一圈找最近的路”。",
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
      suggestion: "先放宽限制，让孩子有余地尝试；玩完后再看最佳解法。",
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
      title: "关卡介绍略短",
      description: "好的介绍能让孩子知道这关哪里好玩。",
      suggestion: "补充一句玩法亮点和一句玩完能解锁的聪明办法。",
    })
  }

  const score = 100 - issues.reduce((total, issue) => {
    if (issue.level === "error") return total + 26
    if (issue.level === "warning") return total + 14
    return total + 6
  }, 0)

  return {
    score: Math.max(score, 36),
    summary: issues.length === 0 ? "玩法目标、挑战规则和最佳解法都很清楚，适合先玩再讲。" : "关卡已经成型，还可以继续优化怎么玩、怎么赢、玩完后怎么讲最佳解法。",
    publishReady: issues.every((issue) => issue.level !== "error") && score >= 72,
    issues,
  }
}
