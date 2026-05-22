import Link from "next/link";
import styles from '../components/css/Card.module.css';
import React from "react";

interface CardProps {
    titulo: string;
    corBg: string;
    corBgLight: string;
    corShadow: string;
    pagina: string;
    icon: React.ReactNode;
}

export default function Card({ pagina, titulo, corBg, corBgLight, corShadow, icon }: CardProps) {
    return (
        <Link href={pagina}>
            <div className={styles.card + ' ' + styles.icon} style={{ "--bg-color": corBg, "--bg-color-light": corBgLight, "--box-shadow-color": corShadow } as React.CSSProperties}>
                <div className={styles.overlay}></div>
                <div className={styles.circle}>
                    {icon}
                </div>
                <p>{titulo}</p>
            </div>
        </Link>
    );
}