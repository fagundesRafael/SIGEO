// app/api/entorpecentes/route.js
import { dbConnect } from "@/lib/dbConnect";
import Entorpecentes from "@/models/Entorpecentes";

export async function GET(request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = 16;
    const skip = (page - 1) * limit;

    const query = {};
    const fields = ["procedimento", "numero", "cor", "status"];
    fields.forEach(field => {
      const value = searchParams.get(field);
      if (value) {
        query[field] = { $regex: value, $options: "i" };
      }
    });
    
    // Tratamento especial para o campo tipo, buscando também em customTipo
    const tipo = searchParams.get("tipo");
    if (tipo) {
      query.$or = [
        { tipo: { $regex: tipo, $options: "i" } },
        { customTipo: { $regex: tipo, $options: "i" } },
      ];
    }

    const records = await Entorpecentes.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    const total = await Entorpecentes.countDocuments(query);

    return new Response(JSON.stringify({ records, total, page }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Erro ao buscar registros:", error);
    return new Response(JSON.stringify({ error: "Erro ao buscar registros" }), { status: 500 });
  }
}

export async function POST(request) {
  try {
    await dbConnect();
    const body = await request.json();

    const requiredFields = ["procedimento", "numero", "tipo", "quantidade", "unidMedida", "status", "createdBy"];
    for (const field of requiredFields) {
      if (!body[field]) {
        return new Response(JSON.stringify({ error: `Campo ${field} é obrigatório` }), { status: 400 });
      }
    }
    if (body.status === "apreendido" && !body.destino) {
      return new Response(JSON.stringify({ error: "Campo destino é obrigatório para status 'apreendido'" }), { status: 400 });
    }
    const record = new Entorpecentes(body);
    await record.save();
    return new Response(JSON.stringify({ message: "Registro criado com sucesso" }), { status: 201 });
  } catch (error) {
    console.error("Erro ao criar registro:", error);
    return new Response(JSON.stringify({ error: "Erro interno ao criar registro" }), { status: 500 });
  }
}
