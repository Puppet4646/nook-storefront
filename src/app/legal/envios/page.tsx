export default function EnviosPage() {
    return (
        <div className="legal-content">
            <span className="font-sans text-[10px] uppercase tracking-widest text-zen-sage mb-4 block">Ayuda</span>
            <h1 className="font-serif text-4xl text-zen-dark mb-12 italic">Envíos y Devoluciones</h1>

            <div className="font-sans text-sm text-zen-dark/80 leading-loose space-y-8">
                <section>
                    <h2 className="font-serif text-xl mb-4 text-zen-dark">Gastos y plazos de envío</h2>
                    <p>Realizamos envíos a toda España (Península y Baleares). Próximamente activaremos envíos internacionales.</p>
                    <ul className="list-disc pl-5 mt-4 space-y-2">
                        <li><strong>Península:</strong> Correo Express (24/48h) - 4,90€ (Gratis en pedidos +45€)</li>
                        <li><strong>Baleares:</strong> SEUR - 8,50€ (4-5 días laborables)</li>
                    </ul>
                </section>

                <section>
                    <h2 className="font-serif text-xl mb-4 text-zen-dark">Política de Devoluciones</h2>
                    <p>Al tratarse de productos de alimentación (té e infusiones), por razones de higiene y salud no se admiten devoluciones de productos cuyo precinto de seguridad haya sido abierto, a menos que el producto se encuentre en mal estado.</p>
                    <p className="mt-4">Si has recibido un producto dañado durante el transporte, tienes 24 horas desde la recepción para notificárnoslo enviando una foto a hola@nookspecialty.es.</p>
                </section>

                <section>
                    <h2 className="font-serif text-xl mb-4 text-zen-dark">Cancelaciones</h2>
                    <p>Puedes cancelar tu pedido sin coste alguno siempre que no haya sido entregado a la empresa de transporte. Una vez enviado, se aplicará el proceso de devolución estándar.</p>
                </section>
            </div>
        </div>
    );
}
