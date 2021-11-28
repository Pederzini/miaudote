import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'

import Home from './App.jsx'
import Artigo from './Artigo.jsx'
import Artigo2 from './Artigo2.jsx'
import Artigo3 from './Artigo3.jsx'
import Artigo4 from './Artigo4.jsx'


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/artigo1" element={<Artigo />} />
        <Route path="/artigo2" element={<Artigo2 />} />
        <Route path="/artigo3" element={<Artigo3 />} />
        <Route path="/artigo4" element={<Artigo4 />} />
      </Routes>
    </Router>
  )
}

export default App;