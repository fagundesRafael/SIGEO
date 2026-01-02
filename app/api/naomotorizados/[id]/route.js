// app/api/automotores/[id]/route.js
import { dbConnect } from "@/lib/dbConnect";
import Automotor from "@/models/Automotor";

// GET: Retorna o veículo com o ID informado
export async function GET(request, { params }) {
  try {
    await dbConnect();
    const { id } = await params; 
    const automotor = await Automotor.findById(id);
    if (!automotor) {
      return new Response(JSON.stringify({ error: "Veículo não encontrado" }), { status: 404 });
    }
    return new Response(JSON.stringify(automotor), { status: 200 });
  } catch (error) {
    console.error("Erro na rota GET:", error);
    return new Response(JSON.stringify({ error: "Erro ao buscar veículo" }), { status: 500 });
  }
}

// PUT: Atualiza o veículo com o ID informado
export async function PUT(request, { params }) {
  try {
    await dbConnect();
    const { id } = await params;
    const body = await request.json();

    // Remover "placa" e "chassi" se vazios
    if (!body.placa || body.placa.trim() === "") delete body.placa;
    if (!body.chassi || body.chassi.trim() === "") delete body.chassi;
    if (body.placa) {
      body.placa = body.placa.trim().toUpperCase();
    }
    if (body.chassi) {
      body.chassi = body.chassi.trim().toUpperCase();
    }

    // É possível adicionar validações de duplicidade aqui, se necessário

    const updatedVehicle = await Automotor.findByIdAndUpdate(id, body, { new: true, runValidators: true });
    if (!updatedVehicle) {
      return new Response(JSON.stringify({ error: "Veículo não encontrado" }), { status: 404 });
    }
    return new Response(JSON.stringify({ message: "Veículo atualizado com sucesso", vehicle: updatedVehicle }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Erro ao atualizar veículo:", error);
    return new Response(JSON.stringify({ error: "Erro interno ao atualizar veículo" }), { status: 500 });
  }
}

// DELETE: Exclui o veículo com o ID informado
export async function DELETE(request, { params }) {
  try {
    await dbConnect();
    const { id } = params;
    const deleted = await Automotor.findByIdAndDelete(id);
    if (!deleted) {
      return new Response(JSON.stringify({ error: "Veículo não encontrado" }), { status: 404 });
    }
    return new Response(JSON.stringify({ message: "Veículo excluído com sucesso" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Erro ao excluir veículo:", error);
    return new Response(JSON.stringify({ error: "Erro interno ao excluir veículo" }), { status: 500 });
  }
}