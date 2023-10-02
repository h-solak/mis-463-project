import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Layout from "../../layout/Layout";
import Loader from "../../components/Loader";

const Generator = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1000);
  }, []);
  return (
    <Layout>
      <main>
        <div className="generator-container card-container absolute-center relative">
          {isLoading ? (
            <Loader
              style={{
                position: "absolute",
                left: "48%",
                top: "45%",
              }}
            />
          ) : (
            <div className="generator fade-in-from-left">
              <div className="form-item">
                <h4 className="m-0 fw-bold">Generate Playlists</h4>
                <p className="m-0 text-secondary">
                  Create a playlist for yourself, your business, or a friend of
                  yours
                </p>
              </div>
              <div className="form-item">
                <h6 className="m-0">Why do you want a playlist for?</h6>
                <select className="w-100">
                  <option>Just for fun</option>
                  <option>My cafe</option>
                  <option>Bla Bla</option>
                </select>
              </div>
              <div className="form-item">
                <h6 className="m-0">Do you love indie music?</h6>
                <select className="w-100">
                  <option>Yes</option>
                  <option>I am a terrorist</option>
                </select>
              </div>
              <Button variant="contained">Submit</Button>
            </div>
          )}
        </div>
      </main>
    </Layout>
  );
};

export default Generator;
