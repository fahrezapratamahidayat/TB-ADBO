"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const { data: session, status }: { data: any; status: string } = useSession();
  const [profile, setProfile] = useState<any>([]);
  const fetchUser = async () => {
    const snapshot = await fetch(`/api/user/getuser?id=${session?.user.id}`);
    const res = await snapshot.json();
    setProfile(res.data);
  };
  useEffect(() => {
    fetchUser();
  });
  return (
    <>
      <div className="bg-primary min-h-screen w-full relative">
        <main className="w-full h-full z-99">
          <div className="w-full flex justify-between items-center py-2 px-5">
            <h2 className="text-base font-bold text-black ">9:41</h2>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="68"
              height="12"
              viewBox="0 0 68 12"
              fill="none"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M46.5894 0.160034H61.4106C62.6587 0.160034 63.1113 0.28999 63.5676 0.53402C64.0239 0.7755 64.382 1.13615 64.626 1.59245C64.87 2.04875 65 2.50135 65 3.74947V8.07059C65 9.31872 64.87 9.77132 64.626 10.2276C64.382 10.6839 64.0239 11.042 63.5676 11.286C63.1113 11.5301 62.6587 11.66 61.4106 11.66H46.5894C45.3413 11.66 44.8887 11.5301 44.4324 11.286C43.9761 11.042 43.618 10.6839 43.374 10.2276C43.13 9.77132 43 9.31872 43 8.07059V3.74947C43 2.50135 43.13 2.04875 43.374 1.59245C43.618 1.13615 43.9761 0.77805 44.4324 0.53402C44.8887 0.28999 45.3413 0.160034 46.5894 0.160034ZM46.5894 1.16003C45.6025 1.16003 45.2579 1.22657 44.904 1.41583C44.622 1.56666 44.4066 1.78202 44.2558 2.06405C44.0665 2.41794 44 2.76249 44 3.74947V8.07059C44 9.05757 44.0665 9.40213 44.2558 9.75602C44.4066 10.038 44.622 10.2534 44.904 10.4042C45.2579 10.5935 45.6025 10.66 46.5894 10.66H61.4106C62.3975 10.66 62.7421 10.5935 63.096 10.4042C63.378 10.2534 63.5934 10.038 63.7442 9.75602C63.9335 9.40213 64 9.05757 64 8.07059V3.74947C64 2.76249 63.9335 2.41794 63.7442 2.06405C63.5934 1.78202 63.378 1.56666 63.096 1.41583C62.7421 1.22657 62.3975 1.16003 61.4106 1.16003H46.5894ZM67.5 5.85004C67.5 7.08661 66 7.85004 66 7.85004V3.85004C66 3.85004 67.5 4.61346 67.5 5.85004Z"
                fill="black"
                fill-opacity="0.36"
              />
              <rect
                x="45"
                y="2.07666"
                width="18"
                height="7.66667"
                rx="1.6"
                fill="black"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M14.623 1.56599C14.6 1.68191 14.6 1.8213 14.6 2.1001V9.8001C14.6 10.0789 14.6 10.2183 14.623 10.3342C14.7177 10.8102 15.0898 11.1824 15.5659 11.277C15.6818 11.3001 15.8212 11.3001 16.1 11.3001C16.3788 11.3001 16.5182 11.3001 16.6341 11.277C17.1101 11.1824 17.4822 10.8102 17.5769 10.3342C17.6 10.2183 17.6 10.0789 17.6 9.8001V2.1001C17.6 1.8213 17.6 1.68191 17.5769 1.56599C17.4822 1.08996 17.1101 0.717843 16.6341 0.623155C16.5182 0.600098 16.3788 0.600098 16.1 0.600098C15.8212 0.600098 15.6818 0.600098 15.5659 0.623155C15.0898 0.717843 14.7177 1.08996 14.623 1.56599ZM9.89999 4.5001C9.89999 4.22131 9.89999 4.08191 9.92305 3.96599C10.0177 3.48996 10.3899 3.11784 10.8659 3.02316C10.9818 3.0001 11.1212 3.0001 11.4 3.0001C11.6788 3.0001 11.8182 3.0001 11.9341 3.02316C12.4101 3.11784 12.7822 3.48996 12.8769 3.96599C12.9 4.08191 12.9 4.22131 12.9 4.5001V9.8001C12.9 10.0789 12.9 10.2183 12.8769 10.3342C12.7822 10.8102 12.4101 11.1824 11.9341 11.277C11.8182 11.3001 11.6788 11.3001 11.4 11.3001C11.1212 11.3001 10.9818 11.3001 10.8659 11.277C10.3899 11.1824 10.0177 10.8102 9.92305 10.3342C9.89999 10.2183 9.89999 10.0789 9.89999 9.8001V4.5001ZM5.32305 6.26599C5.29999 6.38191 5.29999 6.52131 5.29999 6.8001V9.8001C5.29999 10.0789 5.29999 10.2183 5.32305 10.3342C5.41773 10.8102 5.78985 11.1824 6.26588 11.277C6.3818 11.3001 6.52119 11.3001 6.79999 11.3001C7.07878 11.3001 7.21818 11.3001 7.3341 11.277C7.81012 11.1824 8.18224 10.8102 8.27693 10.3342C8.29999 10.2183 8.29999 10.0789 8.29999 9.8001V6.8001C8.29999 6.52131 8.29999 6.38191 8.27693 6.26599C8.18224 5.78997 7.81012 5.41785 7.3341 5.32316C7.21818 5.3001 7.07878 5.3001 6.79999 5.3001C6.52119 5.3001 6.3818 5.3001 6.26588 5.32316C5.78985 5.41785 5.41773 5.78997 5.32305 6.26599ZM0.523058 8.26599C0.5 8.38191 0.5 8.52131 0.5 8.8001V9.8001C0.5 10.0789 0.5 10.2183 0.523058 10.3342C0.617746 10.8102 0.989863 11.1824 1.46589 11.277C1.58181 11.3001 1.72121 11.3001 2 11.3001C2.27879 11.3001 2.41819 11.3001 2.53411 11.277C3.01014 11.1824 3.38225 10.8102 3.47694 10.3342C3.5 10.2183 3.5 10.0789 3.5 9.8001V8.8001C3.5 8.52131 3.5 8.38191 3.47694 8.26599C3.38225 7.78997 3.01014 7.41785 2.53411 7.32316C2.41819 7.3001 2.27879 7.3001 2 7.3001C1.72121 7.3001 1.58181 7.3001 1.46589 7.32316C0.989863 7.41785 0.617746 7.78997 0.523058 8.26599Z"
                fill="black"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M30.3004 2.69638C32.5348 2.69648 34.6838 3.55504 36.3032 5.09459C36.4251 5.21345 36.62 5.21195 36.7401 5.09123L37.9058 3.91482C37.9666 3.85359 38.0005 3.77065 38 3.68435C37.9995 3.59806 37.9646 3.51552 37.9031 3.45501C33.6528 -0.618303 26.9474 -0.618303 22.6971 3.45501C22.6355 3.51547 22.6006 3.59799 22.6 3.68428C22.5994 3.77058 22.6333 3.85354 22.6941 3.91482L23.8601 5.09123C23.9801 5.21214 24.1751 5.21364 24.297 5.09459C25.9166 3.55493 28.0658 2.69638 30.3004 2.69638ZM30.3004 6.52377C31.5281 6.5237 32.7119 6.98001 33.622 7.80405C33.745 7.921 33.9389 7.91846 34.0589 7.79833L35.2232 6.62192C35.2845 6.56021 35.3186 6.4765 35.3177 6.38952C35.3168 6.30253 35.2811 6.21953 35.2185 6.15908C32.4474 3.58134 28.1558 3.58134 25.3847 6.15908C25.3221 6.21953 25.2864 6.30257 25.2856 6.38959C25.2847 6.4766 25.3189 6.5603 25.3803 6.62192L26.5443 7.79833C26.6643 7.91846 26.8582 7.921 26.9813 7.80405C27.8907 6.98055 29.0736 6.52428 30.3004 6.52377ZM32.538 9.33137C32.6002 9.27026 32.6345 9.18616 32.6327 9.09893C32.631 9.0117 32.5933 8.92907 32.5286 8.87055C31.2423 7.78265 29.3585 7.78265 28.0723 8.87055C28.0075 8.92903 27.9698 9.01163 27.9679 9.09886C27.9661 9.18609 28.0003 9.27021 28.0625 9.33137L30.0769 11.3639C30.1359 11.4236 30.2164 11.4572 30.3004 11.4572C30.3844 11.4572 30.4649 11.4236 30.5239 11.3639L32.538 9.33137Z"
                fill="black"
              />
            </svg>
          </div>
          <div className="flex items-center justify-center flex-col w-full">
            <h1 className="text-2xl font-bold ">Dashboard</h1>
          </div>
          <div className="flex items-center mt-[31px] px-[46px]">
            <div className="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
              {profile && profile.profileUrl ? (
                <Image src={profile.profileUrl} alt="" width={60} height={60} />
              ) : (
                <svg
                  className="absolute w-12 h-12 text-gray-400 -left-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              )}
            </div>
            <div className="flex flex-col ml-4">
              <h1 className="font-bold text-base">Selamat Datang</h1>
              <h1 className="font-bold text-base">
                {session && session.user.name}
              </h1>
            </div>
          </div>
          <div className="mt-[61px] mx-[30px] h-[205px] bg-white rounded-[11px]">
            <div className="grid grid-cols-2 grid-rows-2 items-center justify-center w-full">
              <div className="flex items-center flex-col mt-2">
                <Link
                  href="/dashboard/profile"
                  className="flex flex-col items-center"
                >
                  <Image
                    width={75}
                    height={75}
                    src="/src/Images/girl.png"
                    alt=""
                  />
                  <h2 className="font-bold text-base">Profile</h2>
                </Link>
              </div>
              <div className="flex items-center flex-col mt-2">
                <Link
                  href="/dashboard/uploadstory"
                  className="flex flex-col items-center"
                >
                  <Image
                    width={75}
                    height={75}
                    src="/src/Images/cloud.png"
                    alt=""
                  />
                  <h2 className="font-bold text-base">Upload Story</h2>
                </Link>
              </div>
              <div className="flex items-center flex-col mt-2">
                <Link
                  href="/dashboard/travel"
                  className="flex flex-col items-center"
                >
                  <Image
                    width={60}
                    height={60}
                    src="/src/Images/pass.png"
                    alt=""
                  />
                  <h2 className="font-bold text-base">Travel Notes</h2>
                </Link>
              </div>
              <div className="flex items-center flex-col mt-2">
                <Link
                  href="/dashboard/setting"
                  className="flex flex-col items-center"
                >
                  <Image
                    width={60}
                    height={60}
                    src="/src/Images/gear.png"
                    alt=""
                  />
                  <h2 className="font-bold text-base">setting</h2>
                </Link>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
