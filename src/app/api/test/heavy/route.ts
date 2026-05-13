export async function GET() {
  let n = 0;
  for (let i = 0; i < 5_000_000; i++) n += Math.sqrt(i);
  return Response.json({ result: n });
}