// app/api/belicos/[id]/route.js
import { dbConnect } from "@/lib/dbConnect";
import Belico from "@/models/Belico";

// GET: Retorna o registro com o ID informado
export async function GET(request, { params }) {
  try {
    await dbConnect();
    const { id } = await params;
    const record = await Belico.findById(id);
    if (!record) {
      return new Response(JSON.stringify({ error: "Registro não encontrado" }), { status: 404 });
    }
    return new Response(JSON.stringify(record), { status: 200 });
  } catch (error) {
    console.error("Erro na rota GET:", error);
    return new Response(JSON.stringify({ error: "Erro ao buscar registro" }), { status: 500 });
  }
}

// PUT: Atualiza o registro com o ID informado
export async function PUT(request, { params }) {
  try {
    await dbConnect();
    const { id } = await params;
    const body = await request.json();

    if (body.status === "apreendido") {
      if (!body.destino) {
        return new Response(
          JSON.stringify({
            error: "Campo destino é obrigatório para status 'apreendido'",
          }),
          { status: 400 }
        );
      }
      if (body.destino === "depósito" && (!body.secao || !body.prateleira)) {
        return new Response(
          JSON.stringify({
            error: "Campos seção e prateleira são obrigatórios para destino 'depósito'",
          }),
          { status: 400 }
        );
      }
    }

    const updatedRecord = await Belico.findByIdAndUpdate(id, body, { new: true, runValidators: true });
    if (!updatedRecord) {
      return new Response(JSON.stringify({ error: "Registro não encontrado" }), { status: 404 });
    }
    return new Response(
      JSON.stringify({ message: "Registro atualizado com sucesso", record: updatedRecord }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Erro ao atualizar registro:", error);
    return new Response(JSON.stringify({ error: "Erro interno ao atualizar registro" }), { status: 500 });
  }
}

// DELETE: Exclui o registro com o ID informado
export async function DELETE(request, { params }) {
  try {
    await dbConnect();
    const { id } = await params;
    const deleted = await Belico.findByIdAndDelete(id);
    if (!deleted) {
      return new Response(JSON.stringify({ error: "Registro não encontrado" }), { status: 404 });
    }
    return new Response(
      JSON.stringify({ message: "Registro excluído com sucesso" }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Erro ao excluir registro:", error);
    return new Response(JSON.stringify({ error: "Erro interno ao excluir registro" }), { status: 500 });
  }
}
