export function getUserSkills(userId, userSkills) {
  return userSkills
    .filter((skill) => skill.users.includes(userId))
    .map((skill) => skill.skillName);
}

export function getSkillUsers(skillName, userSkills) {
  const skill = userSkills.find((s) => s.skillName === skillName);
  return skill ? skill.users : [];
}
