import pool from '@/lib/db';
import { NextResponse } from 'next/server';

// OBTENER RUTAS (Para el pasajero)
export async function GET() {
  const [rows] = await pool.query('SELECT * FROM rutas ORDER BY id DESC');
  return NextResponse.json(rows);
}

// PUBLICAR RUTA (Para el conductor)
export async function POST(request) {
  const { usuario_id, nombre_conductor, origen, destino, placa, hora } = await request.json();
  
  await pool.query(
    'INSERT INTO rutas (usuario_id, nombre_conductor, origen_lat, origen_lng, destino_lat, destino_lng, placa, hora_salida) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
    [usuario_id, nombre_conductor, origen.lat, origen.lng, destino.lat, destino.lng, placa, hora]
  );
  
  return NextResponse.json({ message: "Ruta publicada" });
}