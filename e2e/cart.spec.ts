import { test, expect } from '@playwright/test';
import { loginAs } from '../helpers/auth';
import { USERS, PASSWORD, BASE_URL } from '../helpers/constants';


test.beforeEach(async ({ page }) => {
  await page.goto(BASE_URL);
  await loginAs(page, { username: USERS.standard, password: PASSWORD });
});

// TC-CART-001
test('TC-CART-001: 상품 A 장바구니 담기', async ({ page }) => {
  const addToCartBtn = page.locator('[data-test="add-to-cart-sauce-labs-backpack"]');
  const cartBadge = page.locator('.shopping_cart_badge');
  await addToCartBtn.click();
  const removeBtn = page.locator('[data-test="remove-sauce-labs-backpack"]');
  await expect(removeBtn).toHaveText('Remove');
  await expect(cartBadge).toHaveText('1');
});

// TC-CART-002
test('TC-CART-002: 이미 담긴 상품 클릭 시 Remove 유지 확인', async ({ page }) => {
  const addToCartBtn = page.locator('[data-test="add-to-cart-sauce-labs-backpack"]');
  await addToCartBtn.click();
  const removeBtn = page.locator('[data-test="remove-sauce-labs-backpack"]');
  await removeBtn.click(); // 제거 후
  await addToCartBtn.click(); // 다시 담기
  await page.reload(); // 페이지 새로고침으로 상태 확인
  await expect(page.locator('[data-test="remove-sauce-labs-backpack"]')).toBeVisible();
});

// TC-CART-003
test('TC-CART-003: 상품 A, B, C 장바구니 추가', async ({ page }) => {
  const addA = page.locator('[data-test="add-to-cart-sauce-labs-backpack"]');
  const addB = page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]');
  const addC = page.locator('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]');
  await addA.click();
  await addB.click();
  await addC.click();

  await expect(page.locator('.shopping_cart_badge')).toHaveText('3');
  await expect(page.locator('[data-test="remove-sauce-labs-backpack"]')).toBeVisible();
  await expect(page.locator('[data-test="remove-sauce-labs-bike-light"]')).toBeVisible();
  await expect(page.locator('[data-test="remove-sauce-labs-bolt-t-shirt"]')).toBeVisible();
});

// TC-CART-004
test('TC-CART-004: 카트 아이콘 클릭하여 페이지 이동 확인', async ({ page }) => {
  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  await page.locator('.shopping_cart_link').click();
  await expect(page).toHaveURL(/.*cart.html/);
  await expect(page.locator('.cart_item')).toHaveCount(1);
});

// TC-CART-005
test('TC-CART-005: 장바구니에 담긴 상품 Remove 버튼으로 제거', async ({ page }) => {
  const addToCartBtn = page.locator('[data-test="add-to-cart-sauce-labs-backpack"]');
  await addToCartBtn.click();
  const cartBadge = page.locator('.shopping_cart_badge');
  const removeBtn = page.locator('[data-test="remove-sauce-labs-backpack"]');
  await expect(cartBadge).toHaveText('1');
  await removeBtn.click();
  await expect(addToCartBtn).toBeVisible(); // 다시 Add로 전환되었는지
  await expect(cartBadge).toHaveCount(0);   // 뱃지가 사라졌는지
});
