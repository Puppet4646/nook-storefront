import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

/**
 * On-Demand Revalidation Endpoint
 * 
 * Este endpoint permite purgar la caché de una ruta específica desde un servicio externo
 * como WordPress o WooCommerce enviando un Webhook.
 * 
 * URL Ejemplo: https://tu-sitio.vercel.app/api/revalidate?secret=TU_SECRETO&path=/tienda
 */

export async function GET(request: NextRequest) {
    const secret = request.nextUrl.searchParams.get('secret');
    const path = request.nextUrl.searchParams.get('path');

    // 1. Validar el secreto de seguridad
    if (secret !== process.env.REVALIDATE_SECRET) {
        return NextResponse.json({ message: 'Secreto inválido' }, { status: 401 });
    }

    // 2. Validar que se ha proporcionado un path
    if (!path) {
        return NextResponse.json({ message: 'Falta el parámetro "path"' }, { status: 400 });
    }

    try {
        // 3. Revalidar el path (ej: /tienda, /blog, /)
        // Esto purga la caché de esa página específica
        revalidatePath(path);

        console.log(`[Revalidate] Caché purgada para: ${path}`);

        return NextResponse.json({
            revalidated: true,
            path,
            now: Date.now()
        });
    } catch (err) {
        return NextResponse.json({ message: 'Error revalidando' }, { status: 500 });
    }
}

// También permitimos POST para mayor compatibilidad con webhooks estándar
export async function POST(request: NextRequest) {
    const secret = request.nextUrl.searchParams.get('secret');
    const path = request.nextUrl.searchParams.get('path') || '/'; // Por defecto revalida la home si no se especifica

    if (secret !== process.env.REVALIDATE_SECRET) {
        return NextResponse.json({ message: 'Secreto inválido' }, { status: 401 });
    }

    try {
        revalidatePath(path);
        return NextResponse.json({ revalidated: true, path });
    } catch (err) {
        return NextResponse.json({ message: 'Error revalidando' }, { status: 500 });
    }
}
