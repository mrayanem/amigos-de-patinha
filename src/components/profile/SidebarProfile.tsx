'use client'

import { usePathname, useRouter } from 'next/navigation'
import { Button } from '../ui/button'
import { FaPaw, FaUserFriends } from 'react-icons/fa'
import React from 'react'

export function NavProfile() {
  const pathname = usePathname()
  const router = useRouter()

  const iconMap = [
    {
      icon: <FaUserFriends size={18} className="text-[#01377D]" />, // Aumentando o ícone com Tailwind
      url: '/profile',
    },
    {
      icon: <FaPaw size={18} className="text-[#01377D]" />, // Aumentando o ícone com Tailwind
      url: '/animalsProfile',
    },
  ]

  const handleNavigation = (url: string) => {
    router.push(url)
  }

  return (
    <aside className="bg-sidebar-texture flex flex-col gap-6 bg-transparent px-3 py-[8px] shadow-xl">
      <div className="w-full">
        <nav className="flex flex-col items-center justify-center pt-10">
          <div className="flex w-full flex-col items-center justify-center">
            {iconMap.map((link, index) => (
              <Button
                key={'link_' + index}
                className={`flex h-auto w-full items-center justify-center bg-transparent pb-5 text-lg font-medium ${
                  pathname === link.url
                    ? 'bg-transparent font-semibold text-white hover:shadow-md'
                    : 'text-[#A5B0D0] hover:shadow-md'
                }`}
                onClick={() => handleNavigation(link.url)}
              >
                {link.icon}
              </Button>
            ))}
          </div>
        </nav>
      </div>
    </aside>
  )
}
