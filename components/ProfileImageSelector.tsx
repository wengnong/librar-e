'use client';

import React, { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getInitials } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ProfileImageSelectorProps {
  currentImage: string;
  userName: string;
  onImageSelect: (imageSrc: string) => Promise<void>;
}

const ProfileImageSelector: React.FC<ProfileImageSelectorProps> = ({
  currentImage,
  userName,
  onImageSelect
}) => {
  const [selectedImage, setSelectedImage] = useState(currentImage);

  // Available profile images
  const profileImages = [
    { id: 1, src: "images/profile/Messi.webp", name: "Avatar 1" },
    { id: 2, src: "images/profile/mefr.webp", name: "Avatar 2" },
    { id: 3, src: "images/profile/magsvestpen.webp", name: "Avatar 3" },
    { id: 4, src: "images/profile/44.webp", name: "Avatar 4" },
    { id: 5, src: "images/profile/MessiAgain.webp", name: "Avatar 5" },
  ];

  const handleImageSelect = async (imageSrc: string) => {
    setSelectedImage(imageSrc);
    await onImageSelect(imageSrc);
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
        <DropdownMenuContent className="w-56 bg-[#EAB139] border-gray-200 shadow-lg">
          <DropdownMenuLabel className="text-gray-700">Choose Profile Image</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {profileImages.map((image) => (
            <DropdownMenuItem 
              key={image.id}
              className="flex items-center gap-3 cursor-pointer hover:bg-gray-50"
              onClick={() => handleImageSelect(image.src)}
            >
              <Avatar className='size-8'>
                <AvatarImage src={image.src} alt={image.name} />
                <AvatarFallback className='bg-[#EAB139] text-white text-xs'>
                  {image.id}
                </AvatarFallback>
              </Avatar>
              <span className="text-gray-700">{image.name}</span>
            </DropdownMenuItem>
          ))}
          <DropdownMenuSeparator />
          <DropdownMenuItem 
            className="flex items-center gap-3 cursor-pointer hover:bg-gray-50"
            onClick={() => handleImageSelect('')}
          >
            <Avatar className='size-8'>
              <AvatarFallback className='bg-gray-500 text-white text-xs'>
                {getInitials(userName || 'IN')}
              </AvatarFallback>
            </Avatar>
            <span className="text-gray-700">Use Initials</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default ProfileImageSelector;