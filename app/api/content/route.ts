import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type");
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "12");
  const search = searchParams.get("search");
  const genre = searchParams.get("genre");
  const country = searchParams.get("country");
  const language = searchParams.get("language");
  const status = searchParams.get("status") || "published";

  const supabase = createServerClient();
  let query = supabase
    .from("content")
    .select("*")
    .eq("status", status)
    .order("created_at", { ascending: false });

  if (type) {
    query = query.eq("type", type);
  }

  if (search) {
    query = query.or(`title.ilike.%${search}%,description.ilike.%${search}%`);
  }

  if (genre) {
    query = query.contains("genre", [genre]);
  }

  if (country) {
    query = query.eq("country_code", country);
  }

  if (language) {
    query = query.eq("language", language);
  }

  const { data, error, count } = await query
    .range((page - 1) * limit, page * limit - 1)
    .select("*");

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({
    data,
    meta: {
      total: count,
      page,
      limit,
      totalPages: Math.ceil((count || 0) / limit),
    },
  });
}

export async function POST(request: Request) {
  try {
    const supabase = createServerClient();
    const json = await request.json();

    const { data: userData, error: userError } = await supabase.auth.getUser();
    if (userError) throw userError;

    const { data, error } = await supabase
      .from("content")
      .insert({
        ...json,
        user_id: userData.user.id,
        views: 0,
        likes: 0,
        dislikes: 0,
        status: json.status || "draft",
        genre: json.genre || [],
        tags: json.tags || [],
      })
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
