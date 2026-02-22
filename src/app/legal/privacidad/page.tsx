export default function PrivacidadPage() {
    return (
        <div className="legal-content">
            <span className="font-sans text-[10px] uppercase tracking-widest text-zen-sage mb-4 block">Legal</span>
            <h1 className="font-serif text-4xl text-zen-dark mb-12 italic">Política de Privacidad</h1>

            <div className="font-sans text-sm text-zen-dark/80 leading-loose space-y-8">
                <section>
                    <h2 className="font-serif text-xl mb-4 text-zen-dark">1. Información al usuario</h2>
                    <p>NOOK SPECIALTY TEA, como responsable del Tratamiento, le informa que, según lo dispuesto en el RGPD y la LOPDGDD, trataremos sus datos tal y como reflejamos en la presente Política de Privacidad.</p>
                </section>

                <section>
                    <h2 className="font-serif text-xl mb-4 text-zen-dark">2. Finalidad del tratamiento</h2>
                    <p>Trataremos sus datos de carácter personal únicamente para las siguientes finalidades:</p>
                    <ul className="list-disc pl-5 mt-4 space-y-2">
                        <li>Envío de comunicaciones comerciales publicitarias por e-mail, redes sociales o cualquier otro medio electrónico o físico.</li>
                        <li>Tramitar encargos, solicitudes o cualquier tipo de petición que sea realizada por el usuario a través de cualquiera de las formas de contacto que se ponen a su disposición.</li>
                        <li>Realizar estudios estadísticos.</li>
                    </ul>
                </section>

                <section>
                    <h2 className="font-serif text-xl mb-4 text-zen-dark">3. Criterios de conservación de los datos</h2>
                    <p>Se conservarán durante no más tiempo del necesario para mantener el fin del tratamiento y cuando ya no sea necesario para tal fin, se suprimirán con medidas de seguridad adecuadas para garantizar la seudonimización de los datos o la destrucción total de los mismos.</p>
                </section>

                <section>
                    <h2 className="font-serif text-xl mb-4 text-zen-dark">4. Derechos del usuario</h2>
                    <p>Tiene derecho a retirar el consentimiento en cualquier momento. Derecho de acceso, rectificación, portabilidad y supresión de sus datos y a la limitación u oposición a su tratamiento.</p>
                </section>
            </div>
        </div>
    );
}
