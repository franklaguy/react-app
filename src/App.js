import './App.css';
import Search from './components/search';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p className="pl-3 pt-3">Show Finder</p>
      </header>
      <div className="container-fluid content m-3">
        <Search />
        <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
          Learn React
        </a>
      </div>
    </div>
  );
}

export default App;
