'use client'

import { usePathname, useRouter } from 'next/navigation'
import { Button } from '../ui/button'
import { FaPaw, FaUserFriends } from 'react-icons/fa'
import React from 'react'
import { Settings } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import { api } from '@/client'
import { useSession } from 'next-auth/react'

const deleteUserData = async (userId: string) => {
  const response = await api.delete(`/user/${userId}`)
  return response.data
}

export function NavProfile() {
  const { data: session } = useSession()
  const userId = session?.user?.id

  const pathname = usePathname()
  const router = useRouter()

  const iconMap = [
    {
      icon: <FaUserFriends size={18} className="text-[#01377D]" />,
      url: '/profile',
    },
    {
      icon: <FaPaw size={18} className="text-[#01377D]" />,
      url: '/animalsProfile',
    },
  ]

  const handleNavigation = (url: string) => {
    router.push(url)
  }

  return (
    <aside className="bg-sidebar-texture flex h-screen w-full flex-col gap-6 bg-transparent px-3 py-[8px] shadow-xl">
      <div className="flex h-full w-full flex-col">
        <nav className="flex h-full flex-col justify-between">
          <div className="flex flex-col items-center justify-start gap-6">
            {iconMap.map((link, index) => (
              <Button
                key={'link_' + index}
                className={`flex h-auto w-full items-center justify-center self-center bg-transparent text-lg font-medium hover:bg-transparent hover:text-[#01377db7] hover:shadow-md ${
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

          <div className="mt-auto flex items-center justify-center">
            <div className="flex h-auto w-full items-center justify-center self-center bg-transparent pb-5 text-lg font-medium hover:bg-transparent">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="flex h-auto w-full items-center justify-center self-center bg-transparent pb-5 text-lg font-medium hover:bg-transparent hover:text-[#01377db7] hover:shadow-md">
                    <Settings size={18} className="text-[#01377D]" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>Opções</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={deleteUserData(userId)}>
                    Desativar conta
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </nav>
      </div>
    </aside>
  )
}
