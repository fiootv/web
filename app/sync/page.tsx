"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, CheckCircle2, XCircle, RefreshCw } from "lucide-react";

interface SyncResult {
  success: boolean;
  message?: string;
  totalGenres?: number;
  results?: Array<{
    genre: string;
    total?: number;
    success: boolean;
    error?: string;
  }>;
  error?: string;
}

export default function SyncPage() {
  const [session, setSession] = useState("");
  const [cookie, setCookie] = useState("");
  const [isLoadingCookie, setIsLoadingCookie] = useState(true);
  const [isSavingCookie, setIsSavingCookie] = useState(false);
  const [cookieMessage, setCookieMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncResult, setSyncResult] = useState<SyncResult | null>(null);
  const [syncProgress, setSyncProgress] = useState("");

  // Load current session and cookie on mount
  useEffect(() => {
    loadConfig();
  }, []);

  const loadConfig = async () => {
    try {
      setIsLoadingCookie(true);
      const response = await fetch("/api/cookie-config");
      const data = await response.json();
      if (data.session) {
        setSession(data.session);
      }
      if (data.cookie) {
        setCookie(data.cookie);
      }
    } catch (error) {
      console.error("Failed to load config:", error);
      setCookieMessage({ type: "error", text: "Failed to load current configuration" });
    } finally {
      setIsLoadingCookie(false);
    }
  };

  const saveConfig = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsSavingCookie(true);
      setCookieMessage(null);
      
      const response = await fetch("/api/cookie-config", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ session, cookie }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setCookieMessage({ type: "success", text: "Session and cookie updated successfully!" });
        setTimeout(() => setCookieMessage(null), 3000);
      } else {
        setCookieMessage({ type: "error", text: data.error || "Failed to update configuration" });
      }
    } catch (error) {
      setCookieMessage({ type: "error", text: "Failed to update configuration" });
    } finally {
      setIsSavingCookie(false);
    }
  };

  const runSync = async () => {
    try {
      setIsSyncing(true);
      setSyncResult(null);
      setSyncProgress("Starting sync...");

      const response = await fetch("/api/sync-channels", {
        method: "POST",
      });

      const data: SyncResult = await response.json();
      setSyncResult(data);

      if (data.success) {
        setSyncProgress("Sync completed!");
      } else {
        setSyncProgress("Sync failed!");
      }
    } catch (error) {
      setSyncResult({
        success: false,
        error: error instanceof Error ? error.message : "Unknown error occurred",
      });
      setSyncProgress("Sync failed!");
    } finally {
      setIsSyncing(false);
    }
  };

  const successfulGenres = syncResult?.results?.filter((r) => r.success).length || 0;
  const failedGenres = syncResult?.results?.filter((r) => !r.success).length || 0;

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Channel Sync</h1>
        <p className="text-gray-400">Manage cookie configuration and sync channels from external API</p>
      </div>

      <div className="space-y-6">
        {/* Cookie Configuration Card */}
        <Card>
          <CardHeader>
            <CardTitle>Session & Cookie Configuration</CardTitle>
            <CardDescription>
              Update the session and cookie used for API authentication. These are required to fetch channel data.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={saveConfig} className="space-y-4">
              {isLoadingCookie ? (
                <div className="flex items-center gap-2 text-gray-400">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Loading current configuration...</span>
                </div>
              ) : (
                <>
                  <div className="grid gap-2">
                    <Label htmlFor="session">CI Session</Label>
                    <Input
                      id="session"
                      type="text"
                      placeholder="4rrbqqpthi07h0fpqllhqi3oirpgo2pd"
                      value={session}
                      onChange={(e) => setSession(e.target.value)}
                      required
                      className="font-mono text-sm"
                    />
                    <p className="text-xs text-gray-500">The ci_session value (without "ci_session=" prefix)</p>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="cookie">Cookie</Label>
                    <Input
                      id="cookie"
                      type="text"
                      placeholder="e0e161dc671a2d979810244af04d6ddf"
                      value={cookie}
                      onChange={(e) => setCookie(e.target.value)}
                      required
                      className="font-mono text-sm"
                    />
                    <p className="text-xs text-gray-500">The _cookie value (without "_cookie=" prefix)</p>
                  </div>
                </>
              )}
              
              {cookieMessage && (
                <div
                  className={`flex items-center gap-2 text-sm ${
                    cookieMessage.type === "success" ? "text-green-400" : "text-red-400"
                  }`}
                >
                  {cookieMessage.type === "success" ? (
                    <CheckCircle2 className="h-4 w-4" />
                  ) : (
                    <XCircle className="h-4 w-4" />
                  )}
                  <span>{cookieMessage.text}</span>
                </div>
              )}

              <div className="flex gap-2">
                <Button type="submit" disabled={isSavingCookie || isLoadingCookie}>
                  {isSavingCookie ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    "Save Configuration"
                  )}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={loadConfig}
                  disabled={isLoadingCookie}
                >
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Reload
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Sync Card */}
        <Card>
          <CardHeader>
            <CardTitle>Sync Channels</CardTitle>
            <CardDescription>
              Fetch all channel data from the external API and store it in Supabase. This may take several minutes.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button
              onClick={runSync}
              disabled={isSyncing}
              className="w-full"
              size="lg"
            >
              {isSyncing ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Syncing...
                </>
              ) : (
                "Start Sync"
              )}
            </Button>

            {syncProgress && (
              <div className="text-sm text-gray-400">{syncProgress}</div>
            )}

            {syncResult && (
              <div className="mt-4 space-y-4">
                <div
                  className={`p-4 rounded-lg border ${
                    syncResult.success
                      ? "bg-green-500/10 border-green-500/20 text-green-400"
                      : "bg-red-500/10 border-red-500/20 text-red-400"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    {syncResult.success ? (
                      <CheckCircle2 className="h-5 w-5" />
                    ) : (
                      <XCircle className="h-5 w-5" />
                    )}
                    <span className="font-semibold">
                      {syncResult.success ? "Sync Completed" : "Sync Failed"}
                    </span>
                  </div>
                  {syncResult.message && <p>{syncResult.message}</p>}
                  {syncResult.error && <p>{syncResult.error}</p>}
                </div>

                {syncResult.results && (
                  <div className="space-y-2">
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <div className="text-gray-400">Total Genres</div>
                        <div className="text-xl font-semibold">
                          {syncResult.totalGenres || 0}
                        </div>
                      </div>
                      <div>
                        <div className="text-gray-400">Successful</div>
                        <div className="text-xl font-semibold text-green-400">
                          {successfulGenres}
                        </div>
                      </div>
                      <div>
                        <div className="text-gray-400">Failed</div>
                        <div className="text-xl font-semibold text-red-400">
                          {failedGenres}
                        </div>
                      </div>
                    </div>

                    {failedGenres > 0 && (
                      <details className="mt-4">
                        <summary className="cursor-pointer text-sm text-gray-400 hover:text-white">
                          View failed genres ({failedGenres})
                        </summary>
                        <div className="mt-2 space-y-1 max-h-60 overflow-y-auto">
                          {syncResult.results
                            .filter((r) => !r.success)
                            .map((r, idx) => (
                              <div
                                key={idx}
                                className="text-sm p-2 bg-red-500/10 rounded border border-red-500/20"
                              >
                                <div className="font-medium">{r.genre}</div>
                                {r.error && (
                                  <div className="text-xs text-red-400 mt-1">
                                    {r.error}
                                  </div>
                                )}
                              </div>
                            ))}
                        </div>
                      </details>
                    )}
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
