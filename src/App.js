import './App.css';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Lobby from './Components/Lobby';
import CodeBlock from './Components/codeBlock';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Lobby />} />
        <Route path='/block1' element={<CodeBlock initialCode='function reverseString(str) {
        return str.split("").reverse().join("");
    }' title='/block1' />} />
        <Route path='/block2' element={<CodeBlock initialCode='function countOccurences(str, char) {
        return str.split(char).length - 1;
      }
      countOccurences("test", "t"); // 2' title='/block2' />} />
        <Route path='/block3' element={<CodeBlock initialCode='const string = "hello world";
    const substring = "world";
    const containsSubstring = string.includes(substring); //true' title='/block3' />} />
        <Route path='/block4' element={<CodeBlock initialCode='function randomBetween(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
      }
      randomBetween(1,5);' title='/block4' />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;