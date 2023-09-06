import { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import { RegisterLoadingForm } from '~/pages/Auth/RegisterUser';

const RegisterForm = lazy(() => import('~/pages/Auth/RegisterUser'));
const LoginFormEmail = lazy(() => import('~/pages/Auth/LoginUser'));

function App() {
  return (
    <>
      {/* react routers route dom => here */}
      {/* lazy loading => hiện thị loading của Page đó */}
      {/* <Suspense fallback={<RegisterLoadingForm />}>
        <RegisterForm />
      </Suspense> */}

      {/* routes */}

      <Routes>
        <Route path="/register" element={<RegisterForm />}></Route>
        <Route path="/login" element={<LoginFormEmail />}></Route>

        {/* <Suspense fallback={<RegisterLoadingForm />}>
          <Route path="/login" element={<LoginFormEmail />}></Route>
        </Suspense> */}
      </Routes>
    </>
  );
}

export default App;
