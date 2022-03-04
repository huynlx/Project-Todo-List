import React, { useEffect, useState } from 'react';
import '../css/LeftSide.css';
import { randomString } from '../utils/randomString';
import { setMinDate } from '../utils/setMinDate';
import { getToday } from '../utils/getToday';

const LeftSide = ({ handleAddData }) => {
    const [newData, setNewData] = useState({
        prio: '2'
    });

    const handleData = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setNewData({
            ...newData,
            [name]: value,
            id: randomString()
        })
    }

    Date.prototype.toDateInputValue = (function () {
        var local = new Date(this);
        local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
        return local.toJSON().slice(0, 10);
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        handleAddData(newData);
        document.getElementById("main-new-task").reset();
        getToday();
    }

    useEffect(() => {
        setMinDate();
        getToday();
        setNewData({
            ...newData,
            date: document.getElementById('date').value
        })
    }, [])


    return (
        <div className='new-task'>
            <h3 className='title'>New Task</h3>
            <form id="main-new-task" className='main-new-task' onSubmit={(e) => handleSubmit(e)}>
                <div className='name-task'>
                    <input
                        name='name'
                        autoComplete="disabled"
                        type="text"
                        placeholder='Add new task ...'
                        required
                        onChange={(e) => { handleData(e) }}
                    />
                </div>
                <div className='description'>
                    <h4>Description</h4>
                    <textarea
                        spellCheck="false"
                        name="desc"
                        id="desc"
                        cols="30"
                        rows="10"
                        onChange={(e) => { handleData(e) }}
                    />
                </div>
                <div className='select'>
                    <div className='due-date'>
                        <h4>Due Date</h4>
                        <input
                            type="date"
                            id="date"
                            className='date-select'
                            name="date"
                            onChange={(e) => { handleData(e) }}
                        />
                    </div>
                    <div className='priority'>
                        <h4>Priority</h4>
                        <select name="prio" defaultValue={2} onChange={(e) => { handleData(e) }}>
                            <option value="1">Low</option>
                            <option value="2">Normal</option>
                            <option value="3">High</option>
                        </select>
                    </div>
                </div>
                <button type='submit' id='submit'>Add</button>
            </form>
        </div>
    );
};

export default LeftSide;