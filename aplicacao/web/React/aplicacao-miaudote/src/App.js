// import Rotas from './rotas';

// function App() {
//   return (
//     <>
//        <Rotas/>
//     </>
//   );
// }

// export default App;
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'

import Home from './App.jsx'
import Artigo from './Artigo.jsx'


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/artigos" element={<Artigo />} />
      </Routes>
    </Router>
  )
}

export default App;