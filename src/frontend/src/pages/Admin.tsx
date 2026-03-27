import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useQuery } from "@tanstack/react-query";
import { Check, LogIn, Pencil, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useStore } from "../context/StoreContext";
import { useActor } from "../hooks/useActor";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import type { Category, Product, Review } from "../types";

// ——— helpers ———
function emptyProduct(): Omit<Product, "id"> {
  return {
    name: "",
    categoryId: 1,
    price: 0,
    description: "",
    imageUrl: "",
    featured: false,
    stock: 0,
  };
}
function emptyCategory(): Omit<Category, "id"> {
  return {
    name: "",
    description: "",
    imageUrl: "",
    icon: "🎁",
    color: "bg-craftnest-beige",
  };
}
function ProductDialog({
  open,
  onClose,
  initial,
  categories,
  onSave,
}: {
  open: boolean;
  onClose: () => void;
  initial: (Omit<Product, "id"> & { id?: number }) | null;
  categories: Category[];
  onSave: (p: Omit<Product, "id">, id?: number) => void;
}) {
  const [form, setForm] = useState<Omit<Product, "id">>(
    initial ? { ...initial } : emptyProduct(),
  );

  const handleSave = () => {
    if (!form.name.trim()) {
      toast.error("Name is required");
      return;
    }
    onSave(form, initial?.id);
    onClose();
    toast.success(initial?.id ? "Product updated" : "Product added");
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg" data-ocid="admin.dialog">
        <DialogHeader>
          <DialogTitle className="font-serif">
            {initial?.id ? "Edit Product" : "Add Product"}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-1">
          <div>
            <Label className="font-sans text-sm">Name</Label>
            <Input
              value={form.name}
              onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
              data-ocid="admin.input"
            />
          </div>
          <div>
            <Label className="font-sans text-sm">Description</Label>
            <Textarea
              value={form.description}
              onChange={(e) =>
                setForm((p) => ({ ...p, description: e.target.value }))
              }
              rows={3}
              className="resize-none"
              data-ocid="admin.textarea"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="font-sans text-sm">Price ($)</Label>
              <Input
                type="number"
                min={0}
                step={0.01}
                value={form.price}
                onChange={(e) =>
                  setForm((p) => ({ ...p, price: Number(e.target.value) }))
                }
                data-ocid="admin.input"
              />
            </div>
            <div>
              <Label className="font-sans text-sm">Stock</Label>
              <Input
                type="number"
                min={0}
                value={form.stock}
                onChange={(e) =>
                  setForm((p) => ({ ...p, stock: Number(e.target.value) }))
                }
                data-ocid="admin.input"
              />
            </div>
          </div>
          <div>
            <Label className="font-sans text-sm">Category</Label>
            <select
              className="w-full h-9 rounded-md border border-input bg-white px-3 font-sans text-sm"
              value={form.categoryId}
              onChange={(e) =>
                setForm((p) => ({ ...p, categoryId: Number(e.target.value) }))
              }
              data-ocid="admin.select"
            >
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <Label className="font-sans text-sm">Image URL</Label>
            <Input
              value={form.imageUrl}
              onChange={(e) =>
                setForm((p) => ({ ...p, imageUrl: e.target.value }))
              }
              placeholder="https://..."
              data-ocid="admin.input"
            />
          </div>
          <div className="flex items-center gap-3">
            <Switch
              checked={form.featured}
              onCheckedChange={(v) => setForm((p) => ({ ...p, featured: v }))}
              data-ocid="admin.switch"
            />
            <Label className="font-sans text-sm">Featured product</Label>
          </div>
        </div>
        <DialogFooter>
          <Button
            variant="ghost"
            onClick={onClose}
            data-ocid="admin.cancel_button"
          >
            Cancel
          </Button>
          <Button
            className="bg-craftnest-peach hover:bg-craftnest-peach/90 text-white"
            onClick={handleSave}
            data-ocid="admin.save_button"
          >
            {initial?.id ? "Save Changes" : "Add Product"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// ——— Category Dialog ———
function CategoryDialog({
  open,
  onClose,
  initial,
  onSave,
}: {
  open: boolean;
  onClose: () => void;
  initial: (Omit<Category, "id"> & { id?: number }) | null;
  onSave: (c: Omit<Category, "id">, id?: number) => void;
}) {
  const [form, setForm] = useState<Omit<Category, "id">>(
    initial ? { ...initial } : emptyCategory(),
  );

  const handleSave = () => {
    if (!form.name.trim()) {
      toast.error("Name is required");
      return;
    }
    onSave(form, initial?.id);
    onClose();
    toast.success(initial?.id ? "Category updated" : "Category added");
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent data-ocid="admin.dialog">
        <DialogHeader>
          <DialogTitle className="font-serif">
            {initial?.id ? "Edit Category" : "Add Category"}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label className="font-sans text-sm">Name</Label>
            <Input
              value={form.name}
              onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
              data-ocid="admin.input"
            />
          </div>
          <div>
            <Label className="font-sans text-sm">Description</Label>
            <Input
              value={form.description}
              onChange={(e) =>
                setForm((p) => ({ ...p, description: e.target.value }))
              }
              data-ocid="admin.input"
            />
          </div>
          <div>
            <Label className="font-sans text-sm">Icon (emoji)</Label>
            <Input
              value={form.icon}
              onChange={(e) => setForm((p) => ({ ...p, icon: e.target.value }))}
              data-ocid="admin.input"
            />
          </div>
          <div>
            <Label className="font-sans text-sm">Image URL</Label>
            <Input
              value={form.imageUrl}
              onChange={(e) =>
                setForm((p) => ({ ...p, imageUrl: e.target.value }))
              }
              placeholder="https://..."
              data-ocid="admin.input"
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            variant="ghost"
            onClick={onClose}
            data-ocid="admin.cancel_button"
          >
            Cancel
          </Button>
          <Button
            className="bg-craftnest-peach hover:bg-craftnest-peach/90 text-white"
            onClick={handleSave}
            data-ocid="admin.save_button"
          >
            {initial?.id ? "Save Changes" : "Add Category"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// ——— Admin Page ———
export default function Admin() {
  const { login, loginStatus, identity, clear } = useInternetIdentity();
  const { actor, isFetching } = useActor();

  const { data: isAdmin, isLoading: checkingAdmin } = useQuery({
    queryKey: ["isAdmin", identity?.getPrincipal().toString()],
    queryFn: async () => {
      if (!actor || !identity) return false;
      return actor.isCallerAdmin();
    },
    enabled: !!actor && !!identity && !isFetching,
  });

  const {
    categories,
    products,
    reviews,
    contactMessages,
    addProduct,
    updateProduct,
    deleteProduct,
    addCategory,
    updateCategory,
    deleteCategory,
    deleteReview,
    approveReview,
  } = useStore();

  const [productDialog, setProductDialog] = useState<{
    open: boolean;
    initial: (Omit<Product, "id"> & { id?: number }) | null;
  }>({
    open: false,
    initial: null,
  });
  const [categoryDialog, setCategoryDialog] = useState<{
    open: boolean;
    initial: (Omit<Category, "id"> & { id?: number }) | null;
  }>({
    open: false,
    initial: null,
  });

  // Not logged in
  if (!identity) {
    return (
      <main
        className="min-h-[80vh] flex items-center justify-center"
        data-ocid="admin.page"
      >
        <div className="text-center max-w-sm mx-auto px-6">
          <div className="w-20 h-20 rounded-full bg-craftnest-blush flex items-center justify-center mx-auto mb-6">
            <LogIn className="h-8 w-8 text-craftnest-peach" />
          </div>
          <h1 className="font-serif text-3xl font-bold text-craftnest-charcoal mb-3">
            Admin Panel
          </h1>
          <p className="font-sans text-sm text-muted-foreground mb-8">
            Sign in with Internet Identity to access the management panel.
          </p>
          <Button
            className="w-full bg-craftnest-peach hover:bg-craftnest-peach/90 text-white font-sans h-12"
            onClick={login}
            disabled={loginStatus === "logging-in"}
            data-ocid="admin.primary_button"
          >
            {loginStatus === "logging-in" ? "Signing in..." : "Sign In"}
          </Button>
        </div>
      </main>
    );
  }

  if (checkingAdmin || isFetching) {
    return (
      <main
        className="min-h-[80vh] flex items-center justify-center"
        data-ocid="admin.loading_state"
      >
        <p className="font-sans text-muted-foreground">
          Checking permissions...
        </p>
      </main>
    );
  }

  if (!isAdmin) {
    return (
      <main
        className="min-h-[80vh] flex items-center justify-center"
        data-ocid="admin.page"
      >
        <div className="text-center max-w-sm mx-auto px-6">
          <h1 className="font-serif text-2xl font-bold text-craftnest-charcoal mb-3">
            Not Authorized
          </h1>
          <p className="font-sans text-sm text-muted-foreground mb-6">
            Your account ({identity.getPrincipal().toString().slice(0, 16)}...)
            doesn't have admin access.
          </p>
          <Button
            variant="outline"
            onClick={clear}
            data-ocid="admin.secondary_button"
          >
            Sign Out
          </Button>
        </div>
      </main>
    );
  }

  return (
    <main className="max-w-[1200px] mx-auto px-6 py-12" data-ocid="admin.page">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="font-serif text-3xl font-bold text-craftnest-charcoal">
            Admin Panel
          </h1>
          <p className="font-sans text-sm text-muted-foreground mt-1">
            Logged in as {identity.getPrincipal().toString().slice(0, 20)}...
          </p>
        </div>
        <Button
          variant="outline"
          onClick={clear}
          className="font-sans"
          data-ocid="admin.secondary_button"
        >
          Sign Out
        </Button>
      </div>

      <Tabs defaultValue="products" data-ocid="admin.tab">
        <TabsList className="mb-8 bg-white border border-border shadow-xs">
          <TabsTrigger
            value="products"
            className="font-sans"
            data-ocid="admin.tab"
          >
            Products ({products.length})
          </TabsTrigger>
          <TabsTrigger
            value="categories"
            className="font-sans"
            data-ocid="admin.tab"
          >
            Categories ({categories.length})
          </TabsTrigger>
          <TabsTrigger
            value="reviews"
            className="font-sans"
            data-ocid="admin.tab"
          >
            Reviews ({reviews.length})
          </TabsTrigger>
          <TabsTrigger
            value="messages"
            className="font-sans"
            data-ocid="admin.tab"
          >
            Messages ({contactMessages.length})
          </TabsTrigger>
        </TabsList>

        {/* Products Tab */}
        <TabsContent value="products">
          <div className="bg-white rounded-2xl shadow-card overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-border">
              <h2 className="font-serif text-lg font-semibold text-craftnest-charcoal">
                All Products
              </h2>
              <Button
                className="bg-craftnest-peach hover:bg-craftnest-peach/90 text-white font-sans"
                onClick={() =>
                  setProductDialog({ open: true, initial: emptyProduct() })
                }
                data-ocid="admin.primary_button"
              >
                <Plus className="h-4 w-4 mr-1.5" /> Add Product
              </Button>
            </div>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Image</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Stock</TableHead>
                    <TableHead>Featured</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {products.map((p, i) => (
                    <TableRow key={p.id} data-ocid={`admin.row.${i + 1}`}>
                      <TableCell>
                        <img
                          src={p.imageUrl}
                          alt={p.name}
                          className="w-10 h-10 rounded-lg object-cover"
                        />
                      </TableCell>
                      <TableCell className="font-sans text-sm font-bold text-craftnest-charcoal max-w-[160px] truncate">
                        {p.name}
                      </TableCell>
                      <TableCell className="font-sans text-sm text-muted-foreground">
                        {categories.find((c) => c.id === p.categoryId)?.name ??
                          "—"}
                      </TableCell>
                      <TableCell className="font-sans text-sm">
                        ${p.price.toFixed(2)}
                      </TableCell>
                      <TableCell className="font-sans text-sm">
                        {p.stock}
                      </TableCell>
                      <TableCell>
                        {p.featured && (
                          <Badge className="bg-craftnest-peach text-white border-0 font-sans text-xs">
                            ✦ Featured
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-muted-foreground hover:text-craftnest-peach"
                          onClick={() =>
                            setProductDialog({ open: true, initial: { ...p } })
                          }
                          data-ocid={`admin.edit_button.${i + 1}`}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-muted-foreground hover:text-destructive"
                          onClick={() => {
                            deleteProduct(p.id);
                            toast.success("Product deleted");
                          }}
                          data-ocid={`admin.delete_button.${i + 1}`}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </TabsContent>

        {/* Categories Tab */}
        <TabsContent value="categories">
          <div className="bg-white rounded-2xl shadow-card overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-border">
              <h2 className="font-serif text-lg font-semibold text-craftnest-charcoal">
                All Categories
              </h2>
              <Button
                className="bg-craftnest-peach hover:bg-craftnest-peach/90 text-white font-sans"
                onClick={() =>
                  setCategoryDialog({ open: true, initial: emptyCategory() })
                }
                data-ocid="admin.primary_button"
              >
                <Plus className="h-4 w-4 mr-1.5" /> Add Category
              </Button>
            </div>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Image</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Icon</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {categories.map((c, i) => (
                    <TableRow key={c.id} data-ocid={`admin.row.${i + 1}`}>
                      <TableCell>
                        <img
                          src={c.imageUrl}
                          alt={c.name}
                          className="w-10 h-10 rounded-lg object-cover"
                        />
                      </TableCell>
                      <TableCell className="font-sans text-sm font-bold text-craftnest-charcoal">
                        {c.name}
                      </TableCell>
                      <TableCell className="text-xl">{c.icon}</TableCell>
                      <TableCell className="font-sans text-sm text-muted-foreground max-w-[240px] truncate">
                        {c.description}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-muted-foreground hover:text-craftnest-peach"
                          onClick={() =>
                            setCategoryDialog({ open: true, initial: { ...c } })
                          }
                          data-ocid={`admin.edit_button.${i + 1}`}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-muted-foreground hover:text-destructive"
                          onClick={() => {
                            deleteCategory(c.id);
                            toast.success("Category deleted");
                          }}
                          data-ocid={`admin.delete_button.${i + 1}`}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </TabsContent>

        {/* Reviews Tab */}
        <TabsContent value="reviews">
          <div className="bg-white rounded-2xl shadow-card overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-border">
              <h2 className="font-serif text-lg font-semibold text-craftnest-charcoal">
                All Reviews
              </h2>
            </div>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Author</TableHead>
                    <TableHead>Rating</TableHead>
                    <TableHead>Comment</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {reviews.map((r, i) => (
                    <TableRow key={r.id} data-ocid={`admin.row.${i + 1}`}>
                      <TableCell className="font-sans text-sm font-bold text-craftnest-charcoal">
                        {r.author}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-0.5">
                          <span className="text-craftnest-peach text-sm tracking-tight">
                            {"★".repeat(r.rating)}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="font-sans text-sm text-muted-foreground max-w-[300px] truncate">
                        {r.comment}
                      </TableCell>
                      <TableCell>
                        {r.approved ? (
                          <Badge className="bg-green-100 text-green-700 border-0 font-sans text-xs">
                            Approved
                          </Badge>
                        ) : (
                          <Badge className="bg-yellow-100 text-yellow-700 border-0 font-sans text-xs">
                            Pending
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        {!r.approved && (
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-muted-foreground hover:text-green-600"
                            onClick={() => {
                              approveReview(r.id);
                              toast.success("Review approved");
                            }}
                            data-ocid={`admin.secondary_button.${i + 1}`}
                          >
                            <Check className="h-4 w-4" />
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-muted-foreground hover:text-destructive"
                          onClick={() => {
                            deleteReview(r.id);
                            toast.success("Review deleted");
                          }}
                          data-ocid={`admin.delete_button.${i + 1}`}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </TabsContent>

        {/* Messages Tab */}
        <TabsContent value="messages">
          <div className="bg-white rounded-2xl shadow-card overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-border">
              <h2 className="font-serif text-lg font-semibold text-craftnest-charcoal">
                Contact Messages
              </h2>
            </div>
            {contactMessages.length === 0 ? (
              <div className="py-16 text-center" data-ocid="admin.empty_state">
                <p className="font-sans text-muted-foreground">
                  No messages yet.
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Message</TableHead>
                      <TableHead>Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {contactMessages.map((msg, i) => (
                      <TableRow key={msg.id} data-ocid={`admin.row.${i + 1}`}>
                        <TableCell className="font-sans text-sm font-bold text-craftnest-charcoal">
                          {msg.name}
                        </TableCell>
                        <TableCell className="font-sans text-sm text-muted-foreground">
                          {msg.email}
                        </TableCell>
                        <TableCell className="font-sans text-sm text-muted-foreground max-w-[320px] truncate">
                          {msg.message}
                        </TableCell>
                        <TableCell className="font-sans text-xs text-muted-foreground">
                          {new Date(msg.timestamp).toLocaleDateString()}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>

      {/* Dialogs */}
      <ProductDialog
        open={productDialog.open}
        onClose={() => setProductDialog({ open: false, initial: null })}
        initial={productDialog.initial}
        categories={categories}
        onSave={(p, id) => (id ? updateProduct(id, p) : addProduct(p))}
      />
      <CategoryDialog
        open={categoryDialog.open}
        onClose={() => setCategoryDialog({ open: false, initial: null })}
        initial={categoryDialog.initial}
        onSave={(c, id) => (id ? updateCategory(id, c) : addCategory(c))}
      />
    </main>
  );
}
