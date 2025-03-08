import React from 'react'

export default function UpdateCar(props) {

  const handleCarData = async (event) => {
    const url = `http://localhost:5081/Cars/CarById?id=${props.carId}`
    const request = fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(props.carData)
    })
    if (!request.ok) {
      console.log("error");
      return
    }
    var response = await request.json();
    props.handleCount=props.handleCount();
    console.log(response.message)
  }

  return (
    <>
    <button type="button" onClick={handleCarData} className='btn btn-warning'>Módosít</button> 
    </>
  )
}
