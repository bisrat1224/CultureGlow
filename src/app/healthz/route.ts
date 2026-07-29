/**
 * Liveness/readiness endpoint for the Kubernetes deployment.
 *
 * Probing `/` instead would server-render the entire homepage every few
 * seconds. This stays cheap and says nothing about upstreams (Contentful is
 * read at build time, Resend only inside the form handlers), so a 200 here
 * genuinely means "the server process is up and routing".
 */
export const dynamic = "force-dynamic";

export function GET() {
  return new Response("ok", {
    status: 200,
    headers: { "content-type": "text/plain; charset=utf-8" },
  });
}
