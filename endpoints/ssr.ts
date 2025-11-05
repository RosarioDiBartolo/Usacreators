export const edge = true;
import template from "../index.html?raw";
import { render } from "../src/entry-server";

export default async function handler(req: Request) {
  try {
    const url = new URL(req.url);
    const appStream = await render(url.pathname);

    const [pre, post] = template.split("<!--app-html-->");
    const encoder = new TextEncoder();

    const finalStream = new ReadableStream({
      async start(controller) {
        controller.enqueue(encoder.encode(pre));
        const reader = appStream.getReader();
        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            controller.enqueue(value);
          }
        } finally {
          reader.releaseLock();
        }
        controller.enqueue(encoder.encode(post));
        controller.close();
      },
    });

    return new Response(finalStream, { headers: { "Content-Type": "text/html; charset=utf-8" } });
  } catch (err: any) {
    // MOSTRA L'ERRORE IN PAGINA per capire perché “non carica”
    return new Response(
      `<!doctype html><meta charset="utf-8"><pre style="padding:16px;white-space:pre-wrap">${String(err?.stack || err)}</pre>`,
      { headers: { "Content-Type": "text/html; charset=utf-8" }, status: 500 }
    );
  }
}
