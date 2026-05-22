"use client";
import { ArrowRightIcon } from "lucide-react";
import styles from "./css/Buttons.module.css";

export default function Back() {
    return (
        <div className="fixed top-2 left-2 z-10">
            <button className={styles.button} onClick={() => window.history.back()}>
                <div className={styles["button-box"]}>
                    <span className={styles["button-elem"]}>
                        <ArrowRightIcon size={24} color="#000" />
                    </span>
                    <span className={styles["button-elem"]}>
                        <ArrowRightIcon size={24} color="#000" />
                    </span>
                </div>
            </button>
        </div>
    );
}
