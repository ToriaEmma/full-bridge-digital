export type BlogSection = {
  id: string;
  title: string;
  paragraphs: string[];
};

export type BlogPost = {
  slug: string;
  title: string;
  heroLines: [string, string, string];
  excerpt: string;
  time: string;
  date: string;
  image: string;
  imageAlt: string;
  intro: string;
  sections: BlogSection[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "reussir-transformation-digitale-pme",
    title: "Comment réussir la transformation digitale de votre PME",
    heroLines: ["Comment réussir la", "transformation digitale", "de votre PME"],
    excerpt: "Les étapes essentielles pour choisir les bons outils, structurer les priorités et obtenir des résultats durables.",
    time: "5 min de lecture",
    date: "22 juin 2026",
    image: "/blog-team.png",
    imageAlt: "Équipe réunie autour d’un projet de transformation digitale",
    intro: "La transformation digitale ne consiste pas à accumuler des logiciels. Elle consiste à résoudre des problèmes métier précis avec des outils adaptés, une méthode claire et une équipe impliquée.",
    sections: [
      {
        id: "commencer-par-les-besoins",
        title: "Commencer par les besoins, pas par les outils",
        paragraphs: [
          "Avant de choisir une plateforme, identifiez les tâches qui ralentissent réellement l’organisation : doubles saisies, suivi client dispersé, rapports manuels ou informations difficiles à retrouver.",
          "Classez ensuite ces irritants selon leur impact et leur urgence. Cette étape permet de concentrer le budget sur les changements qui produiront rapidement une amélioration mesurable.",
        ],
      },
      {
        id: "avancer-par-etapes",
        title: "Avancer par étapes mesurables",
        paragraphs: [
          "Un premier périmètre limité est souvent plus efficace qu’un grand chantier lancé en une seule fois. Testez la solution avec une équipe pilote, mesurez son adoption et ajustez les processus avant de généraliser.",
          "Des indicateurs simples — temps économisé, taux de conversion, erreurs évitées ou satisfaction des utilisateurs — rendent les progrès visibles et facilitent les décisions suivantes.",
        ],
      },
      {
        id: "accompagner-equipes",
        title: "Accompagner les équipes dans la durée",
        paragraphs: [
          "La technologie ne crée de valeur que lorsqu’elle est réellement utilisée. Prévoyez des formations courtes, une documentation accessible et un point de contact capable de répondre aux questions après le lancement.",
          "La transformation devient alors une capacité durable de l’entreprise, et non un projet isolé qui s’arrête à la mise en ligne.",
        ],
      },
    ],
  },
  {
    slug: "pourquoi-adopter-solution-saas",
    title: "Pourquoi adopter une solution SaaS pour vos opérations",
    heroLines: ["Pourquoi adopter une", "solution SaaS pour", "vos opérations"],
    excerpt: "Centralisation, accessibilité et évolutivité : les avantages concrets du cloud pour votre organisation.",
    time: "6 min de lecture",
    date: "22 juin 2026",
    image: "/blog-workshop.png",
    imageAlt: "Atelier consacré à la conception d’une solution SaaS",
    intro: "Une solution SaaS permet d’accéder à ses outils depuis un navigateur, sans infrastructure lourde à maintenir. Pour une organisation en croissance, ce modèle apporte surtout de la souplesse et une meilleure visibilité sur les opérations.",
    sections: [
      {
        id: "centraliser-information",
        title: "Centraliser l’information utile",
        paragraphs: [
          "Lorsque les données sont réparties entre des fichiers, des messages et plusieurs applications, les équipes perdent du temps et travaillent parfois avec des informations contradictoires.",
          "Une plateforme SaaS bien conçue rassemble les données essentielles dans un environnement commun, avec des droits d’accès adaptés à chaque rôle.",
        ],
      },
      {
        id: "grandir-sans-complexite",
        title: "Grandir sans multiplier la complexité",
        paragraphs: [
          "Le cloud permet d’ajouter des utilisateurs, des fonctionnalités ou de nouveaux sites sans reconstruire toute l’infrastructure technique.",
          "L’organisation peut ainsi commencer avec un périmètre simple, puis faire évoluer la plateforme au rythme de ses besoins et de son budget.",
        ],
      },
      {
        id: "choisir-bonne-solution",
        title: "Choisir une solution adaptée au métier",
        paragraphs: [
          "La meilleure solution n’est pas celle qui possède le plus de fonctions, mais celle qui correspond aux processus réels de l’entreprise et qui reste facile à utiliser.",
          "Avant de décider, vérifiez la sécurité, les possibilités d’intégration, la qualité du support et la capacité du produit à évoluer.",
        ],
      },
    ],
  },
  {
    slug: "ia-operations-entreprises",
    title: "Comment l’IA transforme les opérations des entreprises",
    heroLines: ["Comment l’IA transforme", "les opérations", "des entreprises"],
    excerpt: "Des usages concrets pour automatiser les tâches répétitives et libérer du temps pour les activités essentielles.",
    time: "8 min de lecture",
    date: "22 juin 2026",
    image: "/project-laptop.png",
    imageAlt: "Outil digital intégrant des fonctions d’intelligence artificielle",
    intro: "L’intelligence artificielle devient réellement utile lorsqu’elle s’intègre à un processus clair. Son rôle n’est pas de remplacer toutes les décisions humaines, mais d’accélérer les tâches répétitives et d’améliorer l’accès à l’information.",
    sections: [
      {
        id: "automatiser-taches",
        title: "Automatiser les tâches à faible valeur ajoutée",
        paragraphs: [
          "Classement de demandes, extraction de données, génération de comptes rendus ou réponses aux questions fréquentes : de nombreuses tâches peuvent être assistées sans bouleverser toute l’organisation.",
          "Commencer par un cas simple et fréquent permet de mesurer rapidement le temps gagné et la qualité du résultat.",
        ],
      },
      {
        id: "mieux-exploiter-donnees",
        title: "Mieux exploiter les données disponibles",
        paragraphs: [
          "L’IA peut aider à repérer des tendances, résumer des volumes importants d’informations ou proposer des priorités aux équipes commerciales et opérationnelles.",
          "La qualité des résultats dépend toutefois directement de la qualité des données et des règles définies autour de leur utilisation.",
        ],
      },
      {
        id: "garder-controle",
        title: "Garder le contrôle humain",
        paragraphs: [
          "Les décisions sensibles doivent rester vérifiables. Il faut définir les données autorisées, les validations humaines nécessaires et les situations dans lesquelles le système doit transmettre la demande à une personne.",
          "Une intégration responsable combine donc automatisation, sécurité, transparence et amélioration continue.",
        ],
      },
    ],
  },
];

export function getBlogPost(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}
