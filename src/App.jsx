import { useCallback, useEffect, useState } from 'react'
import './App.css'
import { LazyLoadImage } from 'react-lazy-load-image-component'

function App() {
  const [products , setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const cachedFunction = useCallback( 
    async () => {

      const response = await fetch('https://dummyjson.com/products')
      const data = await response.json()
      console.log(data)
      if(data && data.products){
        setProducts(data.products)
      }
  }
    , [products])
const totalPages = Math.ceil(products.length / 10)

useEffect(() => {
  cachedFunction()
},[])
  return (
    <main className='container my-5 '>
        <h1 className='text-center mb-3'>Pagination Example in React</h1>
        <div className="row px-5 ">
          {
          products && products.slice(page*10 -10 , page*10 ).map((product) => (
              <div key={product.id} className="col-lg-4 col-md-4 col-xs-12">
                  <div  className='card text-center shadow-sm '>
                    <LazyLoadImage src={product.images?.[0]} alt="" className="product-img " />
                    <h3>{product.title}</h3>
                    <p>{product.description}</p>
                  </div>
              </div>
            ))
          } 
        </div>
        <div className='d-flex justify-content-center'>
        { page===1 ? null :  <span className='btn btn-primary' onClick={() => setPage(page - 1)}>prev</span>}
          {[...Array(products.length/10)].map((_,i)=>(
            <span className={'mx-2 btn btn-light' + (i+1 === page ? ' active' : '')} onClick={() => setPage(i+1)}>{i+1}</span>
            ))}
            { page === totalPages ? null :
          <span className={'btn btn-primary mx-3'}  onClick={() => setPage(page + 1)}>Next</span>
}
          </div>
    </main>
  )
}

export default App
