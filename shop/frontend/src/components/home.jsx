import React, { useState, useEffect } from "react";

function Home() {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:8000/");
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <div>
        <input
          placeholder="Search your product"
          value={searchQuery}
          onChange={handleSearchInputChange}
        />
        <button className="border font-normal bg-slate-400 rounded-lg px-2 py-1 ml-5">Search</button>
      </div>
      <div>
        <div className="flex flex-wrap items-center justify-center gap-10 backb">
          {filteredProducts.map((item) => (
            <div
              key={item.id}
              className="flex flex-col h-100 w-40 flex-nowrap border rounded-lg"
            >
              <img
                className="h-40 w-40 my-2 hover:scale-105"
                src={item.image}
                alt="img"
              />
              <p className="text-sm font-sans font-bold text-center">
                {item.title.slice(0, 30)}
              </p>
              <div className="flex flex-row justify-around">
                <p className="text-xs">Rating: {item.rating.rate}</p>
                <p className="text-xs">Count: {item.rating.count}</p>
              </div>
              <div className="flex flex-row justify-around my-2">
                <p className="text-sm font-sans">₹ {item.price * 100}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
