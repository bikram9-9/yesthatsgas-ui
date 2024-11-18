import { NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase/server';

export async function POST(request: Request) {
  try {
    const supabase = createServerClient();
    const { content_id } = await request.json();

    const { data: userData, error: userError } = await supabase.auth.getUser();
    if (userError) throw userError;

    // Check if already liked
    const { data: existingLike } = await supabase
      .from('likes')
      .select()
      .eq('user_id', userData.user.id)
      .eq('content_id', content_id)
      .single();

    if (existingLike) {
      // Unlike
      await supabase
        .from('likes')
        .delete()
        .eq('id', existingLike.id);

      await supabase.rpc('decrement_likes', { content_id });

      return NextResponse.json({ liked: false });
    } else {
      // Like
      await supabase
        .from('likes')
        .insert({ user_id: userData.user.id, content_id });

      await supabase.rpc('increment_likes', { content_id });

      return NextResponse.json({ liked: true });
    }
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: error.status || 500 }
    );
  }
}