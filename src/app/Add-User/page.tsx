"use client";
import React, { useState } from "react";
import Form from "@/components/form";
import axios from "@/components/api";
import { userDef } from "@/components/types";
import { useRouter } from "next/navigation";

export default function AddUser() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const save = async (user: userDef) => {
    setLoading(true);
    const res = await axios.post("/users", [user]);
    console.log(user);
    setLoading(false);
    router.push("/");
  };

  const pageTitle = "Add User";
  return (
    <main>
        <title>{pageTitle}</title>
      <Form
        submitBtnLable="ADD"
        title="ADD USER"
        onSave={save}
        loading={loading}
      />
    </main>
  );
}
