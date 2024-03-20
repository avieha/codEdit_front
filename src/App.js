import './App.css';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Lobby from './Pages/Lobby';
import CodeBlock1 from './Pages/codeBlock1';
import CodeBlock2 from './Pages/codeBlock2';
import CodeBlock3 from './Pages/codeBlock3';
import CodeBlock4 from './Pages/codeBlock4';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Lobby />} />
        <Route path='/block1' element={<CodeBlock1 />} />
        <Route path='/block2' element={<CodeBlock2 />} />
        <Route path='/block3' element={<CodeBlock3 />} />
        <Route path='/block4' element={<CodeBlock4 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;