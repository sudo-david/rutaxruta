import pool from '@/lib/db';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { correo, password } = await request.json();

    // Buscamos al usuario por correo
    const [rows] = await pool.query(
      'SELECT id, nombre, rol FROM usuarios WHERE correo = ? AND password = ?',
      [correo, password]
    );

    if (rows.length > 0) {
      const usuario = rows[0];
      return NextResponse.json({ 
        message: "Login exitoso", 
        usuario: { id: usuario.id, nombre: usuario.nombre, rol: usuario.rol } 
      }, { status: 200 });
    } else {
      return NextResponse.json({ error: "Correo o contraseña incorrectos" }, { status: 401 });
    }
  } catch (error) {
    console.error("ERROR EN LOGIN API:", error);
    return NextResponse.json({ error: "Error en el servidor" }, { status: 500 });
  }
}