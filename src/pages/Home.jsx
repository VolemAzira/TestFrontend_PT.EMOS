import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [email, setEmail] = useState("");
  const [greeting, setGreeting] = useState("");
  const [currentTime, setCurrentTime] = useState(new Date());
  const navigate = useNavigate();

  useEffect(() => {
    // Mengambil email dari session
    const storedEmail = sessionStorage.getItem("email");
    setEmail(storedEmail);

    // Mengatur waktu saat komponen dimount
    updateTime();

    // Memperbarui waktu setiap detik
    const intervalId = setInterval(() => {
      updateTime();
    }, 1000);

    // Membersihkan interval saat komponen di-unmount
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const updateTime = () => {
    const now = new Date();
    setCurrentTime(now);

    const hours = now.getHours();
    let newGreeting = "";
    if (hours >= 5 && hours < 12) {
      newGreeting = "Selamat pagi";
    } else if (hours >= 12 && hours < 17) {
      newGreeting = "Selamat siang";
    } else {
      newGreeting = "Selamat malam";
    }
    setGreeting(newGreeting);
  };

  const handleLogout = () => {
    // Hapus email dari session saat logout
    sessionStorage.removeItem("email");
    navigate("/login");
  };

  const emailWithoutDomain = email.split("@")[0];

  return (
    <main className="h-screen">
      <nav className="flex justify-between items-center p-5 bg-blue-400 fixed w-full">
        <h1 className="text-xl font-bold">{email}</h1>
        <button
          className="border-2 border-black p-2 px-5 bg-white text-black hover:bg-slate-200 transition duration-300  font-bold"
          type="button"
          onClick={handleLogout}
        >
          LOGOUT
        </button>
      </nav>
      <section className="flex flex-col justify-center items-center h-screen gap-3 text-2xl font-semibold">
        <h1>{greeting}</h1>
        <h1>{emailWithoutDomain}</h1>
        <p>Jam sekarang: {currentTime.toLocaleTimeString()}</p>
      </section>
    </main>
  );
};

export default Home;
