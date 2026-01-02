// app/api/documentos/[id]/route.js
import { dbConnect } from "@/lib/dbConnect";
import Documentos from "@/models/Documentos";

export async function GET(request, { params }) {
  try {
    await dbConnect();
    const { id } = await params;
    const record = await Documentos.findById(id);
    if (!record) {
      return new Response(JSON.stringify({ error: "Registro não encontrado" }), { status: 404 });
    }
    return new Response(JSON.stringify(record), { status: 200 });
  } catch (error) {
    console.error("Erro na rota GET:", error);
    return new Response(JSON.stringify({ error: "Erro ao buscar registro" }), { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    await dbConnect();
    const { id } = awaitparams;
    const body = await request.json();
    
    // Validações para os campos obrigatórios
    const requiredFields = ["procedimento", "numero", "tipo", "quantidade", "unidMedida", "cor"];
    for (const field of requiredFields) {
      if (!body[field]) {
        return new Response(JSON.stringify({ error: `Campo ${field} é obrigatório` }), { status: 400 });
      }
    }
    
    // Validações adicionais para status e destino
    if (body.status === "apreendido" && !body.destino) {
      return new Response(JSON.stringify({ error: "Campo destino é obrigatório quando status é 'apreendido'" }), { status: 400 });
    }
    
    if (body.destino === "depósito" && (!body.secao || !body.prateleira)) {
      return new Response(JSON.stringify({ error: "Campos seção e prateleira são obrigatórios quando destino é 'depósito'" }), { status: 400 });
    }
    
    const updatedRecord = await Documentos.findByIdAndUpdate(id, body, { new: true, runValidators: true });
    if (!updatedRecord) {
      return new Response(JSON.stringify({ error: "Registro não encontrado" }), { status: 404 });
    }
    return new Response(JSON.stringify({ message: "Registro atualizado com sucesso", record: updatedRecord }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Erro ao atualizar registro:", error);
    return new Response(JSON.stringify({ error: "Erro interno ao atualizar registro" }), { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    await dbConnect();
    const { id } = params;
    const deleted = await Documentos.findByIdAndDelete(id);
    if (!deleted) {
      return new Response(JSON.stringify({ error: "Registro não encontrado" }), { status: 404 });
    }
    return new Response(JSON.stringify({ message: "Registro excluído com sucesso" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Erro ao excluir registro:", error);
    return new Response(JSON.stringify({ error: "Erro interno ao excluir registro" }), { status: 500 });
  }
}
