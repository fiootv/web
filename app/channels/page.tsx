"use client";

import { useState, useMemo } from "react";
import { motion } from "motion/react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

// Channel data organized by category
const channelCategories = {
  "English Channels": [
    "SKY 2", "TRUE MOVIES 1 UK", "BBC ONE", "BBC TWO", "BBC4", "CP24 HD", "CP24 SD", "BNN",
    "CHCH TV", "CBC NEWS", "NETWORK", "CBC TORONTO", "GLOBAL TV", "CITY TV", "CTV TV", "THE WEATHER",
    "CHANNEL -CA", "OMNI 1", "OMNI 2", "OWN – CA", "HBO-EAST CA", "SLICE -CA", "ABC-HD-WKBW",
    "CBS-HD", "FOX-HD", "NBC HD", "BLOOMBERG TV", "ASIA", "CNBC HD", "CNBC WORLD", "CNBC AFRICA",
    "BLOOMBERG TV US", "RT INTERNATIONAL", "BBC WORLD NEWS", "124 NEWS", "ALJAZEERA ENG", "FOX NEWS",
    "MSNBC", "HBO-EAST US", "HBO-2 US", "HBO-FAMILY", "STARZ KID & FAMILY", "USA-HD", "SHOWTIME WEST",
    "STARZ EAST", "STARZ CINEMA", "HBO COMEDY", "HBO ZONE", "CINEMA 5 STAR", "CINEMA ACTION",
    "SHOWTIME EAST", "SKY MOVIES THRILLER", "SKY MOVIES SHOWCASE", "SKY MOVIES DRAMA UK",
    "SKY MOVIES FAMILY UK", "SKY UK MOVIES SCIFI & HORROR", "MOVIES 4 MEN", "BBC THREE", "BBC NEWS",
    "ALIBI CHANNEL", "GOLD TV", "CBS ACTION UK", "DISCOVERY ID UK", "DISCOVERY SCIENCE-UK",
    "DISCOVERY HISTORY UK", "ITV 1", "ITV 2", "IVT 3", "ITV 4", "E4", "5USA", "WATCH", "GOOD FOOD",
    "WEATHER NATION – US", "ABC NEWS", "HBO SIGNATURE EAST", "CBS DRAMA UK", "BRAVO-CA", "AMC-CA",
    "FY-CA", "A&E-CA", "TLC-CA", "SHOWCASE-CA", "W NETWORK EAST", "M3 (MUCHMOREMUSIC)-CA",
    "HISTORY TV-CA", "DISCOVERY CHANNEL", "DISCOVERY ID CA", "LOVE NATURE", "ANIMAL PLANET HD-CA",
    "NAT GEO DOCUMENTARY", "MILITARY", "SHOWTIME", "FYI TV", "GSN TV", "WILD TV", "CNN HD", "3E",
    "FOOD HD-CA", "COOKING CHANNEL", "BRAVO USA", "TBS", "DESTINATION US", "WE TV", "TNT",
    "VELOCITY", "HIFI", "HGTV", "DIY NETWORK", "SYFY", "SPACE", "HISTORY", "HISTORY 2 HD",
    "DISCOVERY ID CA", "DISCOVERY HISTORY", "NATGEO WILD", "CINEMAX", "MTV DANCE UK", "BLOOMBERGE UK",
    "MTV ROCK UK", "DAVE CHANNEL -UK", "SYFY UK", "CHANNEL 4", "CHANNEL 5 -UK", "DMAX CHANNEL-UK",
    "TRUE MOVIES UK", "TRUE MOVIES 2 UK", "SKY ACTION", "SKY MOVIES PREMIER", "SKY ATLANTIC",
    "SKY DISNEY", "SKY MODERN GREATS MOVIES", "SKY MOVIES COMEDY", "SKY UK 1", "5 STAR",
    "COMEDY CENTRAL", "NAT GEO UK", "ANIMAL PLANET-UK", "DISCOVERY SCIENCE-CA", "DISCOVERY TURBO",
    "SKY NEWS", "FOX UK TV", "VEVO 1 HD", "VEVO 2 HD", "VEVO 3 HD", "VH1 USA", "BET", "MTV MUSIC UK",
    "MTV HITS"
  ],
  "Tamil Channels": [
    "TET HD", "TAMIL VISION", "TAMIL ONE", "STAR VIJAY -US", "SUN TV -US", "KTV-US", "SUN MUSIC -US",
    "ADITHYA TV-US", "SIRIPOLI TV", "KALAIGNAR TV", "JAYA MOVIE", "JAYA TV", "JAYA MAX", "JAYA PLUS",
    "RAJ TV", "RAJ NEWS", "RAJ MUSIC", "RAJ DIGITAL PLUS", "K4U", "LANKASRI TV", "VIMBAM TV", "EET",
    "CHITHIRAM TV", "MURASU", "ISAI ARUVI -IND", "MAKKAL TV", "NEWS7TAMIL", "THANTHI TV",
    "VANNATHIRAI VTV", "SRI SANKARA TAMIL", "PUTHIYA THALAIMURAI", "CAPTAIN TV", "CAPTAIN NEWS",
    "VASANNTHAM TV", "STAR VIJAY-UK"
  ],
  "Urdu Channels": [
    "GEO NEWS", "GEO TV", "ARY NEWS", "ARY DIGITAL", "ARY DIGITAL WORLD", "ARY ZAUQ", "ARY MUSIC",
    "ARY QTV", "HUM TV", "HUM EUROPE", "HUM WORLD", "HUM TV WORLD 2", "HUM SITARAY", "MASALA TV",
    "DUNYA TV", "CAPITAL TV", "MADNI TV-UK", "ARUJ", "NOOR TV", "NEWS ONE", "PEACE TV URDU",
    "PRIME TV", "PEACE TV URDU(ENG)", "PASHTO 1", "MTA1-A", "KASHISH TV", "KAY2 TV", "KTN",
    "KHYBER NEWS", "KOHENOOR TV", "KHYBER TV", "92 NEWS", "TIMES URDU 1", "SUCH TV", "STARLITE",
    "STAR MAX", "SILVER SCREEN", "SINDH TV", "BUSINESS PLUS", "AWAZ", "CHANNEL 5", "D TV",
    "CHANNEL 24", "AHLULBAYT TV", "AL-QURAN KAREEM LIVE", "DAWN NEWS", "EXPRESS NEWS",
    "EXPRESS ENTERTAINMENT", "ENJOY NOW HD", "DEKHO TV", "MADNI TV", "ISAAC TV", "INDUS VISION",
    "HIDAYAT TV", "HADI TV", "JAAG TV", "TAKBEER TV", "TV ONE", "ZAIQA TV", "WIN TV", "VIBE TV",
    "ROZE NEWS", "RAAH TV", "RAAVI TV", "SAMAA", "SAHAR TV", "AAJ NEWS", "FILMAX", "FILM WORLD",
    "FILM ASIA", "FILMAZIA", "FALAK TV"
  ],
  "Arabic Channels": [
    "MTV LEBANON", "AL JAZEERA", "AL JAZEERA DOC", "SAUDI QUARAN", "SAUDI NEWS", "SAUDI 2",
    "NORSAT 2", "NORSAT TV", "NOURSAT", "AL HAYAT 2", "CTV COPTIC", "AL MANAR", "PANORAMA FILM",
    "PANORAMA DRAMA", "NRT TV", "MEDI 1 TV", "TIME FILM", "TIME COMEDY", "NILE DRAMA 2",
    "NILE SPORT", "MBC D", "TIME CINEMA", "MEHWAR", "KUWAIT TV", "SUDAN TV", "AL NAHAR DRAMA",
    "AL OUTA INTER", "FUTURE TV", "MAGHRIBIA", "SKY NEWS ARABIC", "NAT GEO ABU DHABI", "RT NEWS",
    "IQRAA TV", "MBC MAX", "MBC SPORT 1", "MBC SPORT 2", "ABU DHABI DRAMA", "AL HAYAT 1",
    "FRANCE 2 ARABIC", "NILE DRAMA", "NILA FAMILY", "NILE CINEMA", "NILE COMEDY", "FRANCE 3 ARABIC",
    "FRANCE 4 ARABIC", "AL TUNISIA", "AL JAZEERA MOUBASHER", "AL RESALLA TV", "AL RAI", "AL RAHMA",
    "AL OULA", "AL NAHAR SPORT", "AL NAHAR AL YOUM", "AL NAHAR AL HAYUM", "AL NAHAR", "AL MAYADEEN",
    "AL MAJID", "AL JADEED", "AL HDATH", "AL HAYAT MUSALMAN", "AL ARAQUIA", "MBC MASR 2", "MSC ACTION",
    "MBC BOLLYWOOD", "LDC LEBANON", "AL ARABIA", "AIJAL", "AFRIADIA TV", "ART AFLAM 1", "ART AFLAM 2",
    "ART HEKAYAT 2", "AD SPORT 1", "2M MONDE", "BBC NEWS ARABIC", "CINEMA PRO", "CBC NEWS",
    "CBC DRAMA", "DUBAI SPORT 4", "DUBAI NOUR", "LBC LEBANON", "LBC EUROPE", "CAIRO CINEMA", "CBC 1",
    "MBC 1", "MBC 2", "MBC 3", "MBC 4", "CBC SOFRA", "CBC EXTRA", "CAIRO DRAMA", "OTV", "NILE CULTURE",
    "SURIA DRAMA", "ROTANA MUZIK", "ROTANA KHALIJIA", "ROTANA CLIP", "ROTANA CLASSIC", "ROTANA CINEMA",
    "STAR CINEMA 1", "STAR CINEMA 2", "FRANCE 24 ARABIC", "SAUDI SUNNAH", "DUBAI ONE", "FATA FEAT TV",
    "FOX ARABIC", "FOX MOVIE ARABIC", "LBC"
  ],
  "Marathi Channels": [
    "COLPORS MARATHI", "TV9 MAHARASHTRA", "STAR PRAVAH", "ZEE TALKIES", "SAAM TV", "9X JHAKAAS",
    "ABP MAJHA", "24 TAAS TV"
  ],
  "Hindi Channels": [
    "AND TV HD US", "AND TV HD IND", "AND PICTURES -US", "AND PICTURE IND", "SONY TV HD", "SONY TV US",
    "SONY TV UK", "SONY TV AUD", "STAR PLUS HD", "STAR PLUS US", "STAR PLUS AUD", "ZEE-TV HD- IND",
    "ZEE-TV HD -CAN", "ZEE TV APAC", "ZEE TV UK", "AAPKA COLORS HD", "COLORS HD -IND", "COLORS-UK",
    "COLORS -US", "LIFE OK-US", "LIFE OK AUD", "ZEE CINEMA HD-IND", "ZEE CINEMA US", "ZEE CINEMA UK",
    "ZEE CINEMA APC", "ZEE CINEMA HD -US", "SONY MAX", "SET MAX UK", "SET MAX AUD", "SET MAX UK",
    "SAB US", "SAB UK", "SAB AUD", "RISTHEY", "RISHTEY UK", "B4U MUSIC", "TV ASIA HD", "AAJTAK US",
    "ZEE ZING", "ZING TV UK", "SAHARA ONE", "AASTHA", "ZEE SMILE", "ZEE BUSINESS IND", "MUSIC EXPRESS",
    "FILMY", "CARE WORLD", "SAMAY AALAMI IND", "SANSKAR TV IND", "ET NOW", "TEZ NES IND", "ABP NEWS IND",
    "STAR PLUS USA", "MUSIC XPRESS", "ZEE NEWS IND", "ZEE PURVAIYA", "ZEE SANGAM", "ZEE MARUDHARA",
    "ZEE MPCG", "ZEE CLASSIC", "ZEE KHANA KHAZANA", "ZEE ETC BOLLYWOOD", "STAR GOLD", "NDTV 24*7",
    "PICTURES HD", "B4U MOVIES", "UTV MOVIES", "DHAMMAL", "B4U PLUS", "ZOOM TV", "ZOOM UK", "10 MOVIES",
    "9XM TV IND", "BIG MAGIC", "BOLLYWOOD NEWS", "BINDASS PLAY", "9X JALWA IND", "APKA CHANNEL",
    "HEADLINE TODAY", "FOOD FOOD", "MTV INDIA", "SONY MIX", "TIMES NOW", "MANORANJAN TV",
    "MUSIC INDIA IND", "MTUNES HD", "SAHHARA SAMAY", "UTV BINDASS", "TV COLORS"
  ],
  "Sports Channels": [
    "WILLOW HD", "ATN CBN CA", "TEN ACTION", "TEN SPORTS", "TEN CRICKET", "SONY SIX HD", "TEN HD",
    "STAR SPORTS 1", "STAR SPORTS 2", "STAR SPORTS 4", "SONY SIX", "TSN 1", "TSN 2", "TSN 3", "TSN 4",
    "TSN 5", "SPORTSNET ONE", "SPORTSNET ONTARIO", "SPORTSNET 360", "SPORTSNET WORLD", "LEAFS TV SD",
    "MUTV", "PAC12 NETWORK HD", "PAC12 LOS ANGELES", "PAC12 MOUNTAIN", "PAC12 BAY AREA",
    "PAC12 WASHINGTON", "BIG TEN NETWORK", "ESPN", "SETANTA SPORT", "FOX SPORTS 1 HD", "FOX SPORTS 2 HD",
    "TENNIS", "NBA TV", "MLB TV", "NFL NETWORK", "NHL NETWORK", "GOLF", "NBC SPORT", "CBS SPORT NETWORK",
    "WWE NETWORK", "BOX NATION", "SKY SPORTS 1 HD", "SKY SPORTS 2 HD", "SKY SPORTS 3 HD", "SKY SPORTS 4 HD",
    "SKY SPORTS 5 HD", "BEIN SPORTS ENG-US", "BT SPORTS 1 HD", "BT SPORTS 2 HD", "SKY SPORTS F1",
    "SKY SPORTS NEWS", "EUROSPORT 1", "AT THE RACE", "BEIN SPORTS 1 HD", "BEIN SPORTS 2 HD",
    "BEIN SPORTS 3 HD", "BEIN SPORTS 4 HD", "BEIN SPORTS 5 HD", "BEIN SPORTS 6 HD", "BEIN SPORTS 7 HD",
    "BEIN SPORTS 8 HD", "BEIN SPORTS 9 HD", "BEIN SPORTS 11 HD", "SPORT TIME 1 HD", "SPORT TIME 2 HD",
    "SPORT TIME 3 HD", "SPORT TIME 4 HD", "SPORT TIME 5 HD", "SPORT TIME 6 HD", "STORT TIME 7 HD",
    "ARENA SPORT Hd1", "ARENA SPORT Hd2", "ARENA SPORT Hd3", "ARENA SPORT Hd4", "MBC PRO SPORT 1",
    "MBC PRO SPORT 2", "MBC PRO SPORT 3"
  ],
  "Bangla Channels": [
    "SONY AATH", "ETV BANGLA", "MASRANGA", "PEACE TV BANGLA", "STAR JALSHA", "EKUSHEY TV", "MOVIE BANGLA",
    "TIME TV", "TARA MUZIK", "COLORS BANGLA", "CHANNEL I", "ZEE BANGLA US", "SOMOY NEWS TV", "R PLUS",
    "PLANET M CINEMA", "SANGSAD BANGLADESH", "SANGEET BANGLADESH", "JAMUNA TV", "INDEPENDENT TV",
    "MILLENNIUM TV", "CHANNEL S", "ATN NEWS", "MY TV", "DESH TV", "DHOOM MUZIK", "GHANTA", "GAAN BANGLA",
    "EKATOR TV", "NEWS TIME", "RUPASHI BANGLA", "SA TV", "ATN BANGLA", "CHANNEL 9", "BTV WORLD",
    "BANGLA VISION", "ASIAN TV", "BOISHAKHI TV", "ASIAN TV", "SR BANGLA TV", "ABP ANANDA", "NTV",
    "AAKASH BANGLA", "CHANNEL 24"
  ],
  "Telugu Channels": [
    "BHATHI TV", "GEMINI TV", "GEMINI MOVIES", "GEMINI COMEDY", "ZEE TELUGU", "ETV TELEGU", "MAA MUSIC",
    "MAA GOLD", "NTV", "MAA MOVIES US", "MAA TV", "MANA TV", "MAHAA TV", "POOJA TV", "OM CVR", "TV9 NEWS",
    "V6 NEWS TV", "TOLLYWOOD TV", "TV1 NEWS", "I NEWS", "VANITHA TV", "T NEWS", "STUDIO N TV",
    "RAJ VISSA", "RAKSHANA TV", "SAKHI TV", "CALVARY TV", "CVR NEWS", "CVR ENGLSH NEWS", "ABN ANDHRA JYOT",
    "10 TV", "ARADANA TV", "6TV", "ETV ANDHRA PRADESH", "RAJ NEWS TELUGU"
  ],
  "Punjabi Channels": [
    "5AAb", "SIKH CHANNEL-UK", "JUS ONE PUNJABI", "AONE PUNJABI", "PTC JUNJABI NEWS", "JUS PUNJABI",
    "Mh1", "HAMDARD TV", "PTC CHAK DE", "JHANJAR TV", "GOLD ONE TV", "DIP CHANNEL", "ZEE PUNJABI UK",
    "SIKH CHANNEL", "PTC PUNJABI US", "SEA TV", "ALPHA ETC PUNJABI", "24*7 GURBANI", "CHAKDE TV",
    "BRIT ASIA", "APNA CHANNEL", "ANKHILA PUNJAB TV", "9X TASHAN", "NAGARA TV", "SANGAT TV",
    "ANKHILA PUNJABI", "SARDARI"
  ],
  "Kids Channels": [
    "FAMILY HD", "ABC SPARK", "TREEHOUSE SD", "TREEHOUSE HD", "CARTOON NETWORK", "NICKELODEON",
    "DISNEY XD HD", "NICKELODEON TEEN", "YTV EAST HD", "NICK JR UK", "DISNEY JUNIOR-CA",
    "DISNEY CHANNEL-CA", "DISNEY JUNIOR-UK", "DISNEY CHANNEL", "CARTOON NETWORK UK", "NICKTOON UK",
    "FAMILY JR-CA"
  ],
  "Kannada Channels": [
    "NEWS 9", "JANASRI NEWS", "SUVAMA TV", "ETV KANNADA", "TV9 KANNADA", "UDAYA TV", "ZEE KANNADA",
    "SUVARNA NEWS 24X7", "RAJ MUSIK KANNADA", "PUBLIC TV", "SRI SANKARA", "ASIANET SUVARNA",
    "COLORS KANNADA IND"
  ],
  "Chinese": [
    "1700 PHOENIX TV", "PHOENIX HONG KONG", "SHANDONG TV", "BEIJING TV", "YANGTZE RIVER THEATRE",
    "ANHUI INTERNATIONAL", "TIANJIN TV", "TIANJIN INTERNATIONAL", "FIRST FINANCIAL", "SICHUAN INTERNATIONAL"
  ],
  "24/7 Channels": [
    "FAMILY GUY", "SOUTH PARK", "THE SIMPSONS", "BOB'S BURGERS", "TWO AND A HALF MEN",
    "HOW I MET YOUR MOTHER", "THE BIG BANG THEORY"
  ],
  "NHL Games Channels": [
    "NHL-HABS GAME ONLY", "NHL-LEAFS GAME ONLY", "NHL-01", "NHL-02", "NHL-03", "NHL-04", "NHL-05",
    "NHL-06", "NHL-07", "NHL-08(OFFLINE)"
  ],
  "NBA Games Channels": [
    "NBA 01", "NBA 02", "NBA 03", "NBA 04", "NBA 05", "NBA 06", "NBA 07", "NBA 08"
  ],
  "Spanish Channels": [
    "827 UNIVISION", "UNIVISION TV", "828 UNIMAS", "830 CARACOL INTL.", "832 TELECNTRO", "834 PASIONES",
    "835 TELEMUNDO", "7017 TELEMUNDO SP", "836 TELEMUNDO INT", "837 TLNOVELAS AMERICA", "838 RCN NOVELAS",
    "TVE INTERNATIONAL", "842 DW LATINO AMERICA", "844 TV5 MONDE TV", "845 DISCOVERY WORLD",
    "EURO SPORT SP", "FOX LIFE SP", "TCM TV SP", "ANTENNA 3", "CANAL DE PORTES", "CANAL ESTRENOS",
    "CANAL FUTBAL", "CANAL GOLF", "CANAL LIGA SP", "CANAL LIGA 2", "CANAL SERIES PS", "CANAL SERIES EXTRA SP",
    "CANAL TOROS SP", "CANAL EXTRA", "CANAL ACCION", "MOVISTAR F1", "MOVISTAR MOTO GP", "RCP TV",
    "TV CHILLE", "CDN 37", "C5N", "AMERICAN PERU", "CALLE 13", "CUATRO", "CDN SPORT", "TV AZTECA", "EWTN",
    "TRU TV HD SP", "CNN EN ESPANOL", "HMX TV SP", "AE SP", "LIFE TIME SP", "BOOMERANG SP",
    "UNO MAS UNO SP", "DE PELACULA", "CBEEBIES SP", "CANAL LIGA", "CANAL FUTBOL", "TELEHIT SP",
    "ESTELLAS SP", "FORO TV SP", "ESPN SP", "ESPN 3 SP", "TELEFORMULA", "DISCOVERY KID SP", "DISNEY JRE SP",
    "DISRITO COMEDIA", "TNT SERIES", "FOX SPORT 2 HD", "GALA TV", "GLITZ SP", "GUAREVISION", "GALAVISION",
    "GOLDEN TV", "GOLDEN EDGE", "EL GOURMET", "MTV LIVE HD", "NICK JR", "NICK TOONS", "NICK SP",
    "DISNEY CHANNEL", "NAT GEO WILD", "CNTRO AMERICA", "TLE REBELDE", "TLNOVELAS", "MILENIO TV", "SYFY SP",
    "VH1 SP", "HD THEATRE", "HOME AND HEALTH", "UNICABLE", "STUDIO UNIVERSAL", "SAT SP", "TVE",
    "TV COLUMBIA", "DISNEY JUNIOR", "TOONCAST", "TNTSP", "UNIVISION", "UNIMAS", "CARACOL"
  ],
  "Afghan and Persian": [
    "IRIB 1", "IRIB 2", "IRIB 3", "IRIB 4", "IRIB 5", "IRIB BAZAR", "IRIB MOSTANAD", "IRIB NAMAYESH",
    "IRIB POOYA", "IRIB QURBAN", "IRIB SALAMAT", "IRIB SHOMA", "AREZO TV", "ARTN", "ASRE EMROOZ",
    "ANDISHEH TV", "AFGHAN JAVAN", "AFGHAN THEATRE", "IRAN A AYRAEE", "IRAN E FARDA", "ITC", "IMAN TV",
    "IRINN", "ANB", "GEM ONYX", "GEM RIVER", "GEM TV", "GEM ST", "GEM USA", "GEM RUBIX", "GEM MIFA MUSIC",
    "GEM LIFEGEM KURD", "GEM JUNIOR", "GEM CLASSIC", "GEM BOLLYWOOD", "CHANNEL ONE", "DIDAR ONE",
    "DIDAR PLUS", "KABUL NEWS", "KAYHAN TV", "KENTRON", "KLISAT TV", "MAIWAND TV", "PAYAM E AFGAN",
    "PAYAM JAVAN TV", "PASHTO TV", "PRESS TV", "GANJE HOZOUR TV", "MOHABBAT", "MELLI TV", "MANOTO 1",
    "RTA", "SALAM TV", "JAAM E JAAM", "NASIM TV", "SIMAY AZADI", "TAPESH TV", "TIME TV", "BBC PERSIAN",
    "ZARIN TV", "RANGARANG TV", "FARSI 1", "VOA FARSI", "ZHWANDOON TV", "ARIANA INTERNATIONAL",
    "ARIANA TV", "ARIANA TV NETWORK", "ATN NEWS", "LEMAR TV", "TOLO NEWS", "TOLO TV", "AAA MUSIC",
    "AAA FAMILY", "BBC", "CHANNEL ONE", "CLICK SAT", "ICC TV", "FACES 2", "GEM USA", "MERCI TV",
    "NEX 1TV", "PMC TV", "TVP", "VOA TV", "PERSIAN MOVIE"
  ],
  "Russian Channel": [
    "RUSSIA 1, 2 and RUSSIA 24", "SPORT 1 RUS", "CHANNEL 1 RUS", "ANIMAL PLANET", "CARTOON NETWORK",
    "TV 1000", "NTV HD RUS", "NTV PLUS RUS", "OUR KINO RUS", "OUR NEW KINO RUS", "MUSIC BOX RUS",
    "MUSIC BOX RUSSIA", "ILLUSON RUS", "COMEDY RUS", "EUROSPORT", "EUROSPORT 2 RUS", "EUROPA PLUS",
    "NAT GEO RUS", "NAT GEO WILD", "DISCOVERY CHANNEL", "ANIMAL PLANET", "VIASAT HISTORY",
    "VIASAT NATURE", "2X2 RUS", "A-ONE"
  ],
  "Italian Channel": [
    "RAI INTERNATIONAL", "RIA ITALIA", "RAI 1 , RAI 2 and RAI 3", "SKY GTA 24", "EURO NEWS",
    "RAI NEWS 24", "ETV", "SKY SPORT 1", "RAI PREMIUM", "FANO TV", "CIELO", "MEDIASET DUE",
    "MEDIASET EXTRA", "AXN CIELO", "SKY CINEMA 1"
  ],
  "Nepalese Channel": [
    "NTV PLUS", "NEWS 24", "MNTV", "VISION NEPAL", "KANTIPUR TV", "NEPAL TELEVISION", "AVENUES TV",
    "HIMALAYA TV", "NEPAL 1 TV", "TV FILMY"
  ],
  "Polish Channels": [
    "FILMBOX FAMILY POL", "CANAL FAMILY POL", "MINIMINI POL", "ORANGE SPORT POL", "NSPORT POL",
    "EUROSPORT POL", "COMEDY CENTRAL", "TV4 POL", "TVN 7 POL", "VIVA POL", "SKAHBO POL", "HBO 2 POL",
    "HBO COMEDY POL", "ANIMAL PLANET POL", "POLSAT PLAY POL", "POLSAT FILM POL", "NATGEO WILD POL",
    "POLSAT SPORT NEWS", "POLSAT NEWS", "POLSAT SPORT", "POLSAT SPORT EXTRA", "NAT GEO P", "ESKA TV",
    "CANAL+P", "CANAL+SERIALE P", "CANAL+FILM P", "POLSAT JIMJAM POL", "DISCOVERY SCIENCE POL",
    "BBC EARTH POL", "DISNEY JUNIOR POL", "TV POLONIA", "ITVN P", "TVN", "TVN 7", "TVP 1 and TVP 2",
    "TVP SPORT", "TVN 24", "TVN TURBO", "TVN STYLE", "TVP HISTORIA", "POLSAT", "POLSAT 2",
    "TVP SERIALE", "ALEKINO", "KINO", "KINO POLSKA", "TRWM TV", "TVP INFO", "DOMO PLUS", "KUCHNIA"
  ],
  "French": [
    "GULLI FR", "FRANCE 1", "FRANCE 2", "FRANCE 3", "FRANCE 4", "FRANCE 5", "FRANCE 24", "ARTE FR",
    "AB 1 FR", "M6", "TF 1ANIMAUX FR", "DISNEY FR", "BEIN SPORT 1 FR", "BEIN SPORT 2 FR",
    "CANAL PLUS PREMIUM", "CANAL PLUS SPORT", "CANAL PLUS CINE CLASSIC", "CANAL PLUS FRISSON",
    "CANAL PLUS CINEMA", "CANAL PLUS DECALE"
  ],
  "Malayalam Channels": [
    "MANORAMA NEWS", "MAZHAVIL MANORAMA", "MATHRUBHUMI NEWS", "KIRAN TV", "KERALA VISION", "KAUMUDY TV",
    "GOODNESS TV", "FLOWERS TV", "JAIHIND TV", "JEEVAN TV", "VISION TV", "WE TV", "RAJ MUSIC MALAYLAM",
    "REPORTER TV", "POWER VISION TV", "SURYA TV", "AMRITA TV", "ASIA NET PLUS", "ASIA NET NEWS",
    "ASIA NET MVOIES", "ASIA NET TV", "MEDIA ONE TV", "PEOPLE TV", "KAIRALI TV", "SHALOM TV"
  ],
  "Portuguese Channels": [
    "BAND NEWS", "BAND INTERNATIONAL", "GLOBO USA 1", "GLOBO USA", "GLOBO BRAZIL", "GLOBO PREMIUM",
    "RECORD USA", "RECORD BRAZIL", "SPORT TV AMERICA", "REAL MADRID TV", "BENFICA TV 1 SD",
    "SPORT TV 1 SD", "SPORT TV 2 SD", "SPORT TV 3 SD", "RTPI", "RTP MADEIRA", "RTP ACORES", "RTP 1",
    "RTP 2", "SIC", "SIC NOTICIAS", "SIC MULHER", "SIC RADICAL", "TVI", "PLUS TVI", "TVI24", "CMTV",
    "A BOLA TV", "SPORT TV 1 HD", "SPORT TV 2 HD", "SPORT TV 3", "SPORT TV 4", "SPORT TV 5",
    "BENIFICA TV 1 HD", "BENFICA TV 2 HD", "SPORTING TV HD", "PORTO CANAL", "PFC", "MOTOS TV",
    "MOTO VISION TV", "AXN", "AXN WHITE and AXN BLACK", "FOX PT", "TVCINE 1", "TVCINE 2", "TVCINE 3",
    "TVCINE 4", "CACA E PESCA", "TOROS TV", "DISCOVERY CHANNEL", "ODISEA PORTUGAL", "CANAL DE HISTORIA",
    "DISNEY CHANNEL PT", "RTP AFRICA", "ETV", "HOLLYWOOD", "RTP MEMORIA", "RTP INFORMACAO", "NAT GEO PT",
    "MOV", "TVI FICCAO", "TV SERIES", "SIC CARAS", "CANAL PANDA", "CINE MUNDO PT"
  ],
  "Italian Channels": [
    "RAI INTER/NATIONAL", "RIA ITALIA 1", "RAI GULP", "RAI 1", "RAI 2", "RAI 3", "SKY GT24 TV",
    "EURO NEWS", "RAI NEWS 24", "ETV", "SKY SPORT 1", "SKY SPORT 3 ITA", "RAI PREMIUM", "FANO TV",
    "CIELO", "MEDIASET DUE", "MEDIASET EXTRA", "IA5 ITALIA", "SKY UNO ITA", "SKY SPORTS 24",
    "PREMIUM ACTION 24 ITA", "AXN CIELO", "PREMIUM BBC ITA", "SKY TG24 ITA", "SKY CINEMA 24 ITA",
    "SKY CINEMA 1", "SKY CINEMA FAMILY", "SKY CINEMA CULT ITA"
  ],
  "NCAAB Channels": [
    "NCAAB 01", "NCAAB 02", "NCAAB 03", "NCAAB 04", "NCAAB 05", "NCAAB 06", "NCAAB 07", "NCAAB 08"
  ],
  "PPV Events Channels": [
    "CRICKET EVENTS-01", "CRICKET EVENTS-02", "CRICKET EVENTS-BBL", "HBO BOXING:PPV(OFFLINE)",
    "BOXING-PRO(OFFLINE)", "WWE SD", "WWE HD", "UFC 196 HD :WERDUM VSVELASQUES (FEB 6)",
    "UFC 196 SD:WERDUM VS . VELASQUEZ(FEB 6)", "UFC 196 HD2:WERDUM VS. VELASQUEZ(FEB 6)",
    "PPV-(OFFLINE)", "MMA 24/7 (BEST FIGHTS)", "CHONGGING", "INTERNATIONAL BELLATOR (OFFLINE)"
  ],
  "Sinhalese": [
    "HIRU TV", "LORD BHUDDA TV", "ITNDERANA TY", "THE BUDDHIST", "STN LANKA", "RUPAVAHNI"
  ],
  "Filipino": [
    "GMA LIFE TV", "GMA PINOY TV"
  ],
  "Gujarati": [
    "Tv9 GUJARATI", "COLORS GUJARATI"
  ],
  "Ex Yugoslavia": [
    "PINK PLUS", "PINK", "PINK 2", "PINK 3", "PINK ACTION", "PINK FOLK", "PINK PREMIUM", "PINK HORROR",
    "PINK MONTENEGRO", "PINK WESTERN", "KLASIC TV", "N1", "HAYAT FOLK", "HAYAT PLUS", "HAYAT HD",
    "HAPPY", "SONCE", "NOVEZAMKY", "B92", "ATV", "ATV 1", "DOMA TV", "LOV I RIBOLOV", "24 KITCHEN",
    "HISTORY CHANNEL", "ANIMAL PLANNET", "DISCOVERY ID", "FOR MOVIES", "FOR EX", "FOX CRIME EX",
    "FOX LIFE EX", "HBO ADRIA & HBO COMEDY", "CINESTAR PREMIUM", "CINESTAR ACTION", "CINEMAX"
  ],
  "NCAAF Channels": [
    "NCAAF 01", "NCAAF 02", "NCAAF 03", "NCAAF 04", "NCAAF 05", "NCAAF 06", "NCAAF 01", "NCAAF 02",
    "NCAAF 07", "NCAAF 08"
  ],
  "Khmer": [
    "CTN KHMER TV", "CNC KHMER TV", "MYTV KHMER TV", "HANGMAESE KHMER", "BAYON KHMER", "APSARA KHMER TV"
  ],
  "Ukrain": [
    "UKRAIN 01", "UKRAIN 02", "UKRAIN 03", "UKRAIN 04", "UKRAIN 05", "UKRAIN 06"
  ],
  "Israel": [
    "IBA 1", "IBA 20", "C2N", "CHANGE ISR – IBA 10", "24 LIVE", "ISRAEL"
  ],
  "Oriya": [
    "OTV", "PRARTHANA TV", "TARANG TV", "TARANG MUSIC"
  ],
  "Jamaica": [
    "RE JAMAICAN", "JAMAICA 01", "JAMAICA 02", "JAMAICA 03"
  ],
  "For Adult": [
    "BUNGA BUNGA", "XTSY", "SCT HD", "AD BB", "JUICY", "REAL", "HUSTLER", "RED LIGHT 1", "RED LIGHT 2",
    "BABE STATION EXTRA"
  ]
};

export default function ChannelsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Get all categories
  const categories = Object.keys(channelCategories);

  // Filter channels based on search and category
  const filteredChannels = useMemo(() => {
    let result: Record<string, string[]> = {};

    Object.entries(channelCategories).forEach(([category, channels]) => {
      // Filter by category if selected
      if (selectedCategory && category !== selectedCategory) {
        return;
      }

      // Filter by search query
      const filtered = channels.filter((channel) =>
        channel.toLowerCase().includes(searchQuery.toLowerCase())
      );

      if (filtered.length > 0) {
        result[category] = filtered;
      }
    });

    return result;
  }, [searchQuery, selectedCategory]);

  // Calculate total channels
  const totalChannels = useMemo(() => {
    return Object.values(filteredChannels).reduce((sum, channels) => sum + channels.length, 0);
  }, [filteredChannels]);

  return (
    <main className="bg-white min-h-screen">
      <div className="container mx-auto px-4 py-20 md:py-[160px] max-w-7xl">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight mb-5">
            2000+ Multi-Cultural Live Channels
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed mb-8">
            Everything at one place
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search channels..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-14 text-base border-gray-300 focus:border-primary focus:ring-primary"
              />
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-6 py-2 text-sm font-medium transition-colors border ${
                selectedCategory === null
                  ? "bg-primary text-white border-primary"
                  : "bg-white text-gray-700 border-gray-200 hover:border-primary"
              }`}
            >
              All Categories
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 text-sm font-medium transition-colors border ${
                  selectedCategory === category
                    ? "bg-primary text-white border-primary"
                    : "bg-white text-gray-700 border-gray-200 hover:border-primary"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Results Count */}
          {searchQuery && (
            <p className="text-gray-600 text-sm">
              Found {totalChannels} channel{totalChannels !== 1 ? "s" : ""}
              {selectedCategory && ` in ${selectedCategory}`}
            </p>
          )}
        </motion.div>

        {/* Channels by Category */}
        <div className="space-y-12">
          {Object.entries(filteredChannels).map(([category, channels], categoryIndex) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: categoryIndex * 0.1 }}
            >
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <span className="text-primary">{category.toUpperCase()}</span>
                <span className="text-gray-400 text-lg font-normal">
                  ({channels.length} channels)
                </span>
              </h2>

              {/* Channels Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                {channels.map((channel, index) => (
                  <motion.div
                    key={`${category}-${channel}-${index}`}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.2, delay: index * 0.01 }}
                    className="bg-white border border-gray-200 p-4 hover:border-primary transition-colors duration-200 cursor-pointer group"
                  >
                    <p className="text-sm font-medium text-gray-900 group-hover:text-primary transition-colors line-clamp-2">
                      {channel}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {Object.keys(filteredChannels).length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-gray-600 text-lg mb-4">No channels found</p>
            <p className="text-gray-500 text-sm">
              Try adjusting your search or select a different category
            </p>
          </motion.div>
        )}
      </div>
    </main>
  );
}
