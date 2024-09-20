'use client'

import { useAuth } from '@/contexts/AuthContext'
import { Edit, LogOut, User } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { WalletMultiButton } from './dynamic/WalletAdapters'
import { Button } from './ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'

const AppBar = () => {
  const { isLoggedIn } = useAuth()
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible((v) => !v)
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <header className='bg-gradient-to-br from-gray-900 to-gray-900 px-4 md:px-10 py-4'>
      <nav className='flex flex-1 items-center justify-between'>
        <Link href={'/hub'} className='flex items-center'>
          <img
            src="https://ucarecdn.com/74392932-2ff5-4237-a1fa-e0fd15725ecc/bark.svg"
            alt="BARK Protocol Logo"
            className='h-8 mr-2' // Adjust height and margin as needed
          />
          <p className='text-white font-inter font-bold'> {/* Added font-bold */}
            <span
              className={`${
                visible ? 'opacity-100' : 'opacity-0'
              } transition-opacity duration-300`}
            >
              BLINK
            </span>
          </p>
        </Link>

        <div className='flex items-center gap-3'>
          <WalletMultiButton style={{ background: '0 0% 9%' }} />

          {isLoggedIn && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className='bg-[#CBB5A7] gap-1 py-6'>
                  <User className='w-4 h-4' />{' '}
                  <span className='hidden md:block'>Account</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className='w-56'>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <Link href={'/profile'}>
                    <DropdownMenuItem>
                      <User className='mr-2 h-4 w-4' />
                      <span>Profile</span>
                    </DropdownMenuItem>
                  </Link>
                  <Link href={'/editor'}>
                    <DropdownMenuItem>
                      <Edit className='mr-2 h-4 w-4' />
                      <span>Create Blink</span>
                    </DropdownMenuItem>
                  </Link>
                  <DropdownMenuItem>
                    <LogOut className='mr-2 h-4 w-4' />
                    <span>Disconnect</span>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </nav>
    </header>
  )
}

export default AppBar
