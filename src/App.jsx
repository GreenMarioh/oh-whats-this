import React, { useState, useEffect } from "react";
import Confetti from "react-confetti";
import {
  Heart,
  Zap,
  Star,
  ChevronDown,
  ChevronUp,
  Music,
  BarChart2,
  Pause,
  Gift,
  Camera,
  Truck,
  Package,
  CheckCircle,
  X,
} from "lucide-react";

// --- CONFIGURATION ---
const STICKER_SETS = {
  set1: {
    id: "set1",
    url: "images/Set 1.png",
    rows: 4,
    cols: 4,
    count: 16,
    title: "The Many Moods of Arya",
    desc: "Her.",
    color: "#be185d", // Deep Pink
    bgColor: "#fce7f3", // Light Pink
    icon: <Star size={24} />,
  },
  set2: {
    id: "set2",
    url: "images/Set 2.png",
    rows: 4,
    cols: 4,
    count: 16,
    title: "Us Against The World",
    desc: "Every moment with you is magic.",
    color: "#1e40af", // Deep Blue
    bgColor: "#dbeafe", // Light Blue
    icon: <Heart size={24} />,
  },
  set3: {
    id: "set3",
    url: "images/Set 3.png",
    rows: 3,
    cols: 4,
    count: 12,
    title: "Danger Zone",
    desc: "The spicy side.",
    color: "#9a3412", // Deep Orange
    bgColor: "#ffedd5", // Light Orange
    icon: <Zap size={24} />,
  },
  set4: {
    id: "set4",
    url: "images/Set 4.png",
    rows: 3,
    cols: 3,
    count: 9,
    title: "Core Memories",
    desc: "Snapshots of our favorite days.",
    color: "#3730a3", // Deep Indigo
    bgColor: "#e0e7ff", // Light Indigo
    icon: <Camera size={24} />,
  },
};

// --- COMPONENT: STICKER ---
const Sticker = ({ setKey, index, className = "", style = {} }) => {
  const set = STICKER_SETS[setKey];
  if (!set) return null;

  const row = Math.floor(index / set.cols);
  const col = index % set.cols;

  const xPos = (col / (set.cols - 1)) * 100;
  const yPos = (row / (set.rows - 1)) * 100;
  const sizeX = set.cols * 100;
  const sizeY = set.rows * 100;

  return (
    <div
      className={`sticker ${className}`}
      style={{
        backgroundImage: `url('${set.url}')`,
        backgroundPosition: `${xPos}% ${yPos}%`,
        backgroundSize: `${sizeX}% ${sizeY}%`,
        ...style,
      }}
      title={`Sticker ${index + 1}`}
    />
  );
};

// --- COMPONENT: SPOTIFY ---
const SpotifyRewind = () => {
  const [unwrapped, setUnwrapped] = useState(false);

  return (
    <div className="spotify-section">
      {!unwrapped ? (
        <button className="spotify-btn" onClick={() => setUnwrapped(true)}>
          <Music className="icon-pulse" />
          <span>Tap to Reveal Mohnish's Spotify Rewind</span>
        </button>
      ) : (
        <div className="spotify-card animate-pop-in">
          <div className="spotify-header">2025 WRAPPED</div>

          <div className="spotify-content">
            <h3 className="spotify-title">Top Genre</h3>

            <div className="spotify-stat-box">
              <div className="spotify-rank-circle">
                <BarChart2 color="black" size={32} />
              </div>
              <div className="spotify-rank-number">#1</div>
              <p className="spotify-stat-text">Arya's Voice Notes</p>
              <p className="spotify-subtext">Top 0.001% of Listeners</p>
            </div>

            <div className="spotify-player">
              <Pause fill="white" stroke="none" size={20} />
              <div className="spotify-track-info">
                <span>
                  Love and Yap<br></br>
                </span>
                <span style={{ fontSize: "10px", color: "#b3b3b3" }}>
                  <br />
                  Arya • Mohnish's Phone
                </span>
              </div>
              <div className="spotify-progress-bar">
                <div className="spotify-progress-fill"></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// --- COMPONENT: DELIVERY MODAL ---
const DeliveryModal = ({ onClose }) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="delivery-card animate-pop-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="delivery-header">
          <h3>
            <Truck size={24} style={{ marginRight: "10px" }} /> Order Tracking
          </h3>
          <button className="close-icon" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="delivery-body">
          <div className="status-row">
            <div className="status-icon">
              <Package size={20} color="#fff" />
            </div>
            <div className="status-info">
              <span className="label">Package Contents</span>
              <span className="value">
                22 Years of Love that cannot be contained
              </span>
            </div>
          </div>

          <div className="status-row">
            <div className="status-icon">
              <Truck size={20} color="#fff" />
            </div>
            <div className="status-info">
              <span className="label">Delivery Agent</span>
              <span className="value">Mohnish Kumar</span>
            </div>
          </div>

          <div className="status-row active">
            <div className="status-icon">
              <CheckCircle size={20} color="#fff" />
            </div>
            <div className="status-info">
              <span className="label">Current Status</span>
              <span className="value status-text">Shipped</span>
            </div>
          </div>

          <div className="delivery-date">
            Expected Delivery: <span className="highlight">December 5th</span>
          </div>
        </div>

        <button className="delivery-close-btn" onClick={onClose}>
          Awesome!
        </button>
      </div>
    </div>
  );
};

// --- COMPONENT: CATEGORY CARD ---
const CategoryCard = ({ setKey, config, stickersToDecorate }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`category-wrapper ${isOpen ? "expanded" : ""}`}>
      {!isOpen &&
        stickersToDecorate.map((stickerIdx, i) => (
          <div
            key={i}
            className="floating-sticker-container"
            style={{
              top: i % 2 === 0 ? "-15px" : "auto",
              bottom: i % 2 !== 0 ? "-15px" : "auto",
              left: i < 2 ? "-10px" : "auto",
              right: i >= 2 ? "-10px" : "auto",
              transform: `rotate(${i % 2 === 0 ? "-10deg" : "10deg"})`,
            }}
          >
            <Sticker
              setKey={setKey}
              index={stickerIdx}
              className="float-sticker"
            />
          </div>
        ))}

      <div
        className="category-card"
        style={{
          backgroundColor: config.bgColor,
          color: config.color,
          borderColor: isOpen ? config.color : "transparent",
        }}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="card-header">
          <div className="card-icon">{config.icon}</div>
          <h3>{config.title}</h3>
          <p>{config.desc}</p>

          <button className="toggle-btn" style={{ color: config.color }}>
            {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            <span>{isOpen ? "Close" : "View Collection"}</span>
          </button>
        </div>

        {isOpen && (
          <div className="gallery-grid animate-fade-in">
            {Array.from({ length: config.count }).map((_, idx) => (
              <div key={idx} className="gallery-item">
                <Sticker
                  setKey={setKey}
                  index={idx}
                  className="gallery-sticker"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// --- MAIN APP ---
export default function App() {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [showDelivery, setShowDelivery] = useState(false);

  useEffect(() => {
    const handleResize = () =>
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="app-root">
      <Confetti
        width={windowSize.width}
        height={windowSize.height}
        recycle={true}
        numberOfPieces={100}
        gravity={0.03}
      />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fredoka:wght@400;600;700&family=Poppins:wght@400;600&display=swap');

        :root { --bg-gradient: linear-gradient(135deg, #fdfbfb 0%, #ebedee 100%); }
        * { box-sizing: border-box; }

        body {
          margin: 0;
          font-family: 'Poppins', sans-serif;
          background: var(--bg-gradient);
          color: #334155;
          min-height: 100vh;
          overflow-x: hidden; 
        }

        /* --- LAYOUT FIX: CENTERING --- */
        .app-root {
          width: 100vw;
          min-height: 100vh;
          display: flex;
          justify-content: center;
          padding: 40px 20px;
        }

        .content-container {
          width: 100%;
          max-width: 1000px;
          display: flex;
          flex-direction: column;
          align-items: center;
          margin: 0 auto;
        }

        /* --- BANNER --- */
        .banner-container {
          position: relative;
          width: 100%;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 10px 20px rgba(0,0,0,0.15);
          margin-bottom: 3rem;
        }
        .banner-img { width: 100%; height: auto; display: block; }
        .banner-overlay {
          position: absolute; top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(0,0,0,0.4);
          display: flex; flex-direction: column; justify-content: center; align-items: center;
          color: white; padding: 20px; text-align: center;
        }
        .main-title { font-family: 'Fredoka', sans-serif; font-size: 2.5rem; color: white; text-shadow: 0 4px 10px rgba(0,0,0,0.5); margin: 0 0 1rem 0; }
        .subtitle { color: rgba(255,255,255,0.95); font-size: 1.1rem; margin-bottom: 1.5rem; }

        /* --- GRID --- */
        .main-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 2rem;
          width: 100%;
          margin-bottom: 2rem;
        }
        @media (max-width: 768px) { .main-grid { grid-template-columns: 1fr; } }

        /* --- CARDS --- */
        .category-wrapper { width: 100%; position: relative; }
        .category-wrapper.expanded { grid-column: 1 / -1; }
        .category-card {
          background: white; border-radius: 24px; padding: 2.5rem;
          cursor: pointer; transition: transform 0.2s; position: relative; z-index: 10;
          display: flex; flex-direction: column; align-items: center; height: 100%;
          border: 3px solid transparent; box-shadow: 0 4px 6px rgba(0,0,0,0.02);
        }
        .category-card:hover { transform: translateY(-5px); box-shadow: 0 15px 30px rgba(0,0,0,0.08); }
        .card-header { text-align: center; width: 100%; display: flex; flex-direction: column; align-items: center; }
        .card-icon { background: rgba(255,255,255,0.9); padding: 1.2rem; border-radius: 50%; margin-bottom: 1rem; box-shadow: 0 4px 10px rgba(0,0,0,0.05); }
        .category-card h3 { font-family: 'Fredoka', sans-serif; font-size: 1.5rem; margin: 0 0 0.5rem 0; }
        .category-card p { margin: 0 0 1.5rem 0; font-size: 1rem; opacity: 0.8; }

        .toggle-btn {
          background: white; border: none; padding: 12px 24px; border-radius: 30px;
          display: flex; align-items: center; gap: 8px; cursor: pointer; font-weight: 700; font-size: 0.95rem;
          box-shadow: 0 4px 6px rgba(0,0,0,0.05); transition: transform 0.2s;
        }
        .toggle-btn:hover { transform: scale(1.05); }

        /* --- STICKERS --- */
        .sticker { display: block; background-repeat: no-repeat; border-radius: 12px; width: 100%; aspect-ratio: 1 / 1; }
        .floating-sticker-container { position: absolute; z-index: 0; pointer-events: none; }
        .float-sticker { width: 70px; height: 70px; background-color: white; border: 4px solid white; border-radius: 50%; box-shadow: 0 4px 10px rgba(0,0,0,0.1); }
        .gallery-grid {
            display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; margin-top: 2rem;
            background: rgba(255,255,255,0.5); padding: 20px; border-radius: 20px; width: 100%;
        }
        .gallery-sticker { background-color: white; transition: transform 0.2s; box-shadow: 0 2px 5px rgba(0,0,0,0.05); }
        .gallery-sticker:hover { transform: scale(1.1); z-index: 20; }

        /* --- DELIVERY BUTTON --- */
        .delivery-cta-section { margin-bottom: 3rem; text-align: center; }
        .delivery-btn {
            background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
            color: white; border: none; padding: 15px 30px; font-size: 1.1rem; font-weight: 700;
            border-radius: 50px; cursor: pointer; display: flex; align-items: center; gap: 10px;
            box-shadow: 0 10px 20px rgba(99, 102, 241, 0.3); transition: transform 0.2s;
        }
        .delivery-btn:hover { transform: translateY(-2px); box-shadow: 0 15px 25px rgba(99, 102, 241, 0.4); }

        /* --- DELIVERY MODAL --- */
        .modal-overlay {
            position: fixed; top: 0; left: 0; width: 100%; height: 100%;
            background: rgba(0,0,0,0.6); z-index: 1000;
            display: flex; justify-content: center; align-items: center; padding: 20px;
        }
        .delivery-card {
            background: white; padding: 30px; border-radius: 24px; width: 100%; max-width: 400px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.2); animation: pop-in 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        .delivery-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; border-bottom: 1px solid #eee; padding-bottom: 15px; }
        .delivery-header h3 { margin: 0; color: #1e293b; display: flex; align-items: center; font-size: 1.2rem; }
        .close-icon { background: none; border: none; cursor: pointer; color: #94a3b8; padding: 5px; }
        .status-row { display: flex; align-items: center; margin-bottom: 20px; gap: 15px; }
        .status-icon { width: 40px; height: 40px; background: #cbd5e1; border-radius: 50%; display: flex; align-items: center; justify-content: center; }
        .status-row.active .status-icon { background: #10b981; }
        .status-info { display: flex; flex-direction: column; }
        .label { font-size: 0.8rem; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px; }
        .value { font-weight: 600; color: #0f172a; font-size: 1rem; }
        .status-text { color: #10b981; }
        .delivery-date { background: #f1f5f9; padding: 15px; border-radius: 12px; text-align: center; font-size: 0.9rem; color: #475569; margin-top: 10px; }
        .delivery-date .highlight { color: #6366f1; font-weight: 700; font-size: 1rem; display: block; margin-top: 5px; }
        .delivery-close-btn { width: 100%; background: #0f172a; color: white; border: none; padding: 15px; border-radius: 12px; font-weight: 600; margin-top: 20px; cursor: pointer; }

        /* --- WISH & SPOTIFY --- */
        .wish-section { background: white; padding: 3rem; border-radius: 24px; text-align: center; box-shadow: 0 10px 15px rgba(0,0,0,0.05); margin-bottom: 4rem; border-top: 6px solid #ec4899; width: 100%; }
        .wish-text { font-size: 1.1rem; line-height: 1.8; font-style: italic; color: #555; }
        .spotify-section { display: flex; justify-content: center; margin: 2rem 0; width: 100%; }
        .spotify-btn { background: #1DB954; color: white; border: none; padding: 1rem 2rem; border-radius: 50px; font-weight: 700; font-size: 1.1rem; cursor: pointer; display: flex; align-items: center; gap: 10px; box-shadow: 0 10px 20px rgba(29, 185, 84, 0.4); transition: transform 0.2s; }
        .spotify-btn:hover { transform: scale(1.05); }
        .spotify-card { background: linear-gradient(180deg, #2e0216 0%, #000 100%); color: white; padding: 2.5rem; border-radius: 20px; width: 100%; max-width: 350px; text-align: center; border: 1px solid #333; box-shadow: 0 20px 40px rgba(0,0,0,0.6); }
        .spotify-header { letter-spacing: 2px; font-size: 0.8rem; color: #b3b3b3; margin-bottom: 2rem; }
        .spotify-title { font-size: 1.5rem; margin-bottom: 1rem; color: #1DB954; }
        .spotify-stat-box { display: flex; flex-direction: column; align-items: center; margin: 2rem 0; }
        .spotify-rank-circle { background: #1DB954; width: 80px; height: 80px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-bottom: 1rem; box-shadow: 0 0 20px rgba(29, 185, 84, 0.5); }
        .spotify-stat-text { font-size: 1.3rem; font-weight: 700; margin: 5px 0; }
        .spotify-subtext { font-size: 0.8rem; color: #b3b3b3; }
        .spotify-player { background: rgba(255,255,255,0.1); padding: 1rem; border-radius: 15px; display: flex; align-items: center; gap: 15px; margin-top: 2rem; }
        .spotify-progress-bar { width: 100%; height: 4px; background: #555; border-radius: 2px; margin-top: 5px; }
        .spotify-progress-fill { width: 80%; height: 100%; background: white; border-radius: 2px; }

        .footer { text-align: center; color: #aaa; font-size: 0.8rem; margin-top: 3rem; }
        
        @keyframes pulse { 0% { transform: scale(1); } 50% { transform: scale(1.1); } 100% { transform: scale(1); } }
        @keyframes pop-in { 0% { transform: scale(0.8); opacity: 0; } 100% { transform: scale(1); opacity: 1; } }
        .animate-pop-in { animation: pop-in 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards; }
        .animate-fade-in { animation: pop-in 0.3s ease-out forwards; }
      `}</style>

      {/* --- MAIN CONTENT WRAPPER --- */}
      <div className="content-container">
        <div className="banner-container">
          <img src="images/Set 5.png" alt="Header" className="banner-img" />
          <div className="banner-overlay">
            <h1 className="main-title">Happy 22nd Birthday Arya!</h1>
            <p className="subtitle">Celebrating your special day!</p>
          </div>
        </div>

        <div className="main-grid">
          <CategoryCard
            setKey="set1"
            config={STICKER_SETS.set1}
            stickersToDecorate={[0, 4, 8, 15]}
          />
          <CategoryCard
            setKey="set2"
            config={STICKER_SETS.set2}
            stickersToDecorate={[1, 5, 10, 14]}
          />
          <CategoryCard
            setKey="set3"
            config={STICKER_SETS.set3}
            stickersToDecorate={[0, 2, 4]}
          />
          <CategoryCard
            setKey="set4"
            config={STICKER_SETS.set4}
            stickersToDecorate={[0, 4, 8]}
          />
        </div>

        {/* --- DELIVERY BUTTON --- */}
        <div className="delivery-cta-section">
          <button
            className="delivery-btn"
            onClick={() => setShowDelivery(true)}
          >
            <Package size={20} />
            Click here to receive the stickers!
          </button>
        </div>

        {/* --- DELIVERY MODAL --- */}
        {showDelivery && (
          <DeliveryModal onClose={() => setShowDelivery(false)} />
        )}

        <div className="wish-section">
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "1rem",
              color: "#ec4899",
            }}
          >
            <Gift size={32} />
          </div>
          <div className="wish-text">
            "To someone who showed me love 22 million times more than anyone
            could.
            <br />
            <br />
            <strong>Happy 22nd Birthday!</strong>
            <br />
            <br />
            Apologies for everything. "
          </div>
        </div>

        <SpotifyRewind />

        <footer className="footer">Made with ❤️ for Arya</footer>
      </div>
    </div>
  );
}