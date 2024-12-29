import { zodResolver } from "@hookform/resolvers/zod";
import { createLazyFileRoute } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "../components/ui/button";
import { Checkbox } from "../components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../components/ui/form";
import { Textarea } from "../components/ui/textarea";
import { EMOTIONS } from "../lib/constants";
import { useCreateThought } from "../lib/hooks";

const formSchema = z.object({
  content: z.string().min(1).max(1000).trim(),
  emotions: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "you have to select at least one emotion",
  }),
});

export const Route = createLazyFileRoute("/post")({
  component: RouteComponent,
});

function RouteComponent() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: "",
      emotions: [],
    },
  });
  const { mutate, isPending } = useCreateThought();
  function onSubmit(data: z.infer<typeof formSchema>) {
    mutate(data, {
      onError: () => {
        toast("an error occurred while submitting your thought");
      },
      onSuccess: () => {
        toast("your thought has been posted");
        form.reset();
      },
    });
  }
  return (
    <main className="grid place-content-center min-h-screen lowercase m-4">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 max-w-xl"
        >
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>open up</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="how are you feeling today?"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="emotions"
            render={() => (
              <FormItem>
                <FormLabel>emotions</FormLabel>
                <FormControl>
                  <div className="flex gap-2 flex-wrap">
                    {EMOTIONS.map((emotion) => (
                      <FormField
                        key={emotion}
                        control={form.control}
                        name="emotions"
                        render={({ field }) => {
                          return (
                            <FormItem key={emotion}>
                              <FormControl>
                                <Checkbox
                                  className="lowercase text-sm"
                                  checked={field.value?.includes(emotion)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([
                                          ...field.value,
                                          emotion,
                                        ])
                                      : field.onChange(
                                          field.value?.filter(
                                            (item) => item !== emotion
                                          )
                                        );
                                  }}
                                >
                                  {emotion}
                                </Checkbox>
                              </FormControl>
                            </FormItem>
                          );
                        }}
                      />
                    ))}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">{isPending ? "submitting" : "submit"}</Button>
        </form>
      </Form>
    </main>
  );
}
