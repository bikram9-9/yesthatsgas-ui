import { NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase/server';

export async function POST(request: Request) {
  try {
    const supabase = createServerClient();
    const { creator_id } = await request.json();

    const { data: userData, error: userError } = await supabase.auth.getUser();
    if (userError) throw userError;

    // Check if already subscribed
    const { data: existingSub } = await supabase
      .from('subscriptions')
      .select()
      .eq('subscriber_id', userData.user.id)
      .eq('creator_id', creator_id)
      .single();

    if (existingSub) {
      // Unsubscribe
      await supabase
        .from('subscriptions')
        .delete()
        .eq('id', existingSub.id);

      await supabase.rpc('decrement_subscribers', { creator_id });

      return NextResponse.json({ subscribed: false });
    } else {
      // Subscribe
      await supabase
        .from('subscriptions')
        .insert({
          subscriber_id: userData.user.id,
          creator_id,
        });

      await supabase.rpc('increment_subscribers', { creator_id });

      return NextResponse.json({ subscribed: true });
    }
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: error.status || 500 }
    );
  }
}