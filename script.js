/* ---------- Data ---------- */
const ITEMS = [
  {id:"ff-burger", name:"Classic Burger", price:6.5, discount:10,
    img:"https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=1200&auto=format&fit=crop",
    desc:"Juicy patty with lettuce, tomato, and house sauce.",
    ingredients:["Beef patty","Bun","Lettuce","Tomato","Cheddar","Aurora sauce"]},
  {id:"ff-fries", name:"Crispy Fries", price:2.5, discount:0,
    img:"images/crispy.jpg",
    desc:"Golden fries with sea salt.",
    ingredients:["Potato","Sunflower oil","Salt"]},
  {id:"wrap-chicken", name:"Chicken Wrap", price:5.2, discount:5,
    img:"images/chickenWrap.jpg",
    desc:"Grilled chicken and veggies in a warm wrap.",
    ingredients:["Chicken","Tortilla","Lettuce","Tomato","Garlic sauce"]},
  {id:"tea-masala", name:"Masala Tea", price:1.2, discount:15,
    img:"images/MasalaTea.jpg",
    desc:"Spiced milk tea.",
    ingredients:["Black tea","Milk","Cardamom","Ginger","Cinnamon"]},
  {id:"coffee-latte", name:"Caffè Latte", price:2.0, discount:20,
    img:"images/latte3.jpg",
    desc:"Espresso with steamed milk.",
    ingredients:["Espresso","Milk"]},
  {id:"bakery-croissant", name:"Butter Croissant", price:1.8, discount:0,
    img:"images/ButterCroissant2.jpg",
    desc:"Flaky, buttery pastry.",
    ingredients:["Flour","Butter","Yeast","Sugar","Salt","Egg"]},
  {id:"bakery-muffin", name:"Chocolate Muffin", price:1.9, discount:10,
    img:"images/muffin2.jpg",
    desc:"Rich chocolate muffin.",
    ingredients:["Flour","Cocoa","Sugar","Butter","Egg","Baking powder"]},
  {id:"coffee-espresso", name:"Espresso", price:1.6, discount:0,
    img:"images/expresso2.jpg",
    desc:"Strong single shot.",
    ingredients:["Arabica beans","Water"]}
];

/* ---------- Cart ---------- */
const CART_KEY = "aurora_cart_v1";
const loadCart = ()=> JSON.parse(localStorage.getItem(CART_KEY)||"{}");
const saveCart = c => localStorage.setItem(CART_KEY, JSON.stringify(c));
function cartCount(cart){ return Object.values(cart).reduce((s,q)=>s+q,0); }
function updateCartPill(){
  const c = loadCart();
  document.getElementById("cartCount").textContent = `${cartCount(c)} item${cartCount(c)!==1?"s":""}`;
}

/* ---------- Utilities ---------- */
const fmt = v => new Intl.NumberFormat(undefined,{style:"currency",currency:"USD"}).format(v);
const finalPrice = (p,d)=> p*(1-d/100);
/* ---------- Auth ---------- */
const AUTH_KEY = "aurora_auth";
function isSignedIn(){ return localStorage.getItem(AUTH_KEY) === "1"; }
function signIn(){ localStorage.setItem(AUTH_KEY, "1"); }
function signOut(){ localStorage.removeItem(AUTH_KEY); }
/* ---------- i18n ---------- */
const LANG_KEY = "aurora_lang";
const LANGS = [
  {code:"en", name:"English", flag:"🇺🇸"},
  {code:"es", name:"Español", flag:"🇪🇸"},
  {code:"fr", name:"Français", flag:"🇫🇷"},
  {code:"de", name:"Deutsch", flag:"🇩🇪"},
  {code:"it", name:"Italiano", flag:"🇮🇹"},
  {code:"pt", name:"Português", flag:"🇵🇹"},
  {code:"pt-BR", name:"Português (Brasil)", flag:"🇧🇷"},
  {code:"hi", name:"हिन्दी", flag:"🇮🇳"},
  {code:"bn", name:"বাংলা", flag:"🇧🇩"},
  {code:"zh", name:"中文", flag:"🇨🇳"},
  {code:"ja", name:"日本語", flag:"🇯🇵"},
  {code:"ko", name:"한국어", flag:"🇰🇷"},
  {code:"ar", name:"العربية", flag:"🇸🇦"},
  {code:"ru", name:"Русский", flag:"🇷🇺"},
  {code:"tr", name:"Türkçe", flag:"🇹🇷"},
  {code:"nl", name:"Nederlands", flag:"🇳🇱"},
  {code:"sv", name:"Svenska", flag:"🇸🇪"},
  {code:"no", name:"Norsk", flag:"🇳🇴"},
  {code:"da", name:"Dansk", flag:"🇩🇰"},
  {code:"fi", name:"Suomi", flag:"🇫🇮"},
  {code:"pl", name:"Polski", flag:"🇵🇱"},
  {code:"uk", name:"Українська", flag:"🇺🇦"},
  {code:"cs", name:"Čeština", flag:"🇨🇿"},
  {code:"el", name:"Ελληνικά", flag:"🇬🇷"},
  {code:"he", name:"עברית", flag:"🇮🇱"},
  {code:"id", name:"Bahasa Indonesia", flag:"🇮🇩"},
  {code:"ms", name:"Bahasa Melayu", flag:"🇲🇾"},
  {code:"vi", name:"Tiếng Việt", flag:"🇻🇳"},
  {code:"th", name:"ไทย", flag:"🇹🇭"},
  {code:"fa", name:"فارسی", flag:"🇮🇷"},
  {code:"ur", name:"اردو", flag:"🇵🇰"},
  {code:"ro", name:"Română", flag:"🇷🇴"},
  {code:"hu", name:"Magyar", flag:"🇭🇺"}
];
function getLang(){ return localStorage.getItem(LANG_KEY) || "en"; }
function setLang(l){ localStorage.setItem(LANG_KEY, l); }
function showLangOverlayIfNeeded(){
  const overlay = document.getElementById("langOverlay");
  if(!overlay) return;
  if(!localStorage.getItem(LANG_KEY)){
    overlay.style.display = "block";
    buildLangGrid();
  }
}
function buildLangGrid(){
  const grid = document.getElementById("langGrid"); if(!grid) return;
  grid.innerHTML = "";
  LANGS.forEach(l=>{
    const btn = document.createElement("button");
    btn.className = "lang-opt";
    btn.innerHTML = `<span class="lang-flag">${l.flag}</span><span class="lang-name">${l.name}</span>`;
    btn.addEventListener("click", ()=>{
      setLang(l.code);
      document.getElementById("langOverlay").style.display = "none";
      applyLang();
    });
    grid.appendChild(btn);
  });
}
const I18N = {
  en: {
    home_tag: "Fresh bites · Hot sips",
    home_title: "Modern café ordering. Quick. Clear. Mobile-first.",
    home_desc: "Fast food, tea, coffee, and bakery. Tap Items to order. Discounts applied automatically.",
    browse_items: "Browse Items",
    view_memories: "View Memories",
    items_h2: "Items",
    items_hint: "Click a card for ingredients",
    offers_h2: "Offers",
    offers_desc: "Auto-applied discounts show on each card. More weekly bundles coming soon.",
    memories_h2: "Memories"
  }
};
function applyLang(){
  const lang = getLang();
  const t = I18N[lang] || I18N.en;
  const byId = (id, val)=>{ const el=document.getElementById(id); if(el) el.textContent = val; };
  byId("homeTag", t.home_tag);
  byId("homeTitle", t.home_title);
  byId("homeDesc", t.home_desc);
  byId("btnBrowse", t.browse_items);
  byId("btnMemories", t.view_memories);
  byId("itemsH2", t.items_h2);
  byId("itemsHint", t.items_hint);
  byId("offersH2", t.offers_h2);
  byId("offersDesc", t.offers_desc);
  byId("memoriesH2", t.memories_h2);
}

/* ---------- Offers visibility ---------- */
function updateOffersInfoVisibility(){
  const info = document.getElementById('offersInfo');
  if(!info) return;
  const hasOffers = document.querySelectorAll('#offers .offer-strip').length > 0;
  info.style.display = hasOffers ? 'none' : 'block';
}

/* ---------- Render Items ---------- */
function renderItems(){
  const grid = document.getElementById("itemsGrid");
  grid.innerHTML = "";
  ITEMS.forEach(item=>{
    const now = finalPrice(item.price,item.discount);
    const card = document.createElement("article");
    card.className = "card";
    card.innerHTML = `
      <button class="card-img" data-id="${item.id}" aria-label="View ${item.name} details">
        <img src="${item.img}" alt="${item.name}">
      </button>
      <div class="card-body">
        <div class="row">
          <div class="name">${item.name}</div>
          ${item.discount?`<span class="badge">${item.discount}% off</span>`:""}
        </div>
        <div class="muted" style="margin:4px 0 10px">${item.desc}</div>
        <div class="row">
          <div class="price">
            <span class="now">${fmt(now)}</span>
            ${item.discount?`<span class="was">${fmt(item.price)}</span>`:""}
          </div>
        </div>
        <div class="row" style="margin-top:10px">
          <div class="qty" aria-label="quantity selector">
            <button type="button" aria-label="decrease">−</button>
            <input type="number" min="1" value="1" aria-label="quantity">
            <button type="button" aria-label="increase">+</button>
          </div>
          <button class="btn add">Add to Cart</button>
        </div>
      </div>
    `;
    // Click to open modal
    card.querySelector(".card-img").addEventListener("click",()=>openModal(item.id));
    // Qty controls
    const qtyWrap = card.querySelector(".qty");
    const input = qtyWrap.querySelector("input");
    qtyWrap.querySelectorAll("button")[0].onclick = ()=>{input.value = Math.max(1, Number(input.value)-1)};
    qtyWrap.querySelectorAll("button")[1].onclick = ()=>{input.value = Number(input.value)+1};
    // Add to cart
    card.querySelector(".add").addEventListener("click",()=>{
      const qty = Math.max(1, Number(input.value||1));
      const cart = loadCart();
      cart[item.id] = (cart[item.id]||0) + qty;
      saveCart(cart);
      updateCartPill();
      card.querySelector(".add").textContent="Added";
      setTimeout(()=>card.querySelector(".add").textContent="Add to Cart",900);
    });
    grid.appendChild(card);
  });
}

/* ---------- Modal ---------- */
const modal = document.getElementById("modal");
const modalClose = document.getElementById("modalClose");
function openModal(id){
  const it = ITEMS.find(x=>x.id===id); if(!it) return;
  document.getElementById("modalTitle").textContent = it.name;
  document.getElementById("modalImgWrap").innerHTML = `<img src="${it.img}" alt="${it.name} photo">`;
  document.getElementById("modalDesc").textContent = it.desc;
  const ul = document.getElementById("modalIngr"); ul.innerHTML="";
  it.ingredients.forEach(g=>{ const li=document.createElement("li"); li.textContent=g; ul.appendChild(li); });
  const now = finalPrice(it.price,it.discount);
  document.getElementById("modalPrice").textContent = fmt(now);
  document.getElementById("modalWas").textContent = it.discount?fmt(it.price):"";
  document.getElementById("modalDisc").textContent = it.discount?`${it.discount}% off`:"";
  // Ensure item details sections are visible (in case hidden by image modal)
  const ingrHeader = document.querySelector("#modal .modal-body h3");
  const ingrList = document.getElementById("modalIngr");
  const priceRow = document.querySelector("#modal .modal-body .price");
  if(ingrHeader) ingrHeader.style.display = "";
  if(ingrList) ingrList.style.display = "";
  if(priceRow) priceRow.style.display = "";
  modal.classList.add("show");
}
modalClose.addEventListener("click",()=>modal.classList.remove("show"));
modal.addEventListener("click",(e)=>{ if(e.target===modal) modal.classList.remove("show"); });
document.addEventListener("keydown",(e)=>{ if(e.key==="Escape") modal.classList.remove("show"); });

// Open modal for arbitrary image (Memories lightbox)
function openImageModal(src, alt){
  document.getElementById("modalTitle").textContent = alt || "Memory";
  document.getElementById("modalImgWrap").innerHTML = `<img src="${src}" alt="${alt||'Memory'}">`;
  document.getElementById("modalDesc").textContent = "";
  document.getElementById("modalIngr").innerHTML = "";
  document.getElementById("modalPrice").textContent = "";
  document.getElementById("modalWas").textContent = "";
  document.getElementById("modalDisc").textContent = "";
  const ingrHeader = document.querySelector("#modal .modal-body h3");
  const ingrList = document.getElementById("modalIngr");
  const priceRow = document.querySelector("#modal .modal-body .price");
  if(ingrHeader) ingrHeader.style.display = "none";
  if(ingrList) ingrList.style.display = "none";
  if(priceRow) priceRow.style.display = "none";
  modal.classList.add("show");
}

/* ---------- Memories uploader ---------- */
const GALLERY_KEY = "aurora_memories_v1";
const ADMIN_DEFAULTS = [
  "images/memory1.jpg",
  "images/memory2.jpg",
  "images/memory3.jpg",
  "images/memory4jpg",
  "images/memory5.jpg",
  "images/memory7.jpg",
  "images/memory8.jpg",
  "images/memory9.jpg",

];
function loadMem(){
  const raw = JSON.parse(localStorage.getItem(GALLERY_KEY)||"null");
  if(Array.isArray(raw) && raw.length) return raw;
  return ADMIN_DEFAULTS;
}
function saveMem(arr){ localStorage.setItem(GALLERY_KEY, JSON.stringify(arr)); }
function renderGallery(){
  const wrap = document.getElementById("gallery");
  const imgs = loadMem().slice(0,8);
  wrap.innerHTML = "";
  imgs.forEach((src,i)=>{
    const fig = document.createElement("figure");
    fig.className = "shot";
    fig.innerHTML = `<img src="${src}" alt="Memory ${i+1}">`;
    wrap.appendChild(fig);
  });
}
// Click to open Memories images in modal
document.getElementById("gallery")?.addEventListener("click", (e)=>{
  const img = e.target.closest("img");
  if(!img) return;
  openImageModal(img.getAttribute("src"), img.getAttribute("alt")||"Memory");
});
// Uploader removed per request; gallery is fixed-size grid of 8 admin images
function fileToDataURL(file){
  return new Promise(res=>{
    const r = new FileReader();
    r.onload = ()=>res(r.result);
    r.readAsDataURL(file);
  });
}

/* ---------- Nav active link ---------- */
const links = [...document.querySelectorAll(".nav-links a")].filter(a=>a.getAttribute("href")?.startsWith("#"));
const obs = new IntersectionObserver((entries)=>{
  entries.forEach(ent=>{
    const id = "#" + ent.target.id;
    const link = links.find(a=>a.getAttribute("href")===id);
    if(link){ ent.isIntersecting ? link.classList.add("active") : link.classList.remove("active"); }
  });
},{threshold:.6});
["home","items","memories","offers","careers"].forEach(id=>{
  const el = document.getElementById(id);
  if(el) obs.observe(el);
});

/* ---------- Init ---------- */
renderItems();
updateCartPill();
renderGallery();
showLangOverlayIfNeeded();
applyLang();
updateOffersInfoVisibility();
