import Link from "next/link";
import { LogOut, LogIn, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function LogoutPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <Card className="w-full max-w-sm rounded-2xl shadow-lg border-gray-100">
        <CardContent className="p-8 flex flex-col items-center text-center">
          {/* Icon */}
          <div className="w-16 h-16 bg-teal-50 rounded-full flex items-center justify-center mb-5">
            <LogOut className="w-7 h-7 text-teal-600" />
          </div>

          {/* Logo */}
          <div className="flex items-center gap-2 mb-6">
            <div className="w-7 h-7 bg-teal-600 rounded-md flex items-center justify-center">
              <span className="text-white font-bold text-xs">+</span>
            </div>
            <span className="text-teal-700 font-bold text-base tracking-wide">AUSHADHAM</span>
          </div>

          <h2 className="text-xl font-bold text-gray-800 mb-2">You&apos;ve been logged out</h2>
          <p className="text-sm text-gray-400 mb-8 leading-relaxed">
            Your session has ended. Log back in to continue managing your clinic.
          </p>

          <div className="w-full space-y-3">
            <Link href="/dashboard" className="block">
              <Button className="w-full bg-teal-600 hover:bg-teal-700 text-white rounded-xl gap-2">
                <LogIn className="w-4 h-4" />
                Log In
              </Button>
            </Link>
            <Link href="/dashboard" className="block">
              <Button variant="outline" className="w-full rounded-xl border-gray-200 text-gray-600 hover:border-teal-300 hover:text-teal-600 gap-2">
                <UserPlus className="w-4 h-4" />
                Sign Up for a New Account
              </Button>
            </Link>
          </div>

          <p className="text-[11px] text-gray-300 mt-6">
            AUSHADHAM Health Tech · All rights reserved
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
