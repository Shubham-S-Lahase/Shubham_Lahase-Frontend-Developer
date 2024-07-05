import Header from "./components/Header";
import { SearchProvider } from "./context/searchContext";

function App() {
  return (
    <div className="App">
      <SearchProvider>
        <Header />
      </SearchProvider>
    </div>
  );
}

export default App;
