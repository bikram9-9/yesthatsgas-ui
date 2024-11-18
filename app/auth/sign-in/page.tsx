"use client";

import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/lib/supabase";

export default function SignIn() {
  return (
    <div className="container max-w-[400px] pt-24">
      <div className="rounded-lg border bg-card p-8">
        <Auth
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          providers={["google", "github"]}
          redirectTo={`${window.location.origin}/auth/callback`}
        />
      </div>
    </div>
  );
}