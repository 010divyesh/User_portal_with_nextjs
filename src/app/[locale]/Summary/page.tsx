"use client";
import React, { useEffect, useState } from "react";
import axios from "@/components/api";
import { userDef } from "@/components/types";
import Spinner from "@/components/Spinner";
import { useTranslations } from "next-intl";

export default function getSummary() {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<userDef[]>([]);
  const [countryCounts, setCountryCounts] = useState<{
    [country: string]: number;
  }>({});
  const [genderData, setGenderData] = useState<{ [gender: string]: number }>(
    {}
  );

  const t = useTranslations('Index.summary')


  const fetchData = async () => {
    setLoading(true);
    const res = await axios.get("/users");
    setUsers(res.data.items);
    setLoading(false);
  };
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    // Calculate genderdata
    let genderData: { [gender: string]: number } = {};
    users.forEach((user) => {
      genderData[user.gender] = (genderData[user.gender] || 0) + 1;
    });
    setGenderData(genderData);

    // calculate country count
    const counts: { [country: string]: number } = {};
    users.forEach((user) => {
      counts[user.country] = (counts[user.country] || 0) + 1;
    });
    setCountryCounts(counts);
  }, [users]);

  const getRowColor = (count: number) => {
    if (count >= 0 && count <= 3) {
      return "table-default";
    } else if (count >= 4 && count <= 7) {
      return "table-warning";
    } else {
      return "table-danger";
    }
  };


  return (
    <main>
     
        <title>{t('page_head')}</title>
      
      <div className="container">
        <h5 className="text-center mt-3">
          <b>{t('page_title')}</b>
        </h5>
       
        {loading ? (
          <Spinner />
        ) : (
          <>
            <div className="table1 d-flex justify-content-center text-center">
              <table
                className="table table-bordered mt-3"
                style={{ width: "40%" }}
              >
                <thead>
                  <tr>
                    <th scope="col">{t('country')}</th>
                    <th scope="col">{t('count')}</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(countryCounts)
                    .sort(([countryA], [countryB]) =>
                      countryA.localeCompare(countryB)
                    )
                    .map(([country, count]) => (
                      <tr key={country} className={getRowColor(count)}>
                        <td>{country}</td>
                        <td>{count}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
            <div className="table1 d-flex justify-content-center text-center">
              <table
                className="table table-bordered mt-5"
                style={{ width: "40%" }}
              >
                <thead>
                  <tr>
                    <th scope="col">{t('gender')}</th>
                    <th scope="col">{t('gender_count')}</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(genderData)
                    .sort(([genderA], [genderB]) =>
                      genderA.localeCompare(genderB)
                    )
                    .map(([gender, count]) => (
                      <tr>
                        <td>{gender}</td>
                        <td>{count}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </main>
  );
}