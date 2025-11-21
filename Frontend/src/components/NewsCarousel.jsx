import { useState, useRef, useEffect, useContext, createContext } from 'react';

// --- Utility Helpers ---
const cn = (...classes) => classes.filter(Boolean).join(" ");

const CarouselContext = createContext({
    onCardClose: () => { },
    currentIndex: 0,
});

// --- Hooks ---
const useOutsideClick = (ref, callback) => {
    useEffect(() => {
        const handleClick = (event) => {
            if (ref.current && !ref.current.contains(event.target)) {
                callback();
            }
        };
        document.addEventListener("mousedown", handleClick);
        return () => document.removeEventListener("mousedown", handleClick);
    }, [ref, callback]);
};

// --- Icons ---
const IconArrowNarrowLeft = ({ className }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
    </svg>
);

const IconArrowNarrowRight = ({ className }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
    </svg>
);

const IconX = ({ className }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
);

// --- Sub-Components ---
const BlurImage = ({ src, className, alt, ...rest }) => {
    const [isLoading, setLoading] = useState(true);
    return (
        <img
            className={cn(
                "h-full w-full transition duration-300",
                isLoading ? "blur-sm" : "blur-0",
                className
            )}
            onLoad={() => setLoading(false)}
            src={src}
            loading="lazy"
            decoding="async"
            alt={alt || "News image"}
            {...rest}
        />
    );
};

const Card = ({ card, index }) => {
    const [open, setOpen] = useState(false);
    const containerRef = useRef(null);
    const { onCardClose } = useContext(CarouselContext);

    useEffect(() => {
        const onKeyDown = (event) => {
            if (event.key === "Escape") {
                handleClose();
            }
        };

        if (open) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }

        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, [open]);

    useOutsideClick(containerRef, () => handleClose());

    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        onCardClose(index);
    };

    return (
        <>
            {open && (
                <div className="fixed inset-0 z-100 h-screen overflow-auto">
                    <div className="fixed inset-0 h-full w-full bg-black/80" style={{ backdropFilter: 'blur(16px)' }} />
                    <div
                        ref={containerRef}
                        className="relative z-110 mx-auto my-10 h-fit max-w-5xl rounded-3xl bg-white p-4 font-sans md:p-10"
                    >
                        <button
                            className="sticky top-4 right-0 ml-auto flex h-8 w-8 items-center justify-center rounded-full bg-black"
                            onClick={handleClose}
                        >
                            <IconX className="h-6 w-6 text-white" />
                        </button>
                        <p className="text-base font-medium text-black">{card.category}</p>
                        <p className="mt-4 text-2xl font-semibold text-neutral-700 md:text-5xl">{card.title}</p>
                        <div className="py-10">{card.content}</div>
                    </div>
                </div>
            )}
            <button
                onClick={handleOpen}
                className="relative z-10 flex h-80 w-56 flex-col items-start justify-start overflow-hidden rounded-3xl bg-gray-100 md:h-160 md:w-96"
            >
                <div className="pointer-events-none absolute inset-x-0 top-0 z-30 h-full bg-linear-to-b from-black/50 via-transparent to-transparent" />
                <div className="relative z-40 p-8">
                    <p className="text-left font-sans text-sm font-medium text-white md:text-base">{card.category}</p>
                    <p className="mt-2 max-w-xs text-left font-sans text-xl font-semibold text-white md:text-3xl">{card.title}</p>
                </div>
                <BlurImage src={card.src} alt={card.title} className="absolute inset-0 z-10 object-cover" />
            </button>
        </>
    );
};

const Carousel = ({ items, initialScroll = 0 }) => {
    const carouselRef = useRef(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (carouselRef.current) {
            carouselRef.current.scrollLeft = initialScroll;
            checkScrollability();
        }
    }, [initialScroll]);

    const checkScrollability = () => {
        if (carouselRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
            setCanScrollLeft(scrollLeft > 0);
            setCanScrollRight(scrollLeft < scrollWidth - clientWidth);
        }
    };

    const scrollLeft = () => {
        if (carouselRef.current) {
            carouselRef.current.scrollBy({ left: -300, behavior: "smooth" });
        }
    };

    const scrollRight = () => {
        if (carouselRef.current) {
            carouselRef.current.scrollBy({ left: 300, behavior: "smooth" });
        }
    };

    const handleCardClose = (index) => {
        if (carouselRef.current) {
            const cardWidth = window.innerWidth < 768 ? 230 : 384;
            const gap = window.innerWidth < 768 ? 4 : 8;
            const scrollPosition = (cardWidth + gap) * (index + 1);
            carouselRef.current.scrollTo({
                left: scrollPosition,
                behavior: "smooth",
            });
            setCurrentIndex(index);
        }
    };

    return (
        <CarouselContext.Provider value={{ onCardClose: handleCardClose, currentIndex }}>
            <div className="relative w-full">
                <div
                    className="flex w-full overflow-x-scroll py-10 md:py-20"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    ref={carouselRef}
                    onScroll={checkScrollability}
                >
                    <div className="flex flex-row justify-start gap-4 pl-4 mx-auto max-w-7xl">
                        {items.map((item, index) => (
                            <div key={"card" + index} className="rounded-3xl last:pr-[5%] md:last:pr-[33%]">
                                {item}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="mr-10 flex justify-end gap-2">
                    <button
                        className="relative z-40 flex h-10 w-10 items-center justify-center rounded-full  disabled:opacity-50"
                        onClick={scrollLeft}
                        disabled={!canScrollLeft}
                    >
                        <IconArrowNarrowLeft className="h-6 w-6 text-white" />
                    </button>
                    <button
                        className="relative z-40 flex h-10 w-10 items-center justify-center rounded-full  disabled:opacity-50"
                        onClick={scrollRight}
                        disabled={!canScrollRight}
                    >
                        <IconArrowNarrowRight className="h-6 w-6 text-white" />
                    </button>
                </div>
            </div>
        </CarouselContext.Provider>
    );
};

// --- Main Component Export ---
export default function NewsCarousel() {
    const newsCards = [
        {
            src: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExanpueHliYTUwZTdwMWp5dGVwNnN4NGxpYTN5cGMybnZrNWZrYzN3YyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/P7SNGcByPnW43n6UQQ/giphy.gif",
            title: "",
            category: "",
            content: (
                <div>
                    <p className="text-neutral-600 text-base mb-4">
                        Our AI-powered system has analyzed this breaking news story for accuracy and credibility.
                        The verification process includes cross-referencing multiple sources and detecting potential misinformation.
                    </p>
                    <div className="bg-green-50 p-4 rounded-lg mb-4">
                        <p className="text-green-800 font-semibold">Verification Score: 94%</p>
                        <p className="text-green-700 text-sm">High credibility sources confirmed</p>
                    </div>
                </div>
            ),
        },
        {
            src: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExanpueHliYTUwZTdwMWp5dGVwNnN4NGxpYTN5cGMybnZrNWZrYzN3YyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/hU0FIbvLLbKlfnimHu/giphy.gif",
            title: "",
            category: "",
            content: (
                <div>
                    <p className="text-neutral-600 text-base mb-4">
                        GuardianEye uses advanced machine learning algorithms to detect patterns of misinformation
                        and verify news authenticity in real-time.
                    </p>
                    <p className="text-neutral-600 text-base">
                        Our system processes thousands of news articles daily, ensuring you get accurate information.
                    </p>
                </div>
            ),
        },
        {
            src: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExanpueHliYTUwZTdwMWp5dGVwNnN4NGxpYTN5cGMybnZrNWZrYzN3YyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/FmyRYZ32KSHsMRi89H/giphy.gif",
            title: "",
            category: "",
            content: (
                <div>
                    <p className="text-neutral-600 text-base mb-4">
                        Stay informed with unbiased political news analysis. Our system identifies partisan bias
                        and presents balanced perspectives on important issues.
                    </p>
                </div>
            ),
        },
        {
            src: "https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3Ynp5bzBiY2Jhb203ZDAyZmpmZGxjbThvendlN2VwcjRybmozdjZkMiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/fpeFHuXaBhTtIAdaDt/giphy.gif",
            title: "",
            category: "",
            content: (
                <div>
                    <p className="text-neutral-600 text-base mb-4">
                        Track global events with verified information from trusted sources worldwide.
                        GuardianEye ensures you stay updated with accurate international news.
                    </p>
                </div>
            ),
        },
    ];

    return (
        <Carousel
            items={newsCards.map((card, index) => (
                <Card key={index} card={card} index={index} />
            ))}
        />
    );
}