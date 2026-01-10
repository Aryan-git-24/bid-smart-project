import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  LogAsSeller,
  Register,
  Login,
  UserProfile,
  DashboardLayout,
  Layout,
  CreateCategory,
  UpdateCategory,
  CategoryList,
  UpdateProductByAdmin,
  AdminProductList,
  Income,
  Dashboard,
  ProductList,
  ProductEdit,
  AddProduct,
  ProductsDetailsPage,
  Home,
  UserList,
  WinningBidList,
  NotFound,
  ScrollToTop,
  PrivateRouter,
} from "./router/index.js";

function App() {
  return (
    <>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />
        <Route
          path="/login"
          element={
            <Layout>
              <Login />
            </Layout>
          }
        />
        <Route
          path="/seller/login"
          element={
            <PrivateRouter>
              <Layout>
                <LogAsSeller />
              </Layout>
            </PrivateRouter>
          }
        />
        <Route
          path="/register"
          element={
            <Layout>
              <Register />
            </Layout>
          }
        />
        <Route
          path="/add"
          element={
            <PrivateRouter>
              <Layout>
                <DashboardLayout>
                  <AddProduct />
                </DashboardLayout>
              </Layout>
            </PrivateRouter>
          }
        />
        <Route
          path="/admin/income"
          element={
            <PrivateRouter>
              <Layout>
                <DashboardLayout>
                  <Income />
                </DashboardLayout>
              </Layout>
            </PrivateRouter>
          }
        />
        <Route
          path="/product/update/:id"
          element={
            <PrivateRouter>
              <Layout>
                <DashboardLayout>
                  <ProductEdit />
                </DashboardLayout>
              </Layout>
            </PrivateRouter>
          }
        />
        <Route
          path="/details/:id"
          element={
            <Layout>
              <ProductsDetailsPage />
            </Layout>
          }
        />
        <Route
          path="/dashboard"
          element={
            <PrivateRouter>
              <Layout>
                <DashboardLayout>
                  <Dashboard />
                </DashboardLayout>
              </Layout>
            </PrivateRouter>
          }
        />
        <Route
          path="/product"
          element={
            <PrivateRouter>
              <Layout>
                <DashboardLayout>
                  <ProductList />
                </DashboardLayout>
              </Layout>
            </PrivateRouter>
          }
        />
        <Route
          path="/product/admin"
          element={
            <PrivateRouter>
              <Layout>
                <DashboardLayout>
                  <AdminProductList />
                </DashboardLayout>
              </Layout>
            </PrivateRouter>
          }
        />
        <Route
          path="/product/admin/update/:id"
          element={
            <PrivateRouter>
              <Layout>
                <DashboardLayout>
                  <UpdateProductByAdmin />
                </DashboardLayout>
              </Layout>
            </PrivateRouter>
          }
        />
        <Route
          path="/userlist"
          element={
            <PrivateRouter>
              <Layout>
                <DashboardLayout>
                  <UserList />
                </DashboardLayout>
              </Layout>
            </PrivateRouter>
          }
        />
        <Route
          path="/winning-products"
          element={
            <PrivateRouter>
              <Layout>
                <DashboardLayout>
                  <WinningBidList />
                </DashboardLayout>
              </Layout>
            </PrivateRouter>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRouter>
              <Layout>
                <DashboardLayout>
                  <UserProfile />
                </DashboardLayout>
              </Layout>
            </PrivateRouter>
          }
        />
        <Route
          path="/category"
          element={
            <PrivateRouter>
              <Layout>
                <DashboardLayout>
                  <CategoryList />
                </DashboardLayout>
              </Layout>
            </PrivateRouter>
          }
        />
        <Route
          path="/category/create"
          element={
            <PrivateRouter>
              <Layout>
                <DashboardLayout>
                  <CreateCategory />
                </DashboardLayout>
              </Layout>
            </PrivateRouter>
          }
        />
        <Route
          path="/category/update/:id"
          element={
            <PrivateRouter>
              <Layout>
                <DashboardLayout>
                  <UpdateCategory />
                </DashboardLayout>
              </Layout>
            </PrivateRouter>
          }
        />
        <Route
          path="/*"
          element={
            <Layout>
              <NotFound />
            </Layout>
          }
        />
      </Routes>
    </BrowserRouter >
    </>
  );
}

export default App;