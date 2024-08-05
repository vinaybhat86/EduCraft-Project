
"use client"
import { Button } from '@/components/ui/button'
import { UserButton, useUser } from '@clerk/nextjs'
import { AlignJustify, BellDot, Search } from 'lucide-react'
import Link from 'next/link'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

const Header = () => {
  const { isLoaded, user } = useUser(); 
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState(''); // Add state for search term
  const router = useRouter(); // useRouter to navigate programmatically

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/courses?search=${searchTerm}`);
    }
  };

  return (
    <div className='p-4 bg-white flex justify-between relative'>
      <div className='block mt-2 sm:hidden' onClick={toggleMenu}>
        <AlignJustify/>
      </div>
      
      <form onSubmit={handleSearch} className='flex gap-2 border p-2 rounded-md'>
        <Search className='h-5 w-5'/>
        <input 
          type="text" 
          placeholder='Search' 
          className='outline-none' 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </form>

      <div className='flex items-center gap-4'>
        <BellDot className='text-gray-500'/>
        {isLoaded && user ? (
          <UserButton/>
        ) : (
          <Link href={'/sign-in'}>
            <Button>Get Started</Button>
          </Link>
        )}
      </div>

      <div className={`fixed top-16 left-0 w-60 h-full bg-white font-semibold shadow-md z-10 transform transition-transform duration-300 ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <ul className='flex flex-col p-9 gap-5'>
          <li><Link href='/dashboard' onClick={closeMenu}>Dashboard</Link></li>
          <li><Link href='/courses' onClick={closeMenu}>All Courses</Link></li>
          <li><Link href='/membership' onClick={closeMenu}>Membership</Link></li>
          <li><Link href='/instructor' onClick={closeMenu}>Be Instructor</Link></li>
          <li><Link href='/reviews' onClick={closeMenu}>Reviews</Link></li>
          <li><Link href='/newsletter' onClick={closeMenu}>Newsletter</Link></li>
        </ul>
      </div>
    </div>
  );
};

export default Header;


