"use client";

import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Home, ArrowLeft, Search, MonitorOff } from "lucide-react";

export default function NotFound() {
    return (
        <main className="min-h-screen bg-black flex items-center justify-center px-4 overflow-hidden relative">
            {/* Background Decorative Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px]" />
                <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px]" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-[0.03] pointer-events-none"
                    style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
            </div>

            <div className="container max-w-2xl mx-auto text-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    {/* Animated Icon */}
                    <div className="flex justify-center mb-8">
                        <motion.div
                            animate={{
                                rotate: [0, -5, 5, -5, 0],
                                y: [0, -10, 0]
                            }}
                            transition={{
                                duration: 4,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                            className="relative"
                        >
                            <div className="absolute inset-0 bg-primary blur-3xl opacity-20" />
                            <MonitorOff className="w-24 h-24 text-primary relative z-10" />
                        </motion.div>
                    </div>

                    {/* 404 Text */}
                    <h1 className="text-[120px] md:text-[180px] font-black leading-none tracking-tighter text-white mb-4">
                        404
                    </h1>

                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
                        Oops! Page Not Found
                    </h2>

                    <p className="text-gray-400 text-lg mb-12 max-w-md mx-auto leading-relaxed">
                        The link you followed may be broken, or the page may have been removed.
                        Don't worry, even the best streamers lose their connection sometimes.
                    </p>

                    {/* Actions */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link href="/">
                            <Button
                                className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-base font-bold transition-all duration-300 flex items-center gap-2 group"
                            >
                                <Home className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                Return Home
                            </Button>
                        </Link>
                        <Button
                            variant="outline"
                            className="border-white/20 text-white hover:bg-white/10 px-8 py-6 text-base font-semibold transition-all duration-300 flex items-center gap-2"
                            onClick={() => window.history.back()}
                        >
                            <ArrowLeft className="w-5 h-5" />
                            Go Back
                        </Button>
                    </div>

                    {/* Search Suggestion */}
                    <div className="mt-16 pt-8 border-t border-white/10">
                        <p className="text-gray-500 text-sm mb-4 uppercase tracking-widest font-semibold">
                            Or explore our top sections
                        </p>
                        <div className="flex flex-wrap justify-center gap-6">
                            {[
                                { name: "Live TV", href: "/channels" },
                                { name: "Pricing", href: "/pricing" },
                                { name: "Download", href: "/download" },
                                { name: "FAQs", href: "/faqs" }
                            ].map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className="text-gray-400 hover:text-primary transition-colors font-medium"
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        </main>
    );
}
