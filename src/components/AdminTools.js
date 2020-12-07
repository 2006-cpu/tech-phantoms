import React from 'react';
import { NavLink } from 'react-router-dom'; 
import './AdminTools.css';

const AdminTools = () => {

return <>
    <div className="adminNav">
        <div className="adminText">Admin: </div>
        <NavLink to="/allProducts" className="adminProductsNav" activeClassName="adminActive">
            Products
        </NavLink>

        <NavLink to="/createProduct" className="adminProductsNav" activeClassName="adminActive">
            Create New Product
        </NavLink>

        <NavLink to="/allOrders" className="adminOrdersNav" activeClassName="adminActive">
            Orders
        </NavLink>

        <NavLink to="/allUsers" className="adminUsersNav" activeClassName="adminActive">
            Users
        </NavLink>

        <NavLink to="/allReviews" className="adminReviewsNav" activeClassName="adminActive">
            Reviews
        </NavLink>
    </div>
</>
}

export default AdminTools;