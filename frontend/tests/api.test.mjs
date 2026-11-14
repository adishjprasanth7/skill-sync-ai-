/**
 * Frontend API Service & Resilience Fallback Test Suite
 * Tests fallback data schemas, offline resilience, and client-side orchestration fallbacks.
 */

import { describe, it } from 'node:test';
import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';

describe('Frontend API Service & Offline Fallback Architecture', () => {
  it('verifies that frontend api.ts defines all 15 career specifications', async () => {
    const apiPath = path.resolve('frontend/src/services/api.ts');
    assert.strictEqual(fs.existsSync(apiPath), true, 'frontend/src/services/api.ts must exist');

    const content = fs.readFileSync(apiPath, 'utf8');

    const expectedCareers = [
      'full-stack-dev',
      'ai-ml-engineer',
      'cloud-devops-engineer',
      'data-scientist',
      'cybersecurity-analyst',
      'frontend-architect',
      'backend-engineer',
      'mobile-dev',
      'ai-agent-architect',
      'data-engineer',
      'site-reliability-engineer',
      'nlp-engineer',
      'blockchain-web3-engineer',
      'cloud-solutions-architect',
      'product-manager-tech'
    ];

    for (const id of expectedCareers) {
      assert.strictEqual(
        content.includes(`id: "${id}"`),
        true,
        `Expected career "${id}" to be defined in FALLBACK_CAREERS`
      );
    }
  });

  it('verifies fallback demo user profile schema in frontend', () => {
    const apiPath = path.resolve('frontend/src/services/api.ts');
    const content = fs.readFileSync(apiPath, 'utf8');

    assert.strictEqual(content.includes('FALLBACK_USER'), true);
    assert.strictEqual(content.includes('alex_demo'), true);
    assert.strictEqual(content.includes('Alex Rivera'), true);
    assert.strictEqual(content.includes('full-stack-dev'), true);
  });

  it('verifies authentication methods exist on apiService', () => {
    const apiPath = path.resolve('frontend/src/services/api.ts');
    const content = fs.readFileSync(apiPath, 'utf8');

    assert.strictEqual(content.includes('registerUser'), true, 'registerUser must be defined on apiService');
    assert.strictEqual(content.includes('loginUser'), true, 'loginUser must be defined on apiService');
    assert.strictEqual(content.includes('getUserProfile'), true, 'getUserProfile must be defined on apiService');
    assert.strictEqual(content.includes('runOrchestration'), true, 'runOrchestration must be defined on apiService');
    assert.strictEqual(content.includes('submitAssessment'), true, 'submitAssessment must be defined on apiService');
    assert.strictEqual(content.includes('sendChatMessage'), true, 'sendChatMessage must be defined on apiService');
  });
});
