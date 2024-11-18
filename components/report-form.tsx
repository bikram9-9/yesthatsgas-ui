"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useContent } from "@/hooks/use-content";

const REPORT_REASONS = {
  inappropriate: "Inappropriate Content",
  spam: "Spam or Misleading",
  copyright: "Copyright Violation",
  misinformation: "False Information",
  harassment: "Harassment or Hate Speech",
  violence: "Violence or Disturbing Content",
  adult: "Adult or Explicit Content",
  other: "Other",
} as const;

const formSchema = z.object({
  reason: z.enum(
    Object.keys(REPORT_REASONS) as [
      keyof typeof REPORT_REASONS,
      ...Array<keyof typeof REPORT_REASONS>
    ]
  ),
  description: z
    .string()
    .min(10, "Please provide more details about the issue")
    .max(500, "Description is too long"),
});

interface ReportFormProps {
  contentId: string;
  onSuccess?: () => void;
}

export function ReportForm({ contentId, onSuccess }: ReportFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { reportContent } = useContent();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    const success = await reportContent(
      contentId,
      values.reason,
      values.description
    );
    setIsSubmitting(false);

    if (success && onSuccess) {
      onSuccess();
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <Alert>
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            Reports help us maintain community guidelines. False reports may
            result in account restrictions.
          </AlertDescription>
        </Alert>

        <FormField
          control={form.control}
          name="reason"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Reason for Report</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a reason" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Object.entries(REPORT_REASONS).map(([key, label]) => (
                    <SelectItem key={key} value={key}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Additional Details</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Please provide specific details about why you're reporting this content..."
                  className="h-32"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-4">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="bg-red-600 hover:bg-red-700"
          >
            {isSubmitting ? "Submitting..." : "Submit Report"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
