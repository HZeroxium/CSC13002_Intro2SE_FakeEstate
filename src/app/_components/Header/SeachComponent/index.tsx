// #include from "./FakeEstate/node_modules/@types/..."
import React from 'react'

// #include from "./FakeEstate/node_modules/..."
import Image from 'next/image'

const SearchComponent = () => {
  return (
    <form action="" id="search-box">
      <input type="text" id='search-text' />
      <button id='search-btn'>
        <Image src="/assets/icons/magnifying-glass-solid.svg" alt="search-btn" width={24} height={24} />
      </button>
    </form>
  )
}

export default SearchComponent