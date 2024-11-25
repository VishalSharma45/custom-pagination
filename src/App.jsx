import { useEffect, useState } from 'react'
import './App.css'

function App() {

  const [items, setItems] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [wholeData, setWholeData] = useState([]);
  const limit = 10;

  const fetchData = async () => {
    const response = await fetch("https://dummyjson.com/products?limit=100");
    const data = await response.json();
    const { products } = data;

    setWholeData(products);
    setTotalPages(Math.ceil(products.length / limit));
    setItems(products.slice(0, limit));
  }

  useEffect(() => {
    fetchData();
  }, [])

  const handleClickPage = (index) => {
    setItems(wholeData.slice(index * limit, index * limit + limit));
    setCurrentPage(index);
  }

  const handlePrev = () => {
    if (currentPage < 1) return;
    setCurrentPage(prev => prev - 1);
  }

  const handleNext = () => {
    if (currentPage > totalPages - 1) return;
    console.log("clicked")
    setCurrentPage(prev => prev + 1);
  }

  useEffect(() => {
    setItems(wholeData.slice(currentPage * limit, currentPage * limit + limit));
  }, [currentPage]);

  return (
    <main>
      <h1>Products</h1>
      <div className="cardWrapper">
        {items.length > 0 && items.map((item) => (
          <div key={item.id} className="card">
            <div className="card-info">
              <p>{item.id}</p>
              <p className="title">{item.title}</p>
              <img
                src={item.thumbnail}
                alt=""
                className="cardImage"
              />
            </div>
          </div>
        ))}
      </div>
      <div className="btnWrapper">
        <button
          onClick={() => handlePrev()}
          disabled={currentPage <= 0 ? true : false}
          className={currentPage <= 0 ? "disableBtn" : ""}
        >
          Prev
        </button>
        {
          Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              className={currentPage === i ? "currentPage" : ""}
              onClick={() => handleClickPage(i)}
            >
              {i + 1}
            </button>
          ))
        }
        <button
          disabled={currentPage >= totalPages - 1 ? true : false}
          onClick={() => handleNext()}
          // className={currentPage >= totalPages - 1 ? "disableBtn" : ""}
        >
          Next
        </button>
      </div>
    </main>
  )
}

export default App
