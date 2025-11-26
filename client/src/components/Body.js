import React from 'react'
import Navbar from './Navbar'

import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import SupportBrand from './SupportBrand'



const Body=()=>{
    return(
<>
<Navbar/> 

<main>
    <Outlet/>
</main>
<Footer/>
</>
    )
}
export default Body