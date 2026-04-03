import pool from '@/lib/db';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const data = await request.json();
    const { nombre, correo, password, rol, telefono, placa } = data;

    // 1. Insertar el usuario
    const [result] = await pool.query(
      'INSERT INTO usuarios (nombre, correo, password, rol, telefono) VALUES (?, ?, ?, ?, ?)',
      [nombre, correo, password, rol, telefono]
    );

    const usuarioId = result.insertId;

    // 2. Si es conductor, insertar también el vehículo
    if (rol === 'conductor' && placa) {
      await pool.query(
        'INSERT INTO vehiculos (usuario_id, placa) VALUES (?, ?)',
        [usuarioId, placa]
      );
    }

    return NextResponse.json({ message: "Usuario creado con éxito" }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error al registrar usuario" }, { status: 500 });
  }
}