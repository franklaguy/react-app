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
        <div className="pt-3 pb-3"></div>
      </div>
    </div>
  );
}

export default App;
