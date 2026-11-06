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
        fetchProfile(session.user.id, session.user.email ?? "");
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        fetchProfile(session.user.id, session.user.email ?? "");
      } else {
        persistUser(null);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const fetchProfile = async (userId: string, email: string) => {
    if (!supabase) return;
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();

      if (data && !error) {
        persistUser({
          id: userId,
          email: data.email || email,
          fullName: data.full_name || "",
          ageRange: data.age_range || "",
          occupation: data.occupation || "",
          primaryGoal: data.primary_goal || "",
          onboardingCompleted: Boolean(data.onboarding_completed),
          completedTopics: data.completed_topics || [],
          solvedProblems: data.solved_problems || [],
        });
      } else {
        // New profile placeholder
        persistUser({
          id: userId,
          email,
          fullName: "",
          onboardingCompleted: false,
          completedTopics: [],
          solvedProblems: [],
        });
      }
    } catch {
      // Ignore network errors, maintain local state
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
      simulateLocalSignIn("Alex Developer", "alex.dev@example.com");
    }
  };

  const simulateLocalSignIn = (demoName = "Software Engineer", demoEmail = "learner@leet-yt.dev") => {
    const newUser: UserProfile = {
      id: "mock-user-" + Date.now(),
      email: demoEmail,
      fullName: demoName,
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
