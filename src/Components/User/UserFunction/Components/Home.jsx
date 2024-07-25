import React from 'react'
import About from './About'
import InputSearch from './InputSearch'
import RegisterBroker from './RegisterBroker'

const Home = () => {
    const id = sessionStorage.getItem('id')
    return (
        <div>
            <InputSearch />
            {id && <RegisterBroker />}
            <About />
        </div>
    )
}

export default Home