import { NextResponse } from "next/server";

export const runtime = "edge";

export async function POST(request) {
  try {
    const body = await request.json();

    const response = await fetch(
      "https://srv547224.hstgr.cloud/mockup-generator",
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(body),
      }
    );
    const data = await response.text();

    // Crear una nueva respuesta con el cuerpo y los headers de la respuesta original
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.log(error);
  }
}
