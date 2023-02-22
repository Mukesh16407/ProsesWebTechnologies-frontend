import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { usergetfunc } from "../../services/Apis";
import Button from "react-bootstrap/Button";
import { Tables } from "../../components/table/Tables";
import { Spiner } from "../../components/spinner/Spinner";

export const Home = () => {
  const navigate = useNavigate();

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

  useEffect(() => {
    userGet();
    setTimeout(() => {
      setShowSpin(false);
    }, 1200);
  }, []);

  return (
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
          <Tables userdata={userdata} userGet={userGet} />
        )}
      </div>
    </div>
  );
};
