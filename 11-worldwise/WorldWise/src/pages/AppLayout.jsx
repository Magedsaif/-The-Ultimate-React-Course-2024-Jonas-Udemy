import React from "react";
import SideBar from "../components/Sidebar";
import styles from "./AppLayout.module.css";
import Map from "../components/Map";
import User from "../components/User";

export default function AppLayout() {
  return (
    <div className={styles.app}>
      <SideBar></SideBar>
      <User></User>
      <Map></Map>
    </div>
  );
}
