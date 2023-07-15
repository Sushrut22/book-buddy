import React from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { Outlet } from "react-router-dom";
import axios from "axios";

export let dataAfterML = {};
export let dataforReadList = {};
export let dataforRatedList = {};
const Home = () => {
  React.useEffect(() => {
    const postData = {
      // Your data to be sent in the POST request
      userid: 1,
    };

    axios
      .post("http://localhost:5000/get_order", postData)
      .then((response) => {
        // Handle the successful response
        console.log("POST request successful");
        dataAfterML = response.data;
      })
      .catch((error) => {
        // Handle errors
        console.error("Error:", error);
      });
  }, []);

  React.useEffect(() => {
    axios
      .post("http://localhost:5000/list_readbooks", {
        userid: 1,
      })
      .then((response) => {
        // console.log(response.data); // Handle the response data
        dataforReadList = response.data;
      })
      .catch((error) => {
        console.error("Post request nahi hui"); // Handle the error
      });
  }, []);

  React.useEffect(() => {
    axios
      .post("http://localhost:5000/list_ratedbooks", {
        userid: 1,
      })
      .then((response) => {
        // console.log(response.data); // Handle the response data
        dataforRatedList = response.data;
      })
      .catch((error) => {
        console.error("Post request nahi hui"); // Handle the error
      });
  }, []);

  return (
    <main>
      <Header />
      <Outlet />
      <Footer />
    </main>
  );
};

export default Home;
