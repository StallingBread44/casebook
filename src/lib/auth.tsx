import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { User, Session } from "@supabase/supabase-js";
import { supabase, authService, profileService, type Profile } from "./supabase";

interface AuthContextType {
  user: User | null;
  session: Session | null;
  profile: Profile | null;
  loading: boolean;
  signOut: () => Promise<void>;
  demoSignIn: (overrideProfile?: Partial<Profile>) => void;
  isDemo: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  profile: null,
  loading: true,
  signOut: async () => {},
  demoSignIn: () => {},
  isDemo: false,
});

function getStoredProfile(): Profile | null {
  try {
    const raw = localStorage.getItem("cb_user_profile");
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function userToProfile(u: User): Profile {
  const meta = u.user_metadata || {};
  return {
    id: u.id,
    first_name: (meta.first_name as string) || (u.email ? u.email.split("@")[0] : "Student"),
    last_name: (meta.last_name as string) || "",
    email: u.email ?? null,
    school: (meta.school as string) || "CaseBook Scholar",
    grade: (meta.grade as string) || "2026",
    role: "student",
    bio: null,
    avatar_url: null,
    verified_hours: 0,
    created_at: u.created_at || new Date().toISOString(),
    updated_at: u.updated_at || new Date().toISOString(),
  };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(() => getStoredProfile());
  const [loading, setLoading] = useState(true);
  const [isDemo, setIsDemo] = useState(() => localStorage.getItem("cb_is_demo") === "true");

  useEffect(() => {
    // Initial session check
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        const initial = userToProfile(session.user);
        setProfile(initial);
        localStorage.setItem("cb_user_profile", JSON.stringify(initial));

        profileService.getProfile(session.user.id).then(({ data }) => {
          if (data) {
            setProfile(data);
            localStorage.setItem("cb_user_profile", JSON.stringify(data));
          }
        });
      }
      setLoading(false);
    });

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        const initial = userToProfile(session.user);
        setProfile(initial);
        localStorage.setItem("cb_user_profile", JSON.stringify(initial));

        profileService.getProfile(session.user.id).then(({ data }) => {
          if (data) {
            setProfile(data);
            localStorage.setItem("cb_user_profile", JSON.stringify(data));
          }
        });
      } else if (!localStorage.getItem("cb_is_demo")) {
        setProfile(null);
        localStorage.removeItem("cb_user_profile");
      }
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signOut = async () => {
    localStorage.removeItem("cb_is_demo");
    localStorage.removeItem("cb_user_profile");
    setIsDemo(false);
    await authService.signOut();
    setUser(null);
    setSession(null);
    setProfile(null);
  };

  const demoSignIn = (overrideProfile?: Partial<Profile>) => {
    localStorage.setItem("cb_is_demo", "true");
    setIsDemo(true);
    if (overrideProfile) {
      const merged: Profile = {
        id: "demo-user-id",
        first_name: overrideProfile.first_name || "Samuel",
        last_name: overrideProfile.last_name || "",
        email: overrideProfile.email || "samuel@school.edu",
        school: overrideProfile.school || "High School Scholar",
        grade: overrideProfile.grade || "2026",
        role: "student",
        bio: null,
        avatar_url: null,
        verified_hours: 0,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      setProfile(merged);
      localStorage.setItem("cb_user_profile", JSON.stringify(merged));
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        profile,
        loading,
        signOut,
        demoSignIn,
        isDemo,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
