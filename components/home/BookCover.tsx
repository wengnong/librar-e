"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { IKImage } from "imagekitio-next";
import config from "@/lib/config";

interface Props {
    className?: string;
    coverImage: string;
}

const BookCover = ({
    className,
    coverImage = "https://placehold.co/400x600.png",
}: Props) => {
    return (
        <div
            className={cn(
                "relative transition-all duration-300",
                className,
            )}
        >
            <div
                className="absolute z-10"
                style={{ width: "100%", height: "100%" }}
            >
                <IKImage
                    path={coverImage}
                    urlEndpoint={config.env.imagekit.urlEndpoint}
                    alt="Book cover"
                    fill
                    className="rounded-sm object-fill"
                    loading="lazy"
                    lqip={{ active: true }}
                />
            </div>
        </div>
    );
};
export default BookCover;