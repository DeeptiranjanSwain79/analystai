import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./item.css";

const Row = item => {
    const data = item.item;
    // const [lat, setLat] = useState('');
    // const [long, setLong] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');
    const [open, setOpen] = useState(false);

    const openToggler = () => {
        !open ? setOpen(true) : setOpen(false);
    }
    useEffect(() => {
        const getState = async (lat, long) => {
            const response = await axios.get(`https://us1.locationiq.com/v1/reverse?key=pk.2ac856ba5a38d3897fcd3079998d0b39&lat=${lat}&lon=${long}&format=json`);
            console.log(response.data.address.state);
            setState(response.data && response.data.address.state)
            setCountry(response.data && response.data.address.country)
        }
        getState(data.address.geo.lat, data.address.geo.lng);
    }, [data.address.geo.lat, data.address.geo.lng]);
    return (
        <>
            <div className="item mt-2">
                <div className=''>
                    <div>
                        <p>{data.username}</p>

                        <div>
                            <h5>CONTACT</h5>
                            <p>{data.name}</p>
                        </div>

                        <div>
                            <h5>CITY</h5>
                            <p>{data.address.city}</p>
                        </div>

                        <div>
                            <h5>STATE</h5>
                            <p>{state || 'Scotland'}</p>
                        </div>

                    </div>

                    <div className="btns">
                        <button className="rounded-pill" onClick={openToggler}>
                            {!open ? 'VIew Details' : 'Hide Details'}
                        </button>
                    </div>
                </div>

                <div className="description" style={{display : open ? 'block' : 'none'}}>
                    <div>
                        <h6>Desription</h6>
                        <p>{data.company.catchPhrase}</p>
                    </div>
                    <div className="description-2">
                        
                        <div>
                            <div>
                                <p>Contact Person</p>
                                <span>{data.name}</span>
                            </div>
                            <div>
                                <p>Address</p>
                                <span>{data.address.street} {data.address.suite} {data.address.city} {data.address.zipcode} </span>
                            </div>
                        </div>

                        <div>
                            <div>
                                <p>Company name</p>
                                <span>{data.website.split('.')[0].charAt(0).toUpperCase() + data.website.split('.')[0].substring(1, data.website.split('.')[0].length)}</span>
                            </div>
                            <div>
                                <p>City</p>
                                <span>{data.address.city}</span>
                            </div>
                        </div>

                        <div>
                            <div>
                                <p>Emails</p>
                                <span>{data.email}</span>
                            </div>
                            <div>
                                <p>State</p>
                                <span>{state || 'Scotland'}</span>
                            </div>
                        </div>

                        <div>
                            <div>
                                <p>Phone</p>
                                <span>{data.phone}</span>
                            </div>
                            <div>
                                <p>Country</p>
                                <span>{country || "UK"}</span>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
        </>
    )
}

export default Row