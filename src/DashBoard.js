import { useEffect, useState } from "react";
import "./DashBoard.css"; 
import { dummyProperties } from "./dummyProperties";

function Dashboard() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState(null); // Track expanded card
 const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
    const fetchProperties = async () => {
        try {
//           fetch("https://www.microburbs.com.au/report_generator/api/suburb/properties?suburb=Belmont+North", {
//     method: "GET",
//     headers: {
//         "Authorization": "Bearer test",
//         "Content-Type": "application/json"
//     }
// })
// .then(response => response.json())
// .then(data => console.log(data))
// .catch(error => console.error("Error:", error));
        setTimeout(() => {
          setProperties(dummyProperties.results);
        }, 500);
      } catch (error) {
        console.error("Error fetching properties:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  if (loading) return <p className="loading">Loading properties...</p>;

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="dashboard-container">
          <h1>Belmont North Properties</h1>
    <div className="search-container">
    <input
      type="text"
      placeholder="Search properties..."
      className="search-input"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
  </div>
      <div className="grid-container">
        {properties.map((property) => (
          <div
            key={property.gnaf_pid}
            className={`property-card ${expandedId === property.gnaf_pid ? "expanded" : ""}`}
            onClick={() => toggleExpand(property.gnaf_pid)}
          >
            <h3 className="property-address">
              {property.address.street}, {property.address.sal}, {property.address.state}
            </h3>
            <p className="property-price">${property.price.toLocaleString()}</p>
            <p className="property-info">
              {property.attributes.bedrooms} bd | {property.attributes.bathrooms} ba | {property.attributes.garage_spaces} garage
            </p>
            <p className="property-land">Land: {property.attributes.land_size}</p>
            <p className="property-description">
              {expandedId === property.gnaf_pid
                ? property.attributes.description
                : property.attributes.description.slice(0, 150) + "..."}
              <span className="read-more">{expandedId === property.gnaf_pid ? " Show Less" : " Read More"}</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
