import "./App.css";
import { useEffect, useState } from "react";
import SupplierCard from "./components/SupplierCard";
import { GrRevert } from "react-icons/gr";
import { BiSave } from "react-icons/bi";
import { BsPlusLg } from "react-icons/bs";

function App() {
  const supplierDefault = {
    companyName: "",
    contactName: "",
    contactTitle: "",
    address: {
      street: "",
      city: "",
      postalCode: "",
      region: "",
      country: "",
      phone: "",
    },
  };

  const [supplier, setSupplier] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [showAddSupplier, setShowAddSupplier] = useState({ collapsed: true });
  const [supplierNew, setSupplierNew] = useState(supplierDefault);

  useEffect(() => {
    (async () => {
      const responseSupplier = await fetch("http://localhost:3040/supplier");
      const dataSupplier = await responseSupplier.json();
      setSuppliers(dataSupplier);
    })();
  }, []);

  useEffect(() => {
    console.log(`render triggered`);
  }, [supplier, suppliers]);

  const toggleShowAddSupplier = () => {
    showAddSupplier.collapsed = !showAddSupplier.collapsed;
    setShowAddSupplier({ ...showAddSupplier });
  };

  const addSupplier = async (e) => {
    e.preventDefault();
    try {
      await fetch(`http://localhost:3040/supplier/`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(supplierNew),
      });
    } catch (err) {
      console.log(err);
    }
    setSuppliers([...suppliers, { ...supplierNew, ...supplierNew.address }]);
    setSupplierNew({ ...supplierDefault });
    toggleShowAddSupplier();
  };

  return (
    <div className="App">
      <BsPlusLg size="14" onClick={toggleShowAddSupplier} />
      {!showAddSupplier.collapsed && (
        <>
          <div className="addSupplier">
            <form onSubmit={addSupplier}>
              <label>
                Add a new supplier: <br />
              </label>
              <input
                type="text"
                placeholder="Name..."
                onChange={(e) =>
                  setSupplierNew({
                    ...supplierNew,
                    companyName: e.target.value,
                  })
                }
                value={supplierNew.companyName}
              />{" "}
              <br />
              <input
                type="text"
                placeholder="Contact..."
                onChange={(e) =>
                  setSupplierNew({
                    ...supplierNew,
                    contactName: e.target.value,
                  })
                }
                value={supplierNew.contactName}
              />{" "}
              <br />
              <input
                type="text"
                placeholder="Position..."
                onChange={(e) =>
                  setSupplierNew({
                    ...supplierNew,
                    contactTitle: e.target.value,
                  })
                }
                value={supplierNew.contactTitle}
              />
              <div className="addressFields">
                <label>Address: </label>
                <br />
                <input
                  type="text"
                  placeholder="Street..."
                  onChange={(e) =>
                    setSupplierNew({
                      ...supplierNew,
                      address: {
                        ...supplierNew.address,
                        street: e.target.value,
                      },
                    })
                  }
                  value={supplierNew.address.street}
                />{" "}
                <br />
                <input
                  type="text"
                  placeholder="City..."
                  onChange={(e) =>
                    setSupplierNew({
                      ...supplierNew,
                      address: { ...supplierNew.address, city: e.target.value },
                    })
                  }
                  value={supplierNew.address.city}
                />{" "}
                <br />
                <input
                  type="text"
                  placeholder="Region..."
                  onChange={(e) =>
                    setSupplierNew({
                      ...supplierNew,
                      address: {
                        ...supplierNew.address,
                        region: e.target.value,
                      },
                    })
                  }
                  value={supplierNew.address.region}
                />{" "}
                <br />
                <input
                  type="text"
                  placeholder="Postal Code..."
                  onChange={(e) =>
                    setSupplierNew({
                      ...supplierNew,
                      address: {
                        ...supplierNew.address,
                        postalCode: e.target.value,
                      },
                    })
                  }
                  value={supplierNew.address.postalCode}
                />{" "}
                <br />
                <input
                  type="text"
                  placeholder="Country..."
                  onChange={(e) =>
                    setSupplierNew({
                      ...supplierNew,
                      address: {
                        ...supplierNew.address,
                        country: e.target.value,
                      },
                    })
                  }
                  value={supplierNew.address.country}
                />{" "}
                <br />
                <input
                  type="text"
                  placeholder="Phone..."
                  onChange={(e) =>
                    setSupplierNew({
                      ...supplierNew,
                      address: {
                        ...supplierNew.address,
                        phone: e.target.value,
                      },
                    })
                  }
                  value={supplierNew.address.phone}
                />{" "}
                <br />{" "}
              </div>
              <span className="addButtons">
                <GrRevert
                  size="14"
                  onClick={() => {
                    setSupplierNew({ ...supplierDefault });
                  }}
                />{" "}
                <button>
                  <BiSave />
                </button>
              </span>
            </form>
          </div>
        </>
      )}
      {suppliers.map((supplier, index) => {
        return (
          <SupplierCard
            key={index}
            supplier={supplier}
            setSupplier={setSupplier}
            suppliers={suppliers}
            setSuppliers={setSuppliers}
            setSupplierNew={setSupplierNew}
            supplierDefault={supplierDefault}
            supplierNew={supplierNew}
          />
        );
      })}
    </div>
  );
}

export default App;
