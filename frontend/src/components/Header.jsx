import React, {useState} from 'react'

import Search from './Search'

const Header = ({searchTerm, setSearchTerm}) => {
  return (
    <header>
      <img src='hero.png' alt='Hero Banner'/>

      <h1 className=''>
        <span className='text-gradient'>Stream Movies</span> You <span className='text-red-500'>Love</span>
      </h1>

      <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
    </header>
  )
}

export default Header