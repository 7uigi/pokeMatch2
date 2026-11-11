import { favoritos } from "@/lib/db"; 
// GET: Devolve todos os favoritados export async
function GET() { 
  return Response.json(favoritos); 
} 
// POST: Recebe o Pokémon e adiciona ao array 
export async function POST(req) { 
  const poke = await req.json(); 
  if (!favoritos.some(item => item.id === poke.id)) { 
    favoritos.push(poke);
  } 
  return Response.json({ status:"Capturado!"}, { status: 201 }); 
}