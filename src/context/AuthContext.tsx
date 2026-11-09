import React, { createContext, useContext, useState, useEffect } from "react";
import { UserProfile, OnboardingFormData } from "@/types/dsa";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  hasCompletedOnboarding: boolean;
  isAuthModalOpen: boolean;
  authModalReason: string;
  openAuthModal: (reason?: string) => void;
  closeAuthModal: () => void;
  signInWithGoogle: () => Promise<void>;
  simulateLocalSignIn: (demoName?: string, demoEmail?: string) => void;
  saveOnboarding: (data: OnboardingFormData) => Promise<void>;
  signOut: () => Promise<void>;
  syncProgress: (completedTopics: string[], solvedProblems: number[]) => Promise<void>;
}

const STORAGE_KEYS = {
  LOCAL_USER: "leet-yt-auth-user-v1",
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Helper to extract user identity from Supabase Google OAuth metadata
const extractOAuthUserData = (supabaseUser: any) => {
  const metadata = supabaseUser?.user_metadata || {};
  const fullName =
    metadata.full_name ||
    metadata.name ||
    (metadata.given_name
      ? `${metadata.given_name} ${metadata.family_name || ""}`.trim()
      : "") ||
    "";
  const avatarUrl = metadata.avatar_url || metadata.picture || "";
  const email = supabaseUser?.email || metadata.email || "";

  return { fullName, avatarUrl, email };
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.LOCAL_USER);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalReason, setAuthModalReason] = useState("");

  const persistUser = (newUser: UserProfile | null) => {
    setUser(newUser);
    if (newUser) {
      localStorage.setItem(STORAGE_KEYS.LOCAL_USER, JSON.stringify(newUser));
    } else {
      localStorage.removeItem(STORAGE_KEYS.LOCAL_USER);
    }
  };

  // Listen to Supabase Auth state if configured
  useEffect(() => {
    if (!supabase || !isSupabaseConfigured) return;

    // Check active session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        fetchProfile(session.user);
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        fetchProfile(session.user);
      } else {
        persistUser(null);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const fetchProfile = async (supabaseUser: any) => {
    if (!supabase || !supabaseUser) return;
    const { fullName: oauthName, avatarUrl: oauthAvatar, email } = extractOAuthUserData(supabaseUser);
    const userId = supabaseUser.id;

    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();

      if (data && !error) {
        const resolvedName = data.full_name || oauthName || "";
        const resolvedAvatar = data.avatar_url || oauthAvatar || "";

        persistUser({
          id: userId,
          email: data.email || email,
          fullName: resolvedName,
          avatarUrl: resolvedAvatar,
          ageRange: data.age_range || "",
          occupation: data.occupation || "",
          primaryGoal: data.primary_goal || "",
          onboardingCompleted: Boolean(data.onboarding_completed),
          completedTopics: data.completed_topics || [],
          solvedProblems: data.solved_problems || [],
        });

        // Sync Google name & avatar back to profiles table if missing
        if ((!data.full_name && oauthName) || (!data.avatar_url && oauthAvatar)) {
          supabase
            .from("profiles")
            .update({
              full_name: resolvedName,
              avatar_url: resolvedAvatar || null,
              updated_at: new Date().toISOString(),
            })
            .eq("id", userId)
            .then(() => {});
        }
      } else {
        // New profile populated automatically with Google metadata
        const newUser: UserProfile = {
          id: userId,
          email,
          fullName: oauthName,
          avatarUrl: oauthAvatar,
          onboardingCompleted: false,
          completedTopics: [],
          solvedProblems: [],
        };
        persistUser(newUser);

        // Pre-create profile record with imported Google metadata
        supabase
          .from("profiles")
          .upsert({
            id: userId,
            email,
            full_name: oauthName,
            avatar_url: oauthAvatar || null,
            onboarding_completed: false,
            updated_at: new Date().toISOString(),
          })
          .then(() => {});
      }
    } catch {
      // Fallback with Google OAuth metadata
      persistUser({
        id: userId,
        email,
        fullName: oauthName,
        avatarUrl: oauthAvatar,
        onboardingCompleted: false,
        completedTopics: [],
        solvedProblems: [],
      });
    }
  };

  const openAuthModal = (reason = "Sign in to unlock all 7 levels and track your progress") => {
    setAuthModalReason(reason);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  const signInWithGoogle = async () => {
    if (supabase && isSupabaseConfigured) {
      await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: window.location.origin,
        },
      });
    } else {
      // Fallback local mode for testing when .env is not yet populated
      simulateLocalSignIn("Alex Rivera", "alex.rivera@gmail.com");
    }
  };

  const simulateLocalSignIn = (demoName = "Alex Rivera", demoEmail = "alex.rivera@gmail.com") => {
    const newUser: UserProfile = {
      id: "mock-user-" + Date.now(),
      email: demoEmail,
      fullName: demoName,
      avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces",
      onboardingCompleted: false,
      completedTopics: [],
      solvedProblems: [],
    };
    persistUser(newUser);
  };

  const saveOnboarding = async (data: OnboardingFormData) => {
    if (!user) return;

    const updatedUser: UserProfile = {
      ...user,
      fullName: data.fullName || user.fullName,
      ageRange: data.ageRange,
      occupation: data.occupation,
      primaryGoal: data.primaryGoal,
      onboardingCompleted: true,
    };

    persistUser(updatedUser);

    if (supabase && isSupabaseConfigured) {
      try {
        await supabase
          .from("profiles")
          .update({
            full_name: updatedUser.fullName,
            avatar_url: updatedUser.avatarUrl || null,
            age_range: updatedUser.ageRange,
            occupation: updatedUser.occupation,
            primary_goal: updatedUser.primaryGoal,
            onboarding_completed: true,
            updated_at: new Date().toISOString(),
          })
          .eq("id", user.id);
      } catch {
        // Fallback silently
      }
    }

    closeAuthModal();
  };

  const signOut = async () => {
    if (supabase && isSupabaseConfigured) {
      await supabase.auth.signOut();
    }
    persistUser(null);
  };

  const syncProgress = async (completedTopics: string[], solvedProblems: number[]) => {
    if (!user) return;
    const updated = {
      ...user,
      completedTopics,
      solvedProblems,
    };
    persistUser(updated);

    if (supabase && isSupabaseConfigured) {
      try {
        await supabase
          .from("profiles")
          .update({
            completed_topics: completedTopics,
            solved_problems: solvedProblems,
            updated_at: new Date().toISOString(),
          })
          .eq("id", user.id);
      } catch {
        // Fallback silently
      }
    }
  };

  const isAuthenticated = Boolean(user);
  const hasCompletedOnboarding = Boolean(user?.onboardingCompleted);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        hasCompletedOnboarding,
        isAuthModalOpen,
        authModalReason,
        openAuthModal,
        closeAuthModal,
        signInWithGoogle,
        simulateLocalSignIn,
        saveOnboarding,
        signOut,
        syncProgress,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
