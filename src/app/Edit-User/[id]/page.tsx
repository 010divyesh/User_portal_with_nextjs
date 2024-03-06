"use client";
import Form from "@/components/form";
import axios from "@/components/api";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { userDef } from "@/components/types";
import { useEffect, useState } from "react";
import Head from "next/head";
import Spinner from "@/components/Spinner";

export default function editUser() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<userDef>({
    name: "",
    age: "",
    gender: "",
    country: "",
  });
  let { id } = useParams();
  const router = useRouter();

  let fetchData = async () => {
    setLoading(true);
    let res = await axios.get(`/users/${id}`);
    setUser(res.data);
    setLoading(false);
  };

  let save = async (user: userDef) => {
    setLoading(true);
    await axios.put(`/users/${id}`, user);
    setLoading(false);
    router.push("/");
  };
  useEffect(() => {
    setLoading(true);
    fetchData();
    setLoading(false);
  }, [id]);


  const pageTitle="Edit User";

  return (
    <main>
      <Head>
        <title>{pageTitle}</title>
      </Head>
      {/* {loading?<Spinner/>:( */}
        <Form
          submitBtnLable="Update"
          title="EDIT USER"
          onSave={save}
          user={user}
          loading={loading}
        />
      {/* )} */}
    </main>
  );
}
