import React, { lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
import Homepage from '../../pages/Homepage'
import Navbar from '../../components/Navbar'
import Blog_Detail from '../../pages/Blog_Detail'

const Blogpage = lazy(() => import('../../pages/Blogpage'))

const Routin = () => {
    return (
        <div className='max-w-5xl mx-auto'>
            <Navbar />
            <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/blog" element={<Blogpage />} />
                <Route path='blog/:id' element={<Blog_Detail />} />
            </Routes>
        </div>

    )
}

export default Routin