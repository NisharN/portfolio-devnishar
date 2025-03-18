"use client";

import { useEffect, useState } from "react";
import { personalData } from "@/utils/data/personal-data";
import dynamic from "next/dynamic"; // Added dynamic import for client-only components

// Dynamic imports for potential client-side dependent components
const AboutSection = dynamic(() => import("./components/homepage/about"), { ssr: false });
const Blog = dynamic(() => import("./components/homepage/blog"), { ssr: false });
const ContactSection = dynamic(() => import("./components/homepage/contact"), { ssr: false });
const Education = dynamic(() => import("./components/homepage/education"), { ssr: false });
const Experience = dynamic(() => import("./components/homepage/experience"), { ssr: false });
const HeroSection = dynamic(() => import("./components/homepage/hero-section"), { ssr: false });
const Certifications = dynamic(() => import("./components/homepage/certifications"), { ssr: false });
const Skills = dynamic(() => import("./components/homepage/skills"), { ssr: false });

export default function Home() {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const res = await fetch(
                    `https://dev.to/api/articles?username=${personalData.devUsername}`
                );

                if (!res.ok) {
                    throw new Error("Failed to fetch data");
                }

                const data = await res.json();

                const filtered = data
                    .filter((item) => item?.cover_image)
                    .sort(() => Math.random() - 0.5);

                setBlogs(filtered);
            } catch (error) {
                console.error("Error fetching blog data:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    return (
        <>
            <HeroSection />
            <AboutSection />
            <Experience />
            <Skills />
            <Certifications />
            <Education />
            {loading ? <p>Loading blogs...</p> : <Blog blogs={blogs} />}
            <ContactSection />
        </>
    );
}
