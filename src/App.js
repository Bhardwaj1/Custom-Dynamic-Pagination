import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [products, setProducts] = useState([]);
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(2);
  const [page, setPage] = useState(1);
  const [bg,setbg]=useState('red');
  console.log({ products });

  // Api call
  const getUser = async () => {
    const url = `https://dummyjson.com/products`;
    let response = null;
    await axios
      .get(url)
      .then((res) => {
        response = res;
        console.log(response?.data?.products);
        setProducts(response?.data?.products);
      })
      .catch((err) => {
        response = err;
      });
    return response;
  };
  // function call of api integration
  useEffect(() => {
    getUser();
  }, []);

  const previousPage = () => {
    if (start >= 0) {
      setStart(start - 2);
      setEnd(end - 2);
      setPage(page - 1);
    }
  };
  const nextPage = () => {
    if (start < products.length) {
      setStart(start + 2);
      setEnd(end + 2);
      setPage(page + 1);
    } else {
      return;
    }
  };
  const gotoPage = (pageNo) => {
    console.log({ pageNo });
    setStart(pageNo * 2);
    setEnd((pageNo + 1) * 2);
    setPage(pageNo+1);

    setbg('blue');

  };

  return (
    <div className="App">
      <table style={{ width: 200 }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Username</th>
            <th>City</th>
          </tr>
        </thead>
        <tbody>
          {products.slice(start, end).map((item) => {
            return (
              <tr key={item.id}>
                <td>{item.brand}</td>
                <td>{item.category}</td>
                <td>{item.price}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div style={{ display: "flex" }}>
        <button
          style={{ width: 100}}
          onClick={previousPage}
          disabled={start <= 0}
        >
          Previous
        </button>
        {products.slice(0, products.length / 2).map((item) => {
          return (
            <button style={{ width: 50,backgroundColor:item.id===page&&"red"}} onClick={() => gotoPage(item.id - 1)}>
              {item.id}
            </button>
          );
        })}

        <button
          style={{ width: 100 }}
          onClick={nextPage}
          disabled={end >= products.length}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default App;
