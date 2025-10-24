import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { apiRequest, queryClient } from "@/lib/queryClient";
import type { Giveaway, InsertGiveaway } from "@shared/schema";
import { Loader2, Plus, XCircle } from "lucide-react";

interface AdminPanelProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAuthenticated: () => void;
}

export function AdminPanel({ open, onOpenChange, onAuthenticated }: AdminPanelProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const { toast } = useToast();

  const verifyMutation = useMutation({
    mutationFn: async (password: string) => {
      const response = await apiRequest("POST", "/api/admin/verify", { password });
      return response;
    },
    onSuccess: () => {
      setIsAuthenticated(true);
      onAuthenticated();
      toast({
        title: "Authenticated",
        description: "Welcome to the admin panel",
      });
    },
    onError: () => {
      toast({
        title: "Authentication Failed",
        description: "Incorrect password",
        variant: "destructive",
      });
    },
  });

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    verifyMutation.mutate(password);
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
          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                data-testid="input-admin-password"
              />
            </div>
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

function AddGiveawayForm() {
  const [formData, setFormData] = useState<InsertGiveaway>({
    title: "",
    description: "",
    imageUrl: "",
    endDate: new Date(),
    isActive: true,
  });
  const { toast } = useToast();

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
      setFormData({
        title: "",
        description: "",
        imageUrl: "",
        endDate: new Date(),
        isActive: true,
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to create giveaway",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addMutation.mutate(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 py-4">
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          placeholder="Giveaway title"
          required
          data-testid="input-giveaway-title"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Giveaway description"
          required
          data-testid="input-giveaway-description"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="imageUrl">Image URL</Label>
        <Input
          id="imageUrl"
          value={formData.imageUrl}
          onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
          placeholder="https://example.com/image.jpg"
          required
          data-testid="input-giveaway-image"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="endDate">End Date</Label>
        <Input
          id="endDate"
          type="datetime-local"
          value={formData.endDate instanceof Date ? formData.endDate.toISOString().slice(0, 16) : ""}
          onChange={(e) => setFormData({ ...formData, endDate: new Date(e.target.value) })}
          required
          data-testid="input-giveaway-enddate"
        />
      </div>

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
            <CardTitle>{giveaway.title}</CardTitle>
            <CardDescription>
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
