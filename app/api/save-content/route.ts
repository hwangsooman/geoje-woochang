import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req: Request) {
  const body = await req.json();

  const { image_url, menu, sns, reply } = body;

  const { data, error } = await supabase
    .from("contents")
    .insert([
      {
        image_url,
        menu_text: menu,
        sns_text: sns,
        reply_text: reply,
      },
    ])
    .select();

  if (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json({
    success: true,
    data,
  });
}