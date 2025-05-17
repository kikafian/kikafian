// server/index.ts
import express2 from "express";

// server/routes.ts
import { createServer } from "http";

// server/storage.ts
var MemStorage = class {
  users;
  blogPosts;
  tours;
  contactMessages;
  newsletterSubscribers;
  currentUserId;
  currentBlogPostId;
  currentTourId;
  currentContactMessageId;
  currentNewsletterSubscriberId;
  constructor() {
    this.users = /* @__PURE__ */ new Map();
    this.blogPosts = /* @__PURE__ */ new Map();
    this.tours = /* @__PURE__ */ new Map();
    this.contactMessages = /* @__PURE__ */ new Map();
    this.newsletterSubscribers = /* @__PURE__ */ new Map();
    this.currentUserId = 1;
    this.currentBlogPostId = 1;
    this.currentTourId = 1;
    this.currentContactMessageId = 1;
    this.currentNewsletterSubscriberId = 1;
    this.initializeData();
  }
  // User methods
  async getUser(id) {
    return this.users.get(id);
  }
  async getUserByUsername(username) {
    return Array.from(this.users.values()).find(
      (user) => user.username === username
    );
  }
  async createUser(insertUser) {
    const id = this.currentUserId++;
    const user = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  // Blog post methods
  async getBlogPosts() {
    return Array.from(this.blogPosts.values()).sort((a, b) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  }
  async getBlogPostById(id) {
    return this.blogPosts.get(id);
  }
  async getBlogPostBySlug(slug) {
    return Array.from(this.blogPosts.values()).find(
      (post) => post.slug === slug
    );
  }
  async createBlogPost(insertBlogPost) {
    const id = this.currentBlogPostId++;
    const post = { ...insertBlogPost, id };
    this.blogPosts.set(id, post);
    return post;
  }
  // Tour methods
  async getTours() {
    return Array.from(this.tours.values());
  }
  async getTourById(id) {
    return this.tours.get(id);
  }
  async createTour(insertTour) {
    const id = this.currentTourId++;
    const tour = { ...insertTour, id };
    this.tours.set(id, tour);
    return tour;
  }
  // Contact message methods
  async createContactMessage(insertContactMessage) {
    const id = this.currentContactMessageId++;
    const message = {
      ...insertContactMessage,
      id,
      createdAt: /* @__PURE__ */ new Date()
    };
    this.contactMessages.set(id, message);
    return message;
  }
  // Newsletter subscriber methods
  async createNewsletterSubscriber(insertSubscriber) {
    const id = this.currentNewsletterSubscriberId++;
    const subscriber = {
      ...insertSubscriber,
      id,
      subscriptionDate: /* @__PURE__ */ new Date()
    };
    this.newsletterSubscribers.set(id, subscriber);
    return subscriber;
  }
  // Initialize sample data
  initializeData() {
    const blogPosts2 = [
      {
        title: "Top 5 m\xFAze\xED, ktor\xE9 mus\xEDte v Amsterdame nav\u0161t\xEDvi\u0165",
        content: "Amsterdam je domovom mnoh\xFDch svetozn\xE1mych m\xFAze\xED. Od Van Gogha po Rijksmuseum, v tomto pr\xEDspevku v\xE1m predstav\xEDm kompletn\xE9ho sprievodcu amsterdamskou kult\xFArnou sc\xE9nou a praktick\xE9 tipy na n\xE1v\u0161tevu...",
        imageUrl: "https://pixabay.com/get/g4b7218b9a0c52171f661c6464011047a9d3cb79fef30a5ae82160247a2fe93f014a8d2f36e872abebea1dc8d7611787f029d24d4fbff5a75a4ff8f85ae311b0e_1280.jpg",
        excerptContent: "Od Van Gogha po Rijksmuseum - kompletn\xFD sprievodca amsterdamskou kult\xFArnou sc\xE9nou a praktick\xE9 tipy na n\xE1v\u0161tevu.",
        createdAt: /* @__PURE__ */ new Date("2023-04-15"),
        slug: "top-5-muzei-amsterdame"
      },
      {
        title: "Ako sa bezpe\u010Dne pohybova\u0165 na bicykli v Amsterdame",
        content: "Amsterdam je hlavn\xFDm mestom cyklistiky. V tomto \u010Dl\xE1nku sa dozviete, ako sa bezpe\u010Dne pohybova\u0165 na bicykli po meste, ak\xE9 s\xFA pravidl\xE1 a tipy od miestnych...",
        imageUrl: "https://images.unsplash.com/photo-1524047934617-cb782c24e5f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=500",
        excerptContent: "Praktick\xFD sprievodca pre ka\u017Ed\xE9ho, kto chce za\u017Ei\u0165 Amsterdam tak, ako miestni - na dvoch koles\xE1ch.",
        createdAt: /* @__PURE__ */ new Date("2023-04-02"),
        slug: "bezpecna-cyklistika-amsterdame"
      },
      {
        title: "Skryt\xE9 kaviarne a re\u0161taur\xE1cie, ktor\xE9 turisti nepoznaj\xFA",
        content: "Chcete za\u017Ei\u0165 autentick\xFA atmosf\xE9ru Amsterdamu bez davov turistov? V tomto \u010Dl\xE1nku v\xE1m predstav\xEDm miestne podniky, kde sa stret\xE1vaj\xFA Amsterdam\u010Dania...",
        imageUrl: "https://images.unsplash.com/photo-1559925393-8be0ec4767c8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=500",
        excerptContent: "Miestne podniky, kde sa stret\xE1vaj\xFA Amsterdam\u010Dania a kde za\u017Eijete autentick\xFA atmosf\xE9ru bez davov turistov.",
        createdAt: /* @__PURE__ */ new Date("2023-03-20"),
        slug: "skryte-kaviarne-restauracie"
      }
    ];
    blogPosts2.forEach((post) => {
      this.createBlogPost(post);
    });
    const tours2 = [
      {
        title: "Tajomstv\xE1 kan\xE1lov",
        description: "Plavba po historick\xFDch kan\xE1loch, ktor\xE9 tvoria srdce Amsterdamu. Objavte skryt\xE9 poklady a pr\xEDbehy.",
        imageUrl: "https://images.unsplash.com/photo-1576924542622-772281b13aa8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=500",
        duration: "3 hodiny"
      },
      {
        title: "Historick\xFD Amsterdam",
        description: "Objavte bohat\xFA hist\xF3riu mesta od skromn\xFDch za\u010Diatkov po Zlat\xFD vek a s\xFA\u010Dasnos\u0165.",
        imageUrl: "https://images.unsplash.com/photo-1512470876302-972faa2aa9a4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=500",
        duration: "4 hodiny"
      },
      {
        title: "Kulin\xE1rsky Amsterdam",
        description: "Ochutnajte miestne \u0161peciality, nav\u0161t\xEDvte tradi\u010Dn\xE9 trhy a objavte multikult\xFArnu kuchy\u0148u mesta.",
        imageUrl: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=500",
        duration: "3.5 hodiny"
      }
    ];
    tours2.forEach((tour) => {
      this.createTour(tour);
    });
  }
};
var storage = new MemStorage();

// shared/schema.ts
import { pgTable, text, serial, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
var users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull()
});
var insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true
});
var blogPosts = pgTable("blog_posts", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  imageUrl: text("image_url").notNull(),
  excerptContent: text("excerpt_content").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  slug: text("slug").notNull().unique()
});
var insertBlogPostSchema = createInsertSchema(blogPosts).omit({
  id: true
});
var tours = pgTable("tours", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  imageUrl: text("image_url").notNull(),
  duration: text("duration").notNull()
});
var insertTourSchema = createInsertSchema(tours).omit({
  id: true
});
var contactMessages = pgTable("contact_messages", {
  id: serial("id").primaryKey(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull(),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull()
});
var insertContactMessageSchema = createInsertSchema(contactMessages).omit({
  id: true,
  createdAt: true
});
var newsletterSubscribers = pgTable("newsletter_subscribers", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  subscriptionDate: timestamp("subscription_date").defaultNow().notNull()
});
var insertNewsletterSubscriberSchema = createInsertSchema(newsletterSubscribers).pick({
  email: true
});

// server/routes.ts
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";
import wiki from "wikijs";
var messages = {
  sk: {
    noResults: "Prep\xE1\u010Dte, nena\u0161li sa \u017Eiadne inform\xE1cie o tejto t\xE9me s\xFAvisiacej s Amsterdamom.",
    error: "\u013Dutujeme, moment\xE1lne som nemohol n\xE1js\u0165 inform\xE1cie o t\xE9me s\xFAvisiacej s Amsterdamom.",
    readMore: "\u010C\xEDta\u0165 viac na Wikip\xE9dii"
  },
  en: {
    noResults: "Sorry, I could not find any information about that topic related to Amsterdam.",
    error: "I'm sorry, I couldn't find information about that topic related to Amsterdam at the moment.",
    readMore: "Read more on Wikipedia"
  }
};
async function registerRoutes(app2) {
  app2.get("/api/blog-posts", async (req, res) => {
    try {
      const blogPosts2 = await storage.getBlogPosts();
      res.json(blogPosts2);
    } catch (error) {
      console.error("Error fetching blog posts:", error);
      res.status(500).json({ message: "Failed to fetch blog posts" });
    }
  });
  app2.get("/api/blog-posts/:slug", async (req, res) => {
    try {
      const { slug } = req.params;
      const blogPost = await storage.getBlogPostBySlug(slug);
      if (!blogPost) {
        return res.status(404).json({ message: "Blog post not found" });
      }
      res.json(blogPost);
    } catch (error) {
      console.error("Error fetching blog post:", error);
      res.status(500).json({ message: "Failed to fetch blog post" });
    }
  });
  app2.get("/api/tours", async (req, res) => {
    try {
      const tours2 = await storage.getTours();
      res.json(tours2);
    } catch (error) {
      console.error("Error fetching tours:", error);
      res.status(500).json({ message: "Failed to fetch tours" });
    }
  });
  app2.get("/api/tours/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid tour ID" });
      }
      const tour = await storage.getTourById(id);
      if (!tour) {
        return res.status(404).json({ message: "Tour not found" });
      }
      res.json(tour);
    } catch (error) {
      console.error("Error fetching tour:", error);
      res.status(500).json({ message: "Failed to fetch tour" });
    }
  });
  app2.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactMessageSchema.parse(req.body);
      const contactMessage = await storage.createContactMessage(validatedData);
      res.status(201).json({ message: "Message sent successfully", id: contactMessage.id });
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ message: validationError.message });
      }
      console.error("Error creating contact message:", error);
      res.status(500).json({ message: "Failed to send message" });
    }
  });
  app2.post("/api/newsletter", async (req, res) => {
    try {
      const validatedData = insertNewsletterSubscriberSchema.parse(req.body);
      const subscriber = await storage.createNewsletterSubscriber(validatedData);
      res.status(201).json({ message: "Subscribed successfully", id: subscriber.id });
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ message: validationError.message });
      }
      console.error("Error creating newsletter subscriber:", error);
      res.status(500).json({ message: "Failed to subscribe" });
    }
  });
  app2.post("/api/amsterdam-bot", async (req, res) => {
    try {
      const { query, language = "sk" } = req.body;
      if (!query) {
        return res.status(400).json({
          message: language === "sk" ? "Ot\xE1zka je povinn\xE1" : "Query is required"
        });
      }
      const wikiLanguage = language === "sk" ? "sk" : "en";
      const messageTexts = language === "sk" ? messages.sk : messages.en;
      try {
        const timeout = 15e3;
        const timeoutPromise = new Promise(
          (_, reject) => setTimeout(() => reject(new Error("Request timed out")), timeout)
        );
        let searchQuery = `Amsterdam ${query}`;
        const wikiApi = wiki({
          apiUrl: `https://${wikiLanguage}.wikipedia.org/w/api.php`
        });
        const wikiPromise = wikiApi.search(searchQuery, 3).then(async (data) => {
          if (data.results && data.results.length > 0) {
            const amsterdamResults = data.results.filter(
              (result2) => result2.toLowerCase().includes("amsterdam")
            );
            const title = amsterdamResults.length > 0 ? amsterdamResults[0] : data.results[0];
            const wikiPageApi = wiki({
              apiUrl: `https://${wikiLanguage}.wikipedia.org/w/api.php`
            });
            const page = await wikiPageApi.page(title);
            const summary = await page.summary();
            const url = page.url();
            return {
              title,
              summary,
              url,
              source: "Wikipedia",
              readMoreText: messageTexts.readMore
            };
          }
          if (wikiLanguage === "sk") {
            const wikiEn = wiki({
              apiUrl: "https://en.wikipedia.org/w/api.php"
            });
            const enResults = await wikiEn.search(`Amsterdam ${query}`, 3);
            if (enResults.results && enResults.results.length > 0) {
              const amsterdamResults = enResults.results.filter(
                (result2) => result2.toLowerCase().includes("amsterdam")
              );
              const title = amsterdamResults.length > 0 ? amsterdamResults[0] : enResults.results[0];
              const wikiEnPage = wiki({
                apiUrl: "https://en.wikipedia.org/w/api.php"
              });
              const page = await wikiEnPage.page(title);
              const summary = await page.summary();
              const url = page.url();
              return {
                title,
                summary: `[Inform\xE1cie n\xE1jden\xE9 v anglickej Wikip\xE9dii] ${summary}`,
                url,
                source: "Wikipedia (English)",
                readMoreText: messageTexts.readMore
              };
            }
          }
          return {
            title: "No Results",
            summary: messageTexts.noResults,
            url: "",
            source: "Wikipedia"
          };
        });
        const result = await Promise.race([wikiPromise, timeoutPromise]);
        res.json(result);
      } catch (error) {
        console.error(`Wikipedia search error (${language}):`, error);
        res.status(500).json({
          error: language === "sk" ? "Nepodarilo sa z\xEDska\u0165 inform\xE1cie" : "Failed to get information",
          message: messageTexts.error
        });
      }
    } catch (error) {
      console.error("Bot API error:", error);
      res.status(500).json({
        error: error.message,
        message: req.body.language === "sk" ? "Vyskytla sa chyba pri spracovan\xED po\u017Eiadavky" : "An error occurred while processing the request"
      });
    }
  });
  const httpServer = createServer(app2);
  return httpServer;
}

// server/vite.ts
import express from "express";
import fs from "fs";
import path2 from "path";
import { createServer as createViteServer, createLogger } from "vite";

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
var vite_config_default = defineConfig({
  base: "./",
  plugins: [
    react(),
    runtimeErrorOverlay(),
    ...process.env.NODE_ENV !== "production" && process.env.REPL_ID !== void 0 ? [
      await import("@replit/vite-plugin-cartographer").then(
        (m) => m.cartographer()
      )
    ] : []
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets")
    }
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true
  }
});

// server/vite.ts
import { nanoid } from "nanoid";
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path2.resolve(
        import.meta.dirname,
        "..",
        "client",
        "index.html"
      );
      let template = await fs.promises.readFile(clientTemplate, {
        encoding: "utf8",
        flag: "r"
      });
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({
        "Content-Type": "text/html; charset=UTF-8",
        "Content-Language": "sk"
      }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app2) {
  const distPath = path2.resolve(import.meta.dirname, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(express.static(distPath));
  app2.use("*", (_req, res) => {
    res.sendFile(path2.resolve(distPath, "index.html"));
  });
}

// server/index.ts
var app = express2();
app.use(express2.json());
app.use((req, res, next) => {
  if (req.path.endsWith(".html")) {
    res.setHeader("Content-Type", "text/html; charset=utf-8");
  }
  next();
});
app.use(express2.urlencoded({ extended: false }));
app.use((req, res, next) => {
  const start = Date.now();
  const path3 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path3.startsWith("/api")) {
      let logLine = `${req.method} ${path3} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
(async () => {
  const server = await registerRoutes(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  const port = 5e3;
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true
  }, () => {
    log(`serving on port ${port}`);
  });
})();
