"use client";
import { ClientSafeProvider, getProviders } from "next-auth/react";
import React, { ReactNode, useEffect, useState } from "react";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";

interface OauthSigninProps {
  className ?: string;
}
const OauthSignin = ({className}:OauthSigninProps) => {
  const [providers, setProviders] = useState<{
    [key: string]: ClientSafeProvider;
  } | null>(null);

  useEffect(() => {
    const fetchProviders = async () => {
      const res = await getProviders();
      setProviders(res);
    };
    fetchProviders();
  }, []);
  return (
    <div>
      {providers &&
        Object.values(providers).map((provider) =>
          provider.id != "credentials" && provider.id != "email" ? (
            <Button
              key={provider.id}
              onClick={() => signIn(provider.id, { callbackUrl: "/todos" })}
              className="w-full"
            >
              {provider.name}
            </Button>
          ) : (
            ""
          )
        )}
    </div>
  );
};

export default OauthSignin;
