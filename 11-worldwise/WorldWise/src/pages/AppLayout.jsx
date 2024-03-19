import React from "react";
import SideBar from "../components/Sidebar";
import styles from "./AppLayout.module.css";
import Map from "../components/Map";

export default function AppLayout() {
  return (
    <div className={styles.app}>
      <SideBar></SideBar>
      <Map></Map>
    </div>
  );
}
