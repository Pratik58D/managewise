import ResetPasswordForm from "@/components/auth/ResetPasswordForm";


export default async function Page({
  searchParams
}: {
  searchParams: Promise<{ token?: string; email?: string }>;
}) {
  // await the searchParams promise
  const params = await searchParams;

  console.log(params.token , "searchparams with token" , params.email , "searchparams email")
  return (
    <div className="flex justify-center items-center h-screen">
      <ResetPasswordForm token={params.token} email={params.email} />
    </div>
  );
}
