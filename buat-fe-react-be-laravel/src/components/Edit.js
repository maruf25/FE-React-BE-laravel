import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link, useParams } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import swal from "sweetalert";

const Edit = () => {
  const [Nama, setNama] = useState("");
  const [NIM, setNIM] = useState("");
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getListbyId();
  }, []);

  const updateData = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`http://127.0.0.1:8000/api/mahasiswa/${id}`, {
        Nama,
        NIM,
      });
      swal({
        title: "Success !",
        text: "Success Update Data",
        icon: "success",
        button: "OK!",
      })
      navigate("/")
    } catch (error) {
      console.log(error);
    }
  };

  const getListbyId = async () => {
    const response = await axios.get(`http://127.0.0.1:8000/api/mahasiswa/${id}`);
    setNama(response.data["data"].Nama);
    setNIM(response.data["data"].NIM);
    setLoading(true);
  };

  return (
    <>
      <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
        <Link to={"/"} className="btn btn-primary mt-5">
          Back
        </Link>
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
          <h1 className="h2">Edit</h1>
        </div>
        <div className="col-lg-5">
          {loading ? (
            <form onSubmit={updateData}>
              <div className="mb-3">
                <label for="Nama" className="form-label">
                  Nama
                </label>
                <input type="text" className="form-control" id="Nama" name="Nama" value={Nama} onChange={(e) => setNama(e.target.value)} autoFocus required />
              </div>
              <div className="mb-3">
                <label for="NIM" className="form-label">
                  NIM
                </label>
                <input type="text" className="form-control" id="NIM" name="NIM" value={NIM} onChange={(e) => setNIM(e.target.value)} required maxLength={7} />
              </div>
              <button type="submit" className="btn btn-primary">
                Update Data
              </button>
            </form>
          ) : (
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          )}
        </div>
      </main>
    </>
  );
};

export default Edit;
