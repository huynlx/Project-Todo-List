import React, { useEffect, useState } from 'react';

const Item = ({ item, handleRemoveData, handleUpdateDate, tt, check, setCheckList, checklist }) => {
    const [dt, setDt] = useState({
        id: item.id,
        name: item.name,
        date: item.date,
        desc: item.desc,
        prio: item.prio
    });

    const [checked, setChecked] = useState({
        id: item.id,
        status: false
    });

    const handleCheck = () => {
        setChecked({
            ...checked,
            status: !checked.status
        });
    }

    const remove = () => {
        let result = window.confirm("Delete this task ?");
        if (result) {
            setCheckList(checklist.filter(item => item.id != checked.id));
            handleRemoveData(item.id);
        }
    }

    useEffect(() => {
        if (checked.status) {
            setCheckList([...checklist, checked])
        } else {
            setCheckList(checklist.filter(item => item.id != checked.id))
        }
    }, [checked])


    const changeDt = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setDt({
            ...dt,
            [name]: value
        })
    }

    const onSubmit = (e) => {
        e.preventDefault();
        handleUpdateDate(dt)
    }

    return (
        <div className='item'>
            <div className='head'>
                <div className='head--1'>
                    <input
                        className='checkbox'
                        type="checkbox"
                        id={item.id}
                        name={item.name}
                        value={item.prio}
                        onChange={() => handleCheck()}
                    />
                    <label htmlFor={item.name}> {item.name}</label>
                </div>
                <div>
                    <button className='action--1' onClick={() => tt(item.id)}>Detail</button>
                    <button className='action--2' onClick={() => remove()} >Remove</button>
                </div>
            </div>

            <div className={`detail detail-${item.id}`} style={{ display: check[item.id] && check[item.id] ? 'block' : 'none' }}>
                <form className='main-new-task' onSubmit={(e) => onSubmit(e)}>
                    <div className='name-task'>
                        <input
                            defaultValue={item.name}
                            name='name'
                            type="text"
                            placeholder='Add new task ...'
                            required
                            onChange={(e) => { changeDt(e) }}
                        />
                    </div>
                    <div className='description'>
                        <h4>Description</h4>
                        <textarea
                            spellCheck="false"
                            defaultValue={item.desc}
                            name="desc"
                            id="desc"
                            cols="30"
                            rows="10"
                            onChange={(e) => { changeDt(e) }}
                        />
                    </div>
                    <div className='select'>
                        <div className='due-date'>
                            <h4>Due Date</h4>
                            <input
                                type="date"
                                id='date'
                                className='date-select'
                                name="date"
                                defaultValue={item.date}
                                onChange={(e) => { changeDt(e) }}
                            />
                        </div>
                        <div className='priority'>
                            <h4>Priority</h4>
                            <select name="prio" defaultValue={item.prio} onChange={(e) => { changeDt(e) }} >
                                <option value="1">Low</option>
                                <option value="2">Normal</option>
                                <option value="3">High</option>
                            </select>
                        </div>
                    </div>
                    <button type='submit' id='submit'>Update</button>
                </form>
            </div>
        </div>
    );
};

export default Item;