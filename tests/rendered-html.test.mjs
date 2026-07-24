import assert from "node:assert/strict";
import test from "node:test";

const developmentPreviewMeta =
  /<meta(?=[^>]*\bname=["']codex-preview["'])(?=[^>]*\bcontent=["']development["'])[^>]*>/i;

async function loadWorker() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  return worker;
}

async function render(worker, path) {
  const response = await worker.fetch(
    new Request(`http://localhost${path}`, {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
  return response;
}

test("renders development preview metadata", async () => {
  const worker = await loadWorker();
  const response = await render(worker, "/");
  assert.equal(response.status, 200);
  assert.match(
    response.headers.get("content-type") ?? "",
    /^text\/html\b/i,
  );
  assert.match(await response.text(), developmentPreviewMeta);
});

test("renders the corrected home experience without the public five-step block", async () => {
  const worker = await loadWorker();
  const response = await render(worker, "/");
  const html = await response.text();

  assert.equal(response.status, 200);
  assert.match(html, /id=["']side-navigation["']/i);
  assert.match(html, /История семьи/i);
  assert.match(html, /Избранное/i);
  assert.match(html, /Корзина/i);
  assert.doesNotMatch(html, /Пять шагов/i);
  assert.doesNotMatch(html, /journey-section/i);
});

test("renders cart and favorites routes without indexing personal state", async () => {
  const worker = await loadWorker();
  for (const path of ["/cart", "/favorites"]) {
    const response = await render(worker, path);
    const html = await response.text();
    assert.equal(response.status, 200);
    assert.match(html, /<meta[^>]+name=["']robots["'][^>]+noindex/i);
  }
});
