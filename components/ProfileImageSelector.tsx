'use client';

import React, { useEffect, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getInitials } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ProfileImageSelectorProps {
  userName: string;
  onImageSelect?: (imageSrc: string) => Promise<void>;
}

const ProfileImageSelector: React.FC<ProfileImageSelectorProps> = ({
  userName,
  onImageSelect
}) => {
  const localStorageKey = `profile-image-${userName}`;
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const profileImages = [
    { id: 1, src: "images/profile/notSmoothOp.webp", name: "" },
    { id: 2, src: "images/profile/mefr.webp", name: "" },
    { id: 3, src: "images/profile/magsvestpen.webp", name: "" },
    { id: 4, src: "images/profile/WiyumsCarlost.webp", name: "" },
    { id: 5, src: "images/profile/MessiAgain.webp", name: "" },
  ];

  useEffect(() => {
    const savedImage = localStorage.getItem(localStorageKey);
    if (savedImage !== null) {
      setSelectedImage(savedImage);
    }
  }, [localStorageKey]);

  const handleImageSelect = async (imageSrc: string) => {
    setSelectedImage(imageSrc);
    localStorage.setItem(localStorageKey, imageSrc);
    if (onImageSelect) {
      await onImageSelect(imageSrc);
    }
  };

  return (
    <div className='flex justify-center'>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className='cursor-pointer'>
            <Avatar className='size-20 mx-auto hover:ring-2 hover:ring-[#0A2647] transition-all'>
              {selectedImage ? (
                <AvatarImage src={selectedImage} alt='Profile' />
              ) : (
                <AvatarFallback className='bg-gray-500 text-white text-3xl flex items-center justify-center rounded-full leading-none'>
                  {getInitials(userName || 'IN')}
                </AvatarFallback>
              )}
            </Avatar>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-fit bg-[#EAB139] border-gray-200 shadow-lg p-4">
          <DropdownMenuLabel className="text-xl text-gray-700 mb-2 passion-one-regular pointer-events-none">Choose Profile Image</DropdownMenuLabel>
          <div className="grid grid-cols-3 gap-4">
            {profileImages.map((image) => (
              <div 
                key={image.id}
                className="flex flex-col items-center cursor-pointer hover:scale-105 transition-transform"
                onClick={() => handleImageSelect(image.src)}
              >
                <Avatar className="size-14">
                  <AvatarImage src={image.src} alt={image.name} />
                  <AvatarFallback className='bg-[#EAB139] text-white text-xs'>
                    {image.id}
                  </AvatarFallback>
                </Avatar>
                <span className="text-xs text-gray-800 mt-1">{image.name}</span>
              </div>
            ))}
            {/* Reset Option */}
            <div 
              className="flex flex-col items-center cursor-pointer hover:scale-105 transition-transform"
              onClick={() => handleImageSelect('')}
            >
              <Avatar className="size-14">
                <AvatarFallback className="bg-gray-500 text-white text-xs">
                  {getInitials(userName || 'IN')}
                </AvatarFallback>
              </Avatar>
              <span className="text-xs text-gray-800 mt-1">Use Initials</span>
            </div>
          </div>
      </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default ProfileImageSelector;
