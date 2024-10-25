import DefaultLayout from './layouts/DefaultLayout';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { routes } from './routes';
import React from 'react';
const App = () => {
    return (
        <Router>
            <div className='App'>
                    <Routes>
                        {routes.map((route, index) => {
                            let Layout = DefaultLayout;
                            if (route.layout === null) {
                                Layout = React.Fragment;
                            } else if (route.layout) {
                                Layout = route.layout;
                            }
                            const Page = route.component;
                            return (
                                <Route
                                    key={index}
                                    path={route.path}
                                    element={
                                        <Layout>
                                            <Page />
                                        </Layout>
                                    }
                                />
                            );
                        })}
                    </Routes>
            </div>
        </Router>
    );
};

export default App;