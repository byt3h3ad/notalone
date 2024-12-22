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

const formSchema = z.object({
  content: z.string().min(1).max(1000).trim(),
  emotions: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "you have to select at least one emotion",
  }),
});

export const Route = createLazyFileRoute("/create")({
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
  console.log(form);
  function onSubmit(data: z.infer<typeof formSchema>) {
    toast("You submitted the following values:", {
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }
  return (
    <main className="grid place-content-center min-h-screen lowercase">
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
                <FormMessage className="text-red-600" />
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
                <FormMessage className="text-red-600" />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </main>
  );
}
