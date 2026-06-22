"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./login.module.css";

export default function DashboardLogin() {
  const [passcode, setPasscode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ passcode }),
      });
      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Code d’accès incorrect.");
        return;
      }

      router.push("/dashboard");
    } catch {
      setError("Impossible de contacter le serveur.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className={styles.page}>
      <section className={styles.card} aria-labelledby="login-title">
        <div className={styles.logo} aria-label="Full Bridge Digital">
          <i>•</i>
        </div>

        <div className={styles.heading}>
          <h1 id="login-title">Connexion <span>admin</span></h1>
          <p>
            Saisissez le code d’accès administrateur pour gérer les pages,
            articles et projets.
          </p>
        </div>

        <form className={styles.form} onSubmit={handleLogin}>
          <label htmlFor="admin-passcode">Code d’accès</label>
          <input
            id="admin-passcode"
            type="password"
            inputMode="numeric"
            autoComplete="current-password"
            placeholder="••••••"
            value={passcode}
            onChange={(event) => setPasscode(event.target.value)}
            required
            autoFocus
          />
          <button type="submit" disabled={loading}>
            {loading ? "Connexion…" : "Se connecter"}
          </button>
          {error && <p className={styles.error} role="alert">{error}</p>}
        </form>

        <Link className={styles.back} href="/">Retour au site</Link>
      </section>
    </main>
  );
}
