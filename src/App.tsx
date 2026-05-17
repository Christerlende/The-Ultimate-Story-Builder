import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import ConceptPage from './pages/concept/ConceptPage'
import PlaceholderCompetency from './pages/PlaceholderCompetency'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="concept" element={<ConceptPage />} />
        <Route path=":slug" element={<PlaceholderCompetency />} />
      </Route>
    </Routes>
  )
}
