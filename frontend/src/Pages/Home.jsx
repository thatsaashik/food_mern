import React, { useEffect, useState } from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import Card from "../Components/Card";


export const Home = () => {
  const [search,setSearch] = useState('')
  const [foodItem, setFoodItem] = useState([]);
  const [foodCat, setFoodCat] = useState([]);

  const loadData = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/foodData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      if (Array.isArray(data)) {
        setFoodItem(data[0]);
        setFoodCat(data[1]);
      } else {
        console.error("Unexpected response format:", data);
      }
    } catch (error) {
      console.error("Error fetching food data:", error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // crousal code
  const [activeIndex, setActiveIndex] = useState(0);
  const [brightness, setBrightness] = useState(0.7);

  const images = [
    "https://plus.unsplash.com/premium_photo-1670601440146-3b33dfcd7e17?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGZvb2R8ZW58MHx8MHx8fDA%3D",
    "https://images.indianexpress.com/2024/03/processed-food.jpg",
    "https://images.unsplash.com/photo-1484980972926-edee96e0960d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGZvb2R8ZW58MHx8MHx8fDA%3D",
    "https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Zm9vZHxlbnwwfHwwfHx8MA%3D%3D",
    "data:image/jpeg;base64,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",
  ];

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000); 

    const brightnessInterval = setInterval(() => {
      setBrightness((prevBrightness) =>
        prevBrightness > 0.5 ? prevBrightness - 0.1 : 1
      );
    }, 4000); 

    return () => {
      clearInterval(slideInterval);
      clearInterval(brightnessInterval);
    };
  }, [images.length]);

  const nextSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % images.length);
    setBrightness(1); // Reset brightness when manually changing the slide
  };

  const prevSlide = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
    setBrightness(); // Reset brightness when manually changing the slide
  };

  return (
    <div className="min-h-screen">
      <Header />
      


      {/* // carousel code */}
      <div className="flex flex-col md:flex-row items-center justify-between bg-gradient-to-r from-orange-500 via-orange-300 to-white min-h-screen p-5 md:p-10 rounded-lg shadow-lg">
  {/* Left Section: Text Content */}
  <div className="w-full md:w-1/2 flex flex-col items-start text-center md:text-left mb-10 md:mb-0">
    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-4">
      Enjoy Our <span className="text-orange-600">Delicious Meal</span>
    </h1>
    <p className="text-base sm:text-lg md:text-xl text-gray-700 mb-6">
      Interdum et malesuada fames ac ante ipsum primis in faucibus. Proin ac rutrum neque, vel congue tellus duis venenatis nisi ligula varius.
    </p>
    <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
      <button className="px-6 py-2 w-full md:w-auto text-white bg-orange-600 hover:bg-orange-700 rounded-lg shadow">
        Find Restaurant
      </button>
    </div>
  </div>

  {/* Right Section: Carousel */}
  <div className="w-full md:w-1/2 flex justify-center items-center mt-5 md:mt-0">
    <div
      id="default-carousel"
      className="relative w-full sm:w-[80%] md:w-[29.36rem] h-[250px] sm:h-[300px] md:h-[29.36rem] rounded-full overflow-hidden shadow-lg"
    >
      {/* Carousel Images */}
      <div className="relative h-full">
        {images.map((image, index) => (
          <div
            key={index}
            className={`transition-opacity duration-700 ease-in-out ${
              index === activeIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={image}
              className="absolute w-full h-full object-cover"
              alt={`Slide ${index + 1}`}
              style={{
                filter: `brightness(${index === activeIndex ? brightness : 0.8})`,
              }}
            />
          </div>
        ))}
      </div>

      {/* Carousel Dots */}
      <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex space-x-3">
        {images.map((_, index) => (
          <button
            key={index}
            type="button"
            className={`w-3 h-3 rounded-full ${
              index === activeIndex ? "bg-orange-600" : "bg-gray-300"
            }`}
            onClick={() => {
              setActiveIndex(index);
              setBrightness(1); // Reset brightness
            }}
            aria-label={`Slide ${index + 1}`}
          ></button>
        ))}
      </div>

      {/* Previous Button */}
      <button
        type="button"
        className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-gray-800/50 hover:bg-gray-800 text-white p-2 rounded-full"
        onClick={prevSlide}
      >
        <span className="sr-only">Previous</span>
        &lt;
      </button>

      {/* Next Button */}
      <button
        type="button"
        className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-gray-800/50 hover:bg-gray-800 text-white p-2 rounded-full"
        onClick={nextSlide}
      >
        <span className="sr-only">Next</span>
        &gt;
      </button>
    </div>
  </div>
</div>


      {/* // card  code */}
      <div className="max-w-7xl mx-auto p-4">
        {foodCat.length > 0 ? (
          foodCat.map((category, index) => (
            <div key={index} className="mb-12">
              <h2 className="text-2xl font-bold mb-4 mt-2  px-7">
                {category.CategoryName}
                <hr className="mt-2 bg-slate-800" />
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 px-4 sm:px-6 lg:px-8">
                {foodItem
                  .filter((item) =>( item.CategoryName === category.CategoryName)&& (item.name.toLowerCase().includes(search.toLocaleLowerCase())))
                  .map((filteredItem, itemIndex) => (
                    <Card
                      key={itemIndex}
                      foodItem = {filteredItem}
                      options={filteredItem.options[0]}
                    />
                  ))}
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">No categories found</p>
        )}
      </div>

    </div>
  );
};
