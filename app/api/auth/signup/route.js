// app/api/auth/signup/route.js
import { dbConnect } from "@/lib/dbConnect";
import User from "@/models/User";
import { hash } from "bcryptjs";

export async function POST(request) {
  try {
    await dbConnect();

    const body = await request.json();
    const { nome, email, password } = body;

    if (!nome || !email || !password) {
      return new Response(
        JSON.stringify({ error: "Campos obrigatórios não informados." }),
        { status: 400 }
      );
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return new Response(
        JSON.stringify({ error: "Usuário com email já existe." }),
        { status: 400 }
      );
    }

    const hashedPassword = await hash(password, 10);

    const user = new User({
      nome,
      email,
      password: hashedPassword,
    });

    await user.save();

    return new Response(
      JSON.stringify({ message: "Usuário criado com sucesso." }),
      { status: 201 }
    );
  } catch (error) {
    console.error("Erro no cadastro:", error);
    return new Response(
      JSON.stringify({ error: "Erro interno ao criar usuário." }),
      { status: 500 }
    );
  }
}
