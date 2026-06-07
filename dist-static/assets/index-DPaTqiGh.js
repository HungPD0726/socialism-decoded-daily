const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/index.lazy-Bwt3t5fY.js","assets/vendor-react-BBDuoyTM.js","assets/vendor-tanstack-BW9ZDqTq.js","assets/vendor-misc-DSAvrGk5.js","assets/vendor-lucide-dSEO104s.js","assets/vendor-radix-T5KSg79d.js","assets/_chapter.lazy-ivqoaRj8.js"])))=>i.map(i=>d[i]);
import{r as d,j as e,e as ee,R as te}from"./vendor-react-BBDuoyTM.js";import{c as ne,u as re,L as ae,a as ie,Q as oe,O as se,b as T,n as ce,d as le,e as de,R as me}from"./vendor-tanstack-BW9ZDqTq.js";import{S as he}from"./vendor-radix-T5KSg79d.js";import{t as ue,c as ge,a as pe}from"./vendor-misc-DSAvrGk5.js";import{S as fe,T as xe,X as A,L as O,a as ye,M as be}from"./vendor-lucide-dSEO104s.js";(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))i(a);new MutationObserver(a=>{for(const o of a)if(o.type==="childList")for(const s of o.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&i(s)}).observe(document,{childList:!0,subtree:!0});function r(a){const o={};return a.integrity&&(o.integrity=a.integrity),a.referrerPolicy&&(o.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?o.credentials="include":a.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(a){if(a.ep)return;a.ep=!0;const o=r(a);fetch(a.href,o)}})();const ve="modulepreload",je=function(t){return"/socialism-decoded-daily/"+t},I={},u=function(n,r,i){let a=Promise.resolve();if(r&&r.length>0){let v=function(m){return Promise.all(m.map(h=>Promise.resolve(h).then(p=>({status:"fulfilled",value:p}),p=>({status:"rejected",reason:p}))))};document.getElementsByTagName("link");const s=document.querySelector("meta[property=csp-nonce]"),l=s?.nonce||s?.getAttribute("nonce");a=v(r.map(m=>{if(m=je(m),m in I)return;I[m]=!0;const h=m.endsWith(".css"),p=h?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${m}"]${p}`))return;const g=document.createElement("link");if(g.rel=h?"stylesheet":ve,h||(g.as="script"),g.crossOrigin="",g.href=m,l&&g.setAttribute("nonce",l),document.head.appendChild(g),h)return new Promise((j,w)=>{g.addEventListener("load",j),g.addEventListener("error",()=>w(new Error(`Unable to preload CSS for ${m}`)))})}))}function o(s){const l=new Event("vite:preloadError",{cancelable:!0});if(l.payload=s,window.dispatchEvent(l),!l.defaultPrevented)throw s}return a.then(s=>{for(const l of s||[])l.status==="rejected"&&o(l.reason);return n().catch(o)})};function K(...t){return ue(ge(t))}const we=pe("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",{variants:{variant:{default:"bg-primary text-primary-foreground shadow hover:bg-primary/90",destructive:"bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",outline:"border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",secondary:"bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",ghost:"hover:bg-accent hover:text-accent-foreground",link:"text-primary underline-offset-4 hover:underline"},size:{default:"h-9 px-4 py-2",sm:"h-8 rounded-md px-3 text-xs",lg:"h-10 rounded-md px-8",icon:"h-9 w-9"}},defaultVariants:{variant:"default",size:"default"}}),y=d.forwardRef(({className:t,variant:n,size:r,asChild:i=!1,...a},o)=>{const s=i?he:"button";return e.jsx(s,{className:K(we({variant:n,size:r,className:t})),ref:o,...a})});y.displayName="Button";const $=d.forwardRef(({className:t,...n},r)=>e.jsx("textarea",{className:K("flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",t),ref:r,...n}));$.displayName="Textarea";const C="groq-chatbot-history",f=12,Q=1200,Ne="/api/chat";function H(t,n){return{id:`${Date.now()}-${Math.random().toString(36).slice(2)}`,role:t,content:n}}function ke(){try{const t=sessionStorage.getItem(C);if(!t)return[];const n=JSON.parse(t);return Array.isArray(n)?n.filter(r=>r&&typeof r=="object"&&(r.role==="user"||r.role==="assistant")&&typeof r.content=="string"&&typeof r.id=="string").slice(-f):[]}catch{return[]}}function _e(){const t=window.location.pathname,n=t.match(/\/chuong\/(\d{1,2})/),r=n?Number(n[1]):void 0,i=new Date;return r&&r>=1&&r<=12?{path:t,month:r}:{path:t,month:i.getMonth()+1,day:i.getDate()}}function Me(){const[t,n]=d.useState(!1),[r,i]=d.useState(!1),[a,o]=d.useState([]),[s,l]=d.useState(""),[v,m]=d.useState(null),[h,p]=d.useState(!1),g=d.useRef(null),j=d.useRef(null),w=a.length>0,D=Q-s.length,Y=d.useMemo(()=>a.slice(-f).map(c=>({role:c.role,content:c.content})),[a]);d.useEffect(()=>{o(ke()),i(!0)},[]),d.useEffect(()=>{r&&sessionStorage.setItem(C,JSON.stringify(a.slice(-f)))},[r,a]),d.useEffect(()=>{if(!t)return;const c=window.requestAnimationFrame(()=>{g.current?.scrollTo({top:g.current.scrollHeight,behavior:"smooth"}),j.current?.focus()});return()=>window.cancelAnimationFrame(c)},[t,a,h]);const U=()=>{o([]),m(null),l(""),sessionStorage.removeItem(C)},S=async c=>{c?.preventDefault();const L=s.trim();if(!L||h)return;const _=H("user",L),J=[...a,_].slice(-f);o(J),l(""),m(null),p(!0);try{const x=await fetch(Ne,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({messages:[...Y,{role:_.role,content:_.content}].slice(-f),routeContext:_e()})}),q=await x.json().catch(()=>({}));if(!x.ok)throw new Error(q.error||"Chatbot chưa thể trả lời lúc này.");const z=q.message?.content?.trim();if(!z)throw new Error("Chatbot không trả về nội dung.");o(Z=>[...Z,H("assistant",z)].slice(-f))}catch(x){m(x instanceof Error?x.message:"Không thể kết nối tới chatbot. Hãy thử lại sau.")}finally{p(!1)}},W=c=>{c.key!=="Enter"||c.shiftKey||(c.preventDefault(),S())};return e.jsxs("div",{className:"fixed bottom-4 right-4 z-50 sm:bottom-6 sm:right-6",children:[t&&e.jsxs("section",{className:"mb-3 flex h-[min(680px,calc(100vh-7rem))] w-[calc(100vw-2rem)] max-w-md flex-col overflow-hidden rounded-md border-2 border-primary/30 bg-background shadow-2xl","aria-label":"Chatbot gia sư CNXHKH",children:[e.jsx("div",{className:"banner-stripes h-1.5 shrink-0"}),e.jsxs("header",{className:"flex shrink-0 items-center justify-between border-b border-border px-4 py-3",children:[e.jsxs("div",{className:"flex min-w-0 items-center gap-3",children:[e.jsx("span",{className:"flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground",children:e.jsx(fe,{className:"h-4 w-4","aria-hidden":!0})}),e.jsxs("div",{className:"min-w-0",children:[e.jsx("h2",{className:"truncate text-sm font-semibold",children:"Gia sư CNXHKH"}),e.jsx("p",{className:"truncate text-xs text-muted-foreground",children:"Groq Llama 3.3 70B"})]})]}),e.jsxs("div",{className:"flex items-center gap-1",children:[e.jsxs(y,{type:"button",variant:"ghost",size:"icon",onClick:U,disabled:!w||h,title:"Xóa hội thoại",children:[e.jsx(xe,{className:"h-4 w-4","aria-hidden":!0}),e.jsx("span",{className:"sr-only",children:"Xóa hội thoại"})]}),e.jsxs(y,{type:"button",variant:"ghost",size:"icon",onClick:()=>n(!1),title:"Đóng chatbot",children:[e.jsx(A,{className:"h-4 w-4","aria-hidden":!0}),e.jsx("span",{className:"sr-only",children:"Đóng chatbot"})]})]})]}),e.jsxs("div",{ref:g,className:"flex-1 space-y-3 overflow-y-auto px-4 py-4",children:[!w&&e.jsx("div",{className:"rounded-md border border-border bg-secondary/45 p-4 text-sm leading-relaxed text-muted-foreground",children:"Hỏi về bài học hôm nay, một chương, hoặc một trích dẫn trong dự án."}),a.map(c=>e.jsx("div",{className:["flex",c.role==="user"?"justify-end":"justify-start"].join(" "),children:e.jsx("div",{className:["max-w-[85%] whitespace-pre-wrap rounded-md px-3 py-2 text-sm leading-relaxed",c.role==="user"?"bg-primary text-primary-foreground":"border border-border bg-card text-card-foreground"].join(" "),children:c.content})},c.id)),h&&e.jsx("div",{className:"flex justify-start",children:e.jsxs("div",{className:"inline-flex items-center gap-2 rounded-md border border-border bg-card px-3 py-2 text-sm text-muted-foreground",children:[e.jsx(O,{className:"h-4 w-4 animate-spin","aria-hidden":!0}),"Đang suy nghĩ"]})})]}),v&&e.jsx("div",{className:"mx-4 mb-3 rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive",children:v}),e.jsxs("form",{onSubmit:S,className:"shrink-0 border-t border-border p-4",children:[e.jsx($,{ref:j,value:s,onChange:c=>l(c.target.value.slice(0,Q)),onKeyDown:W,placeholder:"Nhập câu hỏi...",rows:3,disabled:h,className:"max-h-32 min-h-20 resize-none"}),e.jsxs("div",{className:"mt-3 flex items-center justify-between gap-3",children:[e.jsx("span",{className:["text-xs",D<120?"text-destructive":"text-muted-foreground"].join(" "),children:D}),e.jsxs(y,{type:"submit",disabled:!s.trim()||h,children:[h?e.jsx(O,{className:"h-4 w-4 animate-spin","aria-hidden":!0}):e.jsx(ye,{className:"h-4 w-4","aria-hidden":!0}),"Gửi"]})]})]})]}),e.jsx(y,{type:"button",size:"icon",onClick:()=>n(c=>!c),className:"h-12 w-12 rounded-full shadow-xl","aria-expanded":t,"aria-label":t?"Đóng chatbot":"Mở chatbot",children:t?e.jsx(A,{className:"h-5 w-5","aria-hidden":!0}):e.jsx(be,{className:"h-5 w-5","aria-hidden":!0})})]})}function Ce(t,n={}){typeof window>"u"||window.__lovableEvents?.captureException?.(t,{source:"react_error_boundary",route:window.location.pathname,...n},{mechanism:"react_error_boundary",handled:!1,severity:"error"})}function Te(){return e.jsx("div",{className:"flex min-h-screen items-center justify-center bg-background px-4",children:e.jsxs("div",{className:"max-w-md text-center",children:[e.jsx("h1",{className:"text-7xl font-bold text-foreground",children:"404"}),e.jsx("h2",{className:"mt-4 text-xl font-semibold text-foreground",children:"Không tìm thấy trang"}),e.jsx("p",{className:"mt-2 text-sm text-muted-foreground",children:"Trang bạn tìm kiếm không tồn tại hoặc đã được di chuyển."}),e.jsx("div",{className:"mt-6",children:e.jsx(ae,{to:"/",className:"inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",children:"Về trang chủ"})})]})})}function Ee({error:t,reset:n}){console.error(t);const r=re();return d.useEffect(()=>{Ce(t,{boundary:"tanstack_root_error_component"})},[t]),e.jsx("div",{className:"flex min-h-screen items-center justify-center bg-background px-4",children:e.jsxs("div",{className:"max-w-md text-center",children:[e.jsx("h1",{className:"text-xl font-semibold tracking-tight text-foreground",children:"Trang không thể tải"}),e.jsx("p",{className:"mt-2 text-sm text-muted-foreground",children:"Có lỗi xảy ra. Bạn có thể thử làm mới trang hoặc quay về trang chủ."}),e.jsxs("div",{className:"mt-6 flex flex-wrap justify-center gap-2",children:[e.jsx("button",{onClick:()=>{r.invalidate(),n()},className:"inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",children:"Thử lại"}),e.jsx("a",{href:"./",className:"inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",children:"Về trang chủ"})]})]})})}const b=ne()({component:Pe,notFoundComponent:Te,errorComponent:Ee});function Pe(){const{queryClient:t}=b.useRouteContext(),r=!ie({select:i=>i.location.pathname}).includes("/print/");return e.jsxs(oe,{client:t,children:[e.jsx(se,{}),r&&e.jsx(Me,{})]})}const Re=365,De=[31,28,31,30,31,30,31,31,30,31,30,31],Se={1:()=>u(()=>import("./month01-BFhtn0bd.js"),[]).then(t=>t.month01Quotes),2:()=>u(()=>import("./month02-C_pG1pyf.js"),[]).then(t=>t.month02Quotes),3:()=>u(()=>import("./month03-BDfc6Q1f.js"),[]).then(t=>t.month03Quotes),4:()=>u(()=>import("./month04-Wj9sEEIU.js"),[]).then(t=>t.month04Quotes),5:()=>u(()=>import("./month05-CoAK9vmA.js"),[]).then(t=>t.month05Quotes),6:()=>u(()=>import("./month06-DWekdEwF.js"),[]).then(t=>t.month06Quotes),7:()=>u(()=>import("./month07-xDGfx_Dx.js"),[]).then(t=>t.month07Quotes),8:()=>u(()=>import("./month08-DpRPDP3o.js"),[]).then(t=>t.month08Quotes),9:()=>u(()=>import("./month09-DjAzCRhO.js"),[]).then(t=>t.month09Quotes),10:()=>u(()=>import("./month10-CPw9RKWl.js"),[]).then(t=>t.month10Quotes),11:()=>u(()=>import("./month11-DdMSQvdQ.js"),[]).then(t=>t.month11Quotes),12:()=>u(()=>import("./month12-ByQvPfJF.js"),[]).then(t=>t.month12Quotes)},V=new Map,B=new Map;function E(t){const n=Math.trunc(t);return n>=1&&n<=12?n:null}function Le(t,n){const r=t===2&&Math.trunc(n)===29?28:Math.trunc(n),i=De[t-1];return r>=1&&r<=i?r:null}function qe(t){const n=Date.UTC(t.getFullYear(),0,0),r=Date.UTC(t.getFullYear(),t.getMonth(),t.getDate());return Math.floor((r-n)/864e5)}function ze(t){return{year:t.getFullYear(),month:t.getMonth()+1,day:t.getDate(),dayOfYear:qe(t)}}async function k(t){const n=E(t);if(n===null)return[];const r=V.get(n);if(r)return r;const i=Se[n]();return V.set(n,i),i}async function Ae(t){const n=E(t);if(n===null)return new Map;const r=B.get(n);if(r)return r;const i=k(n).then(a=>new Map(a.map(o=>[o.day,o])));return B.set(n,i),i}async function Oe(t,n){const r=E(t);if(r===null)return;const i=Le(r,n);return i===null?void 0:(await Ae(r)).get(i)}function bt(t){return new Map(t.map(n=>[n.day,n]))}async function F(t){return Oe(t.getMonth()+1,t.getDate())}async function Ie(t=new Date,n=3){const r=Array.from({length:Math.max(0,Math.trunc(n))},(a,o)=>{const s=new Date(t);return s.setDate(t.getDate()+o),F(s)});return(await Promise.all(r)).filter(a=>!!a)}const Qe=T("/")({loader:async()=>{const t=new Date,n=ze(t),[r,i,a]=await Promise.all([F(t),Ie(t,3),k(n.month)]);return{today:n,todaysQuote:r,dailyLessons:i,monthQuotes:a,remainingLessons:Math.max(0,Re-n.dayOfYear)}},head:()=>({meta:[{title:"365 Ngày cùng Chủ nghĩa Xã hội Khoa học"},{name:"description",content:"Hành trình 365 ngày giải mã Chủ nghĩa Xã hội Khoa học — từ Tuyên ngôn của Đảng Cộng sản đến đời sống hôm nay."},{property:"og:title",content:"365 Ngày cùng Chủ nghĩa Xã hội Khoa học"},{property:"og:description",content:"Mỗi ngày một bài học, mỗi tháng một chủ đề. Hành trình một năm cùng tư tưởng đã thay đổi thế giới."}]})});function P(){return e.jsx("svg",{viewBox:"0 0 620 760",fill:"none",xmlns:"http://www.w3.org/2000/svg","aria-hidden":!0,children:e.jsxs("g",{stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"7",vectorEffect:"non-scaling-stroke",children:[e.jsx("path",{d:"M154 322c-34-3-57-24-55-58 2-30 29-44 46-61 20-20 14-50 34-70 17-17 42-10 66-24 24-14 31-42 66-47 38-5 53 25 87 27 33 3 67-8 93 14 19 16 7 35 31 40 45 8 75 33 74 78 0 35 18 47 52 62 35 17 56 48 45 86-9 31-41 33-61 13-14-15-29-8-23 16 7 28 42 30 55 55 13 25-10 44-38 35-24-8-35 5-26 30 8 22-6 42-31 33"}),e.jsx("path",{d:"M229 346c-35 18-59 44-65 79-8 47 23 79 62 62 22-10 35-35 62-43 24-7 43 5 54 26"}),e.jsx("path",{d:"M383 354c36 24 56 58 55 95-1 39-26 55-58 42-26-11-38-38-69-48-25-9-45 4-57 24"}),e.jsx("path",{d:"M249 153c39-11 69 7 103 6 63-2 111-18 161 18 43 31 34 81 24 124-6 25-12 45 8 67 18 20 12 42-9 61"}),e.jsx("path",{d:"M249 153c-37 18-56 49-58 91-2 33 3 69-14 98-15 26-47 32-60 60"}),e.jsx("path",{d:"M194 301c12-23 37-37 65-35 27 2 49 17 65 38"}),e.jsx("path",{d:"M366 300c23-20 50-29 80-23 31 7 56 25 72 52"}),e.jsx("path",{d:"M202 323c30-16 63-17 94 1"}),e.jsx("path",{d:"M378 327c34-13 66-9 96 12"}),e.jsx("path",{d:"M245 323c-8 17-4 34 13 36 17 1 27-14 21-29-5-14-24-15-34-7Z"}),e.jsx("path",{d:"M416 330c-9 17-4 33 13 35 17 2 27-13 22-28-5-15-24-16-35-7Z"}),e.jsx("path",{d:"M330 338c-8 36-17 70-26 102-5 17 6 28 22 20"}),e.jsx("path",{d:"M327 461c23 18 51 19 74 3"}),e.jsx("path",{d:"M204 469c43-42 96-55 148-25 30 17 52 47 89 56 31 8 60 1 87-20"}),e.jsx("path",{d:"M194 493c22 45 31 83 77 102 42 18 90 10 127 39 31 24 32 62 4 85"}),e.jsx("path",{d:"M515 484c-9 53-25 105-68 132-46 29-93 4-132-17-40-21-77-33-112-7-27 21-33 62-10 94"}),e.jsx("path",{d:"M199 551c-50 13-83 39-98 82-16 45 0 95 26 133"}),e.jsx("path",{d:"M512 557c55 10 101 35 131 75 32 43 35 92 13 134"}),e.jsx("path",{d:"M150 626c24 14 49 17 76 6"}),e.jsx("path",{d:"M481 629c41 13 80 11 117-8"}),e.jsx("path",{d:"M214 626c-32 49-42 101-30 156"}),e.jsx("path",{d:"M474 617c-11 52-35 99-72 139"})]})})}const N=[{n:1,title:"Sự ra đời",sub:"Bối cảnh lịch sử, vai trò của Mác và Ăng-ghen",isPublished:!0},{n:2,title:"Tuyên ngôn",sub:"Cuốn sách đã thay đổi thế giới",isPublished:!0},{n:3,title:"Sứ mệnh Công nhân",sub:"Truyền thống & Hiện đại 4.0",isPublished:!0},{n:4,title:"Sứ mệnh Công nhân II",sub:"Giai cấp tiên tiến trong thời đại số",isPublished:!0},{n:5,title:"Quá độ lên CNXH",sub:"Lý luận nền tảng",isPublished:!0},{n:6,title:"Mô hình Việt Nam",sub:"Con đường đặc thù của một dân tộc",isPublished:!0},{n:7,title:"Dân chủ XHCN",sub:"Nhà nước pháp quyền của nhân dân",isPublished:!0},{n:8,title:"Cơ cấu xã hội",sub:"Giai cấp trong thời kỳ quá độ",isPublished:!0},{n:9,title:"Vấn đề Dân tộc",sub:"Đoàn kết trong đa dạng",isPublished:!0},{n:10,title:"Tôn giáo",sub:"Tự do tín ngưỡng & đời sống tinh thần",isPublished:!0},{n:11,title:"Gia đình",sub:"Bình đẳng giới trong xã hội hiện đại",isPublished:!0},{n:12,title:"Nhìn về tương lai",sub:"Dự báo kinh điển & thực tế hôm nay",isPublished:!0}];function He(t){return N.find(n=>n.n===t)}const M=N.filter(t=>t.isPublished).sort((t,n)=>t.n-n.n),Ve=new Map(M.map((t,n)=>[t.n,{previousChapter:M[n-1]?.n??null,nextChapter:M[n+1]?.n??null}]));function Be(t){return Ve.get(t)??{previousChapter:null,nextChapter:null}}const Ke=2026,$e=["Tháng Một","Tháng Hai","Tháng Ba","Tháng Tư","Tháng Năm","Tháng Sáu","Tháng Bảy","Tháng Tám","Tháng Chín","Tháng Mười","Tháng Mười Một","Tháng Mười Hai"],Fe=["january","february","march","april","may","june","july","august","september","october","november","december"],Xe=["T2","T3","T4","T5","T6","T7","CN"],Ge="/socialism-decoded-daily/calendar-web-qr.png",Ye=["Trịnh Gia Phúc","Nguyễn Hoàng Long","Vũ Quốc Khánh","Phạm Vũ Anh Hưng","Đinh Duy Trọng","Lê Ánh Ngọc","Nguyễn Việt Anh","Ngô Yến Dương","Phạm Duy Hưng"],Ue=String.raw`
@page {
  size: 206mm 156mm;
  margin: 0;
}

.print-calendar-root {
  --font-display-print: "Playfair Display", "Cormorant Garamond", Georgia, serif;
  --font-title-print: Georgia, "Times New Roman", serif;
  --font-sans-print: "Inter", system-ui, sans-serif;
  --cal-cream: oklch(0.965 0.012 75);
  --cal-paper: oklch(0.98 0.008 75);
  --cal-ink: oklch(0.18 0.02 30);
  --cal-muted: oklch(0.45 0.02 30);
  --cal-red: oklch(0.46 0.19 27);
  --cal-red-dark: oklch(0.42 0.18 27);
  --cal-gold: oklch(0.72 0.13 75);
  --cal-border: oklch(0.85 0.02 60);
  min-height: 100vh;
  padding: 12mm 0;
  background: oklch(0.92 0.015 75);
  color: var(--cal-ink);
  font-family: var(--font-sans-print);
}

.print-calendar-root *,
.print-calendar-root *::before,
.print-calendar-root *::after {
  box-sizing: border-box;
}

.calendar-sheet {
  position: relative;
  width: 206mm;
  height: 156mm;
  margin: 0 auto 12mm;
  overflow: hidden;
  break-after: page;
  page-break-after: always;
  background:
    radial-gradient(circle at 21% 22%, oklch(0.46 0.19 27 / 0.035) 0, transparent 48%),
    radial-gradient(circle at 76% 72%, oklch(0.72 0.13 75 / 0.05) 0, transparent 52%),
    repeating-linear-gradient(0deg, oklch(0.18 0.02 30 / 0.018) 0 0.18mm, transparent 0.18mm 2.6mm),
    linear-gradient(135deg, var(--cal-paper), var(--cal-cream));
  box-shadow: 0 8mm 22mm oklch(0.18 0.02 30 / 0.18);
}

.calendar-sheet::before {
  content: "";
  position: absolute;
  inset: 0;
  background:
    repeating-linear-gradient(90deg, oklch(0.46 0.19 27 / 0.055) 0 0.35mm, transparent 0.35mm 7mm),
    repeating-linear-gradient(0deg, oklch(1 0 0 / 0.18) 0 0.3mm, transparent 0.3mm 5mm);
  pointer-events: none;
}

.calendar-trim {
  position: absolute;
  inset: 3mm;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  padding: 19mm 12mm 6mm;
  border: 0.32mm solid oklch(0.42 0.18 27 / 0.28);
  background: oklch(0.98 0.008 75 / 0.44);
}

.calendar-trim::before {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  height: 3.2mm;
  background: repeating-linear-gradient(
    90deg,
    var(--cal-red) 0 12mm,
    var(--cal-red-dark) 12mm 24mm
  );
}

.calendar-binding-dots {
  position: absolute;
  top: 6.5mm;
  left: 50%;
  z-index: 4;
  display: flex;
  gap: 4.4mm;
  transform: translateX(-50%);
}

.calendar-binding-dots span {
  width: 2.2mm;
  height: 2.2mm;
  border: 0.35mm solid oklch(0.18 0.02 30 / 0.35);
  border-radius: 999px;
  background: var(--cal-paper);
  box-shadow: inset 0 0.35mm 0.8mm oklch(0.18 0.02 30 / 0.16);
}

.calendar-kicker {
  margin: 0;
  color: var(--cal-red);
  font-size: 3mm;
  font-weight: 700;
  letter-spacing: 0.9mm;
  line-height: 1.2;
  text-transform: uppercase;
}

.calendar-cover-content,
.calendar-cover-map,
.calendar-month-header,
.calendar-month-body,
.calendar-final-layout,
.calendar-page-footer {
  position: relative;
  z-index: 2;
}

.calendar-cover-content {
  max-width: 170mm;
}

.calendar-cover-title {
  margin: 2.4mm 0 0;
  font-family: var(--font-display-print);
  font-weight: 700;
  letter-spacing: 0;
  line-height: 0.76;
}

.calendar-cover-title span {
  display: block;
}

.calendar-cover-title-main {
  color: var(--cal-ink);
  font-size: 20.6mm;
}

.calendar-cover-title-red {
  color: var(--cal-red);
  margin-top: -1mm;
  font-size: 19.4mm;
  font-style: italic;
}

.calendar-cover-title-ink {
  color: var(--cal-ink);
  margin-top: -0.8mm;
  font-size: 16.6mm;
}

.calendar-cover-lead {
  width: 96mm;
  margin: 5.2mm 0 0;
  color: var(--cal-muted);
  font-size: 3.6mm;
  line-height: 1.45;
}

.calendar-cover-map {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 1mm;
  margin-top: auto;
  padding-top: 4mm;
}

.calendar-cover-map-item {
  min-height: 10.2mm;
  padding: 1.4mm 1.6mm;
  border-top: 0.28mm solid oklch(0.42 0.18 27 / 0.34);
  background: oklch(1 0 0 / 0.18);
}

.calendar-cover-map-item span {
  display: block;
  color: var(--cal-red);
  font-family: var(--font-display-print);
  font-size: 4.3mm;
  font-weight: 700;
  letter-spacing: 0;
  line-height: 1;
}

.calendar-cover-map-item strong {
  display: block;
  margin-top: 0.9mm;
  font-size: 2.1mm;
  font-weight: 700;
  letter-spacing: 0;
  line-height: 1.15;
}

.calendar-cover-portrait {
  position: absolute;
  top: -1mm;
  right: -24mm;
  z-index: 1;
  width: 137mm;
  color: var(--cal-red);
  opacity: 0.22;
  transform: rotate(-2deg);
}

.calendar-cover-star {
  position: absolute;
  right: 24mm;
  bottom: 26mm;
  z-index: 1;
  width: 23mm;
  color: var(--cal-gold);
  opacity: 0.34;
}

.calendar-cover-star svg,
.calendar-quote-panel svg {
  width: 100%;
  height: auto;
}

.calendar-month-header {
  display: grid;
  grid-template-columns: 36mm 1fr;
  gap: 5.5mm;
  align-items: center;
}

.calendar-month-number {
  color: var(--cal-red);
  font-family: var(--font-display-print);
  font-size: 26mm;
  font-weight: 700;
  letter-spacing: 0;
  line-height: 0.8;
}

.calendar-month-title {
  max-width: 106mm;
  margin: 2mm 0 0;
  font-family: var(--font-sans-print);
  font-size: 8.2mm;
  font-weight: 800;
  letter-spacing: -0.16mm;
  line-height: 1;
  text-wrap: balance;
  word-spacing: 0;
}

.calendar-month-title-tight {
  max-width: 94mm;
  letter-spacing: -0.2mm;
  word-spacing: -0.25mm;
}

.calendar-month-header p:last-child {
  max-width: 96mm;
  margin: 3mm 0 0;
  color: var(--cal-muted);
  font-size: 3.2mm;
  line-height: 1.35;
}

.calendar-month-body {
  display: grid;
  flex: 1;
  grid-template-columns: 100mm 1fr;
  gap: 6mm;
  min-height: 0;
  margin-top: 6mm;
}

.calendar-grid-panel {
  padding: 4mm;
  border: 0.35mm solid oklch(0.42 0.18 27 / 0.28);
  background: oklch(1 0 0 / 0.22);
}

.calendar-weekdays {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 1.2mm;
  margin-bottom: 2mm;
  color: var(--cal-red);
  font-size: 2.45mm;
  font-weight: 700;
  letter-spacing: 0.45mm;
  line-height: 1;
  text-align: center;
}

.calendar-date-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: repeat(6, 1fr);
  gap: 1.2mm;
  height: 61mm;
}

.calendar-date-cell {
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  min-width: 0;
  min-height: 0;
  padding: 1.2mm;
  border: 0.25mm solid oklch(0.18 0.02 30 / 0.13);
  background: oklch(0.98 0.008 75 / 0.64);
  color: var(--cal-ink);
  font-family: var(--font-display-print);
  font-size: 4.2mm;
  font-weight: 700;
  letter-spacing: 0;
  line-height: 1;
}

.calendar-date-cell-weekend {
  color: var(--cal-red);
  background: oklch(0.46 0.19 27 / 0.075);
}

.calendar-date-cell-highlight {
  border-color: var(--cal-red);
  background: var(--cal-red);
  color: var(--cal-paper);
}

.calendar-date-cell-empty {
  border-color: transparent;
  background: transparent;
}

.calendar-quote-panel {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 5.4mm;
  background: var(--cal-ink);
  color: var(--cal-paper);
}

.calendar-quote-panel svg {
  width: 7mm;
  margin-bottom: auto;
  color: var(--cal-gold);
}

.calendar-quote-date {
  margin: 0 0 3mm;
  color: var(--cal-gold);
  font-size: 2.7mm;
  font-weight: 700;
  letter-spacing: 0.65mm;
  line-height: 1.2;
  text-transform: uppercase;
}

.calendar-quote-panel blockquote {
  margin: 0;
  font-family: var(--font-sans-print);
  font-size: 4.15mm;
  font-weight: 700;
  letter-spacing: 0;
  line-height: 1.28;
  word-break: keep-all;
  overflow-wrap: normal;
  hyphens: none;
}

.calendar-quote-panel blockquote.calendar-quote-medium {
  font-size: 3.85mm;
}

.calendar-quote-panel blockquote.calendar-quote-long {
  font-size: 3.55mm;
  line-height: 1.3;
}

.calendar-quote-source {
  margin: 4mm 0 0;
  color: oklch(0.965 0.012 75 / 0.72);
  font-size: 3mm;
  line-height: 1.35;
}

.calendar-month-portrait {
  position: absolute;
  right: -15mm;
  bottom: -24mm;
  z-index: 1;
  width: 78mm;
  color: var(--cal-red);
  opacity: 0.07;
  transform: rotate(-2deg);
}

.calendar-final-layout {
  display: grid;
  flex: 1;
  grid-template-columns: 74mm 1fr;
  gap: 10mm;
  align-items: center;
  min-height: 0;
}

.calendar-final-qr-panel {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 6mm;
  border: 0.35mm solid oklch(0.42 0.18 27 / 0.28);
  background: oklch(1 0 0 / 0.72);
}

.calendar-final-qr-panel img {
  width: 61mm;
  height: 61mm;
  object-fit: contain;
  image-rendering: pixelated;
}

.calendar-final-qr-caption {
  margin: 4mm 0 0;
  color: var(--cal-red);
  font-size: 2.8mm;
  font-weight: 800;
  letter-spacing: 0.65mm;
  line-height: 1.25;
  text-align: center;
  text-transform: uppercase;
}

.calendar-final-content {
  align-self: stretch;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.calendar-final-content h2 {
  max-width: 92mm;
  margin: 3mm 0 0;
  color: var(--cal-ink);
  font-family: var(--font-display-print);
  font-size: 11mm;
  font-weight: 700;
  letter-spacing: 0;
  line-height: 0.95;
}

.calendar-final-content h2 span {
  color: var(--cal-red);
  font-style: italic;
}

.calendar-final-copy {
  max-width: 78mm;
  margin: 4mm 0 0;
  color: var(--cal-muted);
  font-size: 3.25mm;
  line-height: 1.45;
}

.calendar-member-panel {
  margin-top: 7mm;
  padding-left: 5mm;
  border-left: 0.7mm solid var(--cal-red);
}

.calendar-member-panel h3 {
  margin: 0;
  color: var(--cal-red);
  font-size: 2.8mm;
  font-weight: 800;
  letter-spacing: 0.75mm;
  line-height: 1.2;
  text-transform: uppercase;
}

.calendar-member-panel ul {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 2mm 5mm;
  margin: 3.5mm 0 0;
  padding: 0;
  list-style: none;
  color: var(--cal-ink);
  font-size: 3.05mm;
  font-weight: 700;
  line-height: 1.2;
}

.calendar-final-portrait {
  position: absolute;
  right: -21mm;
  bottom: -32mm;
  z-index: 1;
  width: 91mm;
  color: var(--cal-red);
  opacity: 0.1;
  transform: rotate(-2deg);
}

.calendar-page-footer {
  display: flex;
  justify-content: space-between;
  gap: 8mm;
  margin-top: 3.5mm;
  padding-top: 2.4mm;
  border-top: 0.3mm solid oklch(0.42 0.18 27 / 0.22);
  color: var(--cal-muted);
  font-size: 2.6mm;
  font-weight: 700;
  letter-spacing: 0.65mm;
  line-height: 1.2;
  text-transform: uppercase;
}

.calendar-sheet:last-child {
  break-after: auto;
  page-break-after: auto;
}

@media print {
  html,
  body,
  #root {
    width: 206mm;
    min-width: 206mm;
    margin: 0;
    background: var(--cal-cream);
  }

  .print-calendar-root {
    min-height: 0;
    padding: 0;
    background: transparent;
  }

  .calendar-sheet {
    margin: 0;
    box-shadow: none;
  }
}
`,X=T("/print/calendar-2026")({loader:async()=>{const t=await Promise.all(N.map(n=>k(n.n)));return{year:Ke,months:N.map((n,r)=>{const i=t[r]??[];return{chapter:n,fileName:Fe[r]??`month-${String(n.n).padStart(2,"0")}`,highlight:at(i),quotes:i}})}},head:()=>({meta:[{title:"Lịch để bàn 2026 | 365 Ngày cùng Chủ nghĩa Xã hội Khoa học"},{name:"description",content:"Bộ lịch để bàn in ấn theo chủ đề 365 Ngày cùng Chủ nghĩa Xã hội Khoa học."}]}),component:We});function We(){const{months:t,year:n}=X.useLoaderData();return e.jsxs("main",{className:"print-calendar-root","aria-label":"Lịch để bàn 2026",children:[e.jsx("style",{children:Ue}),e.jsx(Je,{months:t,year:n}),t.map(r=>e.jsx(Ze,{month:r,year:n},r.chapter.n)),e.jsx(et,{year:n})]})}function Je({months:t,year:n}){return e.jsx("section",{className:"calendar-sheet calendar-cover-sheet","data-page-name":"cover",children:e.jsxs("div",{className:"calendar-trim",children:[e.jsx(R,{}),e.jsx("div",{className:"calendar-cover-portrait","aria-hidden":!0,children:e.jsx(P,{})}),e.jsx("div",{className:"calendar-cover-star","aria-hidden":!0,children:e.jsx(G,{})}),e.jsxs("div",{className:"calendar-cover-content",children:[e.jsxs("p",{className:"calendar-kicker",children:["Niên giám ",n]}),e.jsxs("h1",{className:"calendar-cover-title",children:[e.jsx("span",{className:"calendar-cover-title-main",children:"365 ngày cùng"}),e.jsx("span",{className:"calendar-cover-title-red",children:"Chủ nghĩa"}),e.jsx("span",{className:"calendar-cover-title-ink",children:"Xã hội Khoa học"})]}),e.jsx("p",{className:"calendar-cover-lead",children:"Mỗi ngày một bài học. Mỗi tháng một chủ đề. Một năm để đọc, ghi nhớ và suy ngẫm."})]}),e.jsx("div",{className:"calendar-cover-map","aria-label":"Bản đồ 12 chương",children:t.map(r=>e.jsxs("div",{className:"calendar-cover-map-item",children:[e.jsx("span",{children:String(r.chapter.n).padStart(2,"0")}),e.jsx("strong",{children:r.chapter.title})]},r.chapter.n))}),e.jsxs("footer",{className:"calendar-page-footer",children:[e.jsx("span",{children:"365 ngày, một ý tưởng"}),e.jsx("span",{children:"MLN131 · Group 4"})]})]})})}function Ze({month:t,year:n}){const r=tt(n,t.chapter.n),i=$e[t.chapter.n-1];return e.jsx("section",{className:"calendar-sheet calendar-month-sheet","data-page-name":t.fileName,"aria-label":`${i} ${n}`,children:e.jsxs("div",{className:"calendar-trim",children:[e.jsx(R,{}),e.jsx("div",{className:"calendar-month-portrait","aria-hidden":!0,children:e.jsx(P,{})}),e.jsxs("header",{className:"calendar-month-header",children:[e.jsx("div",{className:"calendar-month-number",children:String(t.chapter.n).padStart(2,"0")}),e.jsxs("div",{children:[e.jsxs("p",{className:"calendar-kicker",children:[i," · Chương ",String(t.chapter.n).padStart(2,"0")]}),e.jsx("h2",{className:`calendar-month-title ${rt(t.chapter.n)}`,children:t.chapter.title}),e.jsx("p",{children:t.chapter.sub})]})]}),e.jsxs("div",{className:"calendar-month-body",children:[e.jsxs("div",{className:"calendar-grid-panel",children:[e.jsx("div",{className:"calendar-weekdays","aria-hidden":!0,children:Xe.map(a=>e.jsx("span",{children:a},a))}),e.jsx("div",{className:"calendar-date-grid",children:r.map((a,o)=>e.jsx("div",{className:["calendar-date-cell",a.day===null&&"calendar-date-cell-empty",a.isWeekend&&"calendar-date-cell-weekend",a.day===t.highlight?.day&&"calendar-date-cell-highlight"].filter(Boolean).join(" "),children:a.day&&e.jsx("span",{children:a.day})},`${t.chapter.n}-${o}`))})]}),e.jsxs("aside",{className:"calendar-quote-panel",children:[e.jsx(G,{}),t.highlight?e.jsxs(e.Fragment,{children:[e.jsxs("p",{className:"calendar-quote-date",children:["Ngày ",String(t.highlight.day).padStart(2,"0")," /"," ",String(t.highlight.month).padStart(2,"0")]}),e.jsxs("blockquote",{className:nt(t.highlight.quote),children:["“",t.highlight.quote,"”"]}),e.jsxs("p",{className:"calendar-quote-source",children:[t.highlight.author," · ",t.highlight.context]})]}):e.jsxs(e.Fragment,{children:[e.jsx("p",{className:"calendar-quote-date",children:"Nội dung"}),e.jsx("blockquote",{children:"“Nội dung tháng này đang được cập nhật.”"}),e.jsxs("p",{className:"calendar-quote-source",children:[t.quotes.length," bài học"]})]})]})]}),e.jsxs("footer",{className:"calendar-page-footer",children:[e.jsx("span",{children:"365 ngày, một ý tưởng"}),e.jsx("span",{children:n})]})]})})}function et({year:t}){return e.jsx("section",{className:"calendar-sheet calendar-final-sheet","data-page-name":"qr-members",children:e.jsxs("div",{className:"calendar-trim",children:[e.jsx(R,{}),e.jsx("div",{className:"calendar-final-portrait","aria-hidden":!0,children:e.jsx(P,{})}),e.jsxs("div",{className:"calendar-final-layout",children:[e.jsxs("div",{className:"calendar-final-qr-panel",children:[e.jsx("img",{src:Ge,alt:"QR dẫn đến website 365 Ngày cùng Chủ nghĩa Xã hội Khoa học"}),e.jsx("p",{className:"calendar-final-qr-caption",children:"Quét QR để đọc online"})]}),e.jsxs("div",{className:"calendar-final-content",children:[e.jsx("p",{className:"calendar-kicker",children:"Website dự án"}),e.jsxs("h2",{children:["365 ngày cùng ",e.jsx("span",{children:"Chủ nghĩa"})," Xã hội Khoa học"]}),e.jsxs("p",{className:"calendar-final-copy",children:["Cảm ơn bạn đã đồng hành cùng niên giám ",t,". Quét mã để mở phiên bản web, đọc các chương và tiếp tục hành trình mỗi ngày một ý tưởng."]}),e.jsxs("div",{className:"calendar-member-panel",children:[e.jsx("h3",{children:"Thành viên Group 4"}),e.jsx("ul",{children:Ye.map(n=>e.jsx("li",{children:n},n))})]})]})]}),e.jsxs("footer",{className:"calendar-page-footer",children:[e.jsx("span",{children:"365 ngày, một ý tưởng"}),e.jsx("span",{children:"MLN131 · Group 4"})]})]})})}function tt(t,n){const i=(new Date(t,n-1,1).getDay()+6)%7,a=new Date(t,n,0).getDate(),o=[];for(let s=0;s<i;s+=1)o.push({day:null,isWeekend:!1});for(let s=1;s<=a;s+=1){const l=new Date(t,n-1,s).getDay();o.push({day:s,isWeekend:l===0||l===6})}for(;o.length<42;)o.push({day:null,isWeekend:!1});return o}function nt(t){if(t.length>=105)return"calendar-quote-long";if(t.length>=78)return"calendar-quote-medium"}function rt(t){return t===8||t===9?"calendar-month-title-tight":""}function at(t){return t.length===0?null:t.filter(n=>n.quote.length<=82).sort((n,r)=>r.quote.length-n.quote.length)[0]??[...t].sort((n,r)=>n.quote.length-r.quote.length)[0]??null}function R(){return e.jsx("div",{className:"calendar-binding-dots","aria-hidden":!0,children:Array.from({length:14},(t,n)=>e.jsx("span",{},n))})}function G(){return e.jsx("svg",{viewBox:"0 0 24 24",fill:"currentColor","aria-hidden":!0,children:e.jsx("path",{d:"M12 2l2.39 7.36H22l-6.18 4.49L18.21 22 12 17.27 5.79 22l2.39-8.15L2 9.36h7.61L12 2z"})})}const it=T("/chuong/$chapter")({loader:async({params:t})=>{const n=Number(t.chapter),r=He(n);if(!r||!r.isPublished)throw ce();return{chapter:r,navigation:Be(n),quotes:await k(n)}},head:({loaderData:t})=>({meta:[{title:t?`Chương ${t.chapter.n}: ${t.chapter.title} | 365 Ngày`:"365 Ngày cùng Chủ nghĩa Xã hội Khoa học"},{name:"description",content:t?.chapter.sub??"Hành trình 365 ngày giải mã Chủ nghĩa Xã hội Khoa học."}]})}),ot=Qe.update({id:"/",path:"/",getParentRoute:()=>b}).lazy(()=>u(()=>import("./index.lazy-Bwt3t5fY.js"),__vite__mapDeps([0,1,2,3,4,5])).then(t=>t.Route)),st=X.update({id:"/print/calendar-2026",path:"/print/calendar-2026",getParentRoute:()=>b}),ct=it.update({id:"/chuong/$chapter",path:"/chuong/$chapter",getParentRoute:()=>b}).lazy(()=>u(()=>import("./_chapter.lazy-ivqoaRj8.js"),__vite__mapDeps([6,1,2,3,4])).then(t=>t.Route)),lt={IndexRoute:ot,ChuongChapterRoute:ct,PrintCalendar2026Route:st},dt=b._addFileChildren(lt)._addFileTypes(),mt="/socialism-decoded-daily/".replace(/\/$/,"")||"/",ht=()=>{const t=new le;return de({routeTree:dt,basepath:mt,context:{queryClient:t},scrollRestoration:!0,defaultPreloadStaleTime:0})},ut=ht();ee.createRoot(document.getElementById("root")).render(e.jsx(te.StrictMode,{children:e.jsx(me,{router:ut})}));export{P as M,u as _,k as a,K as b,N as c,bt as g};
