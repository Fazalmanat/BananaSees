/* ==========================================================
   Backend wrapper (Supabase)
   Everything the site needs from a server lives here:
   Google sign-in, nickname profiles, saved progress, and
   sending suggestions (which the server emails to the owner).
   If config.js is empty, Backend.enabled is false and the rest
   of the site quietly falls back to guest / browser-only mode.
   ========================================================== */
const Backend = (() => {
  const cfg = window.BACKEND || {};
  const enabled = Boolean(cfg.supabaseUrl && cfg.supabaseKey && window.supabase);

  // PKCE keeps the login redirect out of the URL hash (our pages use the hash)
  const client = enabled
    ? window.supabase.createClient(cfg.supabaseUrl, cfg.supabaseKey, { auth: { flowType: "pkce" } })
    : null;

  return {
    enabled,

    async session() {
      const { data } = await client.auth.getSession();
      return data.session;
    },

    // Google sign-in (redirects to Google, then back to this page)
    async signInGoogle() {
      await client.auth.signInWithOAuth({
        provider: "google",
        options: { redirectTo: location.origin + location.pathname }
      });
    },

    // Nickname = anonymous account on the server, so the nickname and
    // progress are stored online without any password
    async signInNickname() {
      const { data, error } = await client.auth.signInAnonymously();
      if (error) throw error;
      return data.session;
    },

    async signOut() { await client.auth.signOut(); },

    async loadProfile(userId) {
      const { data } = await client.from("profiles").select("*").eq("id", userId).maybeSingle();
      return data;
    },

    async saveProfile(row) {
      const { error } = await client.from("profiles").upsert(row);
      if (error) throw error;
    },

    // The server checks the Google login, stores the message and emails the owner
    async sendSuggestion(payload) {
      const { error } = await client.functions.invoke("send-suggestion", { body: payload });
      if (error) throw error;
    }
  };
})();