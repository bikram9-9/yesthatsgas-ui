"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, MapPin, Upload } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { LocationPicker } from "@/components/location-picker";
import { supabase } from "@/lib/supabase";

const formSchema = z.object({
  title: z.string().min(3).max(100),
  description: z.string().min(10).max(500),
  location: z.string().min(3).max(100),
  latitude: z.number(),
  longitude: z.number(),
  images: z.array(z.string()).min(1),
});

export default function SubmitPage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      location: "",
      latitude: 0,
      longitude: 0,
      images: [],
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      const { error } = await supabase.from("gems").insert([values]);
      if (error) throw error;
      router.push("/dashboard");
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="container max-w-2xl py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Share a Gas Location</h1>
        <p className="text-muted-foreground">
          Help others discover amazing places by sharing your hidden gem.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Amazing hidden beach..." {...field} />
                </FormControl>
                <FormDescription>
                  Give your hidden gem a catchy title.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Tell us what makes this place special..."
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Describe the location and what makes it unique.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location Name</FormLabel>
                <FormControl>
                  <Input placeholder="City, Country..." {...field} />
                </FormControl>
                <FormDescription>
                  Enter the general location name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="space-y-4">
            <FormLabel>Pin Location</FormLabel>
            <LocationPicker
              onLocationSelect={(lat, lng) => {
                form.setValue("latitude", lat);
                form.setValue("longitude", lng);
              }}
            />
          </div>

          <div className="space-y-4">
            <FormLabel>Upload Images</FormLabel>
            <div className="grid gap-4">
              <Button type="button" variant="outline">
                <Upload className="mr-2 h-4 w-4" />
                Upload Images
              </Button>
            </div>
          </div>

          <Button type="submit" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Submit Location
          </Button>
        </form>
      </Form>
    </div>
  );
}