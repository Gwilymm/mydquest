/**
 * La fonction `Page` est un composant React qui enveloppe ses enfants avec un `SessionProvider` et
 * utilise `useAutoAnimate` pour le contexte global, potentiellement pour l'auto-animation.
 * @returns Le composant `Page` est renvoyé, qui prend en compte les accessoires `children` et
 * `session`. À l'intérieur du composant, il enveloppe le contenu avec un composant « SessionProvider »
 * de NextAuth et utilise également le hook « useAutoAnimate » de « @formkit/auto-animate/react » pour
 * configurer la fonctionnalité d'animation automatique. Le contenu de la page est enveloppé dans un
 * élément `div` avec un
 * 
 * Generated on 02/29/2024 Gwilymm
 */
// app/page.js

//not
"use client";
import { SessionProvider } from "next-auth/react";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import "./globals.css"; // Assurez-vous que le chemin d'accès est correct

export default function Page({ children, session }) {
  // Auto-animate peut être utilisé ici si nécessaire, ou tout autre contexte global
  const [ parent ] = useAutoAnimate();

  return (
    <SessionProvider session={session}>
      <div ref={parent}>
        {children}
      </div>
    </SessionProvider>
  );
}
