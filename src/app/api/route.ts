import {NextResponse } from "next/server";


export async function GET() {

try {

    const response = await fetch("https://www.freetogame.com/api/games",{
        next: {revalidate: 3600 }
    })

    if (!response.ok) { 
        return NextResponse.json({ error: "Falha ao buscar dados da API" }, { status: response.status });
    }

    const data = await response.json();

    return NextResponse.json(data);

} catch (error: unknown) {
    
    return NextResponse.json({ error: "Erro interno no servidor" }, { status: 500 });

}
}