"use client";
import React, { useState } from "react";
import Form from "@/components/form";
import axios from "@/components/api";
import { userDef } from "@/components/types";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

export default function AddUser() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const t = useTranslations('Index.add_user')


  const save = async (user: userDef) => {
    setLoading(true);
    const res = await axios.post("/users", [user]);
    console.log(user);
    setLoading(false);
    router.push("/");
  };

 
  return (
    <main>
        <title>{t('page_title')}</title>
      <Form
        submitBtnLable={t('sub_leble')}
        title={t('page_title')}
        save={save}
        loading={loading}
      />
    </main>
  );
}
