/**
 * Frontend Validation & Input Sanitization Test Suite
 * Tests client-side email format regex, password rules, name checks, and search algorithms.
 */

import { describe, it } from 'node:test';
import assert from 'node:assert';

describe('Frontend Form Validation & Input Sanitization', () => {
  const emailRegex = /^[\w.-]+@[\w.-]+\.\w+$/;

  it('validates email addresses correctly', () => {
    const validEmails = [
      'user@example.com',
      'alex.rivera@techcorp.io',
      'developer_123@sub.domain.org',
      'firstname-lastname@domain.co'
    ];
    for (const email of validEmails) {
      assert.strictEqual(emailRegex.test(email), true, `Expected valid: ${email}`);
    }

    const invalidEmails = [
      '',
      'not-an-email',
      'user@',
      '@domain.com',
      'user@domain',
      'user with space@domain.com'
    ];
    for (const email of invalidEmails) {
      assert.strictEqual(emailRegex.test(email), false, `Expected invalid: ${email}`);
    }
  });

  it('enforces password length constraints (>= 6 characters)', () => {
    const isPasswordValid = (pwd) => Boolean(pwd && pwd.length >= 6);

    assert.strictEqual(isPasswordValid(''), false);
    assert.strictEqual(isPasswordValid('12345'), false);
    assert.strictEqual(isPasswordValid('123456'), true);
    assert.strictEqual(isPasswordValid('SecureP@ssword2026'), true);
  });

  it('enforces full name validation (>= 2 characters)', () => {
    const isNameValid = (name) => Boolean(name && name.trim().length >= 2);

    assert.strictEqual(isNameValid(''), false);
    assert.strictEqual(isNameValid('   '), false);
    assert.strictEqual(isNameValid('A'), false);
    assert.strictEqual(isNameValid('Alex Rivera'), true);
    assert.strictEqual(isNameValid('Maya Lin'), true);
  });

  it('validates skill level bounds (1 to 4)', () => {
    const isLevelValid = (lvl) => Number.isInteger(lvl) && lvl >= 1 && lvl <= 4;

    assert.strictEqual(isLevelValid(0), false);
    assert.strictEqual(isLevelValid(-1), false);
    assert.strictEqual(isLevelValid(5), false);
    assert.strictEqual(isLevelValid(2.5), false);
    assert.strictEqual(isLevelValid(1), true); // Beginner
    assert.strictEqual(isLevelValid(2), true); // Intermediate
    assert.strictEqual(isLevelValid(3), true); // Advanced
    assert.strictEqual(isLevelValid(4), true); // Expert
  });

  it('matches search queries across title, category, description, and core skills', () => {
    const sampleCareer = {
      id: 'full-stack-dev',
      title: 'Full Stack Software Engineer',
      category: 'Software Engineering',
      description: 'Build end-to-end web applications covering responsive client interfaces and REST APIs.',
      core_skills: [
        { skill: 'React' },
        { skill: 'TypeScript' },
        { skill: 'Node.js' }
      ]
    };

    const matchesSearch = (career, rawQuery) => {
      const q = rawQuery.trim().toLowerCase();
      if (!q) return true;
      return (
        career.title.toLowerCase().includes(q) ||
        career.category.toLowerCase().includes(q) ||
        career.description.toLowerCase().includes(q) ||
        career.core_skills.some(s => s.skill.toLowerCase().includes(q))
      );
    };

    // Substring in title
    assert.strictEqual(matchesSearch(sampleCareer, 'full stack'), true);
    // Substring in category
    assert.strictEqual(matchesSearch(sampleCareer, 'software'), true);
    // Skill keyword
    assert.strictEqual(matchesSearch(sampleCareer, 'react'), true);
    assert.strictEqual(matchesSearch(sampleCareer, 'typescript'), true);
    // Case insensitivity
    assert.strictEqual(matchesSearch(sampleCareer, 'NODE.JS'), true);
    // Non-matching query
    assert.strictEqual(matchesSearch(sampleCareer, 'quantum physics'), false);
    // Empty query matches all
    assert.strictEqual(matchesSearch(sampleCareer, '   '), true);
  });
});
