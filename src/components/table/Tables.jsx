import React from "react";
import Row from "react-bootstrap/esm/Row";

import Table from "react-bootstrap/Table";
import Dropdown from "react-bootstrap/Dropdown";
import { NavLink } from "react-router-dom";
import { BASE_URL } from "../../services/helper";
import { ToastContainer} from "react-toastify";
import "./table.css";

export const Tables = ({ userdata,deleteUser }) => {
  return (
    <>
      <div className="container">
        <Row>
          <div className="col mt-0">
          
              <Table className="align-items-center" responsive="sm">
                <thead className="thead-dark">
                  <tr className="table-dark">
                    <th>ID</th>
                    <th>FullName</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Address</th>
                    <th>Profile</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    userdata.length > 0 ? userdata.map((item,index)=>{
                      return(
                        <tr key={item._id}>
                          <td>{index +1}</td>
                         <td>{item.userName}</td>
                         <td>{item.email} </td>
                         <td>{item.mobile} </td>
                         <td>{item.address} </td>
                         <td className="img_parent">
                         <img src={`${BASE_URL}/uploads/${item.profile}`} alt="img" />
                         </td>
                         <td>
                         <Dropdown >
                        <Dropdown.Toggle
                          variant="light"
                          className="action"
                          id="dropdown-basic"
                        >
                          <i className="fa-solid fa-ellipsis-vertical"></i>{""}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          <Dropdown.Item>
                            <NavLink
                              to={`/userprofile/${item._id}`}
                              className="text-decoration-none"
                            >
                              <i
                                className="fa-solid fa-eye"
                                style={{ color: "green" }}
                              ></i>{" "}
                              <span>View</span>
                            </NavLink>
                          </Dropdown.Item>
                          <Dropdown.Item>
                            <NavLink
                              to={`/edit/${item._id}`}
                              className="text-decoration-none"
                            >
                              <i
                                className="fa-solid fa-pen-to-square"
                                style={{ color: "blue" }}
                              ></i>{" "}
                              <span>Edit</span>
                            </NavLink>
                          </Dropdown.Item>
                          <Dropdown.Item>
                            <div onClick={() => deleteUser(item._id)}>
                              <i
                                class="fa-solid fa-trash"
                                style={{ color: "red" }}
                              ></i>{" "}
                              <span>Delete</span>
                            </div>
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                         </td>
                        </tr>
                      )
                    }): <div className='no_data text-center'>NO Data Found</div>
                  }
                </tbody>
              </Table>
           
          </div>
        </Row>
        <ToastContainer />
      </div>
    </>
  );
};
