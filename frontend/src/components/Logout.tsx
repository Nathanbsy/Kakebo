"use client";
import styles from './css/Buttons.module.css';
import { LogOut } from 'lucide-react';
import api from "@/src/services/api";

async function handleLogout() {
    try {
        await api.post("/auth/logout")
        .then((resposta) => {
            console.log(resposta.data);
            alert("Logout realizado com sucesso!");
            // Redirecionar para a página de login ou homepage
            window.location.href = "/auth/login";
        })
        .catch((erro) => {
            console.error(erro);
            alert("Erro ao realizar logout.");
        });
    } catch (error) {
        console.error("Erro ao realizar logout:", error);
        alert("Erro ao realizar logout.");
    }   
}

export default function Logout() {
    return (
        <div className="fixed bottom-2 right-2 z-10">
            <button className={styles.logoutBtn} onClick={handleLogout}>
                <div className={styles.sign}>
                    <LogOut size={24} color="#fff" />
                </div>
                <div className={styles.texto}>Logout</div>
            </button>
        </div>
    );
}