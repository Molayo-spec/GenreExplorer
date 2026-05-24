/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface GenreNode {
  id: string;
  name: string;
  description: string;
  origin: string;
  keywords: string[];
}

export interface RootGenre {
  id: string;
  name: string;
  icon: string;
  children: GenreNode[];
}

export const GENRE_DATA: RootGenre[] = [
  {
    id: "k-pop",
    name: "K-Pop",
    icon: "Music",
    children: [
      { id: "trap-k-pop", name: "Trap K-Pop", description: "미국 남부 힙합 트랩(Trap)의 비트와 요소를 차용한 한국의 아이돌 팝 음악입니다.", origin: "한국", keywords: ["K-Pop", "Trap", "808 bass", "Idol", "High energy"] },
      { id: "k-pop-acoustic-texas-blues", name: "K-Pop Acoustic Texas Blues", description: "케이팝 스타일의 멜로디 라인을 텍사스 블루스 스타일의 어쿠스틱 기타 반주에 맞춰 부르는 독특한 편곡입니다.", origin: "한국 + 미국", keywords: ["K-Pop", "Acoustic", "Texas Blues", "Guitar", "Soulful"] },
      { id: "regae-k-pop", name: "Reggae K-Pop", description: "원더걸스의 'Why So Lonely'처럼 레게 리듬을 차용하여 만든 한국 대중가요입니다.", origin: "대한민국", keywords: ["K-Pop", "Reggae", "Off-beat", "Island vibes", "Pop melody"] },
      { id: "bluegrass-k-pop", name: "Bluegrass K-Pop", description: "케이팝 아이돌 노래를 블루그래스 밴드(밴조, 만돌린) 편성으로 편곡하여 커버한 음악입니다.", origin: "인터넷 커버", keywords: ["K-Pop", "Bluegrass", "Banjo", "Fiddle", "Acoustic"] },
      { id: "russian-k-pop", name: "Russian K-Pop", description: "러시아의 아이돌 그룹이나 가수들이 한국 케이팝의 스타일, 비주얼, 곡 구성을 모방하여 만든 팝입니다.", origin: "러시아", keywords: ["K-Pop", "Russian", "Idol", "Pop", "Global"] },
    ],
  },
  {
    id: "edm",
    name: "EDM",
    icon: "Zap",
    children: [
      { id: "ambient-house", name: "Ambient House", description: "몽환적이고 대기 같은(Ambient) 신디사이저 사운드에 하우스 음악의 4/4박자 킥 드럼을 결합한 스타일입니다.", origin: "영국 (1980년대 후반)", keywords: ["Ambient", "House", "Dreamy", "4/4 beat", "Atmospheric"] },
      { id: "acid-techno", name: "Acid Techno", description: "테크노 비트에 TB-303의 찌글거리는 소리를 강조한 장르입니다.", origin: "영국/미국", keywords: ["Acid", "Techno", "TB-303", "Squelchy", "Repetitive"] },
      { id: "liquid-dnb", name: "Liquid Drum and Bass", description: "드럼 앤 베이스의 하위 장르로, 공격성보다는 멜로디, 보컬, 화성적인 풍부함을 강조한 부드러운 DnB입니다.", origin: "영국", keywords: ["Liquid", "Drum and Bass", "Melodic", "Smooth", "Atmospheric"] },
      { id: "hard-goa-trance", name: "Dark Goa Trance", description: "인도 고아 지방의 사이키델릭 트랜스 중에서도, 더 빠르고 어둡고 기계적인 사운드를 강조한 하위 장르입니다.", origin: "인도 (고아) / 유럽 트랜스 씬", keywords: ["Goa Trance", "Psychedelic", "Dark", "Mechanical", "Fast"] },
      { id: "wave", name: "Wave", description: "트랩 비트를 기반으로 몽환적이고 감성적인 신디사이저 멜로디와 중저음을 강조한 현대 전자음악입니다.", origin: "인터넷 기반 (전 세계)", keywords: ["Wave", "Trap beat", "Dreamy", "Emotional", "Sub-bass"] },
    ],
  },
  {
    id: "pop",
    name: "Pop",
    icon: "Star",
    children: [
      { id: "city-pop", name: "City Pop", description: "70-80년대 일본 버블 경제 시기 도쿄의 화려한 도시 생활을 배경으로 만들어진 세련된 팝/펑크/퓨전 재즈입니다.", origin: "일본 (도쿄)", keywords: ["City Pop", "80s", "Sophisticated", "Funk", "Urban"] },
      { id: "dream-pop", name: "Dream Pop", description: "1980년대 중반에 발생한 얼터너티브 록의 하위 장르로, 멜로디와 보컬을 몽환적인 텍스처와 에코 속에 파묻히게 연주합니다.", origin: "영국", keywords: ["Dream Pop", "Ethereal", "Reverb", "Atmospheric", "Melodic"] },
      { id: "bedroom-pop", name: "Bedroom Pop", description: "집에서 녹음한 듯한 로파이한 팝(베드룸 팝)에 90년대 그런지 록의 우울하고 거친 감성을 섞은 장르입니다.", origin: "인터넷 기반 인디 음악", keywords: ["Bedroom Pop", "Lo-fi", "Indie", "DIY", "Chill"] },
      { id: "bubblegum-dance", name: "Bubblegum Dance", description: "1990년대 말~2000년대 초 유행한 유럽 댄스 음악으로, 가사가 유치하고 멜로디가 밝고 중독성 있습니다.", origin: "덴마크/이탈리아", keywords: ["Bubblegum", "Dance", "Upbeat", "90s", "Catchy"] },
    ],
  },
  {
    id: "rock",
    name: "Rock",
    icon: "Guitar",
    children: [
      { id: "grunge", name: "Grunge", description: "1990년대 초 시애틀을 중심으로 폭발한 얼터너티브 록으로, 왜곡된 기타와 소외감/분노를 담은 가사가 특징입니다.", origin: "미국 (시애틀)", keywords: ["Grunge", "90s", "Distorted guitar", "Angst", "Alternative"] },
      { id: "alternative-rock", name: "Alternative Rock", description: "1980년대 언더그라운드에서 시작되어 90년대 주류가 된, 기존 록의 상업적 관습을 거부하는 다양한 록 음악입니다.", origin: "미국/영국", keywords: ["Alternative Rock", "Indie", "90s", "Electric guitar", "Underground"] },
      { id: "southern-rock", name: "Southern Rock", description: "미국 남부의 블루스, 컨트리, 록을 결합한 장르로, 긴 기타 솔로와 남성적인 보컬이 특징입니다.", origin: "미국", keywords: ["Southern Rock", "Blues Rock", "Country Rock", "Guitar Solo", "70s"] },
    ],
  },
  {
    id: "hip-hop",
    name: "Hip-Hop",
    icon: "Mic2",
    children: [
      { id: "trap", name: "Trap", description: "2000년대 초반 시작된 힙합 장르로, 묵직한 808 베이스, 빠른 하이햇, 어두운 분위기가 특징입니다.", origin: "미국 (남부 애틀랜타)", keywords: ["Trap", "808 bass", "Fast hi-hats", "Dark", "Atlanta"] },
      { id: "boom-bap", name: "Boom Bap", description: "90년대 동부 힙합의 투박한 드럼(붐뱁) 위에 실제 오케스트라 연주나 샘플을 웅장하게 입힌 힙합입니다.", origin: "미국 (동부)", keywords: ["Boom Bap", "90s", "Gritty drums", "East Coast", "Sampling"] },
      { id: "drill", name: "Drill", description: "2010년대 시카고에서 시작되어 영국/뉴욕으로 퍼진 힙합 장르로, 어둡고 폭력적인 가사와 슬라이딩 베이스가 특징입니다.", origin: "미국 (시카고) -> 영국", keywords: ["Drill", "Dark", "Sliding bass", "Aggressive", "Chicago"] },
    ],
  },
  {
    id: "jazz",
    name: "Jazz",
    icon: "Music2",
    children: [
      { id: "afro-jazz", name: "Afro-Jazz", description: "아프리카의 토속 리듬과 악기에 미국의 재즈 화성과 즉흥 연주를 결합한 퓨전 장르입니다.", origin: "아프리카 전역 및 미국", keywords: ["Afro-Jazz", "Polyrhythm", "Improvisation", "Fusion", "African roots"] },
      { id: "swing", name: "Swing", description: "1930-40년대 재즈의 황금기를 이끈 장르로, 춤추기 좋은 율동감(스윙감) 있는 리듬이 특징입니다.", origin: "미국 (재즈 빅 밴드)", keywords: ["Swing", "Big Band", "Danceable", "1930s", "Brass"] },
      { id: "dark-jazz", name: "Dark Jazz", description: "느린 템포, 낮은 베이스, 우울한 색소폰 등이 특징인, 필름 느와르 영화의 밤거리 분위기를 내는 재즈입니다.", origin: "독일/유럽", keywords: ["Dark Jazz", "Noir", "Slow tempo", "Atmospheric", "Melancholy"] },
    ],
  },
  {
    id: "blues",
    name: "Blues",
    icon: "Waves",
    children: [
      { id: "acoustic-chicago-blues", name: "Acoustic Chicago Blues", description: "전기 증폭 악기를 사용하지 않고 기타, 하모니카, 피아노 등으로 연주하는 원초적인 형태의 블루스입니다.", origin: "미국 (시카고, 일리노이)", keywords: ["Acoustic", "Chicago Blues", "Harmonica", "Raw", "Traditional"] },
      { id: "delta-blues", name: "Delta Blues", description: "미시시피 델타 지역에서 유래한 거친 기타 리프와 보컬이 특징인 초기 블루스입니다.", origin: "미국 (미시시피)", keywords: ["Delta Blues", "Slide guitar", "Raw", "Mississippi", "Early Blues"] },
      { id: "swamp-blues", name: "Swamp Blues", description: "루이지애나 늪지대(Swamp)를 연상시키는 느리고 끈적하며, 리버브가 많이 걸린 기타 사운드의 블루스입니다.", origin: "미국 (루이지애나)", keywords: ["Swamp Blues", "Louisiana", "Reverb", "Gritty", "Slow"] },
    ],
  },
  {
    id: "reggae",
    name: "Reggae",
    icon: "Sun",
    children: [
      { id: "roots-reggae", name: "Roots Reggae", description: "1960년대 자메이카에서 발생한 음악으로, 엇박자 리듬과 사회 비판적 가사가 특징입니다.", origin: "자메이카", keywords: ["Roots Reggae", "Jamaica", "Off-beat", "Rastafari", "Social"] },
      { id: "dancehall", name: "Dancehall", description: "자메이카 댄스홀 리듬에서 유래하여 도미니카 공화국과 레게톤의 기초가 된 리듬입니다.", origin: "자메이카", keywords: ["Dancehall", "Digital", "Rhythmic", "Club", "Jamaica"] },
    ],
  },
  {
    id: "folk",
    name: "Folk",
    icon: "Trees",
    children: [
      { id: "bluegrass", name: "Bluegrass", description: "스코틀랜드/아일랜드 이민자들의 음악이 미국 산악지대에서 발전한, 빠른 템포의 어쿠스틱 현악 앙상블입니다.", origin: "미국 (켄터키/애팔래치아)", keywords: ["Bluegrass", "Banjo", "Fiddle", "Fast", "Acoustic"] },
      { id: "americana", name: "Americana", description: "미국의 뿌리 음악(포크, 컨트리)인 아메리카나에 90년대 그런지 록의 우울하고 지저분한 기타 톤을 섞었습니다.", origin: "미국", keywords: ["Americana", "Roots", "Folk", "Country", "Acoustic"] },
    ],
  },
  {
    id: "funk",
    name: "Funk",
    icon: "Disc",
    children: [
      { id: "afro-funk", name: "Afro-Funk", description: "아프리카의 토속 리듬에 제임스 브라운 스타일의 미국 펑크(Funk) 그루브를 강력하게 결합한 장르입니다.", origin: "나이지리아/가나 (서아프리카)", keywords: ["Afro-Funk", "Groovy", "Polyrhythm", "Brass", "West Africa"] },
      { id: "p-funk", name: "P-Funk", description: "1970년대 조지 클린턴의 Parliament-Funkadelic 밴드가 주도한, 사이키델릭하고 우주적인 사운드의 펑크(Funk)입니다.", origin: "미국", keywords: ["P-Funk", "Psychedelic", "Cosmic", "Groovy", "Synthesizer"] },
    ],
  },
  {
    id: "classical",
    name: "Classical",
    icon: "Music",
    children: [
      { id: "symphonic-opera", name: "Symphonic Opera", description: "오페라 아리아를 대중적인 심포닉 메탈이나 팝 오케스트라 스타일로 웅장하게 편곡한 크로스오버입니다.", origin: "유럽", keywords: ["Opera", "Symphonic", "Orchestral", "Epic", "Classical"] },
      { id: "classical-cumbia", name: "Classical Cumbia", description: "쿰비아 리듬을 바이올린, 첼로 등 클래식 악기 구성이나 고전적인 작법으로 연주하는 우아한 스타일입니다.", origin: "라틴 아메리카", keywords: ["Cumbia", "Classical", "Violin", "Cello", "Elegant"] },
    ],
  },
  {
    id: "country",
    name: "Country",
    icon: "Guitar",
    children: [
      { id: "sertanejo", name: "Sertanejo", description: "브라질의 대중적인 컨트리 음악으로, 주로 듀엣으로 부르며 아코디언과 기타 연주가 특징입니다.", origin: "브라질", keywords: ["Sertanejo", "Brazilian", "Country", "Accordion", "Duet"] },
      { id: "alt-country", name: "Alt-Country", description: "주류 컨트리 음악의 관습을 거부하고 펑크, 록, 포크의 요소를 결합한 대안적 컨트리입니다.", origin: "미국", keywords: ["Alternative Country", "Americana", "Indie", "Roots", "Gritty"] },
    ],
  },
  {
    id: "soul-rnb",
    name: "Soul/R&B",
    icon: "Mic2",
    children: [
      { id: "motown", name: "Motown", description: "1960년대 디트로이트의 '모타운 레코드'에서 확립한 흑인 소울/팝 스타일로, 세련된 편곡과 멜로디가 특징입니다.", origin: "미국 (디트로이트)", keywords: ["Motown", "Soul", "60s", "Pop", "Groovy"] },
      { id: "alternative-rnb", name: "Alternative R&B", description: "2010년대 이후 등장한 장르로, 전통적인 R&B에 힙합, 일렉트로니카, 록 등의 요소를 섞어 분위기를 중시하는 R&B입니다.", origin: "미국/캐나다", keywords: ["PBR&B", "Alternative R&B", "Moody", "Electronic", "Atmospheric"] },
    ],
  },
  {
    id: "metal",
    name: "Metal",
    icon: "Zap",
    children: [
      { id: "symphonic-metal", name: "Symphonic Metal", description: "헤비메탈 밴드와 오케스트라(또는 키보드 오케스트레이션)가 결합하여 영화 음악처럼 웅장한 사운드를 내는 장르입니다.", origin: "유럽 (북유럽/네덜란드)", keywords: ["Symphonic Metal", "Epic", "Orchestral", "Heavy", "Operatic"] },
      { id: "cumbia-metal", name: "Cumbia Metal", description: "라틴 아메리카의 쿰비아 리듬에 헤비메탈의 왜곡된 기타와 공격적인 드럼을 섞은 크로스오버 장르입니다.", origin: "라틴 아메리카", keywords: ["Cumbia", "Metal", "Latin", "Heavy", "Fusion"] },
    ],
  },
  {
    id: "disco",
    name: "Disco",
    icon: "Disc",
    children: [
      { id: "symphonic-disco", name: "Symphonic Disco", description: "펑키한 디스코 리듬에 실제 오케스트라 현악기 연주를 풍성하게 입힌 70년대 스타일의 댄스 곡입니다.", origin: "미국 (필라델피아/뉴욕 디스코 씬)", keywords: ["Symphonic", "Disco", "Orchestral", "Funky", "70s"] },
      { id: "electronic-disco", name: "Electronic Disco", description: "전통적인 악기 대신 신디사이저와 드럼 머신으로 연주하는 디스코로, '이탈로 디스코'나 '하이 에너기' 등이 포함됩니다.", origin: "유럽", keywords: ["Italo Disco", "Synth", "Electronic", "80s", "Dance"] },
    ],
  },
  {
    id: "latin",
    name: "Latin",
    icon: "Music",
    children: [
      { id: "salsa", name: "Salsa", description: "1960-70년대 뉴욕의 라틴 이민자들 사이에서 쿠바 음악을 기반으로 발전한, 세계적으로 가장 인기 있는 라틴 댄스 음악입니다.", origin: "미국 (뉴욕) / 쿠바", keywords: ["Salsa", "Latin", "Dance", "Clave", "Brass"] },
      { id: "bachata", name: "Bachata", description: "도미니카 공화국에서 유래한 낭만적이고 슬픈 사랑 노래로, 특유의 기타 연주와 춤이 있습니다.", origin: "도미니카 공화국", keywords: ["Bachata", "Latin", "Romantic", "Guitar", "Dance"] },
      { id: "cumbia", name: "Cumbia", description: "콜롬비아에서 시작되어 남미 전역으로 퍼진 민속 리듬으로, 2/4박자의 흥겨운 비트가 특징입니다.", origin: "콜롬비아", keywords: ["Cumbia", "Latin", "Rhythmic", "Accordion", "Dance"] },
    ],
  },
  {
    id: "african",
    name: "African",
    icon: "Music2",
    children: [
      { id: "afrobeat", name: "Afrobeat", description: "1970년대 나이지리아의 펠라 쿠티가 창시한 장르로, 재즈, 펑크, 서아프리카 전통 음악이 결합된 사회 참여적 음악입니다.", origin: "나이지리아", keywords: ["Afrobeat", "Polyrhythm", "Fela Kuti", "Brass", "Funk"] },
      { id: "afropiano", name: "Afropiano", description: "'아마피아노'와 '아프로비트'가 혼용되거나 결합된 용어로, 아프리카의 현대적인 전자 댄스 음악을 뜻합니다.", origin: "아프리카", keywords: ["Amapiano", "Afro House", "Log Drum", "Deep House", "South Africa"] },
    ],
  },
  {
    id: "asian",
    name: "Asian",
    icon: "Music",
    children: [
      { id: "koto-gnawa", name: "Koto Gnawa", description: "일본의 전통 현악기 '코토'와 모로코의 영적 치유 음악인 '그나와' 리듬이 만난 실험적 퓨전입니다.", origin: "일본 + 모로코", keywords: ["Koto", "Gnawa", "Spiritual", "Japanese", "Moroccan"] },
      { id: "hindi-jungle", name: "Hindi Jungle", description: "매우 빠른 브레이크비트인 정글(Jungle) 음악에 인도 힌디어 보컬이나 발리우드 샘플을 섞은 장르입니다.", origin: "영국 (아시아 언더그라운드) + 인도", keywords: ["Jungle", "Hindi", "Breakbeat", "Fast", "Bollywood"] },
    ],
  },
  {
    id: "middle-eastern",
    name: "Middle Eastern",
    icon: "Waves",
    children: [
      { id: "arabic-pop", name: "Arabic Pop", description: "서양의 팝 음악 스타일에 중동의 악기, 선율, 아랍어 가사를 결합한 중동 지역의 주류 대중가요입니다.", origin: "이집트/레바논 등 아랍권", keywords: ["Arabic Pop", "Middle Eastern", "Synth", "Modern", "Dance"] },
      { id: "arabic-classical", name: "Arabic Classical", description: "중동 지역의 전통 고전 음악으로, '마캄(Maqam)'이라는 독특한 선율 체계와 즉흥 연주가 특징입니다.", origin: "아랍 세계", keywords: ["Maqam", "Classical", "Oud", "Traditional", "Improvisation"] },
    ],
  },
  {
    id: "ambient-chill",
    name: "Ambient/Chill",
    icon: "Sun",
    children: [
      { id: "chillwave", name: "Chillwave", description: "2000년대 후반 유행한 장르로, 80년대 신스팝을 로파이하게 변형하고 리버브를 많이 걸어 여름날의 향수를 자극합니다.", origin: "미국 (인터넷 기반)", keywords: ["Chillwave", "Lo-fi", "Nostalgic", "Summer", "Synth"] },
      { id: "hypnagogic-pop", name: "Hypnagogic Pop", description: "80년대 대중문화의 기억을 몽환적이고 왜곡된 사운드로 재현한 실험적인 팝 장르입니다.", origin: "미국/영국", keywords: ["Hypnagogic", "Nostalgic", "Dreamy", "Lo-fi", "Experimental"] },
    ],
  },
  {
    id: "trance-techno",
    name: "Trance/Techno",
    icon: "Zap",
    children: [
      { id: "goa-trance", name: "Goa Trance", description: "1990년대 인도 고아에서 히피들에 의해 발전한 트랜스 음악으로, 사이키델릭하고 동양적인 멜로디가 특징입니다.", origin: "인도 (고아)", keywords: ["Goa Trance", "Psychedelic", "Acid", "Fast", "Spiritual"] },
      { id: "acid-house", name: "Acid House", description: "1980년대 시카고에서 탄생한 하우스 음악으로, 롤랜드 TB-303 신디사이저의 '꿀렁거리는' 베이스 소리가 핵심입니다.", origin: "미국 (시카고)", keywords: ["Acid House", "TB-303", "Chicago", "Dance", "Squelchy"] },
    ],
  },
  {
    id: "punk",
    name: "Punk",
    icon: "Guitar",
    children: [
      { id: "punk-polka", name: "Punk Polka", description: "폴카의 빠른 2박자 리듬을 펑크 록 밴드가 연주하여, 매우 빠르고 신나며 난장판 같은 분위기를 냅니다.", origin: "미국/유럽", keywords: ["Punk", "Polka", "Fast", "Accordion", "High Energy"] },
      { id: "crunk-punk", name: "Crunk Punk", description: "소리를 지르는 듯한 크렁크 힙합의 에너지와 단순하고 공격적인 펑크(Punk) 록이 결합된 하이브리드입니다.", origin: "미국", keywords: ["Crunk", "Punk", "Aggressive", "Screaming", "Fusion"] },
    ],
  },
  {
    id: "swing-bigband",
    name: "Swing/Big Band",
    icon: "Music2",
    children: [
      { id: "big-band-boogie", name: "Big Band Boogie", description: "대규모 재즈 빅 밴드가 연주하는 빠르고 흥겨운 부기우기(Boogie-Woogie) 리듬의 곡입니다.", origin: "미국 (스윙 시대)", keywords: ["Big Band", "Boogie Woogie", "Piano", "Upbeat", "Swing"] },
      { id: "new-jack-swing", name: "New Jack Swing", description: "80년대 후반~90년대 초 유행한 장르로, R&B 보컬에 힙합의 스윙감 있는 드럼 비트를 결합했습니다.", origin: "미국 (할렘, 테디 라일리)", keywords: ["New Jack Swing", "R&B", "Hip-Hop", "90s", "Swing"] },
    ],
  },
  {
    id: "gospel",
    name: "Gospel",
    icon: "Mic2",
    children: [
      { id: "rnb-gospel", name: "R&B Gospel", description: "세속적인 R&B의 세련된 비트와 창법을 사용하여 종교적인 메시지(가스펠)를 전달하는 현대 흑인 교회 음악입니다.", origin: "미국", keywords: ["Gospel", "R&B", "Soulful", "Spiritual", "Modern"] },
      { id: "gospelwave", name: "Gospelwave", description: "신스웨이브나 베이퍼웨이브 스타일에 기독교 가스펠 음악의 샘플이나 주제를 결합한 서브장르입니다.", origin: "인터넷 (기독교 전자음악)", keywords: ["Gospel", "Synthwave", "Vaporwave", "Spiritual", "Electronic"] },
    ],
  },
  {
    id: "bluegrass",
    name: "Bluegrass",
    icon: "Trees",
    children: [
      { id: "instrumental-bluegrass", name: "Instrumental Bluegrass", description: "보컬 없이 밴조, 피들, 만돌린 등의 현악기 속주만으로 이루어진 컨트리 민속 음악입니다.", origin: "미국 (애팔래치아 산맥)", keywords: ["Bluegrass", "Instrumental", "Banjo", "Fast", "Acoustic"] },
      { id: "bluegrass-punk", name: "Bluegrass Punk", description: "블루그래스 악기로 펑크 록의 속도와 태도를 연주하는 장르로, '포크 펑크'나 '카우 펑크'와 유사합니다.", origin: "미국", keywords: ["Bluegrass", "Punk", "Banjo", "Fast", "Aggressive"] },
    ],
  },
  {
    id: "ska",
    name: "Ska",
    icon: "Sun",
    children: [
      { id: "soulful-ska", name: "Soulful Ska", description: "빠른 스카 리듬에 미국 소울 음악(모타운/스택스) 스타일의 보컬과 멜로디를 입힌 '록스테디' 과도기적 음악입니다.", origin: "자메이카", keywords: ["Ska", "Soul", "Rocksteady", "Jamaica", "Groovy"] },
      { id: "ska-coptic", name: "Ska Coptic", description: "자메이카의 스카(Ska) 리듬(뒷박 강조)에 이집트 콥트 음악의 멜로디를 얹은 이색적인 퓨전입니다.", origin: "자메이카 + 이집트", keywords: ["Ska", "Coptic", "Fusion", "Middle Eastern", "Rhythm"] },
    ],
  },
  {
    id: "lo-fi",
    name: "Lo-fi",
    icon: "Music",
    children: [
      { id: "lo-fi-trap", name: "Lo-fi Trap", description: "강렬한 트랩 비트의 음질을 의도적으로 낮추고(Lo-fi), 쓸쓸하고 빈티지한 분위기를 강조한 힙합입니다.", origin: "인터넷 (사운드클라우드)", keywords: ["Lo-fi", "Trap", "Chill", "Moody", "Atmospheric"] },
      { id: "lo-fi-swing", name: "Lo-fi Swing", description: "고전 재즈 스윙 곡을 샘플링하여 로파이 힙합처럼 잡음을 섞고 음질을 빈티지하게 만든 음악입니다.", origin: "인터넷 음악", keywords: ["Lo-fi", "Swing", "Jazz", "Nostalgic", "Chill"] },
    ],
  },
  {
    id: "phonk",
    name: "Phonk",
    icon: "Zap",
    children: [
      { id: "drift-phonk", name: "Drift Phonk", description: "강렬한 카우벨 사운드와 빠른 트랩 비트가 특징인 Phonk의 하위 장르로, 자동차 드리프트 영상의 배경음악으로 유명합니다.", origin: "러시아", keywords: ["Drift Phonk", "Cowbell", "High energy", "Distorted", "Fast"] },
      { id: "house-phonk", name: "House Phonk", description: "Phonk의 사운드 요소를 하우스 음악의 4/4 비트와 결합한 댄스 지향적인 장르입니다.", origin: "인터넷", keywords: ["House Phonk", "4/4 beat", "Cowbell", "Danceable", "Electronic"] },
    ],
  },
  {
    id: "world-fusion-2",
    name: "World Fusion 2",
    icon: "Music2",
    children: [
      { id: "koto-g-funk-2", name: "Koto G-Funk", description: "일본 전통 악기 코토의 튕기는 소리를 미국 서부 힙합(G-Funk)의 신디사이저 대신 사용하는 힙합입니다.", origin: "일본 + 미국 (캘리포니아)", keywords: ["Koto", "G-Funk", "Hip-Hop", "West Coast", "Japanese"] },
      { id: "arabic-mariachi-2", name: "Arabic Mariachi", description: "아랍의 선율과 창법을 멕시코 전통 악단 '마리아치'의 악기 구성(트럼펫, 기타 등)으로 연주하는 퓨전입니다.", origin: "중동 + 멕시코", keywords: ["Arabic", "Mariachi", "Fusion", "Middle Eastern", "Mexican"] },
    ],
  },
  {
    id: "experimental-2",
    name: "Experimental 2",
    icon: "Zap",
    children: [
      { id: "prog-ambient-noise-wall-2", name: "Prog Ambient Noise Wall", description: "벽처럼 꽉 찬 소음(Noise Wall)을 앰비언트하게 연출하되, 프로그레시브 록처럼 곡의 구조가 점진적으로 변합니다.", origin: "실험 음악 (노이즈/인더스트리얼 씬)", keywords: ["Prog", "Ambient", "Noise Wall", "Experimental", "Industrial"] },
      { id: "hypnagogic-goa-trance-2", name: "Hypnagogic Goa Trance", description: "고아 트랜스의 사이키델릭한 사운드에 80년대 홈비디오 같은 흐릿하고 몽환적인 질감을 더한 스타일입니다.", origin: "인터넷 서브컬처 + 인도(고아)", keywords: ["Hypnagogic", "Goa Trance", "Lo-fi", "Psychedelic", "Dreamy"] },
    ],
  },
];
