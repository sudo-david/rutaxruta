import pool from '@/lib/db';
import { NextResponse } from 'next/server';

// OBTENER VIAJES
export async function GET() {
  try {
    const [rows] = await pool.query('SELECT * FROM viajes ORDER BY id DESC');
    return NextResponse.json(rows);
  } catch (error) {
    console.error('[GET /api/rutas]', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// PUBLICAR VIAJE
export async function POST(request) {
  try {
    const body = await request.json();
    const { usuario_id, nombre_conductor, origen, destino, placa, hora, cupos, precio } = body;

    console.log('[POST /api/rutas] body recibido:', JSON.stringify(body, null, 2));

    if (!origen?.lat || !origen?.lng)
      return NextResponse.json({ error: 'origen inválido', recibido: origen }, { status: 400 });
    if (!destino?.lat || !destino?.lng)
      return NextResponse.json({ error: 'destino inválido', recibido: destino }, { status: 400 });
    if (!usuario_id || !hora)
      return NextResponse.json({ error: 'campos faltantes', recibido: { usuario_id, hora } }, { status: 400 });

    await pool.query(
      `INSERT INTO viajes 
        (conductor_id, origen, destino, lat_origen, lon_origen, lat_destino, lon_destino, hora_salida, cupos_disponibles, precio)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        usuario_id,
        nombre_conductor ?? 'Sin nombre',   // origen (texto descriptivo)
        placa ?? '',                         // destino (texto descriptivo)
        origen.lat,
        origen.lng,
        destino.lat,
        destino.lng,
        `${new Date().toISOString().split('T')[0]} ${hora}:00`,
        cupos ?? 3,                          // cupos por defecto: 3
        precio ?? 0,                         // precio por defecto: 0
      ]
    );

    return NextResponse.json({ message: 'Viaje publicado' }, { status: 201 });
  } catch (error) {
    console.error('[POST /api/rutas]', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}