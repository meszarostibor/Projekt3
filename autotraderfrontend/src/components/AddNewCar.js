import React, { useState, useEffect } from 'react'
import UpdateCar from './UpdateCar'

export default function AddNewCar(props)
{
  const [carData, setCardata] = useState(
    {
      brand: "",
      type: "",
      color: "",
      myear: ""
    })

  useEffect(() =>
  {
    if (props.carObj)
    {
      setCardata({
        brand: props.carObj.brand || '',
        type: props.carObj.type || '',
        color: props.carObj.color || '',
        myear: props.carObj.myear
          ? new Date(new Date(props.carObj.myear).getTime() - new Date().getTimezoneOffset() * 60000)
            .toISOString()
            .split('T')[0]
          : ''
      });
    }
  }, [props.carObj]); // Ha a `props.carObjData` változik, frissítjük az űrlapot


  const handleChange = (event) =>
    {
      const { name, value } = event.target
      setCardata({ ...carData, [name]: value })
    }

const handleSubmit = async (event) => {
  const url = `http://localhost:5081/cars`
  event.preventDefault()
  const request = await fetch(url, {
    method: "POST",
    body: JSON.stringify(carData),
    headers: {
      "Content-Type": "application/json"
      //,
      //"Authorize": jwtDecode(localStorage.getItem("token"))
    }
  })
  if (!request.ok) {
    console.log("error")
    return
  }

  const response = await request.json()
  props.handleCount()
  console.log(response.message)
}

return (
  <div>
    <form onSubmit={handleSubmit}>
      <label>Márka</label>
      <input
        type="text"
        id='brand'
        name="brand"
        value={carData.brand}
        onChange={handleChange}
        className='form-control'
        placeholder='Autó márkája'
      />
      <label>Típus</label>
      <input
        type="text"
        id='type'
        name="type"
        value={carData.type}
        onChange={handleChange}
        className='form-control'
        placeholder='Autó típusa'
      />
      <label>Szín</label>
      <input
        type="text"
        id='color'
        name="color"
        value={carData.color}
        onChange={handleChange}
        className='form-control'
        placeholder='Autó színe'
      />
      <label>Gyártási év</label>
      <input
        type="date"
        id='myear'
        name="myear"
        value={carData.myear}
        onChange={handleChange}
        className='form-control'
        placeholder='Autó gyártási éve-hónap-nap'
      />
        <button type='submit' className='btn btn-primary'>Elküld</button>
        <UpdateCar carData={carData} carId={props.carObj.id} handleCount={props.handleCount} />
    </form>
  </div>
)
}
