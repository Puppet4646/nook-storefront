export default function TrustBadges() {
    const badges = [
        { icon: "🚚", label: "Envío gratis +40€" },
        { icon: "⏱️", label: "Entrega 24-48h" },
        { icon: "🔒", label: "Pago 100% seguro" },
        { icon: "🎁", label: "Muestra gratis" },
    ];

    return (
        <section className="w-full bg-zen-bone border-y border-zen-sage/10 py-4 md:py-5">
            <div className="max-w-7xl mx-auto px-4 md:px-6">
                <div className="flex items-center justify-between gap-4 overflow-x-auto no-scrollbar">
                    {badges.map((badge) => (
                        <div
                            key={badge.label}
                            className="flex items-center gap-2 md:gap-3 shrink-0 min-w-0"
                        >
                            <span className="text-lg md:text-xl" aria-hidden="true">
                                {badge.icon}
                            </span>
                            <span className="font-sans text-[10px] md:text-xs uppercase tracking-widest text-zen-dark/80 whitespace-nowrap">
                                {badge.label}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
