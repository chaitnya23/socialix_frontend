import React, { useState } from "react";
import LoginContainer from "./login";
import SignupContainer from "./signup";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="h-screen absolute right-0 left-0 top-0 bottom-0 flex auth-page justify-center align-middle items-center" >
        {isLogin ? <LoginContainer openSignup={()=>setIsLogin(false)}/> : <SignupContainer openLogin={()=>setIsLogin(true)}/>}
    </div>
  );
}
