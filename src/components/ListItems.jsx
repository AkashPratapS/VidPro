import React, { useEffect } from "react";

function ListItems() {
  const categories = [
    "All",
    "Music",
    "React routers",
    "Computer programming",
    "Reverberation",
    "Movie musicals",
    "India national cricket team",
    "News",
    "Mixes",
    "1990s",
    "Telugu cinema",
    "Live",
    "Dramedy",
    "Dubbing",
    "Indian soap opera",
    "Cricket",
    "Football",
    "Learn Coding",
  ];

  useEffect(() => {
    console.log("✅ ListItems is rendering");
  }, []);

  return (
    <div className="flex overflow-x-scroll hide-scroll-bar px-4 scrollbar-thin">
      <div className="flex space-x-4 flex-nowrap">
        {categories.map((category, index) => (
          <div
            key={index}
            className="mb-4 flex-none bg-gray-200 hover:bg-gray-300 duration-300 rounded-xl px-4 py-2 font-medium text-gray-700 cursor-pointer"
          >
            {category}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ListItems;
