import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import { FiEdit, FiDelete } from "react-icons/fi";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import swal from "sweetalert";

const List = () => {
  const [lists, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [id, setId] = useState();
  const [nama, setNama] = useState("");

  useEffect(() => {
    getList();
  }, []);

  const getList = async () => {
    const response = await axios.get("http://127.0.0.1:8000/api/mahasiswa");
    setList(response.data["data"]);
    setLoading(true);
  };

  const handleClose = () => setShow(false);
  const handleShow = (id, nama) => {
    setNama(nama);
    setId(id);
    setShow(true);
  };

  const deleteList = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/mahasiswa/${id}`);
      getList();
      setShow(false);
      swal({
        title: "Success!",
        text: "Success Delete",
        icon: "success",
        button: "OK!",
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom col-lg-8">
          <h1 className="h2">Mahasiswa List</h1>
        </div>
        <div className="table-responsive col-lg-8">
          <Link to={"/add"} className="btn btn-primary mb-3">
            Create new Post
          </Link>
          <table className="table table-striped table-sm">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Nama</th>
                <th scope="col">NIM</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                lists.map((list, index) => (
                  <tr key={list.id}>
                    <td>{index + 1}</td>
                    <td>{list.Nama}</td>
                    <td>{list.NIM}</td>
                    <td>
                      <Link to={`/edit/${list.id}`} className="btn btn-warning me-2">
                        <FiEdit />
                      </Link>
                      <button onClick={() => handleShow(list.id, list.Nama)} className="btn btn-danger text-dark">
                        <FiDelete />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <Spinner animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              )}
            </tbody>
          </table>
        </div>
        <Modal show={show} onHide={handleClose}>
          <Modal.Body>Are you sure delete list {nama} ?</Modal.Body>
          <Modal.Footer>
            <button className="btn btn-secondary" onClick={handleClose}>
              Close
            </button>
            <button className="btn btn-danger" onClick={() => deleteList(id)}>
              Delete
            </button>
          </Modal.Footer>
        </Modal>
      </main>
    </>
  );
};

export default List;
