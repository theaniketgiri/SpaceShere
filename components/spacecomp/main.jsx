'use client';

import React from 'react';
import { useState, useEffect } from 'react';
import { Heart, MapPin, Star, Users, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { fetchListings } from "@/app/actions/dashboard/action";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import dynamic from 'next/dynamic';

const DynamicMap = dynamic(() => import('./Map'), {
    ssr: false
});

function Main() {
    const [searchAsMove, setSearchAsMove] = useState(true);
    const [showMap, setShowMap] = useState(true);
    const [listings, setListings] = useState([]);
    const [index, setIndex] = useState(0);

    // Fetch listings from backend
    useEffect(() => {
        async function loadListings() {
            const data = await fetchListings();
            setListings(data);
            console.log(data);
        }
        loadListings();
    }, []);

    const toggleMapVisibility = () => {
        setShowMap(!showMap);
    };
    function handleClick(event: React.MouseEvent<HTMLElement, MouseEvent>) {
        event.preventDefault();
    }

    // For form submissions
    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
    }
    return (
        <div className="w-full mt-40">
            <div className={showMap ? 'grid lg:grid-cols-[2fr_1fr] gap-4' : ''}>
                {/* Left Side - Listings */}
                <div className={`grid gap-6 mx-5 my-5 ${showMap ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'}`}>
                    {listings?.map((listing) => (
                        <div
                            key={listing.id}
                            className="group relative cursor-pointer"
                            onClick={() => window.location.href = `/spaces/${listing.id}`}
                        >
                            <div className="group relative">
                                <div className="aspect-square overflow-hidden rounded-xl">
                                    <img
                                        src={listing.photos && listing.photos.length > 0
                                            ? listing.photos[index]
                                            : "https://via.placeholder.com/400x400?text=No+Image"}
                                        alt={listing?.name || "Space"}
                                        className="h-full w-full object-cover transition-transform group-hover:scale-105"
                                    />
                                    <Button
                                        variant="ghost"
                                        className="absolute right-4 top-4 backdrop-blur-sm"
                                    >
                                        <Heart className="h-5 w-5" />
                                    </Button>

                                    <div className="absolute left-3 top-48 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100">
                                        <Button
                                            size="sm"
                                            variant="secondary"
                                            className="h-8 w-8 rounded-full p-0 shadow-md"
                                            onClick={(e) => handlePrevPhoto(e)}
                                        >
                                            <ChevronLeft className="h-5 w-5" />
                                        </Button>
                                    </div>

                                    <div className="absolute right-3 top-48 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100">
                                        <Button
                                            size="sm"
                                            variant="secondary"
                                            className="h-8 w-8 rounded-full p-0 shadow-md"
                                            onClick={(e) => handleNextPhoto(e)}
                                        >
                                            <ChevronRight className="h-5 w-5" />
                                        </Button>
                                    </div>
                                </div>
                                <div className="mt-2">
                                    <div className="flex items-center justify-between">
                                        <h3 className="font-semibold">{listing.name}</h3>
                                    </div>
                                    <p className="text-muted-foreground">{listing.address}, {listing.city}, {listing.state}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                {/* {showMap && (
          <div className="hidden lg:block sticky top-[4.5rem] h-[calc(100vh-4.5rem)]">
            <div className="h-full rounded-lg border bg-card p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  <span className="font-medium">Map View</span>
                </div>
                <Button variant="ghost" size="sm" onClick={() => setSearchAsMove(!searchAsMove)}>
                  {searchAsMove ? "Search as map moves" : "Search this area"}
                </Button>
              </div>
              <div>
                <DynamicMap listings={listings} />
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="absolute top-4 right-4"
                onClick={toggleMapVisibility}
              >
                <X className="h-5 w-5 text-red-500" />
              </Button>
            </div>
          </div>
        )}

        {!showMap && (
          <Button
            variant="outline"
            onClick={toggleMapVisibility}
            className="fixed top-[200px] right-4 z-10 flex items-center gap-2"
          >
            <MapPin className="h-5 w-5" />
            <span>Show Map</span>
          </Button>
        )}*/}
            </div>
        </div>
    );
}

export default Main;
