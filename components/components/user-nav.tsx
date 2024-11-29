"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { LogOut, Coins } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { signOut } from "next-auth/react";

interface UserNavProps {
  children: React.ReactNode;
}

export function UserNav({ children }: UserNavProps) {
  const [amountOfCoins, setAmountOfCoins] = useState<number>(0);
  const [redeemCode, setRedeemCode] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const session = useGetUser();

  // Fetch coins on component mount
  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const response = await fetch("/api/coins", {
          method: "GET",
        });

        if (!response.ok) {
          if (response.status === 403) {
            console.log("Good Bye")
            signOut(); 
          }
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setAmountOfCoins(data.amount_of_coins || 0);
      } catch (error) {
        setError("Could not fetch coins");
        console.error("Error fetching coins:", error);
      }
    };

    fetchCoins();
  }, []);

  // Handle redeem code submission
  const handleRedeemCode = async () => {
    setError(null);
    setSuccessMessage(null);

    if (!redeemCode.trim()) {
      setError("Please enter a redeem code");
      return;
    }

    try {
      const response = await fetch("/api/coins", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ redeem_code: redeemCode }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Invalid redeem code");
      }

      // Show success message and clear the redeem code
      setSuccessMessage(data.message || "Redemption successful");
      setRedeemCode("");

      // Fetch updated coin balance after redemption
      const coinsResponse = await fetch("/api/coins", {
        method: "GET",
      });
      if (!coinsResponse.ok) {
        throw new Error("Failed to fetch updated coin balance");
      }

      const coinsData = await coinsResponse.json();
      setAmountOfCoins(coinsData.amount_of_coins || 0);

      // Clear the success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to redeem code";
      setError(message);
      console.error("Error redeeming code:", error);
    }
  };

  // Custom hook to get user session
  function useGetUser() {
    const { data: session } = useSession();
    return session;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent className="w-80" align="end" forceMount>
        {/* User Profile Section */}
        <div className="flex items-center gap-4 p-4">
          <Avatar className="h-14 w-14">
            <AvatarImage
              src={"/placeholder.svg"}
              alt="User avatar"
            />
            <AvatarFallback className="text-lg font-bold">{session?.user?.email?.charAt(0).toUpperCase() || "U"}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <p className="text-md font-semibold">
              {session?.user?.email || "User"}
            </p>
            <p className="text-xs text-muted-foreground">{session?.user?.email}</p>
          </div>
        </div>

        <DropdownMenuSeparator />

        {/* Coins Section */}
        <DropdownMenuGroup>
          <DropdownMenuLabel className="flex items-center justify-between px-4 py-2">
            <div className="flex items-center gap-2">
              <Coins className="h-5 w-5 text-yellow-500" />
              <span className="font-medium">Your Coins</span>
            </div>
            <span className="text-2xl font-bold">{amountOfCoins}🪙</span>
          </DropdownMenuLabel>

          <div className="px-4 pb-4">
            <div className="flex space-x-2">
              <Input
                placeholder="Enter redeem code"
                value={redeemCode}
                onChange={(e) => setRedeemCode(e.target.value)}
                className="flex-grow"
              />
              <Button variant="secondary" onClick={handleRedeemCode}>
                Redeem
              </Button>
            </div>
            {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
            {successMessage && <p className="mt-2 text-sm text-green-600">{successMessage}</p>}
          </div>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        {/* Sign Out */}
        <DropdownMenuItem
          onSelect={(e) => {
            e.preventDefault();
            signOut()
          }}
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Sign Out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default UserNav;
