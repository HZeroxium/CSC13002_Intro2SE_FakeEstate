import Image from 'next/image'
import React from 'react'
const SearchComponent = () => {
  return (
    <form action="" id="search-box">
        <input type="text" id='search-text'/>
        <button id='search-btn'>
            <Image src="/assets/icons/magnifying-glass-solid.svg" alt="search-btn" width={24} height={24}/>
        </button>
    </form>
  )
}

export default SearchComponent