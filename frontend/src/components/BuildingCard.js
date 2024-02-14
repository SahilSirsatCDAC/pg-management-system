import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import axios from '../api/axios';

export default function BuildingCard(props) {

    const [imageIds, setImageIds] = useState([]);
    const building = props.building;

    const getImageIds = async () => {
        const response = await axios.get(`/image/building/${building.id}`)
        return response.data
    }

    useEffect(() => {
        console.log(building);
        getImageIds().then((data) => {
            setImageIds(data);
        }).catch((e) => {
            console.log("error getting image ids");
            console.log(e);
        })
    }, [building]);

    return (
        <div style={{ "width": "18rem", "padding": "2px", "margin": "10px" }} >

            <div className="card" style={{ "width": "18rem"}}>
                {/* <div style={{"height":"30rem"}}> */}
                <img src={`http://localhost:8080/image/id/${imageIds[imageIds.length-1]}`} style={{"height":"15rem","aspectRatio":"auto"}} className="card-img-top" alt="No image" />
                
                
                {/* </div> */}
                <div className="card-body">
                    {/* <h5 className="card-title">Card title</h5>
                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <a href="#" className="btn btn-primary">Go somewhere</a> */}
                    <div className="d-flex flex-column mb-4">

                        <h4 className="card-title">{building.name}</h4>

                        <p className="card-text">City : {building.buildingAddr.city}<br /> State : {building.buildingAddr.state} </p>
                        <hr/>
                        <div className='text-center'>
                            <Link className="btn btn-outline-secondary" to={`/building/${building.id}`}>View Rooms</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
