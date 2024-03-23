import Home from "./containers/Home/Home";
import Mutate from "./containers/Mutate/Mutate";
import Layout from "./components/Layout/Layout";
import { Route, Routes } from 'react-router-dom';

function App() {

  return (
    <>
      <Layout>
          <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/new-meal" element={<Mutate />} />
              <Route path="/meals/:id/edit" element={<Mutate />} />
              <Route path="*" element={<h2>No found!</h2>} />
          </Routes>
      </Layout>
    </>
  )
}

export default App
