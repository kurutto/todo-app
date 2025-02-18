"use client";
import { RecoilRoot } from 'recoil';
import { FC, PropsWithChildren } from "react";

export const RecoilProvider: FC<PropsWithChildren> = ({ children }) => {
  return <RecoilRoot>{children}</RecoilRoot>;
};