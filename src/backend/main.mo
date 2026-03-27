import AccessControl "authorization/access-control";
import MixinAuthorization "authorization/MixinAuthorization";
import MixinStorage "blob-storage/Mixin";
import Array "mo:base/Array";
import Time "mo:base/Time";

actor {
  include MixinStorage();
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // ---- Types ----
  public type Category = {
    id: Nat;
    name: Text;
    description: Text;
    imageUrl: Text;
  };

  public type Product = {
    id: Nat;
    name: Text;
    categoryId: Nat;
    price: Float;
    description: Text;
    imageUrl: Text;
    featured: Bool;
    stock: Nat;
  };

  public type Review = {
    id: Nat;
    author: Text;
    rating: Nat;
    comment: Text;
    productId: Nat;
    approved: Bool;
  };

  public type ContactMessage = {
    id: Nat;
    name: Text;
    email: Text;
    message: Text;
    timestamp: Int;
  };

  // ---- State ----
  var categoryIdCounter: Nat = 0;
  var productIdCounter: Nat = 0;
  var reviewIdCounter: Nat = 0;
  var contactIdCounter: Nat = 0;

  var categoriesStable: [Category] = [];
  var productsStable: [Product] = [];
  var reviewsStable: [Review] = [];
  var contactMessagesStable: [ContactMessage] = [];

  // ---- Init seed data ----
  if (categoriesStable.size() == 0) {
    categoriesStable := [
      { id = 1; name = "Jewelry"; description = "Handcrafted rings, necklaces, earrings, and bracelets made with love."; imageUrl = "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&q=80" },
      { id = 2; name = "Pottery"; description = "Beautiful ceramic bowls, vases, and mugs shaped by skilled hands."; imageUrl = "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=600&q=80" },
      { id = 3; name = "Paintings"; description = "Original watercolor and acrylic artworks that brighten any room."; imageUrl = "https://images.unsplash.com/photo-1579762593175-20226054cad0?w=600&q=80" },
      { id = 4; name = "Home Decor"; description = "Unique handmade pieces to make your home feel warm and personal."; imageUrl = "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80" }
    ];
    categoryIdCounter := 4;

    productsStable := [
      { id = 1; name = "Rose Gold Leaf Necklace"; categoryId = 1; price = 38.0; description = "Delicate rose gold necklace with hand-stamped leaf pendant."; imageUrl = "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&q=80"; featured = true; stock = 15 },
      { id = 2; name = "Moonstone Stud Earrings"; categoryId = 1; price = 24.0; description = "Ethereal moonstone studs set in sterling silver."; imageUrl = "https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=600&q=80"; featured = true; stock = 20 },
      { id = 3; name = "Braided Leather Bracelet"; categoryId = 1; price = 18.0; description = "Hand-braided leather bracelet with brass clasp."; imageUrl = "https://images.unsplash.com/photo-1573408301185-9519f94816b5?w=600&q=80"; featured = false; stock = 30 },
      { id = 4; name = "Speckled Ceramic Mug"; categoryId = 2; price = 28.0; description = "Wheel-thrown ceramic mug with speckled glaze, holds 12 oz."; imageUrl = "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=600&q=80"; featured = true; stock = 12 },
      { id = 5; name = "Sage Green Vase"; categoryId = 2; price = 45.0; description = "Hand-built stoneware vase in sage green matte glaze."; imageUrl = "https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=600&q=80"; featured = true; stock = 8 },
      { id = 6; name = "Rustic Salad Bowl"; categoryId = 2; price = 55.0; description = "Large hand-turned wooden salad bowl, food-safe finish."; imageUrl = "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&q=80"; featured = false; stock = 6 },
      { id = 7; name = "Wildflower Watercolor"; categoryId = 3; price = 65.0; description = "Original watercolor painting of wildflowers, 8x10 inches."; imageUrl = "https://images.unsplash.com/photo-1549887534-1541e9326642?w=600&q=80"; featured = true; stock = 3 },
      { id = 8; name = "Abstract Sunset Acrylic"; categoryId = 3; price = 120.0; description = "Bold abstract acrylic painting in warm sunset tones, 12x16."; imageUrl = "https://images.unsplash.com/photo-1578301978018-3005759f48f7?w=600&q=80"; featured = false; stock = 2 },
      { id = 9; name = "Botanical Sketch Print"; categoryId = 3; price = 32.0; description = "Fine-line botanical illustration print, ready to frame."; imageUrl = "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80"; featured = false; stock = 25 },
      { id = 10; name = "Macrame Wall Hanging"; categoryId = 4; price = 48.0; description = "Hand-knotted macrame wall art in natural cotton cord."; imageUrl = "https://images.unsplash.com/photo-1558882224-dda166733046?w=600&q=80"; featured = true; stock = 10 },
      { id = 11; name = "Beeswax Pillar Candle"; categoryId = 4; price = 22.0; description = "Hand-poured beeswax candle with lavender & vanilla scent."; imageUrl = "https://images.unsplash.com/photo-1602028915047-37269d1a73f7?w=600&q=80"; featured = false; stock = 40 },
      { id = 12; name = "Woven Seagrass Basket"; categoryId = 4; price = 36.0; description = "Natural seagrass storage basket, handwoven with leather handles."; imageUrl = "https://images.unsplash.com/photo-1594040226829-7f251ab46d80?w=600&q=80"; featured = true; stock = 18 }
    ];
    productIdCounter := 12;

    reviewsStable := [
      { id = 1; author = "Sophie M."; rating = 5; comment = "The necklace is absolutely stunning! Arrived beautifully packaged and the quality is amazing. Will definitely order again."; productId = 1; approved = true },
      { id = 2; author = "James K."; rating = 5; comment = "Bought the ceramic mug as a gift and my partner loves it. The speckled glaze is even prettier in person."; productId = 4; approved = true },
      { id = 3; author = "Aria L."; rating = 4; comment = "The macrame wall hanging is gorgeous and fills my living room with such a cozy vibe. Shipping was quick too!"; productId = 10; approved = true },
      { id = 4; author = "Tom R."; rating = 5; comment = "I ordered the wildflower watercolor and I'm in love. The artist is incredibly talented. Framed it immediately."; productId = 7; approved = true },
      { id = 5; author = "Mei C."; rating = 5; comment = "CraftNest is my go-to for unique gifts. Everything is handmade with such care. The packaging is beautiful too!"; productId = 0; approved = true },
      { id = 6; author = "Priya S."; rating = 4; comment = "The sage green vase is perfect for my plant cuttings. Love how each piece is slightly unique being handmade."; productId = 5; approved = true }
    ];
    reviewIdCounter := 6;
  };

  // ---- Category queries ----
  public query func getCategories() : async [Category] {
    categoriesStable
  };

  public query func getCategory(id: Nat) : async ?Category {
    Array.find(categoriesStable, func(c: Category) : Bool { c.id == id })
  };

  // ---- Product queries ----
  public query func getProducts() : async [Product] {
    productsStable
  };

  public query func getProduct(id: Nat) : async ?Product {
    Array.find(productsStable, func(p: Product) : Bool { p.id == id })
  };

  public query func getProductsByCategory(categoryId: Nat) : async [Product] {
    Array.filter(productsStable, func(p: Product) : Bool { p.categoryId == categoryId })
  };

  public query func getFeaturedProducts() : async [Product] {
    Array.filter(productsStable, func(p: Product) : Bool { p.featured })
  };

  // ---- Review queries ----
  public query func getReviews() : async [Review] {
    Array.filter(reviewsStable, func(r: Review) : Bool { r.approved })
  };

  public query func getAllReviews() : async [Review] {
    reviewsStable
  };

  // ---- Contact ----
  public func submitContactMessage(name: Text, email: Text, message: Text) : async Nat {
    contactIdCounter += 1;
    let newMsg: ContactMessage = { id = contactIdCounter; name; email; message; timestamp = Time.now() };
    contactMessagesStable := Array.append(contactMessagesStable, [newMsg]);
    contactIdCounter
  };

  public shared(msg) func getContactMessages() : async [ContactMessage] {
    assert(AccessControl.isAdmin(accessControlState, msg.caller));
    contactMessagesStable
  };

  // ---- Admin: Categories ----
  public shared(msg) func addCategory(name: Text, description: Text, imageUrl: Text) : async Category {
    assert(AccessControl.isAdmin(accessControlState, msg.caller));
    categoryIdCounter += 1;
    let cat: Category = { id = categoryIdCounter; name; description; imageUrl };
    categoriesStable := Array.append(categoriesStable, [cat]);
    cat
  };

  public shared(msg) func updateCategory(id: Nat, name: Text, description: Text, imageUrl: Text) : async Bool {
    assert(AccessControl.isAdmin(accessControlState, msg.caller));
    categoriesStable := Array.map(categoriesStable, func(c: Category) : Category {
      if (c.id == id) { { id; name; description; imageUrl } } else { c }
    });
    true
  };

  public shared(msg) func deleteCategory(id: Nat) : async Bool {
    assert(AccessControl.isAdmin(accessControlState, msg.caller));
    categoriesStable := Array.filter(categoriesStable, func(c: Category) : Bool { c.id != id });
    true
  };

  // ---- Admin: Products ----
  public shared(msg) func addProduct(name: Text, categoryId: Nat, price: Float, description: Text, imageUrl: Text, featured: Bool, stock: Nat) : async Product {
    assert(AccessControl.isAdmin(accessControlState, msg.caller));
    productIdCounter += 1;
    let p: Product = { id = productIdCounter; name; categoryId; price; description; imageUrl; featured; stock };
    productsStable := Array.append(productsStable, [p]);
    p
  };

  public shared(msg) func updateProduct(id: Nat, name: Text, categoryId: Nat, price: Float, description: Text, imageUrl: Text, featured: Bool, stock: Nat) : async Bool {
    assert(AccessControl.isAdmin(accessControlState, msg.caller));
    productsStable := Array.map(productsStable, func(p: Product) : Product {
      if (p.id == id) { { id; name; categoryId; price; description; imageUrl; featured; stock } } else { p }
    });
    true
  };

  public shared(msg) func deleteProduct(id: Nat) : async Bool {
    assert(AccessControl.isAdmin(accessControlState, msg.caller));
    productsStable := Array.filter(productsStable, func(p: Product) : Bool { p.id != id });
    true
  };

  // ---- Admin: Reviews ----
  public shared(msg) func addReview(author: Text, rating: Nat, comment: Text, productId: Nat, approved: Bool) : async Review {
    assert(AccessControl.isAdmin(accessControlState, msg.caller));
    reviewIdCounter += 1;
    let r: Review = { id = reviewIdCounter; author; rating; comment; productId; approved };
    reviewsStable := Array.append(reviewsStable, [r]);
    r
  };

  public shared(msg) func updateReview(id: Nat, author: Text, rating: Nat, comment: Text, productId: Nat, approved: Bool) : async Bool {
    assert(AccessControl.isAdmin(accessControlState, msg.caller));
    reviewsStable := Array.map(reviewsStable, func(r: Review) : Review {
      if (r.id == id) { { id; author; rating; comment; productId; approved } } else { r }
    });
    true
  };

  public shared(msg) func deleteReview(id: Nat) : async Bool {
    assert(AccessControl.isAdmin(accessControlState, msg.caller));
    reviewsStable := Array.filter(reviewsStable, func(r: Review) : Bool { r.id != id });
    true
  };

  public shared(msg) func approveReview(id: Nat) : async Bool {
    assert(AccessControl.isAdmin(accessControlState, msg.caller));
    reviewsStable := Array.map(reviewsStable, func(r: Review) : Review {
      if (r.id == id) { { id = r.id; author = r.author; rating = r.rating; comment = r.comment; productId = r.productId; approved = true } } else { r }
    });
    true
  };
};
