"use client";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { ChangeEvent, useTransition } from "react";

export default function LocalSwitcher() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const localActive = useLocale();

  const onSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const nextLocale = e.target.value;
    startTransition(() => {
      router.replace(`/${nextLocale}`);
    });
  };
  return (
    <div className="d-flex flex-row align-items-center">
    <p className="pt-1">Language</p>
    <select
      defaultValue={localActive}
      className="default p-1  mx-4"
      onChange={onSelectChange}
      disabled={isPending}
    >
      <option value="en">English</option>
      <option value="hi">Hindi</option>
    </select>
  </div>
  );
}
