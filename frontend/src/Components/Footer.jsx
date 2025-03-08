import React from 'react'


const Footer = () => {
  return (
    <div>
      <footer className="bg-black-400 rounded-lg shadow absolute bottom-0 w-full">
        <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
          <hr className=" border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
          <span className="block text-xl font-bold   sm:text-center dark:text-gray-400">
            © 2024  Full Stack Project . All Rights Reserved.
          </span>
        </div>
      </footer>
    </div>
  )
}

export default Footer
