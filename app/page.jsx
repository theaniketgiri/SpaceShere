"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Navbar from "@/components/navbar";
import { useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

// Define an array of hero images relevant to Indian spaces
const heroImages = [
  "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80", // Modern Indian office space
];

const activities = [
  {
    id: "photo-shoot",
    name: "Photo shoot",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGhvdG8lMjBzaG9vdHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    description: "Professional studios and unique backdrops for your photography needs",
  },
  {
    id: "meeting",
    name: "Meeting",
    image: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
    description: "Conference rooms and meeting spaces for your business gatherings",
  },
  {
    id: "birthday-party",
    name: "Birthday party",
    image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
    description: "Fun and festive venues to celebrate your special day",
  },
  {
    id: "video-shoot",
    name: "Video shoot",
    image: "https://images.unsplash.com/photo-1576155984015-9e7a7d92d3d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
    description: "Professional studios for your video production needs",
  },
  {
    id: "baby-shower",
    name: "Baby shower",
    image: "https://images.unsplash.com/photo-1581952976147-5a2d15560349?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
    description: "Cozy and elegant spaces to celebrate new arrivals",
  },
  {
    id: "workshop",
    name: "Workshop",
    image: "https://images.unsplash.com/photo-1544928147-79a2dbc1f389?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
    description: "Functional spaces for hands-on learning and creation",
  },
  {
    id: "wedding-reception",
    name: "Wedding reception",
    image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
    description: "Beautiful venues to celebrate your special day",
  },
  {
    id: "live-music",
    name: "Live music",
    image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
    description: "Venues with great acoustics for performances",
  },
  {
    id: "party",
    name: "Party",
    image: "https://images.unsplash.com/photo-1496337589254-7e19d01cec44?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
    description: "Exciting spaces for all your celebration needs",
  },
  {
    id: "music-video",
    name: "Music video",
    image: "https://images.unsplash.com/photo-1619983081263-8f16daa9214a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
    description: "Creative spaces for your music video production",
  },
  {
    id: "bridal-shower",
    name: "Bridal shower",
    image: "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
    description: "Elegant venues to celebrate the bride-to-be",
  },
  {
    id: "event",
    name: "Event",
    image: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
    description: "Versatile spaces for any type of event",
  },
  {
    id: "engagement-party",
    name: "Engagement party",
    image: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
    description: "Romantic settings to celebrate your engagement",
  },
  {
    id: "corporate-event",
    name: "Corporate event",
    image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
    description: "Professional venues for your business events",
  },
  {
    id: "graduation-party",
    name: "Graduation party",
    image: "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
    description: "Celebratory spaces for academic achievements",
  },
  {
    id: "pop-up",
    name: "Pop-up",
    image: "https://images.unsplash.com/photo-1563784462041-5f97ac9523dd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
    description: "Temporary spaces for retail and promotional events",
  },
  {
    id: "gala",
    name: "Gala",
    image: "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
    description: "Elegant venues for formal celebrations",
  },
  {
    id: "film-shoot",
    name: "Film shoot",
    image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
    description: "Professional settings for your film production",
  },
];

const randomHeroImage = heroImages[Math.floor(Math.random() * heroImages.length)];

export default function Home() {
  const heroRef = useRef(null);
  const featuredRef = useRef(null);
  const [headerSize] = useState(1.2);
  const [textSize] = useState(0.8);
  const [selectedActivity, setSelectedActivity] = useState(activities[0]);
  const [autoRotate, setAutoRotate] = useState(true);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const { scrollYProgress: featuredProgress } = useScroll({
    target: featuredRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const featuredY = useTransform(featuredProgress, [0, 1], [100, -100]);

  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
  }, []);

  useEffect(() => {
    if (!autoRotate) return;

    const interval = setInterval(() => {
      const currentIndex = activities.findIndex(
        (activity) => activity.id === selectedActivity.id
      );
      const nextIndex = (currentIndex + 1) % activities.length;
      setSelectedActivity(activities[nextIndex]);
    }, 1000);

    return () => clearInterval(interval);
  }, [selectedActivity, autoRotate]);

  // Pause auto-rotation when user interacts with the categories
  const handleActivityClick = (activity) => {
    setSelectedActivity(activity);
    setAutoRotate(false);

    // Resume auto-rotation after 2 seconds of inactivity
    const timer = setTimeout(() => {
      setAutoRotate(true);
    }, 2000);

    return () => clearTimeout(timer);
  };

  // Function to chunk activities for mobile layout
  const chunkActivities = (activities, size) => {
    const chunks = [];
    for (let i = 0; i < activities.length; i += size) {
      chunks.push(activities.slice(i, i + size));
    }
    return chunks;
  };

  const activityChunks = chunkActivities(activities, 4);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white">
      <Navbar />

      {/* Hero Section */}
      <section ref={heroRef} className="relative h-screen overflow-hidden">
        <motion.div style={{ y }} className="absolute inset-0">
          <Image
            src={randomHeroImage}
            alt="Premium Indian venue"
            fill
            className="object-cover"
            priority
          />
        </motion.div>
        <div className="absolute inset-0 bg-black/20 dark:bg-black/40" />

        <div className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 flex flex-col gap-2 z-20">
          {[1, 2, 3].map((_, i) => (
            <button
              key={i}
              className={`w-2 h-2 md:w-3 md:h-3 rounded-full ${
                i === 0 ? "bg-white" : "border border-white/50"
              }`}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 flex flex-col h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <div className="mt-auto mb-16 md:mb-32 max-w-full md:max-w-2xl">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-light mb-4 md:mb-6 text-white">
              Book Unique Spaces. Create Memories
              <span className="text-neutral-300">.</span>
            </h1>
            <p className="text-base md:text-lg text-white mb-6 md:mb-8 max-w-xl">
              India's premier marketplace for unique spaces. From rooftop venues
              to creative studios, find the perfect space for your next event or
              work session.
            </p>
            <Button
              variant="outline"
              className="rounded-none border-white text-white hover:bg-white hover:text-black"
            >
              Explore Spaces
            </Button>
          </div>
        </motion.div>
      </section>

      {/* Categories Section */}
      <section className="relative min-h-screen overflow-hidden bg-black text-white py-12 md:py-0">
        <main className="container mx-auto px-4 md:px-6 py-8 md:py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Left Column - Text and Categories */}
            <div className="space-y-6 md:space-y-8">
              <div className="space-y-3 md:space-y-4">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
                  A space for every moment
                </h2>
                <p className="text-lg md:text-xl">
                  Book a unique space for your{" "}
                  {selectedActivity.name.toLowerCase()}
                </p>
              </div>

              {/* Mobile view: Horizontal scrolling categories */}
              <div className="md:hidden overflow-x-auto pb-4">
                <div className="flex space-x-2 min-w-max">
                  {activities.map((activity) => (
                    <button
                      key={activity.id}
                      onClick={() => handleActivityClick(activity)}
                      className={cn(
                        "px-3 py-1 text-sm rounded-full whitespace-nowrap transition-colors",
                        selectedActivity.id === activity.id
                          ? "bg-white text-black"
                          : "bg-transparent text-white border border-white/30 hover:bg-gray-800"
                      )}
                    >
                      {activity.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Desktop view: Grid of categories */}
              <div className="hidden md:block">
                {activityChunks.map((chunk, index) => (
                  <div key={index} className="flex flex-wrap gap-3 mb-3">
                    {chunk.map((activity) => (
                      <button
                        key={activity.id}
                        onClick={() => handleActivityClick(activity)}
                        className={cn(
                          "px-4 py-2 rounded-full transition-colors",
                          selectedActivity.id === activity.id
                            ? "bg-white text-black"
                            : "bg-transparent text-white hover:bg-gray-800 border border-white/30"
                        )}
                      >
                        {activity.name}
                      </button>
                    ))}
                  </div>
                ))}
              </div>

              <button className="inline-block bg-black text-white border border-white px-4 py-2 md:px-6 md:py-3 font-medium">
                Browse all activities
              </button>
            </div>

            {/* Right Column - Image */}
            <div className="relative h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] w-full overflow-hidden rounded-lg">
              {activities.map((activity) => (
                <div
                  key={activity.id}
                  className={cn(
                    "absolute inset-0 transition-opacity duration-1000",
                    selectedActivity.id === activity.id
                      ? "opacity-100"
                      : "opacity-0 pointer-events-none"
                  )}
                >
                  <Image
                    src={activity.image || "/placeholder.svg"}
                    alt={`Space for ${activity.name}`}
                    fill
                    className="object-cover"
                    priority={selectedActivity.id === activity.id}
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 md:p-6">
                    <h3 className="text-lg md:text-xl font-bold">{activity.name}</h3>
                    <p className="text-xs md:text-sm text-gray-300">
                      {activity.description}
                    </p>
                  </div>
                </div>
              ))}

              {/* Auto-rotate indicator */}
              <div className="absolute top-4 right-4 bg-black/50 rounded-full px-2 py-1 text-xs">
                {autoRotate ? "Auto-rotating" : "Paused"}
              </div>

              {/* Manual controls */}
              <div className="absolute bottom-4 right-4 flex space-x-2">
                <button
                  onClick={() => setAutoRotate(!autoRotate)}
                  className="bg-white/20 hover:bg-white/40 rounded-full p-2 transition-colors"
                >
                  {autoRotate ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 md:h-5 md:w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 md:h-5 md:w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>
        </main>
      </section>

      {/* Host Section */}
      <section className="bg-black text-white py-12 md:py-16 lg:py-20">
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="relative aspect-[3/4] w-full max-h-[500px] order-2 md:order-1">
              <Image
                src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGhvdG8lMjBzaG9vdHxlbnwwfHwwfHx8MA%3D%3D"
                alt="Peerspace host in a vibrant pink room with a dining table"
                fill
                className="object-cover rounded-lg"
                priority
              />
            </div>

            {/* Right Column - Content */}
            <div className="space-y-4 md:space-y-6 order-1 md:order-2">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                Earn income as a SpaceShere host
              </h2>

              <p className="text-lg md:text-xl">Put your space to work.</p>

              <p className="text-base md:text-lg">
                Earn extra income by opening your doors to personal and
                professional gatherings in your area.
              </p>

              <div>
                <Link
                  href="/becomeHost"
                  className="inline-block px-4 py-2 md:px-6 md:py-3 bg-white text-black font-medium hover:bg-gray-100 transition-colors"
                >
                  List your space
                </Link>
              </div>
            </div>
          </div>
        </main>
      </section>

      <footer className="py-20 bg-black text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-4">
              <Image src="/poliform-logo.svg" alt="SpaceShere" width={150} height={50} className="mb-6 invert" />
              <p className="text-neutral-400 mb-6">
                Creating spaces of extraordinary sophistication through our curated collection of contemporary furniture
                and design pieces.
              </p>
              <div className="flex gap-4">
                {["Facebook", "Twitter", "Instagram", "LinkedIn"].map((social) => (
                  <a key={social} href="#" className="text-neutral-400 hover:text-white">
                    {social}
                  </a>
                ))}
              </div>
            </div>
            {footerLinks.map((column, index) => (
              <div key={index} className="col-span-2">
                <h3 className="text-lg font-semibold mb-4">{column.title}</h3>
                <ul className="space-y-2">
                  {column.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <a href="#" className="text-neutral-400 hover:text-white">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div className="col-span-4">
              <h3 className="text-lg font-semibold mb-4">Subscribe to Our Newsletter</h3>
              <form className="flex gap-2">
                <Input
                  type="email"
                  placeholder="Your email address"
                  className="bg-white/10 border-white/20 text-white placeholder-white/50"
                />
                <Button
                  type="submit"
                  variant="outline"
                  className="rounded-none border-white text-white hover:bg-white hover:text-black"
                >
                  Subscribe
                </Button>
              </form>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-white/10 text-center text-sm text-neutral-400">
            <p>© 2025 SpaceShere. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

const footerLinks = [
  {
    title: "Company",
    links: ["About Us", "Careers", "Contact Us", "Sustainability"],
  },
  {
    title: "Products",
    links: ["Living", "Bedroom", "Kitchen", "Outdoor"],
  },
  {
    title: "Resources",
    links: ["Blog", "FAQ", "Support", "Dealers"],
  },
]