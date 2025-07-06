const Sidebarcompo  = () => (
  <div className="w-60 h-screen bg-gray-900 text-white p-5">
    <h2 className="text-xl font-bold mb-6">Vyaparsathi</h2>
    <ul className="space-y-4">
      {["Dashboard", "Inventory", "Orders", "Customers", "Settings"].map((item) => (
        <li key={item} className="hover:text-blue-400 cursor-pointer">
          {item}
        </li>
      ))}
    </ul>
  </div>
);

export default Sidebarcompo;
