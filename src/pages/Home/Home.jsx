import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deletefun, usergetfunc } from "../../services/Apis";
import Button from "react-bootstrap/Button";
import { Tables } from "../../components/table/Tables";
import { Spiner } from "../../components/spinner/Spinner";
import { toast } from "react-toastify";
import { addUserData,updateUser,dltUser } from "../../Context/ContextProvider";
import Alert from 'react-bootstrap/Alert';
export const Home = () => {
  const navigate = useNavigate();

  const { useradd,setUseradd } = useContext(addUserData);
  const {update,setUpdate} = useContext(updateUser);
  const {deletedata,setDLtdata} = useContext(dltUser);

  const [userdata, setUserData] = useState([]);
  const [showspin, setShowSpin] = useState(true);

  //add user
  const addUser = () => {
    navigate("/register");
  };
  const userGet = async () => {
    const response = await usergetfunc();

    if (response.status === 200) {
      setUserData(response.data.userData);
    } else {
      console.log("error for get user data");
    }
  };

  const deleteUser =async(id)=>{
    const response = await deletefun(id);
 
    if(response.status === 200){
     userGet();
     setDLtdata(response.data)
    }else{
     toast.error("error")
    }
   };
  useEffect(() => {
    userGet();
    setTimeout(() => {
      setShowSpin(false);
    }, 1200);
  }, []);

  return (
    <>
    {
     useradd ? <Alert variant="success" onClose={() => setUseradd("")} dismissible>{useradd.userName.toUpperCase()} Succesfully Added</Alert>:""
    }
    {
      update?<Alert variant="primary" onClose={() => setUpdate("")} dismissible>{update.userName.toUpperCase()} Succesfully Updated</Alert>:""
    }
    {
      deletedata ?<Alert variant="danger" onClose={() => setDLtdata("")} dismissible>{deletedata.userName.toUpperCase()} Succesfully Deleted</Alert>:""
    }
    <div className="mt-5">
      <div className="container">
        <div className="add_btn mb-2 mt-2  ">
          <Button variant="primary" onClick={addUser}>
            {" "}
            <i className="fa-solid fa-plus"></i> Add User
          </Button>
        </div>
        {showspin ? (
          <Spiner />
        ) : (
          <Tables userdata={userdata}  deleteUser={deleteUser}/>
        )}
      </div>
    </div>
    </>
  );
};
