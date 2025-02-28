export const dynamic = 'auto';
type Request = {
  method: string;
  url: string;
};

// TODO: Se ejecuta en el lado del servidor
export async function GET(request: Request) {
  // console.log({ method: request.method, url: request.url });
  return Response.json({
    method: 'GET',
    count: 10,
  });
}

export async function POST(request: Request) {
  // console.log({ method: request.method, url: request.url });
  return Response.json({
    method: 'POST',
    count: 10,
  });
}
