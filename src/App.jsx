import React, { useState, useEffect } from "react";
import { Zap } from "lucide-react";
import { Copy } from "lucide-react";

const App = () => {
  const [password, setPassword] = useState(() => {
    // Retrieve password from localStorage if it exists
    const storedPassword = localStorage.getItem("password");
    return storedPassword ? storedPassword : "";
  });

  useEffect(() => {
    // Store password in localStorage when it changes
    localStorage.setItem("password", password);
  }, [password]);

  const passAppend = (passType) => {
    let genPass = "";
    let alreadyUsed = {};
    let passLen = passType.length;
    let i = 0;
    while (i < 5) {
      const character = passType.charAt(Math.floor(Math.random() * passLen));
      if (alreadyUsed[character]) continue;
      else {
        genPass += character;
        alreadyUsed[character] = true;
        i++;
      }
    }
    return genPass;
  };

  const handleClick = () => {
    const upperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowerCase = "abcdefghijklmnopqrstuvwxyz";
    const digits = "0123456789";
    const special = "!@#$%^&*()";
    let genPass = "";
    genPass += passAppend(upperCase);
    genPass += passAppend(lowerCase);
    genPass += passAppend(digits);
    genPass += passAppend(special);
    genPass;
    let shuffled = genPass
      .split("")
      .sort(function () {
        return 0.5 - Math.random();
      })
      .join("");
    setPassword(shuffled);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(password);
  };

  return (
    <div className="bg-gradient-to-tr to-dark-blue from-green-500 bg-dark-blue h-screen w-screen flex justify-center items-center flex-col">
      <div className="text-5xl text-white min-h-[40%] w-[40%]">
        <h1 className="mb-5">Generate a</h1>
        <h1 className="underline-offset-4 mb-16 text-dark-blue font-semibold">
          Random Password
        </h1>
        <div className="flex justify-between items-center bg-white text-black px-[10px] h-[50px] rounded-lg text-xl mb-5">
          <input
            type="text"
            value={password}
            className="h-[35px] outline-none w-[90%]"
            readOnly
          />
          <Copy
            onClick={handleCopy}
            className="cursor-pointer hover:scale-125 transition-all transition-linear duration-500"
          />
        </div>
        <button
          className="text-3xl bg-green-500 px-4 py-3 rounded-lg flex items-center justify-center gap-4"
          onClick={handleClick}
        >
          <Zap />
          Generate Password
        </button>
      </div>
    </div>
  );
};

export default App;
