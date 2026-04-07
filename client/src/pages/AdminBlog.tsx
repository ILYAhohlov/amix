import { useState, useEffect } from "react";
import axios from "axios";

type Post = {
  id: string;
  title: string;
  subtitle: string;
  slug: string;
  publishDate: string;
  excerpt: string;
  content: string[];
  contactEmail?: string;
  imageUrl?: string;
  author: string;
  keywords: string[];
};

const STORAGE_KEY = "admin_token";

const emptyPost = (): Omit<Post, "id"> => ({
  title: "",
  subtitle: "",
  slug: "",
  publishDate: new Date().toISOString().slice(0, 16),
  excerpt: "",
  content: [""],
  contactEmail: "",
  imageUrl: "",
  author: "AMIX International Group",
  keywords: [],
});

function api(token: string) {
  return axios.create({ headers: { "x-admin-token": token } });
}

export default function AdminBlog() {
  const [token, setToken] = useState(() => localStorage.getItem(STORAGE_KEY) || "");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [posts, setPosts] = useState<Post[]>([]);
  const [editing, setEditing] = useState<Post | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    if (token) loadPosts();
  }, [token]);

  async function login() {
    try {
      const res = await axios.post("/api/admin/login", { password });
      localStorage.setItem(STORAGE_KEY, res.data.token);
      setToken(res.data.token);
      setLoginError("");
    } catch {
      setLoginError("Неверный пароль");
    }
  }

  async function loadPosts() {
    const res = await api(token).get("/api/admin/posts");
    setPosts(res.data);
  }

  function startNew() {
    setEditing({ id: "", ...emptyPost() });
    setIsNew(true);
    setMsg("");
  }

  function startEdit(post: Post) {
    setEditing({ ...post });
    setIsNew(false);
    setMsg("");
  }

  async function save() {
    if (!editing) return;
    setSaving(true);
    try {
      if (isNew) {
        const payload = { ...editing, id: editing.slug };
        await api(token).post("/api/admin/posts", payload);
      } else {
        await api(token).put(`/api/admin/posts/${editing.id}`, editing);
      }
      setMsg("Сохранено ✓");
      setEditing(null);
      loadPosts();
    } catch {
      setMsg("Ошибка при сохранении");
    }
    setSaving(false);
  }

  async function deletePost(id: string) {
    if (!confirm("Удалить пост?")) return;
    await api(token).delete(`/api/admin/posts/${id}`);
    loadPosts();
  }

  function updateField(field: keyof Post, value: any) {
    setEditing((p) => p ? { ...p, [field]: value } : p);
  }

  function updateContent(index: number, value: string) {
    setEditing((p) => {
      if (!p) return p;
      const content = [...p.content];
      content[index] = value;
      return { ...p, content };
    });
  }

  function addParagraph() {
    setEditing((p) => p ? { ...p, content: [...p.content, ""] } : p);
  }

  function removeParagraph(index: number) {
    setEditing((p) => {
      if (!p) return p;
      const content = p.content.filter((_, i) => i !== index);
      return { ...p, content };
    });
  }

  if (!token) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="bg-gray-900 p-8 rounded-lg w-80 space-y-4">
          <h1 className="text-white text-xl font-bold">Admin Login</h1>
          <input
            type="password"
            placeholder="Пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && login()}
            className="w-full bg-gray-800 text-white px-3 py-2 rounded border border-gray-700 focus:outline-none focus:border-blue-500"
          />
          {loginError && <p className="text-red-400 text-sm">{loginError}</p>}
          <button onClick={login} className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded">
            Войти
          </button>
        </div>
      </div>
    );
  }

  if (editing) {
    return (
      <div className="min-h-screen bg-gray-950 text-white p-6">
        <div className="max-w-3xl mx-auto space-y-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold">{isNew ? "Новый пост" : "Редактировать пост"}</h1>
            <button onClick={() => setEditing(null)} className="text-gray-400 hover:text-white">✕ Отмена</button>
          </div>

          {(["title", "subtitle", "slug", "excerpt", "author", "imageUrl", "contactEmail"] as (keyof Post)[]).map((field) => (
            <div key={field}>
              <label className="text-sm text-gray-400 capitalize">{field}</label>
              <input
                value={(editing[field] as string) || ""}
                onChange={(e) => updateField(field, e.target.value)}
                className="w-full bg-gray-800 text-white px-3 py-2 rounded border border-gray-700 mt-1 focus:outline-none focus:border-blue-500"
              />
            </div>
          ))}

          <div>
            <label className="text-sm text-gray-400">publishDate</label>
            <input
              type="datetime-local"
              value={editing.publishDate?.slice(0, 16) || ""}
              onChange={(e) => updateField("publishDate", e.target.value)}
              className="w-full bg-gray-800 text-white px-3 py-2 rounded border border-gray-700 mt-1 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="text-sm text-gray-400">keywords (через запятую)</label>
            <input
              value={editing.keywords.join(", ")}
              onChange={(e) => updateField("keywords", e.target.value.split(",").map((k) => k.trim()).filter(Boolean))}
              className="w-full bg-gray-800 text-white px-3 py-2 rounded border border-gray-700 mt-1 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm text-gray-400">content (параграфы)</label>
              <button onClick={addParagraph} className="text-xs bg-gray-700 hover:bg-gray-600 px-2 py-1 rounded">+ параграф</button>
            </div>
            {editing.content.map((para, i) => (
              <div key={i} className="flex gap-2 mb-2">
                <textarea
                  value={para}
                  onChange={(e) => updateContent(i, e.target.value)}
                  rows={3}
                  className="flex-1 bg-gray-800 text-white px-3 py-2 rounded border border-gray-700 focus:outline-none focus:border-blue-500 text-sm"
                />
                <button onClick={() => removeParagraph(i)} className="text-red-400 hover:text-red-300 text-lg px-1">✕</button>
              </div>
            ))}
          </div>

          {msg && <p className="text-green-400 text-sm">{msg}</p>}

          <button
            onClick={save}
            disabled={saving}
            className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white px-6 py-2 rounded"
          >
            {saving ? "Сохранение..." : "Сохранить"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Blog CMS</h1>
          <div className="flex gap-3">
            <button onClick={startNew} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
              + Новый пост
            </button>
            <button
              onClick={() => { localStorage.removeItem(STORAGE_KEY); setToken(""); }}
              className="text-gray-400 hover:text-white text-sm"
            >
              Выйти
            </button>
          </div>
        </div>

        <div className="space-y-3">
          {posts.map((post) => (
            <div key={post.id} className="bg-gray-900 rounded-lg p-4 flex items-center justify-between gap-4">
              <div className="min-w-0">
                <p className="font-medium truncate">{post.title}</p>
                <p className="text-sm text-gray-400">{post.slug} · {new Date(post.publishDate).toLocaleDateString("ru-RU")}</p>
              </div>
              <div className="flex gap-2 shrink-0">
                <button onClick={() => startEdit(post)} className="text-sm bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded">
                  Редактировать
                </button>
                <button onClick={() => deletePost(post.id)} className="text-sm bg-red-900 hover:bg-red-800 px-3 py-1 rounded">
                  Удалить
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
