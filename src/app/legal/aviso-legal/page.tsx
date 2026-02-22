export default function AvisoLegalPage() {
    return (
        <div className="legal-content">
            <span className="font-sans text-[10px] uppercase tracking-widest text-zen-sage mb-4 block">Legal</span>
            <h1 className="font-serif text-4xl text-zen-dark mb-12 italic">Aviso Legal</h1>

            <div className="font-sans text-sm text-zen-dark/80 leading-loose space-y-8 text-justify">
                <p>En cumplimiento con el artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y Comercio Electrónico (LSSICE), se exponen a continuación los datos identificativos de la empresa:</p>

                <div className="bg-zen-sage/5 p-8 border border-zen-sage/10 rounded-sm italic">
                    <p>Denominación social: NOOK SPECIALTY TEA S.L.</p>
                    <p>NIF: B00000000</p>
                    <p>Domicilio: C/ de la Calma, 12. 28004 Madrid.</p>
                    <p>Email: hola@nookspecialty.es</p>
                </div>

                <section>
                    <h2 className="font-serif text-xl mb-4 text-zen-dark">Propiedad Intelectual</h2>
                    <p>El código fuente, los diseños gráficos, las imágenes, las fotografías, los sonidos, las animaciones, el software, los textos, así como la información y los contenidos que se recogen en el presente sitio web están protegidos por la legislación española sobre los derechos de propiedad intelectual e industrial a favor de NOOK SPECIALTY TEA.</p>
                </section>
            </div>
        </div>
    );
}
