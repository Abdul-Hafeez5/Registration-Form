import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    city: "",
    gender: "",
    skills: [],
    image: null,
  });
  const [submittedData, setSubmiitedData] = useState([]);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    setFormData((prevData) => {
      if (type === "checkbox") {
        const updatedSkills = checked
          ? [...prevData.skills, value]
          : prevData.skills.filter((skill) => skill !== value);

        return {
          ...prevData,
          skills: updatedSkills,
        };
      } else if (type === "file") {
        return {
          ...prevData,
          image: files[0],
        };
      } else {
        return {
          ...prevData,
          [name]: value,
        };
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmiitedData((prevData) => [...prevData, formData]);
    setFormData({
      name: "",
      email: "",
      city: "",
      gender: "",
      skills: [],
      image: null,
    });
  };

  return (
    <>
      <h2>Enrollment Form</h2>
      <div className="main-container">
        <div className="container form-container">
          <form className="form" onSubmit={handleSubmit}>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />

            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <label htmlFor="city">City:</label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
            />

            <div className="gender">
              <label>Gender:</label>

              <input
                type="radio"
                name="gender"
                value="male"
                checked={formData.gender === "male"}
                onChange={handleChange}
              />
              <label>Male</label>

              <input
                type="radio"
                name="gender"
                value="female"
                checked={formData.gender === "female"}
                onChange={handleChange}
              />
              <label>Female</label>
            </div>

            <div className="skills">
              <label>Skills:</label>
              <input
                type="checkbox"
                name="skills"
                value="JavaScript"
                checked={formData.skills.includes("JavaScript")}
                onChange={handleChange}
              />
              <label>JavaScript</label>

              <input
                type="checkbox"
                name="skills"
                value="React Js"
                checked={formData.skills.includes("React Js")}
                onChange={handleChange}
              />
              <label>React Js</label>

              <input
                type="checkbox"
                name="skills"
                value="Node JS"
                checked={formData.skills.includes("Node JS")}
                onChange={handleChange}
              />
              <label>Node JS</label>
            </div>

            <label htmlFor="image">Upload Image:</label>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={handleChange}
            />

            <div className="buttons">
              <button type="submit">Submit</button>
            </div>
          </form>
        </div>
        {submittedData.length > 0 && (
          <div className="submitted-data container">
            <table>
              <thead>
                <tr>
                  <th>Details</th>
                  <th>Photo</th>
                </tr>
              </thead>
              <tbody>
                {submittedData.map((data, index) => (
                  <tr key={index}>
                    <p>{data.name}</p>
                    <p>{data.email}</p>
                    <p>{data.city}</p>
                    <p>{data.gender}</p>
                    <p>{data.skills.join(", ")}</p>
                    <td>
                      {data.image && (
                        <img
                          src={URL.createObjectURL(data.image)}
                          alt={`profile-${index}`}
                        />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
              <br />
            </table>
          </div>
        )}
      </div>
    </>
  );
};

export default App;
