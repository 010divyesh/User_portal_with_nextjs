"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { userDef } from "@/components/types";
import Spinner from "@/components/Spinner";
import { countries, genders } from "./config.js";
import {  useTranslations } from "next-intl";

interface props {
  submitBtnLable: string;
  title: string;
  user?: userDef;
  onSave: (user: userDef) => void;
  loading?: boolean;
}

export default function Form({
  submitBtnLable,
  onSave,
  user,
  title,
  loading,
}: props) {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [country, setCountry] = useState("");

  const t = useTranslations('Index.Form')
  // const messages = useMessages();
  // const locale  = useLocale();



  const save = (event: React.SyntheticEvent) => {
    let user: userDef = { name, age, gender, country };
    event.preventDefault();
    // console.log(user)
    onSave(user);
  };

  const clearForm = () => {
    setName("");
    setAge("");
    setGender("");
    setCountry("");
  };

  useEffect(() => {
    if (user) {
      setName(user.name);
      setAge(user.age);
      setGender(user.gender);
      setCountry(user.country);
    }
  }, [user]);

  return (
    <main>
      {/* <NextIntlClientProvider > */}
      <div className="container my-3">
        <h4 className="text-center">{title}</h4>
        {loading ? (
          <Spinner />
        ) : (
          <form onSubmit={save} className="mt-4">
            <div className="row mb-3">
              <label className="col-sm-2 col-form-label">{t('name')}</label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  required
                  placeholder={t('enter_name')}
                  onChange={(event) => setName(event.currentTarget.value)}
                  value={name}
                />
              </div>
            </div>
            <div className="row mb-3">
              <label className="col-sm-2 col-form-label">{t('age')}</label>
              <div className="col-sm-10">
                <input
                  type="number"
                  name="age"
                  className="form-control"
                  required
                  placeholder={t('enter_age')}
                  onChange={(event) => setAge(event.currentTarget.value)}
                  value={age}
                />
              </div>
            </div>
            <div className="row mb-3">
              <label className="col-sm-2 col-form-label">{t('gender')}</label>
              <div className="col-sm-10">
                {genders.map((item, index) => (
                  <div key={index} className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="gender"
                      required
                      value={item.value}
                      checked={gender === item.value}
                      onChange={(event) => setGender(event.currentTarget.value)}
                    />
                    <label
                      className="form-check-label"
                      htmlFor={`gender${index}`}
                    >
                      {item.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <div className="row mb-3">
              <label htmlFor="inputName" className="col-sm-2 col-form-label">
              {t('country')}
              </label>
              <div className="col-sm-10">
                <select
                  id="inputState"
                  className="form-select"
                  name="country"
                  required
                  value={country}
                  onChange={(event) => setCountry(event.currentTarget.value)}
                >
                  <option selected disabled value="">
                  {t('choose')}
                  </option>
                  {countries.map((item, index) => (
                    <option key={index} value={item.value}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="d-flex flex-row mb-3">
              <div className="me-2 mt-3">
                <button type="submit" className="btn btn-primary">
                  {submitBtnLable}
                </button>
              </div>
              <div className="me-2 mt-3">
                <button
                  type="submit"
                  className="btn btn-warning"
                  onClick={clearForm}
                >
                  {t('clear')}
                </button>
              </div>
              <div className="me-2 mt-3">
                <Link href="/">
                  <button type="button" className="btn btn-danger">
                  {t('cancle')}
                  </button>
                </Link>
              </div>
            </div>
          </form>
        )}
      </div>
      {loading && <Spinner />}
      {/* </NextIntlClientProvider> */}
    </main>
  );
}