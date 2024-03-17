"use client";
import Form from "@/components/form";
import axios from "@/components/api";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { userDef } from "@/components/types";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";


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

  const t = useTranslations('Index.edit_user')

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
  }, [id]);

  return (
    <main>
        <title>{t('page_title')}</title>      
      {/* {loading?<Spinner/>:( */}
        <Form
          submitBtnLable={t('sub_leble')}
          title={t('page_title')}
          save={save}
          user={user}
          loading={loading}
        />
      {/* )} */}
    </main>
  );
}
