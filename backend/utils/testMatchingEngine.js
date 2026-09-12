const { calculateMatchScore } = require('./matchingEngine');

// Fake student 1: strong in React, weak in Node
const student1 = [
  { skill_name: 'React', proficiency: 90 },
  { skill_name: 'Node.js', proficiency: 40 },
  { skill_name: 'Communication', proficiency: 70 }
];

// Fake student 2: missing Node.js entirely
const student2 = [
  { skill_name: 'React', proficiency: 85 },
  { skill_name: 'Communication', proficiency: 60 }
];

// Fake student 3: perfect match on everything
const student3 = [
  { skill_name: 'React', proficiency: 95 },
  { skill_name: 'Node.js', proficiency: 90 },
  { skill_name: 'Communication', proficiency: 80 }
];

// Fake posting requirements
const posting = [
  { skill_name: 'React', weight: 'high' },
  { skill_name: 'Node.js', weight: 'medium' },
  { skill_name: 'Communication', weight: 'low' }
];

console.log('--- Student 1 (strong React, weak Node) ---');
console.log(calculateMatchScore(student1, posting));

console.log('--- Student 2 (missing Node.js entirely) ---');
console.log(calculateMatchScore(student2, posting));

console.log('--- Student 3 (strong across the board) ---');
console.log(calculateMatchScore(student3, posting));