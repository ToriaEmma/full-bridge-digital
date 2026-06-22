"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Trash2,
  Edit,
  Plus,
  LogOut,
  Mail,
  BookOpen,
  Layers,
  X,
  Save,
} from "lucide-react";

type BlogSection = {
  id: string;
  title: string;
  paragraphs: string[];
};

type BlogPost = {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  time: string;
  date: string;
  image: string;
  imageAlt: string;
  intro: string;
  sections?: BlogSection[];
};

type Project = {
  _id: string;
  client: string;
  title: string;
  year: string;
  image: string;
  alt: string;
  className: string;
};

type Lead = {
  _id: string;
  name: string;
  company?: string;
  email: string;
  phone?: string;
  service: string;
  createdAt: string;
  message: string;
};

export default function Dashboard() {
  const [authorized, setAuthorized] = useState(false);
  const [activeTab, setActiveTab] = useState<"leads" | "blogs" | "projects">(
    "leads"
  );

  // Data states
  const [leads, setLeads] = useState<Lead[]>([]);
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);

  // Loading & error states
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Modals state
  const [showBlogModal, setShowBlogModal] = useState(false);
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [editingBlog, setEditingBlog] = useState<BlogPost | null>(null);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  // Blog Form State
  const [blogForm, setBlogForm] = useState({
    title: "",
    slug: "",
    excerpt: "",
    time: "",
    date: "",
    image: "",
    imageAlt: "",
    intro: "",
    sectionsText: "", // Title and paragraph blocks as text for easy entry
  });

  // Project Form State
  const [projectForm, setProjectForm] = useState({
    client: "",
    title: "",
    year: "",
    image: "",
    alt: "",
    className: "bridge-work-card-left",
  });

  const router = useRouter();

  // 1. Verify Authentication status
  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch("/api/admin/check");
        const data = await res.json();
        if (!data.authenticated) {
          router.push("/dashboard/login");
        } else {
          setAuthorized(true);
          fetchData();
        }
      } catch {
        router.push("/dashboard/login");
      }
    }
    checkAuth();
  }, [router]);

  // 2. Fetch all data
  async function fetchData() {
    setLoading(true);
    setError(null);
    try {
      const [leadsRes, blogsRes, projectsRes] = await Promise.all([
        fetch("/api/admin/leads"),
        fetch("/api/admin/blogs"),
        fetch("/api/admin/projects"),
      ]);

      const leadsData = await leadsRes.json();
      const blogsData = await blogsRes.json();
      const projectsData = await projectsRes.json();

      if (leadsRes.ok) setLeads(leadsData.leads || []);
      if (blogsRes.ok) setBlogs(blogsData.posts || []);
      if (projectsRes.ok) setProjects(projectsData.projects || []);
    } catch {
      setError("Erreur lors de la récupération des données.");
    } finally {
      setLoading(false);
    }
  }

  // 3. Logout action
  async function handleLogout() {
    try {
      await fetch("/api/admin/logout", { method: "POST" });
      router.push("/dashboard/login");
    } catch {
      console.error("Logout error");
    }
  }

  // Helper to parse sections text into proper array format
  // Sections format: Section Title ===\nParagraph 1\n\nParagraph 2\n\n=== Section 2 Title ===\nParagraph 1
  function parseSections(text: string) {
    if (!text.trim()) return [];
    const sectionBlocks = text.split("===").filter((block) => block.trim());
    const parsed = [];

    for (let i = 0; i < sectionBlocks.length; i += 2) {
      const title = sectionBlocks[i]?.trim();
      const content = sectionBlocks[i + 1]?.trim();
      if (title && content) {
        const paragraphs = content
          .split("\n\n")
          .map((p) => p.trim())
          .filter((p) => p);
        parsed.push({
          id: title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
          title,
          paragraphs,
        });
      }
    }
    return parsed;
  }

  // Helper to convert sections array into formatted text for editing
  function formatSections(sections: BlogSection[]) {
    return sections
      .map((s) => `=== ${s.title} ===\n${s.paragraphs.join("\n\n")}`)
      .join("\n\n");
  }

  // 4. Save Blog (Create/Edit)
  async function handleSaveBlog(e: React.FormEvent) {
    e.preventDefault();
    setActionLoading(true);
    setError(null);

    const parsedSections = parseSections(blogForm.sectionsText);
    const postData = {
      title: blogForm.title,
      slug: blogForm.slug,
      excerpt: blogForm.excerpt,
      time: blogForm.time,
      date: blogForm.date,
      image: blogForm.image,
      imageAlt: blogForm.imageAlt,
      intro: blogForm.intro,
      heroLines: [
        blogForm.title.slice(0, 20),
        blogForm.title.slice(20, 40) || " ",
        blogForm.title.slice(40) || " ",
      ], // Auto split or fallback
      sections: parsedSections,
    };

    try {
      const url = "/api/admin/blogs";
      const method = editingBlog ? "PUT" : "POST";
      const bodyData = editingBlog ? { id: editingBlog._id, ...postData } : postData;

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bodyData),
      });

      const result = await response.json();

      if (!response.ok) {
        setError(
          result.error
            ? typeof result.error === "object"
              ? Object.values(result.error as Record<string, unknown>).flat().join(" ")
              : result.error
            : "Une erreur est survenue."
        );
      } else {
        setShowBlogModal(false);
        setEditingBlog(null);
        fetchData();
      }
    } catch {
      setError("Impossible de soumettre les modifications.");
    } finally {
      setActionLoading(false);
    }
  }

  // 5. Delete Blog
  async function handleDeleteBlog(id: string) {
    if (!confirm("Voulez-vous vraiment supprimer cet article ?")) return;
    setActionLoading(true);
    try {
      const res = await fetch(`/api/admin/blogs?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        fetchData();
      } else {
        const data = await res.json();
        alert(data.error || "Erreur de suppression.");
      }
    } catch {
      alert("Erreur lors de la suppression.");
    } finally {
      setActionLoading(false);
    }
  }

  // 6. Save Project (Create/Edit)
  async function handleSaveProject(e: React.FormEvent) {
    e.preventDefault();
    setActionLoading(true);
    setError(null);

    try {
      const url = "/api/admin/projects";
      const method = editingProject ? "PUT" : "POST";
      const bodyData = editingProject
        ? { id: editingProject._id, ...projectForm }
        : projectForm;

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bodyData),
      });

      const result = await response.json();

      if (!response.ok) {
        setError(
          result.error
            ? typeof result.error === "object"
              ? Object.values(result.error as Record<string, unknown>).flat().join(" ")
              : result.error
            : "Une erreur est survenue."
        );
      } else {
        setShowProjectModal(false);
        setEditingProject(null);
        fetchData();
      }
    } catch {
      setError("Impossible de soumettre les modifications.");
    } finally {
      setActionLoading(false);
    }
  }

  // 7. Delete Project
  async function handleDeleteProject(id: string) {
    if (!confirm("Voulez-vous vraiment supprimer cette réalisation ?")) return;
    setActionLoading(true);
    try {
      const res = await fetch(`/api/admin/projects?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        fetchData();
      } else {
        const data = await res.json();
        alert(data.error || "Erreur de suppression.");
      }
    } catch {
      alert("Erreur lors de la suppression.");
    } finally {
      setActionLoading(false);
    }
  }

  // Helpers to trigger modals for new/editing
  function openNewBlog() {
    setEditingBlog(null);
    setBlogForm({
      title: "",
      slug: "",
      excerpt: "",
      time: "5 min de lecture",
      date: new Date().toLocaleDateString("fr-FR", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
      image: "/blog-team.png",
      imageAlt: "",
      intro: "",
      sectionsText: "=== Titre de la Section ===\nSaisissez le paragraphe ici.\n\nSaisissez un deuxième paragraphe si nécessaire.",
    });
    setShowBlogModal(true);
  }

  function openEditBlog(post: BlogPost) {
    setEditingBlog(post);
    setBlogForm({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      time: post.time,
      date: post.date,
      image: post.image,
      imageAlt: post.imageAlt,
      intro: post.intro,
      sectionsText: formatSections(post.sections || []),
    });
    setShowBlogModal(true);
  }

  function openNewProject() {
    setEditingProject(null);
    setProjectForm({
      client: "",
      title: "",
      year: new Date().getFullYear().toString(),
      image: "/project-laptop.png",
      alt: "",
      className: "bridge-work-card-left",
    });
    setShowProjectModal(true);
  }

  function openEditProject(proj: Project) {
    setEditingProject(proj);
    setProjectForm({
      client: proj.client,
      title: proj.title,
      year: proj.year,
      image: proj.image,
      alt: proj.alt,
      className: proj.className,
    });
    setShowProjectModal(true);
  }

  if (!authorized) {
    return (
      <div className="dashboard-loading">
        <p>Vérification de l’autorisation...</p>
      </div>
    );
  }

  return (
    <main className="dashboard-layout">
      {/* Sidebar Navigation */}
      <aside className="dashboard-sidebar">
        <div className="dashboard-sidebar-header">
          <span className="dashboard-sidebar-mark">F—B</span>
          <div><strong>Full Bridge.</strong><span>Administration</span></div>
        </div>
        <nav className="dashboard-sidebar-nav">
          <button
            type="button"
            className={activeTab === "leads" ? "active" : ""}
            onClick={() => setActiveTab("leads")}
          >
            <Mail size={18} />
            <span>Messages ({leads.length})</span>
          </button>
          <button
            type="button"
            className={activeTab === "blogs" ? "active" : ""}
            onClick={() => setActiveTab("blogs")}
          >
            <BookOpen size={18} />
            <span>Articles ({blogs.length})</span>
          </button>
          <button
            type="button"
            className={activeTab === "projects" ? "active" : ""}
            onClick={() => setActiveTab("projects")}
          >
            <Layers size={18} />
            <span>Réalisations ({projects.length})</span>
          </button>
        </nav>
        <button
          type="button"
          className="dashboard-logout"
          onClick={handleLogout}
        >
          <LogOut size={16} />
          <span>Se déconnecter</span>
        </button>
      </aside>

      {/* Main Content Area */}
      <section className="dashboard-main">
        <header className="dashboard-main-header">
          <div>
            <p>Tableau de bord</p>
            <h1>
              {activeTab === "leads" && "Messages reçus"}
              {activeTab === "blogs" && "Gestion du Blog"}
              {activeTab === "projects" && "Gestion des Réalisations"}
            </h1>
            <span>Gérez les contenus et demandes du site Full Bridge Digital.</span>
          </div>
          {(activeTab === "blogs" || activeTab === "projects") && (
            <button
              type="button"
              className="dashboard-add-btn"
              onClick={activeTab === "blogs" ? openNewBlog : openNewProject}
            >
              <Plus size={16} />
              <span>
                {activeTab === "blogs" ? "Nouvel article" : "Nouveau projet"}
              </span>
            </button>
          )}
        </header>

        <div className="dashboard-stats" aria-label="Résumé du tableau de bord">
          <article className={activeTab === "leads" ? "is-active" : ""}>
            <span><Mail aria-hidden="true" /></span><div><strong>{leads.length}</strong><p>Messages</p></div>
          </article>
          <article className={activeTab === "blogs" ? "is-active" : ""}>
            <span><BookOpen aria-hidden="true" /></span><div><strong>{blogs.length}</strong><p>Articles</p></div>
          </article>
          <article className={activeTab === "projects" ? "is-active" : ""}>
            <span><Layers aria-hidden="true" /></span><div><strong>{projects.length}</strong><p>Réalisations</p></div>
          </article>
        </div>

        {loading ? (
          <div className="dashboard-content-loading">
            <p>Chargement des données...</p>
          </div>
        ) : (
          <div className="dashboard-content-card">
            {/* MESSAGES TAB */}
            {activeTab === "leads" && (
              <div className="dashboard-leads-list">
                {leads.length === 0 ? (
                  <p className="dashboard-empty">Aucun message reçu pour le moment.</p>
                ) : (
                  leads.map((lead) => (
                    <article key={lead._id} className="dashboard-lead-item">
                      <header>
                        <div className="lead-meta">
                          <strong>{lead.name}</strong>
                          <span>{lead.company ? `(${lead.company})` : ""}</span>
                          <a href={`mailto:${lead.email}`} className="lead-email">
                            {lead.email}
                          </a>
                          {lead.phone && <span className="lead-phone">· {lead.phone}</span>}
                        </div>
                        <div className="lead-date-status">
                          <span className="lead-badge">{lead.service}</span>
                          <small>
                            {new Date(lead.createdAt).toLocaleDateString("fr-FR", {
                              day: "numeric",
                              month: "short",
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </small>
                        </div>
                      </header>
                      <p className="lead-message-text">{lead.message}</p>
                    </article>
                  ))
                )}
              </div>
            )}

            {/* BLOGS TAB */}
            {activeTab === "blogs" && (
              <div className="dashboard-table-container">
                {blogs.length === 0 ? (
                  <p className="dashboard-empty">Aucun article enregistré.</p>
                ) : (
                  <table className="dashboard-table">
                    <thead>
                      <tr>
                        <th>Titre</th>
                        <th>Slug</th>
                        <th>Date</th>
                        <th>Lecture</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {blogs.map((post) => (
                        <tr key={post._id}>
                          <td>
                            <strong>{post.title}</strong>
                          </td>
                          <td><code>{post.slug}</code></td>
                          <td>{post.date}</td>
                          <td>{post.time}</td>
                          <td>
                            <div className="table-actions">
                              <button
                                type="button"
                                className="edit-btn"
                                onClick={() => openEditBlog(post)}
                              >
                                <Edit size={14} />
                              </button>
                              <button
                                type="button"
                                className="delete-btn"
                                onClick={() => handleDeleteBlog(post._id)}
                                disabled={actionLoading}
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            )}

            {/* PROJECTS TAB */}
            {activeTab === "projects" && (
              <div className="dashboard-table-container">
                {projects.length === 0 ? (
                  <p className="dashboard-empty">Aucune réalisation enregistrée.</p>
                ) : (
                  <table className="dashboard-table">
                    <thead>
                      <tr>
                        <th>Client</th>
                        <th>Titre</th>
                        <th>Année</th>
                        <th>Classe CSS</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {projects.map((project) => (
                        <tr key={project._id}>
                          <td>
                            <strong>{project.client}</strong>
                          </td>
                          <td>{project.title}</td>
                          <td>{project.year}</td>
                          <td><code>{project.className}</code></td>
                          <td>
                            <div className="table-actions">
                              <button
                                type="button"
                                className="edit-btn"
                                onClick={() => openEditProject(project)}
                              >
                                <Edit size={14} />
                              </button>
                              <button
                                type="button"
                                className="delete-btn"
                                onClick={() => handleDeleteProject(project._id)}
                                disabled={actionLoading}
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            )}
          </div>
        )}
      </section>

      {/* BLOG CREATE/EDIT MODAL */}
      {showBlogModal && (
        <div className="dashboard-modal-backdrop">
          <div className="dashboard-modal">
            <header className="dashboard-modal-header">
              <h2>{editingBlog ? "Modifier l'article" : "Créer un article"}</h2>
              <button
                type="button"
                className="close-modal"
                onClick={() => setShowBlogModal(false)}
              >
                <X size={20} />
              </button>
            </header>
            <form onSubmit={handleSaveBlog} className="dashboard-modal-form">
              {error && <p className="form-error">{error}</p>}
              <div className="form-row">
                <label>
                  <span>Titre de l’article</span>
                  <input
                    type="text"
                    value={blogForm.title}
                    onChange={(e) =>
                      setBlogForm({ ...blogForm, title: e.target.value })
                    }
                    required
                  />
                </label>
                <label>
                  <span>Slug</span>
                  <input
                    type="text"
                    value={blogForm.slug}
                    onChange={(e) =>
                      setBlogForm({ ...blogForm, slug: e.target.value })
                    }
                    placeholder="ex: comment-reussir-la-transformation"
                    required
                  />
                </label>
              </div>

              <div className="form-row">
                <label>
                  <span>Temps de lecture</span>
                  <input
                    type="text"
                    value={blogForm.time}
                    onChange={(e) =>
                      setBlogForm({ ...blogForm, time: e.target.value })
                    }
                    placeholder="ex: 5 min de lecture"
                    required
                  />
                </label>
                <label>
                  <span>Date affichée</span>
                  <input
                    type="text"
                    value={blogForm.date}
                    onChange={(e) =>
                      setBlogForm({ ...blogForm, date: e.target.value })
                    }
                    required
                  />
                </label>
              </div>

              <div className="form-row">
                <label>
                  <span>Image URL (ou chemin local)</span>
                  <input
                    type="text"
                    value={blogForm.image}
                    onChange={(e) =>
                      setBlogForm({ ...blogForm, image: e.target.value })
                    }
                    required
                  />
                </label>
                <label>
                  <span>Alt de l’image</span>
                  <input
                    type="text"
                    value={blogForm.imageAlt}
                    onChange={(e) =>
                      setBlogForm({ ...blogForm, imageAlt: e.target.value })
                    }
                    required
                  />
                </label>
              </div>

              <label>
                <span>Extrait de l’article (description carte)</span>
                <textarea
                  rows={2}
                  value={blogForm.excerpt}
                  onChange={(e) =>
                    setBlogForm({ ...blogForm, excerpt: e.target.value })
                  }
                  required
                />
              </label>

              <label>
                <span>Introduction (paragraphe d’entête)</span>
                <textarea
                  rows={3}
                  value={blogForm.intro}
                  onChange={(e) =>
                    setBlogForm({ ...blogForm, intro: e.target.value })
                  }
                  required
                />
              </label>

              <label>
                <span>Sections &amp; Paragraphes de l’article</span>
                <span className="field-hint">
                  Syntaxe: <code>=== Nom Section ===</code> suivi des paragraphes. Séparez les paragraphes par une ligne vide.
                </span>
                <textarea
                  rows={10}
                  className="code-textarea"
                  value={blogForm.sectionsText}
                  onChange={(e) =>
                    setBlogForm({ ...blogForm, sectionsText: e.target.value })
                  }
                  required
                />
              </label>

              <footer className="modal-footer">
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => setShowBlogModal(false)}
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="save-btn"
                  disabled={actionLoading}
                >
                  <Save size={16} />
                  <span>{actionLoading ? "Enregistrement..." : "Enregistrer"}</span>
                </button>
              </footer>
            </form>
          </div>
        </div>
      )}

      {/* PROJECT CREATE/EDIT MODAL */}
      {showProjectModal && (
        <div className="dashboard-modal-backdrop">
          <div className="dashboard-modal">
            <header className="dashboard-modal-header">
              <h2>
                {editingProject ? "Modifier la réalisation" : "Créer une réalisation"}
              </h2>
              <button
                type="button"
                className="close-modal"
                onClick={() => setShowProjectModal(false)}
              >
                <X size={20} />
              </button>
            </header>
            <form onSubmit={handleSaveProject} className="dashboard-modal-form">
              {error && <p className="form-error">{error}</p>}
              <div className="form-row">
                <label>
                  <span>Nom du client / Marque</span>
                  <input
                    type="text"
                    value={projectForm.client}
                    onChange={(e) =>
                      setProjectForm({ ...projectForm, client: e.target.value })
                    }
                    required
                  />
                </label>
                <label>
                  <span>Année de réalisation</span>
                  <input
                    type="text"
                    value={projectForm.year}
                    onChange={(e) =>
                      setProjectForm({ ...projectForm, year: e.target.value })
                    }
                    required
                  />
                </label>
              </div>

              <label>
                <span>Titre de la réalisation</span>
                <input
                  type="text"
                  value={projectForm.title}
                  onChange={(e) =>
                    setProjectForm({ ...projectForm, title: e.target.value })
                  }
                  required
                />
              </label>

              <div className="form-row">
                <label>
                  <span>Image URL (ou chemin local)</span>
                  <input
                    type="text"
                    value={projectForm.image}
                    onChange={(e) =>
                      setProjectForm({ ...projectForm, image: e.target.value })
                    }
                    required
                  />
                </label>
                <label>
                  <span>Texte alternatif</span>
                  <input
                    type="text"
                    value={projectForm.alt}
                    onChange={(e) =>
                      setProjectForm({ ...projectForm, alt: e.target.value })
                    }
                    required
                  />
                </label>
              </div>

              <label>
                <span>Classe de disposition CSS (Grille responsive)</span>
                <select
                  value={projectForm.className}
                  onChange={(e) =>
                    setProjectForm({
                      ...projectForm,
                      className: e.target.value,
                    })
                  }
                  required
                >
                  <option value="bridge-work-card-left">A gauche (bridge-work-card-left)</option>
                  <option value="bridge-work-card-right">A droite (bridge-work-card-right)</option>
                  <option value="bridge-work-card-third">Centré décalé (bridge-work-card-third)</option>
                  <option value="bridge-work-card-fourth">Centré bas (bridge-work-card-fourth)</option>
                </select>
              </label>

              <footer className="modal-footer">
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => setShowProjectModal(false)}
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="save-btn"
                  disabled={actionLoading}
                >
                  <Save size={16} />
                  <span>{actionLoading ? "Enregistrement..." : "Enregistrer"}</span>
                </button>
              </footer>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
