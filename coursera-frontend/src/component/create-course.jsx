
import { useState,useEffect } from "react";
import axios from "../api/axios"; // adjust path if needed
import { useNavigate , useParams} from "react-router-dom";
'use client';


export const CreateCourse = ()=> {
  const navigate = useNavigate();
  const [course, setCourse] = useState({
    title: "",
    discription: "",
    price: "",
    imageUrl: "",

  });

  const handleChange = (e) => {
    setCourse({ ...course, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      const creatorId = localStorage.getItem("userid"); // or get from login response
      console.log(creatorId)
      const response = await axios.post(
        "/admin/course",
        { ...course, createrId: creatorId },
        {
          headers: {
            token: token,
          },
        }
      );

      alert("Course created successfully!");
      navigate("/view/courses")
      setCourse({ title: "", discription: "", price: "", imageUrl: "" });
    } catch (error) {
      console.error("Error creating course:", error.response?.data || error.message);
      alert("Failed to create course: " + (error.response?.data?.message || "Unknown error"));
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow bg-white">
      <h1 className="text-2xl font-bold mb-4 text-center">Create Course</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Course Title"
          value={course.title}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <textarea
          name="discription"
          placeholder="Course Discription"
          value={course.discription}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          rows="3"
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={course.price}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="text"
          name="imageUrl"
          placeholder="Image URL"
          value={course.imageUrl}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Create Course
        </button>
      </form>
    </div>
  );
}

export const AdminCourseManager =  () => {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  // Fetch all courses
  const fetchCourses = async () => {
  try {
    const token = localStorage.getItem("token"); // adjust key name if needed

    const res = await axios.get("/admin/course/bulk", {
      headers: {
            token: token,
      },
    });

    if (Array.isArray(res.data)) {
      setCourses(res.data);
    } else if (Array.isArray(res.data.courses)) {
      setCourses(res.data.courses);
    } else {
      console.error("Unexpected response:", res.data);
      setCourses([]); // fallback to empty array
    }
    console.log(res.data)
  } catch (err) {
    console.error("Failed to fetch courses", err);
  }
};

  useEffect(() => {
    fetchCourses();
  }, []);

  // Delete a course
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/courses/${id}`);
      setCourses((prev) => prev.filter((course) => course._id !== id));
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">All Courses</h1>
        <button
          onClick={() => navigate("/create/course")}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + Create New Course
        </button>
      </div>

      {courses.length === 0 ? (
        <p>No courses available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div
              key={course._id}
              className="bg-white shadow-md rounded-xl p-4 border"
            >
              {/* Image */}
              {course.image && (
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-40 object-cover rounded-md mb-4"
                />
              )}

              {/* Title */}
              <h2 className="text-xl font-semibold mb-1">{course.title}</h2>

              {/* Price */}
              <p className="text-green-600 font-medium mb-2">
                Price: ₹{course.price}
              </p>

              {/* Description */}
              <p className="text-sm text-gray-600 mb-4">
                {course.discription?.slice(0, 100)}...
              </p>

              {/* Action Buttons */}
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => navigate(`/edit/course/${course._id}`)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(course._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// import { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "../api/axios"; // Adjust the path if needed
// 'use client';

export const EditCourse = () => {
  const { id } = useParams(); // course ID from URL
  const navigate = useNavigate();

  const [course, setCourse] = useState({
    title: "",
    discription: "",
    price: "",
    imageUrl: "",
  });

  // Fetch course details by ID
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(`/admin/course/${id}`, {
          headers: {
            token: token,
          },
        });

        if (res.data) {
          setCourse(res.data);
        }
      } catch (error) {
        console.error("Error fetching course:", error);
        alert("Failed to load course data.");
      }
    };

    fetchCourse();
  }, [id]);

  // Handle form input changes
  const handleChange = (e) => {
    setCourse({ ...course, [e.target.name]: e.target.value });
  };

  // Submit updated course
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      await axios.put(`/admin/course/${id}`, course, {
        headers: {
          token: token,
        },
      });

      alert("Course updated successfully!");
      navigate("/view/courses");
    } catch (error) {
      console.error("Update error:", error);
      alert("Failed to update course: " + (error.response?.data?.message || "Unknown error"));
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow bg-white">
      <h1 className="text-2xl font-bold mb-4 text-center">Edit Course</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          value={course.title}
          onChange={handleChange}
          placeholder="Course Title"
          className="w-full border p-2 rounded"
          required
        />
        <textarea
          name="discription"
          value={course.discription}
          onChange={handleChange}
          placeholder="Course Description"
          className="w-full border p-2 rounded"
          rows="3"
          required
        />
        <input
          type="number"
          name="price"
          value={course.price}
          onChange={handleChange}
          placeholder="Price"
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="text"
          name="imageUrl"
          value={course.imageUrl}
          onChange={handleChange}
          placeholder="Image URL"
          className="w-full border p-2 rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          Update Course
        </button>
      </form>
    </div>
  );
};


