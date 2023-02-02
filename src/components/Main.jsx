import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./item.css"
import Row from './Row';
import Pagination from 'react-js-pagination';

const Main = () => {
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [first, setFirst] = useState(0);
    const [last, setLast] = useState(3);
    const setCurrentPageNo = (e) => {
        setCurrentPage(e);
        first < data.length - 3 ? setFirst(first + 3) : setFirst(0);
        last < data.length ? setLast(last + 3) : setLast(3);

    }

    useEffect(() => {
        const getData = async () => {
            const response = await axios.get(`https://jsonplaceholder.typicode.com/users`)
            setData(response.data);
        }
        getData();
    }, []);
    return (
        <div className='container border border-1 rounded mt-5 mb-5 bg-midblue contain'>
            {
                data.slice(first, last).map((item) => (
                    <Row item={item} key={item.id} />
                ))
            }

            {(3 < data.length) &&
                <div className="paginationBox">
                    <Pagination
                        activePage={currentPage}
                        itemsCountPerPage={3}
                        totalItemsCount={data.length}
                        onChange={setCurrentPageNo}
                        itemClass="page-item"
                        linkClass="page-link"
                        activeClass="pageItemActive"
                        activeLinkClass='pageLinkActive'
                    />
                </div>
            }
        </div>
    )
}

export default Main