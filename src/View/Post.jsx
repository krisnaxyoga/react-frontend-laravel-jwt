//import useState dan useEffect
import { useState, useEffect } from "react";

//import api
import api from "./../api/index";

//import Link
import { Link, useNavigate } from "react-router-dom";

export default function PostIndex() {
  // state user
  const [user, setUser] = useState({});

  // define history
  const history = useNavigate();

  // token
  const token = localStorage.getItem("token");

  // set axios header dengan type Authorization + Bearer token
  api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  // ini state
  const [posts, setPosts] = useState([]);

  // define method
  const fetchDataPosts = async () => {
    try {
      // fetch user from Rest API
      const response = await api.get("/api/post"); // Menggunakan instance "api" yang sudah dibuat

      // set response user to state
      setPosts(response.data.data.data);

    } catch (error) {
      if (error.response && error.response.status === 401) {
        // Token tidak valid, arahkan pengguna kembali ke halaman login
        localStorage.removeItem("token");
        history("/");
      } else {
        // Penanganan kesalahan lainnya
        console.error("Terjadi kesalahan:", error);
      }
    }
  };

  // run hook useEffect
  useEffect(() => {
    // call method "fetchDataPosts"
    fetchDataPosts();
  }, []);

   //method deletePost
   const deletePost = async (id) => {
            
        //delete with api
        await api.get(`/api/post/destroy/${id}`)
            .then(() => {
                
                //call method "fetchDataPosts"
                fetchDataPosts();

            })
    }

  return (
    <div className="container mt-5 mb-5">
        {/* user : {user} */}
      <div className="row">
        <div className="col-md-12">
          <Link
            to="/posts/create"
            className="btn btn-md btn-success rounded shadow border-0 mb-3"
          >
            ADD NEW POST
          </Link>
          <div className="card border-0 rounded shadow">
            <div className="card-body">
              <table className="table table-bordered">
                <thead className="bg-dark text-white">
                  <tr>
                    <th scope="col">Image</th>
                    <th scope="col">Title</th>
                    <th scope="col">Content</th>
                    <th scope="col" style={{ width: "15%" }}>
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {posts.length > 0 ? (
                    posts.map((post, index) => (
                      <tr key={index}>
                        <td className="text-center">
                          <img
                            src={post.image}
                            alt={post.image}
                            width="200"
                            className="rounded"
                          />
                        </td>
                        <td>{post.title}</td>
                        <td>{post.content}</td>
                        <td className="text-center">
                          <Link
                            to={`/posts/edit/${post.id}`}
                            className="btn btn-sm btn-primary rounded-sm shadow border-0 me-2"
                          >
                            EDIT
                          </Link>
                          <button onClick={() => deletePost(post.id)} className="btn btn-sm btn-danger rounded-sm shadow border-0">DELETE</button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="text-center">
                        <div className="alert alert-danger mb-0">
                          Data Belum Tersedia!
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
