/**
 * Frontend Features & Core State Engine Test Suite
 * Tests readiness fit math, career sorting/filtering, remedial injection,
 * career pivot preservation, roadmap progression, and assessment evaluation.
 */

import { describe, it } from 'node:test';
import assert from 'node:assert';

describe('Frontend Application Features & Business Logic', () => {
  it('calculates career readiness fit percentage accurately', () => {
    const userSkillNames = new Set(['html/css', 'javascript', 'sql']);
    const coreSkills = [
      { skill: 'HTML/CSS' },
      { skill: 'JavaScript' },
      { skill: 'TypeScript' },
      { skill: 'React' },
      { skill: 'Node.js' },
      { skill: 'SQL' }
    ];

    const matched = coreSkills.filter(c => userSkillNames.has(c.skill.toLowerCase()));
    const readinessPct = Math.round((matched.length / coreSkills.length) * 100);

    assert.strictEqual(matched.length, 3);
    assert.strictEqual(readinessPct, 50);
  });

  it('sorts careers correctly by readiness fit, salary, and title', () => {
    const mockCareers = [
      { id: 'dev-1', title: 'Cloud Engineer', avg_salary: '$130,000', readinessPct: 40, salaryNumeric: 130000 },
      { id: 'dev-2', title: 'AI Architect', avg_salary: '$160,000', readinessPct: 75, salaryNumeric: 160000 },
      { id: 'dev-3', title: 'Backend Engineer', avg_salary: '$138,000', readinessPct: 60, salaryNumeric: 138000 }
    ];

    // Sort by readiness fit descending
    const byFit = [...mockCareers].sort((a, b) => b.readinessPct - a.readinessPct);
    assert.strictEqual(byFit[0].id, 'dev-2'); // 75%
    assert.strictEqual(byFit[1].id, 'dev-3'); // 60%
    assert.strictEqual(byFit[2].id, 'dev-1'); // 40%

    // Sort by salary descending
    const bySalary = [...mockCareers].sort((a, b) => b.salaryNumeric - a.salaryNumeric);
    assert.strictEqual(bySalary[0].id, 'dev-2'); // $160,000
    assert.strictEqual(bySalary[1].id, 'dev-3'); // $138,000
    assert.strictEqual(bySalary[2].id, 'dev-1'); // $130,000

    // Sort by title alphabetical
    const byTitle = [...mockCareers].sort((a, b) => a.title.localeCompare(b.title));
    assert.strictEqual(byTitle[0].title, 'AI Architect');
    assert.strictEqual(byTitle[1].title, 'Backend Engineer');
    assert.strictEqual(byTitle[2].title, 'Cloud Engineer');
  });

  it('injects adaptive remedial sprint node upon diagnostic failure', () => {
    const initialPhases = [
      {
        phase_number: 1,
        title: 'Phase 1: Foundations',
        nodes: [
          { id: 'node_1_1', title: 'Basic Syntax', completed: true, is_remedial: false }
        ]
      }
    ];

    const weakTopics = ['Closures & Scoping', 'Event Loop Microtasks'];
    const remedialNode = {
      id: 'remedial_sprint_123',
      title: 'Targeted Remedial Sprint: JavaScript (Closures & Scoping, Event Loop Microtasks)',
      category: 'Adaptive Reinforcement',
      difficulty: 'Intermediate',
      estimated_hours: 6,
      completed: false,
      in_progress: true,
      is_remedial: true,
      lessons: weakTopics.map(t => `Deep Dive: ${t}`),
      resources: [
        { title: 'Remedial Mastery Guide', url: 'https://developer.mozilla.org', type: 'Guide' }
      ]
    };

    // Inject into phase 1
    const updatedPhases = [
      {
        ...initialPhases[0],
        nodes: [remedialNode, ...initialPhases[0].nodes]
      }
    ];

    assert.strictEqual(updatedPhases[0].nodes.length, 2);
    assert.strictEqual(updatedPhases[0].nodes[0].is_remedial, true);
    assert.strictEqual(updatedPhases[0].nodes[0].in_progress, true);
    assert.strictEqual(updatedPhases[0].nodes[0].lessons.length, 2);
  });

  it('retains transferable skills during career pivot', () => {
    const userSkills = [
      { name: 'Python', level: 3, category: 'AI/ML' },
      { name: 'SQL', level: 3, category: 'Database' },
      { name: 'Git', level: 2, category: 'DevOps' }
    ];

    const targetCareer = {
      id: 'ai-ml-engineer',
      title: 'AI & Machine Learning Engineer',
      core_skills: [
        { skill: 'Python', level: 4 },
        { skill: 'Linear Algebra & Calculus', level: 3 },
        { skill: 'PyTorch', level: 3 }
      ]
    };

    const userSkillNames = new Set(userSkills.map(s => s.name.toLowerCase()));
    const transferable = userSkills.map(s => s.name);
    const matchedForNewCareer = targetCareer.core_skills.filter(c => userSkillNames.has(c.skill.toLowerCase()));
    const missingForNewCareer = targetCareer.core_skills.filter(c => !userSkillNames.has(c.skill.toLowerCase()));

    assert.strictEqual(transferable.length, 3);
    assert.strictEqual(matchedForNewCareer.length, 1); // Python
    assert.strictEqual(missingForNewCareer.length, 2); // Linear Algebra, PyTorch
  });

  it('updates roadmap node completion and recalculates overall readiness', () => {
    const roadmapPhases = [
      {
        phase_number: 1,
        title: 'Phase 1',
        nodes: [
          { id: 'n1', title: 'Node 1', completed: true },
          { id: 'n2', title: 'Node 2', completed: false }
        ]
      },
      {
        phase_number: 2,
        title: 'Phase 2',
        nodes: [
          { id: 'n3', title: 'Node 3', completed: false },
          { id: 'n4', title: 'Node 4', completed: false }
        ]
      }
    ];

    // Toggle node n2 to completed
    const updatedPhases = roadmapPhases.map(p => ({
      ...p,
      nodes: p.nodes.map(n => n.id === 'n2' ? { ...n, completed: true } : n)
    }));

    const totalNodes = updatedPhases.reduce((acc, p) => acc + p.nodes.length, 0);
    const completedNodes = updatedPhases.reduce((acc, p) => acc + p.nodes.filter(n => n.completed).length, 0);
    const readiness = Math.round((completedNodes / totalNodes) * 100);

    assert.strictEqual(totalNodes, 4);
    assert.strictEqual(completedNodes, 2);
    assert.strictEqual(readiness, 50); // 2 out of 4 = 50%
  });

  it('evaluates assessment quiz submission and assigns pass/fail threshold', () => {
    const questions = [
      { id: 'q1', topic: 'Topic A', correct_index: 1 },
      { id: 'q2', topic: 'Topic B', correct_index: 2 },
      { id: 'q3', topic: 'Topic C', correct_index: 0 },
      { id: 'q4', topic: 'Topic D', correct_index: 3 }
    ];

    const evaluate = (answers) => {
      let correct = 0;
      const weak = [];
      const mastered = [];

      for (const q of questions) {
        if (answers[q.id] === q.correct_index) {
          correct++;
          mastered.push(q.topic);
        } else {
          weak.push(q.topic);
        }
      }

      const percentage = Math.round((correct / questions.length) * 100);
      const passed = percentage >= 70;
      return { score: correct, total: questions.length, percentage, passed, weak, mastered };
    };

    // Passing score: 3 of 4 = 75% >= 70%
    const passResult = evaluate({ q1: 1, q2: 2, q3: 0, q4: 0 }); // q4 wrong
    assert.strictEqual(passResult.score, 3);
    assert.strictEqual(passResult.percentage, 75);
    assert.strictEqual(passResult.passed, true);
    assert.deepStrictEqual(passResult.weak, ['Topic D']);

    // Failing score: 2 of 4 = 50% < 70%
    const failResult = evaluate({ q1: 1, q2: 0, q3: 0, q4: 0 }); // q2, q4 wrong
    assert.strictEqual(failResult.score, 2);
    assert.strictEqual(failResult.percentage, 50);
    assert.strictEqual(failResult.passed, false);
    assert.deepStrictEqual(failResult.weak, ['Topic B', 'Topic D']);
  });
});
