"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { IKImage } from "imagekitio-next";
import config from "@/lib/config";

interface Props {
    className?: string;
    coverImage: string;
}

const FeaturedBookCover = ({
    className,
    coverImage = "https://placehold.co/400x600.png",
}: Props) => {
    return (
        <div
            className={cn(
                "relative w-full aspect-[2/3]",
                className,
            )}
        >
            <IKImage
                path={coverImage}
                urlEndpoint={config.env.imagekit.urlEndpoint}
                alt="Featured Book Cover"
                fill
                className="rounded-[10px] object-cover shadow-lg"
                loading="lazy"
                lqip={{ active: true }}
            />
        </div>
    );
};

export default FeaturedBookCover;