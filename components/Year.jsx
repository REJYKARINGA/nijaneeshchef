"use client";
import { useEffect, useState } from "react";

/* The current year: built in at deploy time, then corrected in the visitor's browser so it never goes stale. */
export default function Year() {
  const [year, setYear] = useState(new Date().getFullYear());
  useEffect(() => { setYear(new Date().getFullYear()); }, []);
  return <>{year}</>;
}
