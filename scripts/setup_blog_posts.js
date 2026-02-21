import axios from 'axios';
import dotenv from 'dotenv';
import path from 'path';

// Cargar variables de entorno desde el proyecto principal
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

// Para crear posts en WordPress necesitamos Application Passwords o autenticación básica
// WooCommerce keys sirven para /wc/v3, pero /wp/v2/posts suele requerir auth de usuario WP.
// Si no hay Application Password configurado, asumimos auth básica con user/password si estuvieran,
// o un token JWT. Para esta prueba simplificada, como WP REST API puede requerir auth para POST,
// requerimos esas variables.

const WP_URL = process.env.NEXT_PUBLIC_WC_URL;
const WP_USER = process.env.WP_API_USER; // E.g., admin
const WP_APP_PASS = process.env.WP_API_APP_PASS; // E.g., xxxx xxxx xxxx xxxx

if (!WP_URL || !WP_USER || !WP_APP_PASS) {
    console.error("Faltan variables WP_URL, WP_API_USER o WP_API_APP_PASS en .env.local para publicar posts.");
    console.error("Nota: WP_API_APP_PASS es una 'Application Password' generada en el perfil del usuario de WP.");
    process.exit(1);
}

// Codificar credenciales para Basic Auth
const authHeader = `Basic ${Buffer.from(`${WP_USER}:${WP_APP_PASS}`).toString('base64')}`;

const api = axios.create({
    baseURL: `${WP_URL}/wp-json/wp/v2`,
    headers: {
        'Authorization': authHeader,
        'Content-Type': 'application/json'
    }
});

const blogPosts = [
    {
        title: "El arte del Matcha Ceremonial: Mucho más que una bebida",
        slug: "arte-matcha-ceremonial",
        status: "publish",
        format: "standard",
        content: `
            <h2>Un viaje milenario</h2>
            <p>El matcha no es simplemente té verde molido; es el resultado de un cuidado proceso que se remonta a siglos atrás en Japón. A diferencia de las infusiones tradicionales donde las hojas se descartan, con el matcha consumimos la hoja entera, aprovechando el 100% de sus nutrientes.</p>
            
            <img src="https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&q=80&w=1000" alt="Preparación de Matcha" />

            <h3>Grado Ceremonial vs. Grado Culinario</h3>
            <p>El <strong>Grado Ceremonial</strong> se elabora usando solo las hojas más jóvenes y tiernas de la primera cosecha (Ichibancha). Estas hojas, cultivadas a la sombra durante semanas antes de la recolección, desarrollan una dulzura profunda (umami) y un color verde esmeralda vibrante.</p>
            <ul>
                <li><strong>Sabor:</strong> Dulce, umami profundo, apenas astringente.</li>
                <li><strong>Color:</strong> Verde brillante, neón.</li>
                <li><strong>Uso:</strong> Tradicionalmente batido con agua caliente (Usucha o Koicha).</li>
            </ul>

            <p>Por otro lado, el <em>Grado Culinario</em> proviene de cosechas posteriores. Tiene un sabor más robusto y astringente, ideal para destacar cuando se mezcla con leche (lattes) o en repostería.</p>

            <h2>El Ritual de Preparación</h2>
            <p>Preparar matcha es una meditación activa. Necesitarás un <strong>Chawan</strong> (cuenco), un <strong>Chasen</strong> (batidor de bambú) y un <strong>Chashaku</strong> (cuchara medidora).</p>
            <ol>
                <li>Tamiza 2 gramos (dos cucharadas de Chashaku) de matcha ceremonial en el Chawan.</li>
                <li>Añade 70ml de agua caliente (pero no hirviendo, idealmente a 80°C).</li>
                <li>Con el Chasen, bate vigorosamente en forma de "W" o "M" durante 15-20 segundos hasta obtener una espuma fina y persistente color jade.</li>
            </ol>
            <p>Disfruta Inmediatamente. El matcha no debe reposar.</p>
        `
    },
    {
        title: "Temperatura y Tiempos: La manera correcta de preparar tu té",
        slug: "temperatura-tiempos-preparacion-te",
        status: "publish",
        format: "standard",
        content: `
            <h2>El secreto está en el agua</h2>
            <p>A menudo, un té de excelente calidad puede saber amargo o plano simplemente por prepararlo con agua demasiado caliente o dejarlo infusionar por mucho tiempo. La <strong>Camellia Sinensis</strong> es una planta delicada y cada tipo de té requiere un trato diferente para revelar todo su potencial aromático.</p>

            <img src="https://images.unsplash.com/photo-1576092762791-dd9e222046d8?auto=format&fit=crop&q=80&w=1000" alt="Agua caliente vertiéndose en una tetera de cristal" />

            <h3>Guía Rápida de Infusión</h3>
            <p>Guarda esta pequeña guía para que tus tazas siempre sean perfectas:</p>
            
            <ul>
                <li><strong>Té Blanco:</strong> 70°C - 80°C durante 3 a 5 minutos.</li>
                <li><strong>Té Verde (Japonés):</strong> 65°C - 75°C durante 1 a 2 minutos.</li>
                <li><strong>Té Verde (Chino):</strong> 75°C - 80°C durante 2 a 3 minutos.</li>
                <li><strong>Té Oolong:</strong> 85°C - 95°C durante 3 a 5 minutos (excelente para múltiples infusiones).</li>
                <li><strong>Té Negro:</strong> 95°C - 100°C durante 3 a 5 minutos.</li>
                <li><strong>Pu-erh (Té Rojo):</strong> 100°C durante 3 a 5 minutos.</li>
                <li><strong>Infusiones Herbales / Frutales:</strong> 100°C durante 5 a 8 minutos.</li>
            </ul>

            <h3>Consideraciones Adicionales</h3>
            <p>El <em>ratio de hoja por agua</em> también es fundamental. Como regla general, utiliza entre 2 y 3 gramos de té por cada 200ml de agua. Si prefieres un sabor más intenso, añade más hoja, pero <strong>nunca prolongues el tiempo de infusión</strong> más allá de lo recomendado, o extraerás los taninos amargos que arruinan la experiencia.</p>
        `
    },
    {
        title: "Terroir en la taza: Secretos de los cultivos de origen",
        slug: "terroir-cultivos-origen-te",
        status: "publish",
        format: "standard",
        content: `
            <h2>¿Qué significa Terroir?</h2>
            <p>Proveniente del francés (tierra), el concepto de <strong>terroir</strong> define cómo el conjunto de factores ambientales (suelo, clima, topografía y métodos de cultivo locales) afecta el fenotipo de un cultivo. Lo que es famoso en el vino, es igualmente crucial y complejo en el mundo del té.</p>

            <img src="https://images.unsplash.com/photo-1587520038480-c11efea64d04?auto=format&fit=crop&q=80&w=1000" alt="Plantación de té en las montañas" />

            <h3>Desde las montañas nubladas hasta los valles volcánicos</h3>
            <p>Un mismo clon de la planta <em>Camellia Sinensis</em> plantado en Darjeeling (India) y en Shizuoka (Japón) producirá tés con perfiles de sabor completamente distintos. Esto se debe al terroir.</p>

            <ul>
                <li><strong>Elevación:</strong> Los jardines de té en altas montañas (High Mountain Oolongs en Taiwán o Darjeeling en India) gozan de días cálidos y noches frías, con abundante niebla. Esto ralentiza el crecimiento de la hoja, concentrando aceites esenciales y compuestos aromáticos que resultan en tés florales, complejos y dulces con muy poca astringencia.</li>
                <li><strong>Componentes del suelo:</strong> Suelos ricos en minerales volcánicos (comunes en ciertas zonas de Japón y Hawái) aportan notas sápidas y un final prolongado. Suelos más rocosos (como en Wuyi, China) aportan la característica "nota mineral" (Yan Yun) famosa en los Da Hong Pao.</li>
                <li><strong>Clima y Niebla:</strong> La niebla natural actúa como un filtro solar. Tal como el matcha se sombrea artificialmente, los tés cultivados en zonas de nubosidad constante desarrollan mayores niveles de aminoácidos (L-Teanina), potenciando el sabor Umami y la textura sedosa en boca.</li>
            </ul>

            <p>La próxima vez que bebas una taza de té, cierra los ojos e intenta viajar a través de tus sentidos al lugar donde esas hojas crecieron. La naturaleza te está contando su historia en cada gota.</p>
        `
    }
];

async function createPosts() {
    console.log(`Iniciando inyección de ${blogPosts.length} artículos en ${WP_URL}...`);

    for (const postData of blogPosts) {
        try {
            console.log(`Creando artículo: "${postData.title}"...`);
            const response = await api.post('/posts', postData);
            console.log(`✅ Artículo creado con ID: ${response.data.id} y URL: ${response.data.link}`);
        } catch (error) {
            console.error(`❌ Error creando "${postData.title}":`, error.response ? error.response.data : error.message);
        }
    }

    console.log("Proceso de inyección de Blog finalizado.");
}

createPosts();
