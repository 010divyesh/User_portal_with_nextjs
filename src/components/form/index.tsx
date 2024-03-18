import React from "react";
import { useTranslations } from "next-intl";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import { userDef } from "@/components/types";
import Spinner from "@/components/Spinner";
import { countries, genders } from "./config.js";
import classNames from "classnames";

interface props {
  submitBtnLable: string;
  title?: string;
  user?: userDef;
  loading?: boolean;
  save: (user: userDef) => void; // Define the save function type
}

const SignupSchema = Yup.object().shape({
  name: Yup.string().min(2).max(25).required("Please enter your name"),
  age: Yup.number()
    .min(16, "Please enter age greater than 16 ")
    .max(60, "Please enter age less than 60")
    .required("Please enter your age"),
  gender: Yup.string().required("Please select a gender"),
  country: Yup.string().required("Please select a gender"),
});

export default function UserForm({
  submitBtnLable,
  user,
  title,
  loading,
  save,
}: props) {

  const clearForm = () => {
    const initialValues = {
      name: "",
      age: "",
      gender: "",
      country: "",
    };
    // Reset form using Formik's resetForm function
    formikRef.current?.resetForm({ values: initialValues });
  };

  const formikRef = React.useRef<any>(null);
  const t = useTranslations("Index.Form");
  return (
    <main>
      <h3 className="text-center">{title}</h3>
      {loading ? (
        <Spinner />
      ) : (
        <Formik
        innerRef={formikRef}
          initialValues={{
            name: user ? user.name : "",
            age: user ? user.age : "",
            gender: user ? user.gender : "",
            country: user ? user.country : "",
          }}
          validationSchema={SignupSchema}
          onSubmit={save}
        >
          {({ errors, touched }) => (
            <div className="container">
              <div className="d-flex justify-content-center">
                <Form
                  className="row g-3 card mt-2 p-3 col-md-6"
                  style={{ backgroundColor: "gainsboro" }}
                >
                  {/* for name */}
                  <div>
                    <label className="col-sm-2-col-form-label">
                      {t("name")}
                    </label>
                    <Field
                      name="name"
                      placeholder={t("enter_name")}
                      className={
                        classNames('form-control',{'is-invalid':touched.name && errors.name})}
                    />
                    {errors.name && touched.name && (
                      <div className="invalid-feedback">{errors.name}</div>
                    )}
                  </div>

                  {/* for age */}
                  <div>
                    <label className="col-sm-2-col-form-label">
                      {t("age")}
                    </label>
                    <Field
                      name="age"
                      type="number"
                      placeholder={t("enter_age")}
                      className={
                        classNames('form-control',{'is-invalid':touched.age && errors.age})}
                    />
                    {errors.age && touched.age ? (
                      <div className="invalid-feedback">{errors.age}</div>
                    ) : null}
                  </div>

                  {/* for gender */}
                  <div>
                    <label className="col-sm-2-col-form-label">
                      {t("gender")}
                    </label>
                    <div>
                      {genders.map((gender) => (
                        <label key={gender} className="form-check">
                          <Field
                            className="form-check-input"
                            type="radio"
                            name="gender"
                            value={gender}
                          />
                          {gender}
                        </label>
                      ))}
                    </div>
                    {errors.gender && touched.gender ? (
                      <div>{errors.gender}</div>
                    ) : null}
                    <div className="valid-feedback"></div>
                  </div>

                  {/* for country */}
                  <div>
                    <label className="col-sm-2-col-form-label">
                      {t("country")}
                    </label>
                    <Field
                      name="country"
                      as="select"
                      className={
                        classNames('form-select',{'is-invalid':touched.country && errors.country})}
                    >
                      <option selected disabled value="">
                      {t("choose")}
                      </option>
                      {countries.map((country) => (
                        <option key={country} value={country}>
                          {country}
                        </option>
                      ))}
                    </Field>
                    {errors.country && touched.country ? (
                      <div
                        className="invalid-feedback"
                        style={{ color: "red" }}
                      >
                        {errors.country}
                      </div>
                    ) : null}
                  </div>

                  {/* for buttons */}

                  <div className="buttons">
                    <div className="d-flex flex-row mb-2">
                      <div className=" p-2">
                        <button type="submit" className="btn btn-primary">
                          {submitBtnLable}
                        </button>
                      </div>
                      <div className="p-2">
                        <button
                          type="button"
                          className="btn btn-warning"
                          onClick={clearForm}
                        >
                          {t("clear")}
                        </button>
                      </div>
                      <div className="p-2 ">
                        <Link href="/">
                          <button type="button" className="btn btn-danger">
                            {t("cancle")}
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </Form>
              </div>
            </div>
          )}
        </Formik>
      )}
    </main>
  );
}
