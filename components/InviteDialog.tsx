"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Facebook, MessageCircle, Copy, Search, X } from "lucide-react";

interface InviteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function InviteDialog({ open, onOpenChange }: InviteDialogProps) {
  const [email, setEmail] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [invitedEmail, setInvitedEmail] = useState("");

  const handleInvite = () => {
    if (email.trim()) {
      setInvitedEmail(email);
      setShowSuccess(true);
      setEmail("");
    }
  };

  const handleClose = () => {
    onOpenChange(false);
    // Reset state after dialog animation completes
    setTimeout(() => {
      setShowSuccess(false);
      setEmail("");
    }, 300);
  };

  const copyLink = () => {
    navigator.clipboard.writeText("ihgasdgjfwejhbds83t4jbdshbfaihgasdgjfw");
  };

  if (showSuccess) {
    return (
      <Dialog open={open} onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-md rounded-3xl p-8" showCloseButton={false}>
          <button
            onClick={handleClose}
            className="absolute right-4 top-4 rounded-full bg-gray-800 text-white w-8 h-8 flex items-center justify-center hover:bg-gray-700 transition-colors z-10"
          >
            <X className="w-4 h-4" />
          </button>
          <div className="text-center py-6">
            <h2 className="text-2xl font-bold mb-4">"Wonderful!</h2>
            <p className="text-gray-700">
              This information has been successfully shared to{" "}
              <span className="text-blue-500 font-medium">@{invitedEmail}</span>.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-xl rounded-3xl p-8" showCloseButton={false}>
        <button
          onClick={handleClose}
          className="absolute right-4 top-4 rounded-full bg-gray-800 text-white w-8 h-8 flex items-center justify-center hover:bg-gray-700 transition-colors z-10"
        >
          <X className="w-4 h-4" />
        </button>
        
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center mb-6">
            Share your profile with others
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Social Media Icons */}
          <div className="flex items-center justify-center gap-4">
            <button className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center hover:bg-blue-600 transition-colors">
              <Facebook className="w-6 h-6 text-white fill-white" />
            </button>
            <button className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center hover:bg-green-600 transition-colors">
              <MessageCircle className="w-6 h-6 text-white" />
            </button>
            <button className="w-12 h-12 rounded-full bg-blue-400 flex items-center justify-center hover:bg-blue-500 transition-colors">
              <MessageCircle className="w-6 h-6 text-white" />
            </button>
            <button className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center hover:bg-blue-600 transition-colors">
              <MessageCircle className="w-6 h-6 text-white" />
            </button>
            <button className="w-12 h-12 rounded-full bg-blue-400 flex items-center justify-center hover:bg-blue-500 transition-colors">
              <MessageCircle className="w-6 h-6 text-white" />
            </button>
          </div>

          {/* Email Input with Invite Button */}
          <div className="flex items-center gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="email"
                placeholder="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-12 h-12 rounded-xl bg-gray-100 border-0 focus-visible:ring-2 focus-visible:ring-teal-500"
              />
            </div>
            <Button
              onClick={handleInvite}
              disabled={!email.trim()}
              className={`h-12 px-6 rounded-xl transition-all duration-300 ${
                email.trim()
                  ? "bg-teal-600 hover:bg-teal-700 text-white shadow-[0_0_20px_rgba(13,148,136,0.6)] hover:shadow-[0_0_25px_rgba(13,148,136,0.8)]"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
            >
              Invite
            </Button>
          </div>

          {/* Copy Link Section */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Copy the link</h3>
            <div className="flex items-center gap-3">
              <div className="flex-1 bg-gray-100 rounded-xl px-4 py-3 text-gray-600 text-sm">
                ihgasdgjfwejhbds83t4jbdshbfaihgasdgjfw
              </div>
              <button
                onClick={copyLink}
                className="w-12 h-12 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
              >
                <Copy className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
