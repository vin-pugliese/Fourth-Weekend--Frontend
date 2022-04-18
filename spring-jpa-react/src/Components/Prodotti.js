import React, {useState, useEffect, createRef, useRef} from 'react'
import axios from 'axios' 

export const ProductRepository= () => {

  // State for GET
  const [products, setProducts] = useState([]);

  // State for POST
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [changed, setChanged] = useState(false);

  let [idDel, setIdDel] = useState('');
  

  /* GET */
  React.useEffect( () => {
      fetch('http://localhost:8080/weekend/prodotto/v1')
      .then(response => {
        if(response.ok) {
          return response.json();
        }
        throw response;
      })
      .then(data => {
        setProducts(data)
      })
      .catch(error => {
        console.error("Errore durante il FETCH")
      })  
  }, []);

  
  /* POST */
  const handleChangeId = event => {
    setId(event.target.value);
  }
  const handleChangeName = event => {
    setName(event.target.value);
  }
  const handleChangeQuantity = event => {
    setQuantity(event.target.value);
  }

  const HandleSubmit = event => {
    event.preventDefault();

    const product = {
      id : id,
      name: name,
      quantity: quantity
    };

    axios.post(`http://localhost:8080/weekend/prodotto/v1`, { id: product.id, name: product.name, quantity: product.quantity })
      .then(() => {
        products.push(product);
        setProducts(products);
        setChanged(true); 
      })
      setChanged(false)
  }// Fine handleSubmit for POST



  /* DELETE */
  const handleChangeIdDel = event => {
    setIdDel(event.target.value);
    idDel = React.createRef();
  }

  const handleDeleteSubmit = (e) => {
    e.preventDefault();
    const id1 = idDel;
    console.log(id1);
    axios.delete("http://localhost:8080/weekend/prodotto/v1/"+id1).then(() => {
      for(let i=0; i<products.length; i++) {
        if(products[i].id === id1) {
          products.splice(i, 1);
        }
      }
      setChanged(true);
    });
    setChanged(false);
  }


  return(
      <div>
        <form  className='post-form' onSubmit={HandleSubmit}>
        <div className='form-child'>
          <h2 className='form-title'>Inserisci un nuovo prodotto</h2>
        </div>
          <div className='form-child'>
            <label className='form-label'>ID</label>
              <input
                className='form-input'
                name="id"
                type="text"
                onChange={handleChangeId}
              />
          </div>
          <div className='form-child'>
            <label className='form-label'>Name</label>
            <input
                className='form-input'
                name="name"
                type="text"
                onChange={handleChangeName}
              />
          </div>
          <div className='form-child'>
            <label className='form-label'>Quantity</label>
              <input
                className='form-input'
                name="quantity"
                type="number"
                onChange={handleChangeQuantity}
              />
          </div>
          <div className='form-child'>
            <input className='post-button' type="submit" value="Submit" />
          </div>
        </form>
        
        <form className='form-delete' onSubmit={handleDeleteSubmit}>
          <div className='delete-child'>
            <h2 className='form-title'>Cancella un prodotto</h2>
          </div>
          <div className='delete-child'>
            <label className='delete-label'>ID</label>
            <input placeholder='ID da cancellare...' className='delete-input' type="text" name="nome" onChange={handleChangeIdDel}  ref={useRef(idDel)}/>
          </div>
          <div className='delete-child'>
            <input className='post-button' type="submit" value="Cancella" />
          </div>
        </form>
        
          {products.length > 0 && products.map(product =>
              <div key={product.id} className="father">
                  <div className='child'>ID: {product.id}</div>
                  <div className='child'>Name: {product.name}</div>
                  <div className='child'>Quantity: {product.quantity}</div>
              </div>
          )}
      </div>
  );
}

