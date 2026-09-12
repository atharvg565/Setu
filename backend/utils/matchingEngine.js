// Maps weight labels to numeric values for the formula
const WEIGHT_MAP = { low: 1, medium: 2, high: 3 };

/**
 * Calculates a match score between a student's skills and a posting's required skills.
 * studentSkills: [{ skill_name, proficiency }]   proficiency: 0-100
 * requiredSkills: [{ skill_name, weight }]        weight: 'low' | 'medium' | 'high'
 */
function calculateMatchScore(studentSkills, requiredSkills) {
  if (!requiredSkills || requiredSkills.length === 0) return 0;

  // turn student's skills into a quick lookup: { "React": 80, "Node.js": 60 }
  const studentSkillMap = {};
  studentSkills.forEach(s => {
    studentSkillMap[s.skill_name.toLowerCase()] = s.proficiency;
  });

  let weightedSum = 0;
  let totalWeight = 0;
  let matchedSkillsCount = 0;

  requiredSkills.forEach(req => {
    const weight = WEIGHT_MAP[req.weight] || 1;
    const proficiency = studentSkillMap[req.skill_name.toLowerCase()] || 0;

    weightedSum += weight * proficiency;
    totalWeight += weight;

    if (studentSkillMap[req.skill_name.toLowerCase()] !== undefined) {
      matchedSkillsCount++;
    }
  });

  const matchScore = totalWeight > 0 ? weightedSum / totalWeight : 0;
  const coverageRatio = matchedSkillsCount / requiredSkills.length;

  const finalScore = matchScore * coverageRatio;

  return {
    match_score: Math.round(matchScore * 100) / 100,
    coverage_ratio: Math.round(coverageRatio * 100) / 100,
    final_score: Math.round(finalScore * 100) / 100
  };
}

module.exports = { calculateMatchScore, WEIGHT_MAP };