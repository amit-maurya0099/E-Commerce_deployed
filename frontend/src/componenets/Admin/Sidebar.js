import React from 'react'
import { Link } from 'react-router-dom'
import DashboardIcon from '@mui/icons-material/Dashboard';
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import PostAddIcon from '@mui/icons-material/PostAdd';
import AddIcon from '@mui/icons-material/Add';
import ListAltIcon from '@mui/icons-material/ListAlt';
import PeopleIcon from '@mui/icons-material/People';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ImportExportIcon from '@mui/icons-material/ImportExport';
import RateReviewIcon from '@mui/icons-material/RateReview';
const Sidebar = () => {
  return (
    <div  className=' pt-16  flex flex-col gap-8 border-r w-[13%] px-1'>
    <Link to="/"> <img src="https://bizwiziq.com/wp-content/uploads/2019/02/shopkart-orange-1.png" alt="/" className='h-12 '></img>
    </Link> 
    <Link to="/admin/dashboard"><p className='flex items-center gap-2 transition-all hover:scale-105'><DashboardIcon/> Dashboard</p></Link>
    <Link>
     <SimpleTreeView  
         
     >
     <TreeItem itemId="1" label="Products">
        <Link to="/admin/products" >
        <p className='flex items-center gap-2 transition-all hover:scale-105'><PostAddIcon/> All</p>
        </Link>
        <Link to="/admin/product">
        <p className='flex items-center gap-2 transition-all hover:scale-105'><AddIcon/> Create</p>
        </Link>
     </TreeItem>
     </SimpleTreeView>
    </Link>
    <Link to="/admin/orders">
    <p className='flex items-center gap-2 transition-all hover:scale-105'><ListAltIcon/> Orders</p>
    </Link>
    <Link to="/admin/users">
    <p className='flex items-center gap-2 transition-all hover:scale-105'><PeopleIcon/> Users</p>
    </Link>
    <Link to="/admin/reviews">
    <p className='flex items-center gap-2 transition-all hover:scale-105'><RateReviewIcon/> Reviews</p>
    </Link>
    </div>
  )
}

export default Sidebar
