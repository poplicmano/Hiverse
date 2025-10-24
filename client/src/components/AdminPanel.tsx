import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { insertGiveawaySchema, adminVerifySchema, type Giveaway, type InsertGiveaway, type AdminVerify } from "@shared/schema";
import { Loader2, Plus, XCircle } from "lucide-react";
import { z } from "zod";

interface AdminPanelProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAuthenticated: () => void;
}

export function AdminPanel({ open, onOpenChange, onAuthenticated }: AdminPanelProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { toast } = useToast();

  const passwordForm = useForm<AdminVerify>({
    resolver: zodResolver(adminVerifySchema),
    defaultValues: {
      password: "",
    },
  });

  const verifyMutation = useMutation({
    mutationFn: async (data: AdminVerify) => {
      const response = await apiRequest("POST", "/api/admin/verify", data);
      return response;
    },
    onSuccess: () => {
      setIsAuthenticated(true);
      onAuthenticated();
      toast({
        title: "Authenticated",
        description: "Welcome to the admin panel",
      });
      passwordForm.reset();
    },
    onError: () => {
      toast({
        title: "Authentication Failed",
        description: "Incorrect password",
        variant: "destructive",
      });
    },
  });

  const handlePasswordSubmit = (data: AdminVerify) => {
    verifyMutation.mutate(data);
  };

  if (!isAuthenticated) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent data-testid="dialog-admin-password">
          <DialogHeader>
            <DialogTitle>Admin Authentication</DialogTitle>
            <DialogDescription>
              Enter the admin password to access the giveaway management panel.
            </DialogDescription>
          </DialogHeader>
          <Form {...passwordForm}>
            <form onSubmit={passwordForm.handleSubmit(handlePasswordSubmit)} className="space-y-4">
              <FormField
                control={passwordForm.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Enter admin password"
                        data-testid="input-admin-password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="w-full"
                disabled={verifyMutation.isPending}
                data-testid="button-admin-submit"
              >
                {verifyMutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Submit
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto" data-testid="dialog-admin-panel">
        <DialogHeader>
          <DialogTitle>Giveaways Admin Panel</DialogTitle>
          <DialogDescription>
            Manage active and past giveaways from this panel.
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="add" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="add" data-testid="tab-add-giveaway">Add Giveaway</TabsTrigger>
            <TabsTrigger value="manage" data-testid="tab-manage-giveaways">Manage Giveaways</TabsTrigger>
          </TabsList>

          <TabsContent value="add">
            <AddGiveawayForm />
          </TabsContent>

          <TabsContent value="manage">
            <ManageGiveaways />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}

const giveawayFormSchema = insertGiveawaySchema.extend({
  endDate: z.string().min(1, "End date is required"),
}).omit({ isActive: true });

type GiveawayFormData = z.infer<typeof giveawayFormSchema>;

function AddGiveawayForm() {
  const { toast } = useToast();

  const form = useForm<GiveawayFormData>({
    resolver: zodResolver(giveawayFormSchema),
    defaultValues: {
      title: "",
      description: "",
      imageUrl: "",
      endDate: "",
    },
  });

  const addMutation = useMutation({
    mutationFn: async (data: InsertGiveaway) => {
      return await apiRequest("POST", "/api/giveaways", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/giveaways"] });
      toast({
        title: "Giveaway Added",
        description: "The giveaway has been created and posted to Discord",
      });
      form.reset();
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to create giveaway",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (data: GiveawayFormData) => {
    const giveaway: InsertGiveaway = {
      ...data,
      endDate: new Date(data.endDate),
      isActive: true,
    };
    addMutation.mutate(giveaway);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4 py-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input
                  placeholder="Giveaway title"
                  data-testid="input-giveaway-title"
                  {...field}
                />
              </FormControl>
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
                  placeholder="Giveaway description"
                  data-testid="input-giveaway-description"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="imageUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image URL</FormLabel>
              <FormControl>
                <Input
                  placeholder="https://example.com/image.jpg"
                  data-testid="input-giveaway-image"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="endDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>End Date</FormLabel>
              <FormControl>
                <Input
                  type="datetime-local"
                  data-testid="input-giveaway-enddate"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full"
          disabled={addMutation.isPending}
          data-testid="button-add-giveaway"
        >
          {addMutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          <Plus className="mr-2 h-4 w-4" />
          Add Giveaway
        </Button>
      </form>
    </Form>
  );
}

function ManageGiveaways() {
  const { data: giveaways, isLoading } = useQuery<Giveaway[]>({
    queryKey: ["/api/giveaways"],
  });
  const { toast } = useToast();

  const endMutation = useMutation({
    mutationFn: async (id: string) => {
      return await apiRequest("PATCH", `/api/giveaways/${id}/end`, {});
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/giveaways"] });
      toast({
        title: "Giveaway Ended",
        description: "The giveaway has been ended and posted to Discord",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to end giveaway",
        variant: "destructive",
      });
    },
  });

  const activeGiveaways = giveaways?.filter((g) => g.isActive) || [];

  if (isLoading) {
    return (
      <div className="py-8 text-center">
        <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
      </div>
    );
  }

  if (activeGiveaways.length === 0) {
    return (
      <div className="py-8 text-center text-muted-foreground">
        No active giveaways to manage
      </div>
    );
  }

  return (
    <div className="space-y-4 py-4">
      {activeGiveaways.map((giveaway, index) => (
        <Card key={giveaway.id} data-testid={`card-manage-giveaway-${index}`}>
          <CardHeader>
            <CardTitle data-testid={`text-manage-giveaway-title-${index}`}>{giveaway.title}</CardTitle>
            <CardDescription data-testid={`text-manage-giveaway-date-${index}`}>
              Ends {new Date(giveaway.endDate).toLocaleDateString()}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => endMutation.mutate(giveaway.id)}
              disabled={endMutation.isPending}
              data-testid={`button-end-giveaway-${index}`}
            >
              {endMutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              <XCircle className="mr-2 h-4 w-4" />
              End Giveaway
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
