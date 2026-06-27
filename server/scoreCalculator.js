function calculateScore(data) {
  let score = 50;

  if (data.sourceTrusted) score += 22;
  else score -= 15;

  if (data.suspiciousCount >= 2) score -= 20;
  else if (data.suspiciousCount === 1) score -= 10;
  else score += 8;

  if (data.hasDate) score += 8;
  else score -= 5;

  if (data.hasNumbers) score += 6;
  if (data.hasUrl) score += 6;

  if (data.textLength > 300) score += 6;
  else score -= 4;

  score += Math.floor(Math.random() * 7) - 3;

  return Math.max(1, Math.min(99, score));
}

module.exports = calculateScore;