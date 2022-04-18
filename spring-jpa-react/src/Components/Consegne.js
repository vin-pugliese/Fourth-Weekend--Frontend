import React, {useState, useEffect, createRef, useRef} from 'react'
import axios from 'axios' 

export const DeliveryRepository= () => {

  // State for GET
  const [deliveries, setDelivery] = useState([]);

  // State for POST
  const [id, setId] = useState('');
  const [indirizzo, setIndirizzo] = useState('');

  const [changed, setChanged] = useState(false);


  let [idDel, setIdDel] = useState('');
  

  /* GET */
  React.useEffect( () => {
      fetch('http://localhost:8080/weekend/consegna/v1/')
      .then(response => {
        if(response.ok) {
          return response.json();
        }
        throw response;
      })
      .then(data => {
        setDelivery(data)
      })
      .catch(error => {
        console.error("Errore durante il FETCH")
      })  
  }, []);

  
  /* POST */
  const handleChangeId = event => {
    setId(event.target.value);
  }
  const handleChangeIndirizzo = event => {
    setIndirizzo(event.target.value);
  }
  

  const HandleSubmit = event => {
    event.preventDefault();

    const delivery = {
      id : id,
      indirizzo: indirizzo,
    };

    axios.post(`http://localhost:8080/weekend/consegna/v1`, { id: delivery.id, indirizzo: delivery.indirizzo })
      .then(() => {
        deliveries.push(delivery);
        setDelivery(deliveries);
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
    axios.delete("http://localhost:8080/weekend/consegna/v1/"+id1).then(() => {
      for(let i=0; i<deliveries.length; i++) {
        if(deliveries[i].id === id1) {
          deliveries.splice(i, 1);
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
          <h2 className='form-title'>Inserisci una nuova consegna</h2>
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
            <label className='form-label'>Indirizzo</label>
            <input
                className='form-input'
                name="indirizzo"
                type="text"
                onChange={handleChangeIndirizzo}
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

          {deliveries.length > 0 && deliveries.map(delivery =>
              <div key={delivery.id} className="father">
                  <div className='child'>ID: {delivery.id}</div>
                  <div className='child'>Indirizzo: {delivery.indirizzo}</div>
              </div>
          )}
      </div>
  );
}

 


