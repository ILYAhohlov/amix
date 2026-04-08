import { useState, useEffect } from "react";
import axios from "axios";
import { Eye, Sparkles } from "lucide-react";
import RichTextEditor from "../components/RichTextEditor";
import { generateSlug } from "../lib/slugify";

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
  status?: string;
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
  status: "draft",
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
  const [filter, setFilter] = useState<"all" | "published" | "draft">("all");

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
      setLoginError("Invalid password");
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

  async function save(status: string) {
    if (!editing) return;
    setSaving(true);
    try {
      const payload = { ...editing, status, id: editing.slug };
      if (isNew) {
        await api(token).post("/api/admin/posts", payload);
      } else {
        await api(token).put(`/api/admin/posts/${editing.id}`, payload);
      }
      setMsg(status === "draft" ? "Saved as draft ✓" : "Published ✓");
      setEditing(null);
      loadPosts();
    } catch (error: any) {
      setMsg(error.response?.data?.message || "Error saving post");
    }
    setSaving(false);
  }

  async function deletePost(id: string) {
    if (!confirm("Delete this post?")) return;
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

  function autoGenerateSlug() {
    if (editing?.title) {
      const slug = generateSlug(editing.title);
      updateField("slug", slug);
    }
  }

  function openPreview() {
    if (!editing) return;
    const previewData = encodeURIComponent(JSON.stringify(editing));
    window.open(`/blog/preview?data=${previewData}`, "_blank");
  }

  const filteredPosts = posts.filter((post) => {
    if (filter === "all") return true;
    return post.status === filter;
  });

  if (!token) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="bg-gray-900 p-8 rounded-lg w-80 space-y-4">
          <h1 className="text-white text-xl font-bold">Admin Login</h1>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && login()}
            className="w-full bg-gray-800 text-white px-3 py-2 rounded border border-gray-700 focus:outline-none focus:border-blue-500"
          />
          {loginError && <p className="text-red-400 text-sm">{loginError}</p>}
          <button onClick={login} className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded">
            Login
          </button>
        </div>
      </div>
    );
  }

  if (editing) {
    return (
      <div className="min-h-screen bg-gray-950 text-white p-6">
        <div className="max-w-4xl mx-auto space-y-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold">{isNew ? "New Post" : "Edit Post"}</h1>
            <div className="flex gap-2">
              <button
                onClick={openPreview}
                className="flex items-center gap-1 px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded text-sm"
              >
                <Eye className="w-4 h-4" />
                Preview
              </button>
              <button onClick={() => setEditing(null)} className="text-gray-400 hover:text-white">
                ✕ Cancel
              </button>
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="text-sm text-gray-400">Title *</label>
            <input
              value={editing.title}
              onChange={(e) => updateField("title", e.target.value)}
              className="w-full bg-gray-800 text-white px-3 py-2 rounded border border-gray-700 mt-1 focus:outline-none focus:border-blue-500"
              placeholder="Enter post title"
            />
          </div>

          {/* Subtitle */}
          <div>
            <label className="text-sm text-gray-400">Subtitle *</label>
            <input
              value={editing.subtitle}
              onChange={(e) => updateField("subtitle", e.target.value)}
              className="w-full bg-gray-800 text-white px-3 py-2 rounded border border-gray-700 mt-1 focus:outline-none focus:border-blue-500"
              placeholder="Enter subtitle"
            />
          </div>

          {/* Slug with auto-generate */}
          <div>
            <div className="flex items-center justify-between">
              <label className="text-sm text-gray-400">Slug (URL) *</label>
              <button
                onClick={autoGenerateSlug}
                className="flex items-center gap-1 text-xs text-blue-400 hover:text-blue-300"
              >
                <Sparkles className="w-3 h-3" />
                Auto-generate
              </button>
            </div>
            <input
              value={editing.slug}
              onChange={(e) => updateField("slug", e.target.value)}
              className="w-full bg-gray-800 text-white px-3 py-2 rounded border border-gray-700 mt-1 focus:outline-none focus:border-blue-500"
              placeholder="post-url-slug"
            />
            <p className="text-xs text-gray-500 mt-1">
              URL: https://amix.pro/blog/{editing.slug || "your-slug"}
            </p>
          </div>

          {/* Excerpt */}
          <div>
            <label className="text-sm text-gray-400">Excerpt (Short Description) *</label>
            <textarea
              value={editing.excerpt}
              onChange={(e) => updateField("excerpt", e.target.value)}
              rows={2}
              className="w-full bg-gray-800 text-white px-3 py-2 rounded border border-gray-700 mt-1 focus:outline-none focus:border-blue-500"
              placeholder="Brief summary for blog listing and SEO"
            />
            <p className="text-xs text-gray-500 mt-1">
              {editing.excerpt.length} characters (recommended: 150-160)
            </p>
          </div>

          {/* Content with Rich Text Editor */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm text-gray-400">Content (Paragraphs) *</label>
              <button onClick={addParagraph} className="text-xs bg-gray-700 hover:bg-gray-600 px-2 py-1 rounded">
                + Add Paragraph
              </button>
            </div>
            {editing.content.map((para, i) => (
              <div key={i} className="mb-4">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-gray-500">Paragraph {i + 1}</span>
                  {editing.content.length > 1 && (
                    <button
                      onClick={() => removeParagraph(i)}
                      className="text-xs text-red-400 hover:text-red-300"
                    >
                      Remove
                    </button>
                  )}
                </div>
                <RichTextEditor
                  content={para}
                  onChange={(html) => updateContent(i, html)}
                  placeholder="Write your content here..."
                />
              </div>
            ))}
          </div>

          {/* Author */}
          <div>
            <label className="text-sm text-gray-400">Author</label>
            <input
              value={editing.author}
              onChange={(e) => updateField("author", e.target.value)}
              className="w-full bg-gray-800 text-white px-3 py-2 rounded border border-gray-700 mt-1 focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Image URL */}
          <div>
            <label className="text-sm text-gray-400">Featured Image URL</label>
            <input
              value={editing.imageUrl || ""}
              onChange={(e) => updateField("imageUrl", e.target.value)}
              className="w-full bg-gray-800 text-white px-3 py-2 rounded border border-gray-700 mt-1 focus:outline-none focus:border-blue-500"
              placeholder="/images/blog/my-image.jpg"
            />
          </div>

          {/* Contact Email */}
          <div>
            <label className="text-sm text-gray-400">Contact Email (optional)</label>
            <input
              value={editing.contactEmail || ""}
              onChange={(e) => updateField("contactEmail", e.target.value)}
              className="w-full bg-gray-800 text-white px-3 py-2 rounded border border-gray-700 mt-1 focus:outline-none focus:border-blue-500"
              placeholder="contact@amix.pro"
            />
          </div>

          {/* Publish Date */}
          <div>
            <label className="text-sm text-gray-400">Publish Date</label>
            <input
              type="datetime-local"
              value={editing.publishDate?.slice(0, 16) || ""}
              onChange={(e) => updateField("publishDate", e.target.value)}
              className="w-full bg-gray-800 text-white px-3 py-2 rounded border border-gray-700 mt-1 focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Keywords */}
          <div>
            <label className="text-sm text-gray-400">Keywords (comma-separated)</label>
            <input
              value={editing.keywords.join(", ")}
              onChange={(e) =>
                updateField(
                  "keywords",
                  e.target.value.split(",").map((k) => k.trim()).filter(Boolean)
                )
              }
              className="w-full bg-gray-800 text-white px-3 py-2 rounded border border-gray-700 mt-1 focus:outline-none focus:border-blue-500"
              placeholder="vietnam, trade, investment"
            />
          </div>

          {msg && <p className={`text-sm ${msg.includes("Error") ? "text-red-400" : "text-green-400"}`}>{msg}</p>}

          {/* Save buttons */}
          <div className="flex gap-3 pt-4">
            <button
              onClick={() => save("draft")}
              disabled={saving}
              className="bg-gray-700 hover:bg-gray-600 disabled:opacity-50 text-white px-6 py-2 rounded"
            >
              {saving ? "Saving..." : "Save as Draft"}
            </button>
            <button
              onClick={() => save("published")}
              disabled={saving}
              className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white px-6 py-2 rounded"
            >
              {saving ? "Publishing..." : "Publish"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Blog CMS</h1>
          <div className="flex gap-3">
            <button onClick={startNew} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
              + New Post
            </button>
            <button
              onClick={() => {
                localStorage.removeItem(STORAGE_KEY);
                setToken("");
              }}
              className="text-gray-400 hover:text-white text-sm"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Filter tabs */}
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-2 rounded ${
              filter === "all" ? "bg-blue-600 text-white" : "bg-gray-800 text-gray-400 hover:bg-gray-700"
            }`}
          >
            All ({posts.length})
          </button>
          <button
            onClick={() => setFilter("published")}
            className={`px-4 py-2 rounded ${
              filter === "published" ? "bg-blue-600 text-white" : "bg-gray-800 text-gray-400 hover:bg-gray-700"
            }`}
          >
            Published ({posts.filter((p) => p.status === "published").length})
          </button>
          <button
            onClick={() => setFilter("draft")}
            className={`px-4 py-2 rounded ${
              filter === "draft" ? "bg-blue-600 text-white" : "bg-gray-800 text-gray-400 hover:bg-gray-700"
            }`}
          >
            Drafts ({posts.filter((p) => p.status === "draft").length})
          </button>
        </div>

        {/* Posts list */}
        <div className="space-y-3">
          {filteredPosts.length === 0 ? (
            <div className="text-center text-gray-500 py-12">No posts found</div>
          ) : (
            filteredPosts.map((post) => (
              <div key={post.id} className="bg-gray-900 rounded-lg p-4 flex items-center justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="font-medium truncate">{post.title}</p>
                    <span
                      className={`text-xs px-2 py-0.5 rounded ${
                        post.status === "published"
                          ? "bg-green-900 text-green-300"
                          : "bg-yellow-900 text-yellow-300"
                      }`}
                    >
                      {post.status || "published"}
                    </span>
                  </div>
                  <p className="text-sm text-gray-400">
                    {post.slug} · {new Date(post.publishDate).toLocaleDateString("en-US")}
                  </p>
                </div>
                <div className="flex gap-2 shrink-0">
                  <button
                    onClick={() => startEdit(post)}
                    className="text-sm bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deletePost(post.id)}
                    className="text-sm bg-red-900 hover:bg-red-800 px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
