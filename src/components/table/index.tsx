import Link from "next/link";
import { useEffect, useState } from "react";
import { userDef } from "../types";
import Spinner from "@/components/Spinner";
import axios from "@/components/api";
import "./style.css";

export default function Table() {
  const [users, setUsers] = useState<userDef[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchInput, setSearchInput] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  const fetchData = async () => {
    setLoading(true);
    const res = await axios.get("/users");
    const sortedUsers = res.data.items.sort((a: userDef, b: userDef) =>
      a.name.localeCompare(b.name)
    );
    setUsers(sortedUsers);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value);
    setCurrentPage(1); // Reset pagination when filtering
  };

  const deleteUser = async (user: userDef) => {
    try {
      setLoading(true);
      await axios.delete(`/users/${user._uuid}`);
      fetchData();
      setLoading(false);
    } catch (error) {
      console.log("Error while deleting the user", error);
    }
  };

  // Filter users based on search input
  const filteredUsers =
    searchInput.length > 0
      ? users.filter((user) =>
          user.name.toLowerCase().includes(searchInput.toLowerCase())
        )
      : users;

  // Logic to calculate pagination
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  // console.log(indexOfFirstUser,indexOfLastUser,currentUsers)

  // Logic to change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <main>
      <div className="container">
        <h5 className="text-center mt-2">Population List</h5>
        {loading ? (
          <Spinner />
        ) : (
          <>
            <div className="card col-2 mb-1 mx-auto me-5">
              <input
                type="text"
                placeholder="Search items"
                value={searchInput}
                onChange={handleChange}
              ></input>
            </div>
            <Link href="/Add-User">
              <button className="btn btn-primary" type="submit">
                Create
              </button>
            </Link>
            <table className="table mt-3 table-bordered">
              <thead>
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Name</th>
                  <th scope="col">Age</th>
                  <th scope="col">Gender</th>
                  <th scope="col">Country</th>
                  <th scope="col">More Options</th>
                </tr>
              </thead>
              <tbody>
                {currentUsers.map((user, index) => (
                  <tr key={index}>
                    <td>{indexOfFirstUser + index + 1}</td>
                    <td>{user.name}</td>
                    <td>{user.age}</td>
                    <td>{user.gender}</td>
                    <td>{user.country}</td>
                    <td>
                      <div className="dropdown">
                        <button
                          className="btn btn-secondary dropdown-toggle"
                          type="button"
                        ></button>
                        <ul className="dropdown-menu">
                          <li>
                            <a
                              className="dropdown-item"
                              href={`/Edit-User/${user._uuid}`}
                            >
                              <img
                                src="./icons/pencil.svg"
                                alt="Edit"
                                style={{
                                  marginRight: "5px",
                                  filter: "invert(100%)",
                                }}
                              />
                              Edit
                            </a>
                          </li>
                          <li>
                            <a
                              className="dropdown-item"
                              onClick={() => deleteUser(user)}
                            >
                              <img
                                src="./icons/trash.svg"
                                alt="Delete"
                                style={{
                                  marginRight: "5px",
                                  filter: "invert(100%)",
                                }}
                              />
                              Delete
                            </a>
                          </li>
                        </ul>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/* Pagination controls */}
            <nav style={{ display: "flex", justifyContent: "center" }}>
              <ul className="pagination">
                <li
                  className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
                >
                  <a
                    className="page-link"
                    href="#"
                    onClick={() => paginate(currentPage - 1)}
                    aria-label="Previous"
                  >
                    <span aria-hidden="true">&laquo;</span>
                  </a>
                </li>
                {Array.from({
                  length: Math.ceil(filteredUsers.length / usersPerPage),
                }).map((_, index) => (
                  <li key={index} className={`page-item ${currentPage === index + 1 ? "active" : ""}`}>
                    <Link
                      onClick={() => paginate(index + 1)}
                      className="page-link"
                      href="#"
                    >
                      {index + 1}
                    </Link>
                  </li>
                ))}
                <li
                  className={`page-item ${
                    currentPage ===
                    Math.ceil(filteredUsers.length / usersPerPage)
                      ? "disabled"
                      : ""
                  }`}
                >
                  <a
                    className="page-link"
                    href="#"
                    onClick={() => paginate(currentPage + 1)}
                    aria-label="Next"
                  >
                    <span aria-hidden="true">&raquo;</span>
                  </a>
                </li>
              </ul>
            </nav>
          </>
        )}
      </div>
    </main>
  );
}