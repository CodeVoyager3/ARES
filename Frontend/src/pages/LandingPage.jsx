import { useState } from 'react'
import LightRays from '../components/LightRays';
import ScrollVelocity from '../components/ScrollVelocity';
import NewsCarousel from '../components/NewsCarousel';

function LandingPage() {
    const [menuOpen, setMenuOpen] = useState(false)
    const velocity = 50

    return (
        <div className="w-full min-h-screen flex flex-col relative overflow-hidden bg-gray-900">
            {/* LightRays Background Effect */}
            <div style={{
                width: '100%',
                height: '100%',
                position: 'absolute',
                top: 0,
                left: 0,
                zIndex: 0,
                pointerEvents: 'none'
            }}>
                <LightRays
                    raysOrigin="top-center"
                    raysColor="#00ffff"
                    raysSpeed={1.5}
                    lightSpread={0.8}
                    rayLength={1.2}
                    followMouse={true}
                    mouseInfluence={0.1}
                    noiseAmount={0.1}
                    distortion={0.05}
                    className="custom-rays"
                />
            </div>

            {/* Content - with relative positioning to stay above LightRays */}
            <nav className="relative z-10 flex items-center justify-between w-full px-4 sm:px-6 lg:px-8 py-4 sm:py-6 mx-auto max-w-7xl text-white">
                <div className="z-20">
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-200">GuardianEye</h1>
                </div>

                <ul className="hidden lg:flex absolute left-1/2 transform -translate-x-1/2 gap-6 xl:gap-8 items-center text-base xl:text-lg">
                    <li className="hover:text-gray-400 transition-colors cursor-pointer"><a href="#home">Home</a></li>
                    <li className="hover:text-gray-400 transition-colors cursor-pointer"><a href="#about">About</a></li>
                    <li className="hover:text-gray-400 transition-colors cursor-pointer"><a href="#services">Services</a></li>
                    <li className="hover:text-gray-400 transition-colors cursor-pointer"><a href="#contact">Contact</a></li>
                </ul>

                <div className="z-20 hidden sm:block">
                    <button className="flex items-center gap-2 px-4 sm:px-6 py-2 font-semibold text-sm sm:text-base text-gray-900 bg-gray-200 rounded-full cursor-pointer hover:bg-white transition-all hover:scale-105">
                        <span>Login</span>
                    </button>
                </div>

                <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="lg:hidden z-20 p-2 text-white focus:outline-none"
                    aria-label="Toggle menu"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        {menuOpen ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        )}
                    </svg>
                </button>

                {menuOpen && (
                    <div className="lg:hidden absolute top-full left-0 right-0  bg-blue-800 shadow-lg py-4 z-10 mt-2 mx-4 rounded-lg">
                        <ul className="flex flex-col gap-4 px-6">
                            <li className="hover:text-gray-400 transition-colors cursor-pointer border-b border-gray-700 pb-3">
                                <a href="#home" onClick={() => setMenuOpen(false)}>Home</a>
                            </li>
                            <li className="hover:text-gray-400 transition-colors cursor-pointer border-b border-gray-700 pb-3">
                                <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
                            </li>
                            <li className="hover:text-gray-400 transition-colors cursor-pointer border-b border-gray-700 pb-3">
                                <a href="#services" onClick={() => setMenuOpen(false)}>Services</a>
                            </li>
                            <li className="hover:text-gray-400 transition-colors cursor-pointer border-b border-gray-700 pb-3">
                                <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
                            </li>
                            <li className="pt-2">
                                <button className="w-full flex items-center justify-center gap-2 px-6 py-2 font-semibold text-gray-900 bg-gray-200 rounded-full cursor-pointer hover:bg-white transition-all">
                                    <span>Login</span>
                                </button>
                            </li>
                        </ul>
                    </div>
                )}
            </nav>

            <div className="relative z-10 grow flex items-center justify-center w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-0">
                <div className="max-w-7xl mx-auto w-full flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
                    <div className="w-full lg:w-3/5 xl:w-1/2 mt-24 text-center lg:text-left">
                        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-7xl font-extrabold text-amber-50 leading-tight tracking-tight">
                            Guarding truth <br />
                            in a battle of <br />
                            misinformation.
                        </h1>
                        <h2 className='text-white text-3xl mask-b-from-emerald-500'>Prevent misinformation. Strengthen intelligence. Powered by AI-driven truth detection.</h2>

                        <div className="mt-6 sm:mt-8 flex justify-center lg:justify-start">
                            <button
                                className="inline-flex items-center cursor-pointer gap-2 sm:gap-3 px-5 sm:px-6 py-2.5 sm:py-3 text-lg sm:text-xl text-gray-900 bg-gray-200 rounded-full font-semibold hover:scale-105 hover:bg-white transition-all"
                                aria-label="Analyze News"
                            >
                                <span>Analyze News</span>
                                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#ffffff">
                                    <path d="M200-800v241-1 400-640 200-200Zm80 400h140q9-23 22-43t30-37H280v80Zm0 160h127q-5-20-6.5-40t.5-40H280v80ZM200-80q-33 0-56.5-23.5T120-160v-640q0-33 23.5-56.5T200-880h320l240 240v100q-19-8-39-12.5t-41-6.5v-41H480v-200H200v640h241q16 24 36 44.5T521-80H200Zm460-120q42 0 71-29t29-71q0-42-29-71t-71-29q-42 0-71 29t-29 71q0 42 29 71t71 29ZM864-40 756-148q-21 14-45.5 21t-50.5 7q-75 0-127.5-52.5T480-300q0-75 52.5-127.5T660-480q75 0 127.5 52.5T840-300q0 26-7 50.5T812-204L920-96l-56 56Z" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    <div className="hidden lg:flex w-full lg:w-2/5 justify-center lg:justify-end">
                        <div className="w-full max-w-sm lg:max-w-md xl:max-w-lg">
                            <img
                                src="/gears.gif"
                                alt="gears"
                                className="w-full h-auto object-contain"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="relative z-10 mb-20 mt-20">
                <ScrollVelocity
                    texts={['Detecting Defence Misinformation', 'Exposing Hidden Propaganda']}
                    velocity={velocity}
                    className="custom-scroll-text"
                />
            </div>
            <div className="relative mb-20 z-10">
                
                <div className='flex flex-col bg-purple-400 items-center rounded-t-full rounded-b-full justify-center mt-10 mb-10 drop-shadow-2xl rounded-lg'>
                    <h1 className="font-bold font-stretch-ultra-expanded text-8xl mt-20 text-center">Easy To Use UI/UX</h1> 
                    <img  src="news.png" alt="" />
                </div>
            </div>
            <div className="relative z-10 w-full text-center mb-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
                        Featured News Analysis
                    </h2>
                    <p className="text-gray-300 text-lg">
                        Explore our AI-powered fact-checking on recent news stories
                    </p>
                </div>
                <NewsCarousel />
            </div>
        </div>
    )
}

export default LandingPage