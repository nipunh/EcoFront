import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Home from "./core/Home"
import Signup from './user/Signup';
import Signin from './user/Signin';
import AdminRoute from './auth/helper/AdminRoutes';
import PrivateRoute from './auth/helper/PrivateRoutes';
import UserDashBoard from './user/UserDashBoard';
import AdminDashBoard from './user/AdminPages/AdminDashBoard';
import AddCategory from './admin/AddCategory';
import ManageCategories from './admin/ManageCategories';
import AddProduct from './admin/AddProduct';
import ManageProducts from './admin/ManageProducts';
import UpdateProduct from './admin/UpdateProduct';
import UpdateCategory from './admin/UpdateCategory';
import Cart from './core/Cart';
import updateProfile from './user/updateProfile';
import ViewOrders from './user/viewOrders';
import ManageOrders from './admin/ManageOrders';
import { Base } from './core/Base';
import Products from './core/Products';
import ProductDetailPage from './user/ProductDetailPage';
import { ManageInventory } from './user/AdminPages/ManageInventory';
// import { ThemeProvider } from  './components/ui/themeProvider'

const Routes = () => {
    return(
    // <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
    <BrowserRouter>
        <Switch>
            <Route path="/" exact component={Home} />        
            <Route path="/signup" exact component={Signup} />
            <Route path="/signin" exact component={Signin} />
            <Route path="/cart" exact component={Cart} />
            <Route path="/product/:productId" exact component={ProductDetailPage} />
            <PrivateRoute path="/user/dashboard" exact component={UserDashBoard} /> 
            <PrivateRoute path="/user/updateProfile" exact component={updateProfile} /> 
            <PrivateRoute path="/user/ViewOrders" exact component={ViewOrders} /> 
            <AdminRoute path="/admin/dashboard" exact component={AdminDashBoard} /> 
            <AdminRoute path="/admin/create/category" exact component={AddCategory} />
            <AdminRoute path="/admin/categories" exact component={ManageCategories} />
            <AdminRoute path="/admin/category/update/:categoryId" exact component={UpdateCategory} />
            <AdminRoute path="/admin/create/product" exact component={AddProduct} />
            <AdminRoute path="/admin/products" exact component={ManageInventory} />
            <AdminRoute path="/admin/product/update/:productId" exact component={UpdateProduct} />
            <AdminRoute path="/admin/orders" exact component={ManageOrders} />

        </Switch>
    </BrowserRouter>
    // </ThemeProvider>
    );
}

export default Routes;