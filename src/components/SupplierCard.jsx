import "./supplierCard.css";
import { useState } from "react";
import { GrEdit, GrRevert } from "react-icons/gr";
import { BiSave } from "react-icons/bi";
import { FiCopy } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaInfo } from "react-icons/fa";

const SupplierCard = (props) => {
  const apiUrl = "http://localhost:3040/";

  const {
    supplier,
    suppliers,
    setSuppliers,
    setSupplierNew,
    supplierNew,
    supplierDefault,
  } = props;
  const { address, companyName, contactName, contactTitle } = supplier;
  const { street, city, postalCode, region, country, phone } = address;

  const [details, setDetails] = useState({ collapsed: true });
  const [showEditSupplier, setShowEditSupplier] = useState({ collapsed: true });

  const toggleContactDetails = () => {
    details.collapsed = !details.collapsed;
    setDetails({ ...details });
  };

  const toggleShowEditSupplier = () => {
    showEditSupplier.collapsed = !showEditSupplier.collapsed;
    showEditSupplier.collapsed === false
      ? Object.assign(supplierNew, supplier)
      : Object.assign(supplierNew, supplierDefault);
    setShowEditSupplier({ ...showEditSupplier });
  };

  const deleteSupplier = async () => {
    try {
      await fetch(`${apiUrl}supplier/${supplier._id}`, {
        method: "DELETE",
      });
    } catch (err) {
      console.log(`error`);
    }
    const suppliersNew = [
      ...suppliers.filter((sup) => sup._id !== supplier._id),
    ];
    setSuppliers([...suppliersNew]);
  };

  const updateSupplier = async (e) => {
    e.preventDefault();
    console.log(`update called successfully`);
    console.log(supplierNew);
    try {
      await fetch(`${apiUrl}supplier/${supplier._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(supplierNew),
      });
    } catch (err) {
      console.log(err);
    }
    setSuppliers([
      ...suppliers.filter((sup) => sup._id !== supplier._id),
      { ...supplierNew, ...supplierNew.address },
    ]);
    setSupplierNew({ ...supplierDefault });
    toggleShowEditSupplier();
  };

  const copySupplier = async () => {
    Object.assign(supplierNew, supplier);
    supplierNew._id = suppliers.sort((a, b) => b._id - a._id)[0]._id + 1;
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
  };

  return (
    <div className="supplier">
      <div className="supplierCard">
        <h2>{companyName}</h2>
        <p className="contact">
          Contact Name: {contactName}
          {"  "}
          <button className="infoButton" onClick={() => toggleContactDetails()}>
            <FaInfo />
          </button>
        </p>
        {!details.collapsed && (
          <>
            <p>
              <b>Position:</b>
              <br />
              {contactTitle}
            </p>
            <p>
              <b>Address:</b>
              <br />
              {street}, {city} <br />
              {postalCode} {region}, {country}
            </p>
            <p>
              <b>Phone: </b>
              <br />
              {phone}
            </p>
          </>
        )}
        <p className="cardIcons">
          <GrEdit size="14" onClick={toggleShowEditSupplier} />
          <FiCopy onClick={copySupplier} />
          <RiDeleteBin6Line onClick={deleteSupplier} />
        </p>
        {!showEditSupplier.collapsed && (
          <>
            <div className="editSupplier">
              <form onSubmit={updateSupplier}>
                <label>
                  Edit supplier: <br />
                </label>
                <input
                  type="text"
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
                    onChange={(e) =>
                      setSupplierNew({
                        ...supplierNew,
                        address: {
                          ...supplierNew.address,
                          city: e.target.value,
                        },
                      })
                    }
                    value={supplierNew.address.city}
                  />{" "}
                  <br />
                  <input
                    type="text"
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
                  <br />
                </div>
                <p className="editButtons">
                  <GrRevert
                    size="14"
                    onClick={() => {
                      setSupplierNew({ ...supplier });
                    }}
                  />
                  <button>
                    <BiSave />
                  </button>
                </p>
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SupplierCard;
