import React, { useEffect, useState } from 'react';
import '../css/RightSide.css';
import { setMinDate } from '../utils/setMinDate';
import Item from './Item';

const RightSide = ({
    data,
    handleRemoveData,
    handleUpdateDate,
    close,
    setClose
}) => {
    const [check, setCheck] = useState({});
    const [search, setSearch] = useState('');
    const [checklist, setCheckList] = useState([]);

    data.sort(function (a, b) {
        return new Date(a.date) - new Date(b.date)
    })

    const tt = (id) => {
        setCheck(check => {
            if (check) {
                return {
                    [id]: !check[id],
                }
            }
            return {
                [id]: true,
            };
        })
    }

    useEffect(() => {
        setMinDate()
    }, [data])

    const handleSearch = (e) => {
        setSearch(e.target.value);
    }

    return (
        <div className='to-do-list'>
            <h3 className='title'>To Do List <span style={{visibility: close && 'hidden' }} onClick={() => setClose(!close)} className='btnOpen'>&#43;</span></h3>
            <div className='main'>
                <div className='name-search'>
                    <input
                        name='search'
                        autoComplete="disabled"
                        type="text"
                        placeholder='Search ...'
                        onChange={(e) => handleSearch(e)}
                    />
                </div>
                {
                    data.filter(item => item.name.toLowerCase().includes(search)).map(item => (
                        <Item
                            check={check}
                            tt={tt}
                            item={item}
                            key={item.id}
                            handleRemoveData={handleRemoveData}
                            handleUpdateDate={handleUpdateDate}
                            setCheckList={setCheckList}
                            checklist={checklist}
                        />
                    ))
                }
            </div>
            {
                (checklist.length > 0 && !close) && <div className='bulk'>
                    Bulk Action:
                    <div className='btn-bulk'>
                        <button className='action--1' style={{ backgroundColor: '#007bff' }}>Done</button>
                        <button
                            className='action--2'
                            onClick={
                                () => {
                                    let result = window.confirm("Delete the selected tasks ?");
                                    if (result) {
                                        setCheckList([]);
                                        handleRemoveData(checklist);
                                    }
                                }
                            }>
                            Remove
                        </button>
                    </div>
                </div>
            }
        </div>
    );
};

export default RightSide;