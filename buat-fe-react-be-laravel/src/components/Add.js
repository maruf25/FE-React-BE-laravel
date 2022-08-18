import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import swal from "sweetalert";
import { useForm } from "react-hook-form";

const Add = () => {
    const {handleSubmit} = useForm()
  const [Nama, setNama] = useState("");
  const [NIM, setNIM] = useState("");
  const navigate = useNavigate();

  const addPost = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://127.0.0.1:8000/api/mahasiswa/", {
        Nama,
        NIM,
      });
      swal({
        title: "Success !",
        text: "Success Create Data",
        icon: "success",
        button: "OK!",
      })
      navigate("/");
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <>
      <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
        <Link to={"/"} className="btn btn-primary mt-5">
          Back
        </Link>
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
          <h1 className="h2">Create New Data</h1>
        </div>
        <div className="col-lg-5">
          <form onSubmit={addPost}>
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
              Create Data
            </button>
          </form>
        </div>
      </main>
    </>
  );
};

export default Add;
