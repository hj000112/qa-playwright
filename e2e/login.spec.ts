import { test, expect } from '@playwright/test';
import { loginAs } from '../helpers/auth';
import { USERS, PASSWORD, BASE_URL } from "../helpers/constants";

test.beforeEach(async ({ page }) => {
  // 로그인 페이지 접속
  await page.goto(BASE_URL)
});

test('TC-LOGIN-001: standard_user로 로그인 성공', async ({ page }) => {
  await loginAs(page, {username:USERS.standard ,password: PASSWORD});
  await expect(page).toHaveURL(/.*inventory\.html/);
});

test('TC-LOGIN-002: performance_glitch_user로 로그인 시 정상 여부 확인', async ({ page }) => {
  await loginAs(page, {
    username: USERS.performance,
    password: PASSWORD,
  });

  // 느린 응답을 고려해 최대 10초까지 기다림
  await expect(page).toHaveURL(/.*inventory\.html/, { timeout: 10000 });
});


test('TC-LOGIN-003: ID 없이 로그인', async ({ page }) => {
  await loginAs(page, {
    password: PASSWORD,
  });

  const errorMsg = await page.locator('[data-test="error"]').textContent();
  expect(errorMsg).toContain('Username is required');
});


test('TC-LOGIN-004: 비밀번호 없이 로그인', async ({ page }) => {
  await loginAs(page, {
    username: USERS.standard,
  });

  const errorMsg = await page.locator('[data-test="error"]').textContent();
  expect(errorMsg).toContain('Password is required');
});


test('TC-LOGIN-005: locked_out_user 로그인 차단 메시지 확인', async ({ page }) => {
  await loginAs(page, {
    username: USERS.locked,
    password: PASSWORD,
  });
  const errorMsg = await page.locator('[data-test="error"]').textContent();
  expect(errorMsg).toContain('locked out');
});