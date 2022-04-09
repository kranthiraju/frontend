import './App.css';
import Navbar from './components/Navbar/navbar';
import Ride from './components/Rides/ride';
import UserProvider from './context/usercontext';

function App() {
  return (
    <div className="App">
      <UserProvider>
        <Navbar/>
        <Ride/>
      </UserProvider>
    </div>
  );
}

export default App;
