import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await fetch("https://api-projeto-orpin.vercel.app/api", {
      cache: "no-store",
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Falha ao buscar dados da API" },
        { status: response.status },
      );
    }

    const data = await response.json();
    const baseUrl = "https://api-projeto-orpin.vercel.app";

    const dadosUrl = data.map((jogo: { image: string }) => ({
      ...jogo,
      image: jogo.image.startsWith("http")
        ? jogo.image
        : `${baseUrl}${jogo.image}`,
    }));
    return NextResponse.json(dadosUrl);
  } catch (error: unknown) {
    return NextResponse.json(
      { error: "Erro interno no servidor" },
      { status: 500 },
    );
  }
}
