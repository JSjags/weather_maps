import { useState } from "react";
import Map from "./components/Map";
import Navbar from "./components/Navbar";
import SideBar from "./components/SideBar";
import { cityId, location } from "./types";

function App() {
  const [location, setLocation]: location = useState([7.49446, 5.52794]);
  const [cityId, setCityId]: cityId = useState(0);

  return (
    <div className="mx-auto w-full max-w-[1440px] min-h-[100vh] bg-slate-100 overflow-hidden">
      <Navbar />
      <main className="relative flex">
        <SideBar
          setLocation={setLocation}
          setCityId={setCityId}
          cityId={cityId}
        />
        <Map location={location} cityId={cityId} />
      </main>
    </div>
  );
}

export default App;
