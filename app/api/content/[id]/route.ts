import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const supabase = createServerClient();

  const { data, error } = await supabase
    .from("content")
    .select(
      `
      *,
      profiles (
        username,
        avatar_url,
        subscribers
      )
    `
    )
    .eq("id", params.id)
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 404 });
  }
  return NextResponse.json(data);
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = createServerClient();
    const json = await request.json();

    const { data: userData, error: userError } = await supabase.auth.getUser();
    if (userError) throw userError;

    // Verify ownership
    const { data: contentData, error: contentError } = await supabase
      .from("content")
      .select("user_id")
      .eq("id", params.id)
      .single();

    if (contentError) throw contentError;
    if (contentData !== userData.user.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const { data, error } = await supabase
      .from("content")
      .update(json)
      .eq("id", params.id)
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: error.status || 500 }
    );
  }
}
