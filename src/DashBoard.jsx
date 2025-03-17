import { useOutletContext } from "react-router-dom";

function Dashboard() {
  
  const [width] = useOutletContext();
  return (
    <div className=" h-screen bg-gray-200 w-full" style={{ marginLeft : width }}>
      
      {/* Main Content */}
     
        <h1 className="text-3xl font-bold text-gray-800">
          Welcome to the Dashboard
        </h1>
        <p className="text-gray-600 mt-2">
          Select a module from the sidebar to get started.
        </p>
   
      </div>
  
  );
}

export default Dashboard;
