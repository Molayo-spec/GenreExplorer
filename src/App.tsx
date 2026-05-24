import React, { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Music, Zap, Star, Guitar, Mic2, Music2, Waves, Sun, Trees, Disc, 
  ChevronRight, Info, Copy, Check, ExternalLink, Search, ListMusic, Dices, Database, X, Youtube, Moon
} from "lucide-react";
import { GENRE_DATA, RootGenre, GenreNode } from "./data";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const ICON_MAP: Record<string, any> = {
  Music, Zap, Star, Guitar, Mic2, Music2, Waves, Sun, Trees, Disc
};

// Parser function
function parseRawData(text: string): GenreNode[] {
  const genres: GenreNode[] = [];
  const lines = text.split('\n');
  
  let currentGenre: Partial<GenreNode> & { engName?: string, korName?: string } = {};
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;
    
    // Match "1. Name (Korean)" or "※ (1. Name (Korean)"
    const nameMatch = line.match(/(?:\d+\.|※\s*\(\d+\.)\s+([^(]+?)\s*\(([^)]+)\)/);
    if (nameMatch) {
      if (currentGenre.engName && currentGenre.description) {
        genres.push(buildGenre(currentGenre));
      }
      currentGenre = {
        engName: nameMatch[1].trim(),
        korName: nameMatch[2].trim()
      };
      continue;
    }
    
    const descMatch = line.match(/-\s*정의:\s*(.+)/);
    if (descMatch && currentGenre.engName) {
      currentGenre.description = descMatch[1].trim();
      continue;
    }
    
    const originMatch = line.match(/-\s*유래:\s*(.+)/);
    if (originMatch && currentGenre.engName) {
      currentGenre.origin = originMatch[1].trim();
      continue;
    }
  }
  
  if (currentGenre.engName && currentGenre.description) {
    genres.push(buildGenre(currentGenre));
  }
  
  return genres;
}

function buildGenre(g: any): GenreNode {
  return {
    id: g.engName.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    name: `${g.engName} (${g.korName})`,
    description: g.description || '',
    origin: g.origin || '',
    keywords: [g.engName, g.korName]
  };
}

function groupGenres(genres: GenreNode[]): RootGenre[] {
  const groups: Record<string, GenreNode[]> = {};
  for (const g of genres) {
    const firstLetter = g.name.charAt(0).toUpperCase();
    const key = /[A-Z]/.test(firstLetter) ? firstLetter : '기타';
    if (!groups[key]) groups[key] = [];
    groups[key].push(g);
  }
  
  return Object.keys(groups).sort().map(key => ({
    id: `group-${key}`,
    name: key,
    icon: 'Music',
    children: groups[key]
  }));
}

export default function App() {
  const [customGenres, setCustomGenres] = useState<RootGenre[] | null>(() => {
    const saved = localStorage.getItem("custom-genres");
    return saved ? JSON.parse(saved) : null;
  });

  const activeData = customGenres || GENRE_DATA;

  const [selectedRoot, setSelectedRoot] = useState<RootGenre | null>(null);
  const [selectedNode, setSelectedNode] = useState<GenreNode | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [copied, setCopied] = useState(false);
  const [showAllWords, setShowAllWords] = useState(false);
  const [showDBModal, setShowDBModal] = useState(false);
  const [dbInput, setDbInput] = useState("");
  
  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem("genre-favorites");
    return saved ? JSON.parse(saved) : [];
  });
  const [recentHistory, setRecentHistory] = useState<string[]>(() => {
    const saved = localStorage.getItem("genre-history");
    return saved ? JSON.parse(saved) : [];
  });
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem("genre-theme-dark");
    return saved ? JSON.parse(saved) : false;
  });

  // Persistence
  useEffect(() => {
    localStorage.setItem("genre-theme-dark", JSON.stringify(isDarkMode));
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  useEffect(() => {
    localStorage.setItem("genre-favorites", JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem("genre-history", JSON.stringify(recentHistory));
  }, [recentHistory]);

  // Fetch genres.txt on mount
  useEffect(() => {
    fetch('/genres.txt')
      .then(res => {
        if (!res.ok) throw new Error("File not found");
        return res.text();
      })
      .then(text => {
        const parsed = parseRawData(text);
        if (parsed.length > 0) {
          const grouped = groupGenres(parsed);
          setCustomGenres(grouped);
          localStorage.setItem("custom-genres", JSON.stringify(grouped));
        }
      })
      .catch(err => console.log("No genres.txt found or error parsing:", err));
  }, []);

  // Flatten all genres for search
  const allGenres = useMemo(() => 
    activeData.flatMap((root, rootIdx) => 
      root.children.map((child, childIdx) => ({ 
        ...child, 
        uniqueKey: `${child.id}-${rootIdx}-${childIdx}`,
        rootName: root.name, 
        rootId: root.id 
      }))
    )
  , [activeData]);

  const filteredGenres = useMemo(() => {
    return allGenres.filter(genre => {
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch = query === "" || 
        genre.name.toLowerCase().includes(query) ||
        genre.description.toLowerCase().includes(query) ||
        genre.origin.toLowerCase().includes(query) ||
        genre.keywords.some(k => k.toLowerCase().includes(query)) ||
        genre.rootName.toLowerCase().includes(query);
      
      const matchesRoot = !selectedRoot || genre.rootName === selectedRoot.name;
      const matchesFavorites = !showOnlyFavorites || favorites.includes(genre.id);

      return matchesSearch && matchesRoot && matchesFavorites;
    });
  }, [allGenres, searchQuery, selectedRoot, showOnlyFavorites, favorites]);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const toggleFavorite = (id: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  };

  const addToHistory = (word: string) => {
    if (!word || word.trim() === "") return;
    setRecentHistory(prev => {
      const filtered = prev.filter(h => h !== word);
      return [word, ...filtered].slice(0, 8);
    });
  };

  const handleRandom = () => {
    const randomIndex = Math.floor(Math.random() * allGenres.length);
    const randomGenre = allGenres[randomIndex];
    setSelectedNode(randomGenre);
    setShowAllWords(false);
    setShowOnlyFavorites(false);
    setSelectedRoot(null);
    setSearchQuery("");
  };

  const handleUpdateDB = () => {
    if (!dbInput.trim()) {
      alert("데이터를 입력해주세요.");
      return;
    }
    const parsed = parseRawData(dbInput);
    if (parsed.length > 0) {
      const grouped = groupGenres(parsed);
      setCustomGenres(grouped);
      localStorage.setItem("custom-genres", JSON.stringify(grouped));
      setShowDBModal(false);
      setDbInput("");
      alert(`성공적으로 ${parsed.length}개의 장르를 파싱하여 업데이트했습니다!`);
    } else {
      alert("데이터를 파싱할 수 없습니다. 형식을 확인해주세요.");
    }
  };

  const handleResetDB = () => {
    if (confirm("기본 데이터베이스로 초기화하시겠습니까?")) {
      setCustomGenres(null);
      localStorage.removeItem("custom-genres");
      setShowDBModal(false);
    }
  };

  // Extract all unique words/keywords
  const allWords = useMemo(() => {
    const rawSet = new Set<string>(
      activeData.flatMap(root => 
        root.children.flatMap(child => {
          const combinedText = `${child.name} ${child.keywords.join(' ')} ${child.origin}`;
          return combinedText
            .split(/[\s/(),]+/)
            .map(w => w.replace(/[^a-zA-Z0-9가-힣]/g, ''))
            .filter(w => w.length > 0)
            .map(w => w.toLowerCase());
        })
      )
    );
    return Array.from(rawSet).filter(w => w.length > 1).sort((a, b) => a.localeCompare(b, 'ko'));
  }, [activeData]);

  const brutalistBtn = "rounded-none border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all font-bold uppercase tracking-widest text-xs active:translate-x-[4px] active:translate-y-[4px] active:shadow-none";
  const brutalistCard = "rounded-none border-2 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] bg-white";
  const isInitialState = !showAllWords && !showOnlyFavorites && !selectedRoot && !searchQuery;

  return (
    <div className="min-h-screen bg-[#f0f0f0] text-black font-sans selection:bg-pink-500 selection:text-white">
      {/* Header */}
      <header className="border-b-4 border-black p-6 flex flex-col md:flex-row justify-between items-center bg-black sticky top-0 z-40 gap-4 shadow-[0px_4px_0px_0px_rgba(0,0,0,1)]">
        <div className="flex flex-col md:flex-row items-center gap-6 w-full md:w-auto">
          <div className="text-center md:text-left">
            <h1 className="text-5xl md:text-6xl font-black tracking-tighter uppercase text-pink-500 drop-shadow-[4px_4px_0px_rgba(255,255,255,1)]">SUNO 장르 탐색기</h1>
            <p className="text-sm font-bold mt-2 text-white/80">by 그런거죠</p>
          </div>
          <button
            onClick={() => {
              setShowAllWords(!showAllWords);
              setShowOnlyFavorites(false);
              setSelectedRoot(null);
            }}
            className={cn(
              brutalistBtn, "w-28 h-28 md:w-32 md:h-32 flex flex-col items-center justify-center gap-1 text-center shrink-0",
              showAllWords ? "bg-black text-cyan-400 border-cyan-400" : "bg-cyan-400 text-black border-black"
            )}
          >
            <ListMusic size={36} className="mb-1" />
            <span className="text-lg md:text-xl font-black leading-none">ALL<br/>WORDS</span>
            <span className="text-xs font-bold mt-1">({allWords.length})</span>
          </button>
        </div>

        <div className="flex flex-col items-end gap-2 w-full md:w-auto mt-4 md:mt-0">
          <div className="flex flex-wrap gap-3 w-full md:w-auto items-center justify-center md:justify-end">
            <button
              onClick={handleRandom}
              className={cn(brutalistBtn, "p-2 bg-yellow-400 text-black")}
              title="Surprise Me"
            >
              <Dices size={20} />
            </button>

            <button
              onClick={() => {
                setShowOnlyFavorites(!showOnlyFavorites);
                setShowAllWords(false);
                if (!showOnlyFavorites) {
                  setSelectedRoot(null);
                  setSearchQuery("");
                }
              }}
              className={cn(
                brutalistBtn, "px-3 py-2 flex items-center gap-1.5",
                showOnlyFavorites ? "bg-black text-yellow-400" : "bg-white text-black"
              )}
            >
              <Star size={16} fill={showOnlyFavorites ? "currentColor" : "none"} />
              <span className="text-xs">즐겨찾기</span>
            </button>

            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedRoot(null);
                setShowOnlyFavorites(false);
                setShowAllWords(false);
              }}
              className={cn(brutalistBtn, "px-3 py-2 bg-red-500 text-white text-xs")}
            >
              검색초기화
            </button>
          </div>
          <div className="flex flex-col items-center md:items-end w-full">
            <p className="text-[10px] md:text-xs font-bold tracking-widest text-white mt-2 text-center md:text-right">
              자료를 제공해 주신 FEMO 단톡방의 뿌-귀인께 감사드립니다. ♥
            </p>
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="mt-2 flex items-center gap-1.5 px-3 py-1 bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-600 transition-colors text-[10px] font-bold uppercase"
              title="Toggle Day/Night Mode"
            >
              <Moon size={12} />
              {isDarkMode ? "Day Mode" : "Night Mode"}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8">
        {/* Left Sidebar - Categories */}
        <div className="lg:col-span-3 space-y-6">
          <div className="sticky top-32 space-y-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-black/50" size={18} />
              <input
                type="text"
                placeholder="장르, 키워드, 한글 검색..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowAllWords(false);
                }}
                className="w-full bg-white border-2 border-black p-3 pl-10 rounded-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:outline-none focus:ring-2 focus:ring-pink-500 font-bold placeholder:font-normal"
              />
            </div>

            {!showAllWords && !showOnlyFavorites && (
              <div className={cn(brutalistCard, "p-4")}>
                <h2 className="text-sm font-black uppercase tracking-widest mb-4 bg-yellow-400 inline-block px-2 py-1 border-2 border-black">Categories</h2>
                <div className="flex flex-col gap-2 max-h-[60vh] overflow-y-auto pr-2">
                  <div
                    className="text-left px-4 py-3 border-2 border-black font-black uppercase text-sm rounded-none bg-pink-500 text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] -translate-x-[2px] -translate-y-[2px]"
                  >
                    788 조합
                  </div>
                  {activeData.map(root => {
                    const Icon = ICON_MAP[root.icon] || Music;
                    const isSelected = selectedRoot?.id === root.id;
                    return (
                      <button
                        key={root.id}
                        onClick={() => {
                          setSelectedRoot(root);
                          setSearchQuery("");
                        }}
                        className={cn(
                          "text-left px-4 py-3 border-2 border-black transition-all font-bold uppercase text-sm flex items-center justify-between rounded-none",
                          isSelected ? "bg-cyan-400 text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] translate-x-[-2px] translate-y-[-2px]" : "bg-white hover:bg-gray-100"
                        )}
                      >
                        <div className="flex items-center gap-3">
                          <Icon size={16} />
                          <span>{root.name}</span>
                        </div>
                        <span className="text-xs bg-white border border-black px-2 py-0.5">{root.children.length}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-9">
          {showAllWords ? (
            <div className={cn(brutalistCard, "p-8")}>
              <div className="flex items-center justify-between mb-8 border-b-4 border-black pb-4">
                <h2 className="text-3xl font-black uppercase">All Extracted Words</h2>
                <span className="bg-pink-500 text-white font-bold px-3 py-1 border-2 border-black">{allWords.length} words</span>
              </div>
              <div className="flex flex-wrap gap-3">
                {allWords.map((word) => (
                  <button
                    key={word}
                    onClick={() => {
                      setSearchQuery(word);
                      setShowAllWords(false);
                      addToHistory(word);
                    }}
                    className="px-3 py-1.5 bg-white border-2 border-black font-bold hover:bg-yellow-400 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-all text-sm"
                  >
                    {word}
                  </button>
                ))}
              </div>
            </div>
          ) : isInitialState ? (
            <div className="h-full flex flex-col items-center justify-center py-32 text-center border-4 border-dashed border-black bg-white p-8">
              <Music size={64} className="mb-6 text-pink-500" />
              <p className="text-xl font-black uppercase text-gray-800 mb-8">
                좌측의 색인을 누르거나, 검색, ALL WORDS 버튼을 눌러서 탐색하세요
              </p>
              <div className="text-xs text-gray-500 max-w-2xl text-left bg-gray-50 p-4 border-2 border-gray-200 space-y-1.5 leading-relaxed">
                <p className="font-bold text-gray-700 mb-2 text-sm">✓ 안심하고 사용하세요 (토큰 소모 없음)</p>
                <p>현재 애플리케이션의 코드를 모두 분석해 본 결과, 토큰을 소모하는 로직이나 기능(LLM API 호출 등)은 전혀 없습니다.</p>
                <p>앱이 실행될 때 내부적으로 가지고 있는 데이타를 불러와서 화면에 보여주고 검색하는 순수 프론트엔드 기능만 작동하고 있습니다.</p>
                <p>AI 모델(Gemini, OpenAI 등)과 통신하는 코드가 없으므로 안심하고 무제한으로 사용하셔도 됩니다!</p>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-black uppercase bg-white px-4 py-2 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] inline-block">
                  {showOnlyFavorites ? "Favorites" : selectedRoot ? selectedRoot.name : searchQuery ? "Search Results" : "All Genres"}
                  <span className="ml-3 text-pink-500">{filteredGenres.length}</span>
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <AnimatePresence mode="popLayout">
                  {filteredGenres.map(genre => (
                    <motion.div
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      key={genre.uniqueKey}
                      onClick={() => setSelectedNode(genre)}
                      className={cn(
                        brutalistCard,
                        "p-6 cursor-pointer hover:bg-yellow-50 group flex flex-col h-full"
                      )}
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <span className="text-[10px] font-black uppercase tracking-widest bg-cyan-400 border border-black px-2 py-1 mb-3 inline-block">
                            {genre.rootName}
                          </span>
                          <h3 className="text-xl font-black leading-tight group-hover:text-pink-600 transition-colors">{genre.name}</h3>
                        </div>
                        <div className="flex gap-1">
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              window.open(`https://www.youtube.com/results?search_query=${encodeURIComponent(genre.name)}`, '_blank', 'noopener,noreferrer');
                            }}
                            className="p-2 hover:bg-red-100 border-2 border-transparent hover:border-black transition-all text-red-500"
                            title="유튜브 검색"
                          >
                            <Youtube size={20} />
                          </button>
                          <button 
                            onClick={(e) => toggleFavorite(genre.id, e)}
                            className="p-2 hover:bg-pink-100 border-2 border-transparent hover:border-black transition-all"
                          >
                            <Star size={20} className={favorites.includes(genre.id) ? "fill-pink-500 text-pink-500" : "text-black/30"} />
                          </button>
                        </div>
                      </div>
                      <p className="text-sm font-medium leading-relaxed mb-6 flex-grow">{genre.description}</p>
                      
                      <div className="flex flex-wrap gap-2 mt-auto">
                        {genre.keywords.slice(0, 3).map((kw, idx) => (
                          <span key={idx} className="text-xs font-bold bg-white border-2 border-black px-2 py-1">
                            {kw}
                          </span>
                        ))}
                        {genre.keywords.length > 3 && (
                          <span className="text-xs font-bold bg-black text-white px-2 py-1">
                            +{genre.keywords.length - 3}
                          </span>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
                
                {filteredGenres.length === 0 && (
                  <div className="col-span-full py-20 text-center border-4 border-dashed border-black bg-white">
                    <p className="text-xl font-black uppercase">No genres found matching your criteria.</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedNode && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setSelectedNode(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={e => e.stopPropagation()}
              className={cn(brutalistCard, "w-full max-w-2xl max-h-[90vh] overflow-y-auto")}
            >
              <div className="p-8 border-b-4 border-black bg-cyan-400 flex justify-between items-start">
                <div>
                  <span className="text-xs font-black uppercase tracking-widest bg-black text-white px-2 py-1 mb-4 inline-block">
                    {selectedNode.rootName}
                  </span>
                  <h2 className="text-4xl font-black uppercase leading-tight">{selectedNode.name}</h2>
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open(`https://www.youtube.com/results?search_query=${encodeURIComponent(selectedNode.name)}`, '_blank', 'noopener,noreferrer');
                    }}
                    className="p-3 bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all text-red-500"
                    title="유튜브 검색"
                  >
                    <Youtube size={24} />
                  </button>
                  <button 
                    onClick={(e) => toggleFavorite(selectedNode.id, e)}
                    className="p-3 bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all"
                  >
                    <Star size={24} className={favorites.includes(selectedNode.id) ? "fill-pink-500 text-pink-500" : "text-black"} />
                  </button>
                </div>
              </div>
              
              <div className="p-8 space-y-8">
                <div>
                  <h3 className="text-sm font-black uppercase tracking-widest mb-3 flex items-center gap-2 bg-yellow-400 inline-block px-2 py-1 border-2 border-black">
                    <Info size={16} className="inline mr-2"/>
                    Description
                  </h3>
                  <p className="text-lg font-medium leading-relaxed border-l-4 border-pink-500 pl-4 py-2">{selectedNode.description}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-sm font-black uppercase tracking-widest mb-3 bg-yellow-400 inline-block px-2 py-1 border-2 border-black">Origin</h3>
                    <p className="font-bold text-lg">{selectedNode.origin}</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-black uppercase tracking-widest mb-4 bg-yellow-400 inline-block px-2 py-1 border-2 border-black">Keywords</h3>
                  <div className="flex flex-wrap gap-3">
                    {selectedNode.keywords.map((kw, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          handleCopy(kw);
                          addToHistory(kw);
                        }}
                        className="group flex items-center gap-2 px-4 py-2 bg-white border-2 border-black font-bold hover:bg-pink-500 hover:text-white hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-all"
                      >
                        <span>{kw}</span>
                        <Copy size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="p-6 border-t-4 border-black bg-gray-100 flex justify-end">
                <button
                  onClick={() => setSelectedNode(null)}
                  className={cn(brutalistBtn, "px-8 py-3 bg-black text-white")}
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* DB Update Modal */}
      <AnimatePresence>
        {showDBModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className={cn(brutalistCard, "w-full max-w-4xl flex flex-col max-h-[90vh]")}
            >
              <div className="p-6 border-b-4 border-black bg-pink-500 text-white flex justify-between items-center">
                <h2 className="text-2xl font-black uppercase flex items-center gap-3">
                  <Database size={24} />
                  데이터베이스 업데이트
                </h2>
                <button onClick={() => setShowDBModal(false)} className="p-2 hover:bg-black transition-colors">
                  <X size={24} />
                </button>
              </div>
              
              <div className="p-6 flex-grow flex flex-col gap-4 overflow-hidden">
                <p className="font-bold">
                  788개의 전체 장르 텍스트를 아래에 붙여넣어 주세요. 
                  <br/><span className="text-sm font-normal text-gray-600">형식: "1. Acoustic Chicago Blues (어쿠스틱 시카고 블루스) - 정의: ... - 유래: ..."</span>
                </p>
                <textarea
                  value={dbInput}
                  onChange={(e) => setDbInput(e.target.value)}
                  className="w-full flex-grow border-4 border-black p-4 font-mono text-sm focus:outline-none focus:ring-4 focus:ring-cyan-400 resize-none shadow-[inset_4px_4px_0px_0px_rgba(0,0,0,0.1)] min-h-[300px]"
                  placeholder="여기에 텍스트를 붙여넣으세요..."
                />
              </div>
              
              <div className="p-6 border-t-4 border-black bg-gray-100 flex justify-between items-center">
                <button
                  onClick={handleResetDB}
                  className={cn(brutalistBtn, "px-6 py-3 bg-white text-red-600 border-red-600")}
                >
                  기본 DB로 초기화
                </button>
                <div className="flex gap-4">
                  <button
                    onClick={() => setShowDBModal(false)}
                    className={cn(brutalistBtn, "px-6 py-3 bg-white text-black")}
                  >
                    취소
                  </button>
                  <button
                    onClick={handleUpdateDB}
                    className={cn(brutalistBtn, "px-8 py-3 bg-cyan-400 text-black")}
                  >
                    저장 및 적용
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toast */}
      <AnimatePresence>
        {copied && (
          <motion.div
            initial={{ opacity: 0, y: 50, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: 50, x: "-50%" }}
            className="fixed bottom-20 left-1/2 z-50 flex items-center gap-2 bg-black text-white px-6 py-3 font-bold uppercase tracking-widest text-sm border-2 border-white shadow-[4px_4px_0px_0px_rgba(255,0,255,1)]"
          >
            <Check size={18} className="text-cyan-400" />
            Copied to clipboard!
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
