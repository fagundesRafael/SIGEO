// app/api/automotores/route.js
import { dbConnect } from "@/lib/dbConnect";
import Automotor from "@/models/Automotor";

// GET: Listar veículos com paginação e filtros opcionais
export async function GET(request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = 16;
    const skip = (page - 1) * limit;

    // Monta uma query dinâmica a partir dos parâmetros opcionais
    const query = {};
    const fields = [
      "procedimento",
      "numero",
      "marca",
      "modelo",
      "placa",
      "chassi",
    ];

    fields.forEach((field) => {
      const value = searchParams.get(field);
      if (value) {
        query[field] = { $regex: value, $options: "i" };
      }
    });

    // Busca "tipo" e também "customTipo" caso tenha valor maior que 1 caractere
    const tipo = searchParams.get("tipo");
    if (tipo) {
      query.$or = [
        { tipo: { $regex: tipo, $options: "i" } },
        { customTipo: { $regex: tipo, $options: "i", $exists: true, $ne: "" } },
      ];
    }

    const veiculos = await Automotor.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Automotor.countDocuments(query);

    return new Response(JSON.stringify({ veiculos, total, page }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Erro ao buscar veículos:", error);
    return new Response(JSON.stringify({ error: "Erro ao buscar veículos" }), {
      status: 500,
    });
  }
}

// POST: Criar um novo veículo
export async function POST(request) {
  try {
    await dbConnect();
    const body = await request.json();

    // Remover os campos "placa" e "chassi" se estiverem vazios, nulos ou indefinidos
    if (!body.placa || body.placa.trim() === "") {
      delete body.placa;
    }
    if (!body.chassi || body.chassi.trim() === "") {
      delete body.chassi;
    }

    // Se a placa foi informada, converte para maiúsculas e verifica duplicidade
    if (body.placa) {
      const placaValue = body.placa.trim().toUpperCase();
      const existingPlaca = await Automotor.findOne({ placa: placaValue });
      if (existingPlaca) {
        return new Response(JSON.stringify({ error: "Placa já registrada" }), {
          status: 400,
        });
      }
      body.placa = placaValue;
    }

    // Se o chassi foi informado, converte para maiúsculas e verifica duplicidade
    if (body.chassi) {
      const chassiValue = body.chassi.trim().toUpperCase();
      const existingChassi = await Automotor.findOne({ chassi: chassiValue });
      if (existingChassi) {
        return new Response(JSON.stringify({ error: "Chassi já registrado" }), {
          status: 400,
        });
      }
      body.chassi = chassiValue;
    }

    // Validação dos campos obrigatórios (exceto placa e chassi)
    const requiredFields = [
      "procedimento",
      "numero",
      "marca",
      "modelo",
      "tipo",
      "status",
      "createdBy",
    ];
    for (const field of requiredFields) {
      if (!body[field]) {
        return new Response(
          JSON.stringify({ error: `Campo ${field} é obrigatório` }),
          { status: 400 }
        );
      }
    }

    // Se o status for "apreendido", destino é obrigatório.
    if (body.status === "apreendido") {
      if (!body.destino) {
        return new Response(
          JSON.stringify({
            error: "Campo destino é obrigatório para status 'apreendido'",
          }),
          { status: 400 }
        );
      }
    }

    const veiculo = new Automotor(body);
    await veiculo.save();
    return new Response(
      JSON.stringify({ message: "Veículo criado com sucesso" }),
      { status: 201 }
    );
  } catch (error) {
    console.error("Erro ao criar veículo:", error);
    return new Response(
      JSON.stringify({ error: "Erro interno ao criar veículo" }),
      { status: 500 }
    );
  }
}
