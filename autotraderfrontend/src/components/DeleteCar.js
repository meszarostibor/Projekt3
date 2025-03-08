import React from "react";

export default function DeleteCar(props)
{

    const handleCarId = async () =>
        {
            const url = `http://localhost:5081/Cars/CarById?id=${props.carId}`
    
            const request = await fetch(url, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
    
            if (!request.ok)
            {
                console.log("Hiba")
                return
            }
    
            const response = await request.json()
            props.handleCount()
            console.log(response.message)
        }

        return (
            <div><button className='btn btn-danger' onClick={handleCarId}>Töröl</button></div>
        )

    }        