/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { editfunc, singleUsergetfunc } from '../../services/Apis';
import Card from "react-bootstrap/Card";
import { ToastContainer, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import { Spiner } from '../../components/spinner/Spinner';
import { BASE_URL } from '../../services/helper';
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import './edit.css'
import { updateUser } from '../../Context/ContextProvider';

export const Edit = () => {

  const { id } = useParams();
  const navigate = useNavigate();
  const {setUpdate} = useContext(updateUser);
  const [inputdata, setInputData] = useState({
    userName: "",
    email: "",
    mobile: "",
    address: ""
  });

  const [showspin, setShowSpin] = useState(true);

  const [image, setImage] = useState("");
  //get data from database
  const [imgdata,setImgdata] = useState("");
  const [preview, setPreview] = useState("");

  const setinputValue =(e)=>{
    
    const {name,value} = e.target;

   setInputData({...inputdata,[name]:value})
  }
  const setProfile = (e) => {
    setImage(e.target.files[0])
  }

  const userProfileGet = async () => {
    const response = await singleUsergetfunc(id);
    if(response.status === 200){
      setInputData(response.data);
      setImgdata(response.data.profile)

    }else{
      console.log("error");
    }
    
  };

  //submit userdata
  const submitUserData = async(e) => {
    e.preventDefault();
    const { userName, email, mobile, address } = inputdata;

    if (userName === "") {
      toast.error("User Name is Required !")
    } else if (email === "") {
      toast.error("Email is Required !")
    } else if (!email.includes("@")) {
      toast.error("Enter Valid Email !")
    } else if (mobile === "") {
      toast.error("Mobile is Required !")
    } else if (mobile.length > 10 || mobile.length < 10) {
      toast.error("Enter Valid Mobile!")
    } else if (address === "") {
      toast.error("location is Required !")
    } else {
      const data = new FormData();

      data.append("userName",userName)
      data.append("email",email)
      data.append("mobile",mobile)
      data.append("address",address)
      data.append("user_profile",image || imgdata)

      const config = {
        "Content-Type":"multipart/form-data"
      }
      const response = await editfunc(id,data,config);

      if(response.status === 200){
        setUpdate(response.data)
        navigate("/")
      }else{
        toast.error("Error!")
      }
    }
  }
  useEffect(()=>{
    userProfileGet();
  },[id])

  useEffect(()=>{
    if(image){
      setImgdata("")
      setPreview(URL.createObjectURL(image))
    }
    setTimeout(() => {
      setShowSpin(false);
    }, 1200);
  },[image])
  return (
    <>
    {
      showspin ? <Spiner/> : <div className="container">
         <h2 className="text-center mt-1">Update Your Details</h2>
         <Card className="shadow mt-3 p-3">
         <div className="profile_div text-center">
            <img src={image ? preview : `${BASE_URL}/uploads/${imgdata}`}alt="img" />
          </div> <Form>
            <Row>
            <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                <Form.Label>User Name</Form.Label>
                <Form.Control
                  type="text"
                  name="userName"
                  value={inputdata.userName}
                  placeholder="Enter UserName"
                  onChange={setinputValue}
                />
              </Form.Group>
              <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="text"
                  name="email"
                  value={inputdata.email}
                  placeholder="Enter Email"
                  onChange={setinputValue}
                />
              </Form.Group>
              <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  type="text"
                  name="mobile"
                  value={inputdata.mobile}
                  placeholder="Enter Mobile Number"
                  onChange={setinputValue}
                />
              </Form.Group>
              <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  type="text"
                  name="address"
                  value={inputdata.address}
                  placeholder="Enter Address"
                  onChange={setinputValue}
                />
              </Form.Group>
               <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                  <Form.Label>Select Your Profile</Form.Label>
                  <Form.Control type="file" name='user_profile'onChange={setProfile}  placeholder='Select Your Profile' />
                </Form.Group>
              <Button variant="primary" type="submit" onClick={submitUserData}>
                Submit
              </Button>
            </Row>
          </Form>


         </Card>
         <ToastContainer position="top-center" />
      </div>
    }
    </>
  )
}
