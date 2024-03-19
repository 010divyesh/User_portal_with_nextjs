"use client";
import { Link } from "@/i18n";
import { useEffect, useState } from "react";
import { userDef } from "../types";
import Spinner from "@/components/Spinner";
import axios from "@/components/api";
import "./style.css";
import { useTranslations } from "next-intl";
import classNames from "classnames";
import Pagination from "../pagination";

export default function Table() {
  const [users, setUsers] = useState<userDef[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchInput, setSearchInput] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  const t = useTranslations("Index.Table");

  const fetchData = async () => {
    setLoading(true);
    const res = await axios.get("/users");
    let users = res.data.items;
    users.forEach(
      (user: {
        created: string;
        _created: number;
        modified: string;
        _modified: number;
      }) => {
        user.created = new Date(user._created * 1000).toLocaleDateString(
          t("locale"),
          { day: "numeric", month: "long", year: "numeric" }
        );
        user.modified = new Date(user._modified * 1000).toLocaleDateString(
          t("locale"),
          { day: "numeric", month: "long", year: "numeric" }
        );
      }
    );
    const sortedUsers = users.sort((a: { name: string }, b: { name: string }) =>
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

  // Logic to change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <main>
      <div className="container">
        <h5 className="text-center mt-2">{t("app_title")}</h5>
        {loading ? (
          <Spinner />
        ) : (
          <>
            <div className="d-flex justify-content-between mb-4">
              <div>
                <Link href="/Add-User">
                  <button className="btn btn-primary" type="submit">
                    {t("create_button")}
                  </button>
                </Link>
              </div>
              <div
                className="input-group justify-content-end"
                style={{ maxWidth: "210px" }}
              >
                <span className="input-group-text">
                  <img src="./icons/search.svg" />
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder={t("search")}
                  value={searchInput}
                  onChange={handleChange}
                ></input>
              </div>
            </div>
            <table className="table mt-4 table-bordered">
              <thead>
                <tr>
                  <th scope="col">{t("user_id")}</th>
                  <th scope="col">{t("user_name")}</th>
                  <th scope="col">{t("user_age")}</th>
                  <th scope="col">{t("user_gender")}</th>
                  <th scope="col">{t("user_country")}</th>
                  <th scope="col">{t("created")}</th>
                  <th scope="col">{t("modified")}</th>
                  <th scope="col">{t("option")}</th>
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
                    <td>{user.created}</td>
                    <td>{user.modified}</td>
                    <td>
                      <div className="dropdown">
                        <button
                          className="btn btn-secondary dropdown-toggle"
                          type="button"
                        ></button>
                        <ul className="dropdown-menu">
                          <li>
                            <Link
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
                              {t("edit")}
                            </Link>
                          </li>
                          <li>
                            <button
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
                              {t("delete")}
                            </button>
                          </li>
                        </ul>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/* Pagination controls */}
            {/* <nav style={{ display: "flex", justifyContent: "center" }}>
              <ul className="pagination">
                <li
                  className={classNames("page-item", {
                    disabled: currentPage === 1,
                  })}
                >
                  <button
                    className="page-link"
                    onClick={() => paginate(currentPage - 1)}
                    aria-label="Previous"
                  >
                    <span aria-hidden="true">&laquo;</span>
                  </button>
                </li>
                {Array.from({
                  length: Math.ceil(filteredUsers.length / usersPerPage),
                }).map((_, index) => (
                  <li
                    key={index}
                    className={classNames("page-item", {
                      active: currentPage === index + 1,
                    })}
                  >
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
                  className={classNames("page-item", {
                    disabled:
                      currentPage ===
                      Math.ceil(filteredUsers.length / usersPerPage),
                  })}
                >
                  <button
                    className="page-link"
                    onClick={() => paginate(currentPage + 1)}
                    aria-label="Next"
                  >
                    <span aria-hidden="true">&raquo;</span>
                  </button>
                </li>
              </ul>
            </nav> */}
             {!loading && (
              <Pagination
                currentPage={currentPage}
                totalPages={Math.ceil(filteredUsers.length / usersPerPage)}
                paginate={paginate}
              />
            )}
          </>
        )}
      </div>
    </main>
  );
}
