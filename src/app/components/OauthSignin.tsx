"use client";
import { ClientSafeProvider, getProviders } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { signIn } from "next-auth/react";
const OauthSignin = () => {
  const [providers, setProviders] = useState<{
    [key: string]: ClientSafeProvider;
  } | null>(null);

  useEffect(() => {
    const fetchProviders = async() => {
      const res = await getProviders();
      setProviders(res);
    }
    fetchProviders();
  },[]);
  return (
    <div>
      {providers &&
        Object.values(providers).map((provider) =>
          (provider.id != "credentials" && provider.id != "email") ? (
            <button
              key={provider.id}
              onClick={() => signIn(provider.id, { callbackUrl: "/todos" })}
            >
              {provider.name}
            </button>
          ) : (
            ""
          )
        )}
    </div>
  );
};

export default OauthSignin;
