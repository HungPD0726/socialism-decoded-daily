const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/month01-DWfdc6ed.js","assets/createMonthQuotes-BF9I6e90.js","assets/month02-QV02r7uS.js","assets/month03-DJywo9Gb.js","assets/month04-CaPWUiur.js","assets/month05-BwzK0h21.js","assets/month06-BDRdB11Z.js","assets/month07-wP4CE2ty.js","assets/month08-uDPd5Xb_.js","assets/month09-D4-1xQhb.js","assets/month10-BjpPbWkU.js","assets/month11-BsCy6czh.js","assets/month12-DabnjnQr.js","assets/index.lazy-C0Qh448S.js","assets/vendor-react-BBDuoyTM.js","assets/vendor-tanstack-BW9ZDqTq.js","assets/vendor-misc-DSAvrGk5.js","assets/vendor-lucide-D0vNg2AR.js","assets/AppShell-CEE8JSBT.js","assets/vendor-radix-T5KSg79d.js","assets/index.lazy-Bx2DGk0x.js","assets/quizQuestions-tvcw-FtH.js","assets/index.lazy-BI3E3B3-.js","assets/_chapter.lazy-CmzdQQxt.js","assets/_chapter.lazy-BFReqMzU.js","assets/_chapter.lazy-BF1mdOLI.js","assets/_chapter.lazy-w2o53esx.js"])))=>i.map(i=>d[i]);
import{r as d,j as t,e as ie,R as oe}from"./vendor-react-BBDuoyTM.js";import{c as se,u as ce,L as le,a as de,Q as he,O as me,b as x,n as P,d as ue,e as pe,R as ge}from"./vendor-tanstack-BW9ZDqTq.js";import{S as fe}from"./vendor-radix-T5KSg79d.js";import{t as xe,c as ye,a as be}from"./vendor-misc-DSAvrGk5.js";import{S as ve,T as je,X as O,L as Q,a as Ne,M as we}from"./vendor-lucide-D0vNg2AR.js";(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const o of r)if(o.type==="childList")for(const s of o.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&i(s)}).observe(document,{childList:!0,subtree:!0});function a(r){const o={};return r.integrity&&(o.integrity=r.integrity),r.referrerPolicy&&(o.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?o.credentials="include":r.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(r){if(r.ep)return;r.ep=!0;const o=a(r);fetch(r.href,o)}})();const _e="modulepreload",ke=function(e){return"/socialism-decoded-daily/"+e},X={},l=function(n,a,i){let r=Promise.resolve();if(a&&a.length>0){let _=function(m){return Promise.all(m.map(u=>Promise.resolve(u).then(f=>({status:"fulfilled",value:f}),f=>({status:"rejected",reason:f}))))};document.getElementsByTagName("link");const s=document.querySelector("meta[property=csp-nonce]"),h=s?.nonce||s?.getAttribute("nonce");r=_(a.map(m=>{if(m=ke(m),m in X)return;X[m]=!0;const u=m.endsWith(".css"),f=u?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${m}"]${f}`))return;const p=document.createElement("link");if(p.rel=u?"stylesheet":_e,u||(p.as="script"),p.crossOrigin="",p.href=m,h&&p.setAttribute("nonce",h),document.head.appendChild(p),u)return new Promise((k,C)=>{p.addEventListener("load",k),p.addEventListener("error",()=>C(new Error(`Unable to preload CSS for ${m}`)))})}))}function o(s){const h=new Event("vite:preloadError",{cancelable:!0});if(h.payload=s,window.dispatchEvent(h),!h.defaultPrevented)throw s}return r.then(s=>{for(const h of s||[])h.status==="rejected"&&o(h.reason);return n().catch(o)})};function G(...e){return xe(ye(e))}const Ce=be("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",{variants:{variant:{default:"bg-primary text-primary-foreground shadow hover:bg-primary/90",destructive:"bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",outline:"border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",secondary:"bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",ghost:"hover:bg-accent hover:text-accent-foreground",link:"text-primary underline-offset-4 hover:underline"},size:{default:"h-9 px-4 py-2",sm:"h-8 rounded-md px-3 text-xs",lg:"h-10 rounded-md px-8",icon:"h-9 w-9"}},defaultVariants:{variant:"default",size:"default"}}),N=d.forwardRef(({className:e,variant:n,size:a,asChild:i=!1,...r},o)=>{const s=i?fe:"button";return t.jsx(s,{className:G(Ce({variant:n,size:a,className:e})),ref:o,...r})});N.displayName="Button";const F=d.forwardRef(({className:e,...n},a)=>t.jsx("textarea",{className:G("flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",e),ref:a,...n}));F.displayName="Textarea";const E="groq-chatbot-history",y=12,K=1200,Me="/api/chat".trim()||"/api/chat";function $(e,n){return{id:`${Date.now()}-${Math.random().toString(36).slice(2)}`,role:e,content:n}}function Re(){try{const e=sessionStorage.getItem(E);if(!e)return[];const n=JSON.parse(e);return Array.isArray(n)?n.filter(a=>a&&typeof a=="object"&&(a.role==="user"||a.role==="assistant")&&typeof a.content=="string"&&typeof a.id=="string").slice(-y):[]}catch{return[]}}function Ee(){const e=window.location.pathname,n=e.match(/\/chuong\/(\d{1,2})/),a=n?Number(n[1]):void 0,i=new Date;return a&&a>=1&&a<=12?{path:e,month:a}:{path:e,month:i.getMonth()+1,day:i.getDate()}}function Pe(){const[e,n]=d.useState(!1),[a,i]=d.useState(!1),[r,o]=d.useState([]),[s,h]=d.useState(""),[_,m]=d.useState(null),[u,f]=d.useState(!1),p=d.useRef(null),k=d.useRef(null),C=r.length>0,D=K-s.length,ee=d.useMemo(()=>r.slice(-y).map(c=>({role:c.role,content:c.content})),[r]);d.useEffect(()=>{o(Re()),i(!0)},[]),d.useEffect(()=>{a&&sessionStorage.setItem(E,JSON.stringify(r.slice(-y)))},[a,r]),d.useEffect(()=>{if(!e)return;const c=window.requestAnimationFrame(()=>{p.current?.scrollTo({top:p.current.scrollHeight,behavior:"smooth"}),k.current?.focus()});return()=>window.cancelAnimationFrame(c)},[e,r,u]);const te=()=>{o([]),m(null),h(""),sessionStorage.removeItem(E)},L=async c=>{c?.preventDefault();const I=s.trim();if(!I||u)return;const M=$("user",I),ae=[...r,M].slice(-y);o(ae),h(""),m(null),f(!0);try{const j=await fetch(Me,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({messages:[...ee,{role:M.role,content:M.content}].slice(-y),routeContext:Ee()})}),H=await j.json().catch(()=>({}));if(!j.ok)throw new Error(H.error||"Chatbot chưa thể trả lời lúc này.");const A=H.message?.content?.trim();if(!A)throw new Error("Chatbot không trả về nội dung.");o(re=>[...re,$("assistant",A)].slice(-y))}catch(j){m(j instanceof Error?j.message:"Không thể kết nối tới chatbot. Hãy thử lại sau.")}finally{f(!1)}},ne=c=>{c.key!=="Enter"||c.shiftKey||(c.preventDefault(),L())};return t.jsxs("div",{className:"fixed bottom-4 right-4 z-50 sm:bottom-6 sm:right-6",children:[e&&t.jsxs("section",{className:"mb-3 flex h-[min(680px,calc(100vh-7rem))] w-[calc(100vw-2rem)] max-w-md flex-col overflow-hidden rounded-md border-2 border-primary/30 bg-background shadow-2xl","aria-label":"Chatbot gia sư CNXHKH",children:[t.jsx("div",{className:"banner-stripes h-1.5 shrink-0"}),t.jsxs("header",{className:"flex shrink-0 items-center justify-between border-b border-border px-4 py-3",children:[t.jsxs("div",{className:"flex min-w-0 items-center gap-3",children:[t.jsx("span",{className:"flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground",children:t.jsx(ve,{className:"h-4 w-4","aria-hidden":!0})}),t.jsxs("div",{className:"min-w-0",children:[t.jsx("h2",{className:"truncate text-sm font-semibold",children:"Gia sư CNXHKH"}),t.jsx("p",{className:"truncate text-xs text-muted-foreground",children:"Groq Llama 3.3 70B"})]})]}),t.jsxs("div",{className:"flex items-center gap-1",children:[t.jsxs(N,{type:"button",variant:"ghost",size:"icon",onClick:te,disabled:!C||u,title:"Xóa hội thoại",children:[t.jsx(je,{className:"h-4 w-4","aria-hidden":!0}),t.jsx("span",{className:"sr-only",children:"Xóa hội thoại"})]}),t.jsxs(N,{type:"button",variant:"ghost",size:"icon",onClick:()=>n(!1),title:"Đóng chatbot",children:[t.jsx(O,{className:"h-4 w-4","aria-hidden":!0}),t.jsx("span",{className:"sr-only",children:"Đóng chatbot"})]})]})]}),t.jsxs("div",{ref:p,className:"flex-1 space-y-3 overflow-y-auto px-4 py-4",children:[!C&&t.jsx("div",{className:"rounded-md border border-border bg-secondary/45 p-4 text-sm leading-relaxed text-muted-foreground",children:"Hỏi về bài học hôm nay, một chủ đề, hoặc một trích dẫn trong dự án."}),r.map(c=>t.jsx("div",{className:["flex",c.role==="user"?"justify-end":"justify-start"].join(" "),children:t.jsx("div",{className:["max-w-[85%] whitespace-pre-wrap rounded-md px-3 py-2 text-sm leading-relaxed",c.role==="user"?"bg-primary text-primary-foreground":"border border-border bg-card text-card-foreground"].join(" "),children:c.content})},c.id)),u&&t.jsx("div",{className:"flex justify-start",children:t.jsxs("div",{className:"inline-flex items-center gap-2 rounded-md border border-border bg-card px-3 py-2 text-sm text-muted-foreground",children:[t.jsx(Q,{className:"h-4 w-4 animate-spin","aria-hidden":!0}),"Đang suy nghĩ"]})})]}),_&&t.jsx("div",{className:"mx-4 mb-3 rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive",children:_}),t.jsxs("form",{onSubmit:L,className:"shrink-0 border-t border-border p-4",children:[t.jsx(F,{ref:k,value:s,onChange:c=>h(c.target.value.slice(0,K)),onKeyDown:ne,placeholder:"Nhập câu hỏi...",rows:3,disabled:u,className:"max-h-32 min-h-20 resize-none"}),t.jsxs("div",{className:"mt-3 flex items-center justify-between gap-3",children:[t.jsx("span",{className:["text-xs",D<120?"text-destructive":"text-muted-foreground"].join(" "),children:D}),t.jsxs(N,{type:"submit",disabled:!s.trim()||u,children:[u?t.jsx(Q,{className:"h-4 w-4 animate-spin","aria-hidden":!0}):t.jsx(Ne,{className:"h-4 w-4","aria-hidden":!0}),"Gửi"]})]})]})]}),t.jsx(N,{type:"button",size:"icon",onClick:()=>n(c=>!c),className:"h-12 w-12 rounded-full shadow-xl","aria-expanded":e,"aria-label":e?"Đóng chatbot":"Mở chatbot",children:e?t.jsx(O,{className:"h-5 w-5","aria-hidden":!0}):t.jsx(we,{className:"h-5 w-5","aria-hidden":!0})})]})}function Te(e,n={}){typeof window>"u"||window.__lovableEvents?.captureException?.(e,{source:"react_error_boundary",route:window.location.pathname,...n},{mechanism:"react_error_boundary",handled:!1,severity:"error"})}function qe(){return t.jsx("div",{className:"flex min-h-screen items-center justify-center bg-background px-4",children:t.jsxs("div",{className:"max-w-md text-center",children:[t.jsx("h1",{className:"text-7xl font-bold text-foreground",children:"404"}),t.jsx("h2",{className:"mt-4 text-xl font-semibold text-foreground",children:"Không tìm thấy trang"}),t.jsx("p",{className:"mt-2 text-sm text-muted-foreground",children:"Trang bạn tìm kiếm không tồn tại hoặc đã được di chuyển."}),t.jsx("div",{className:"mt-6",children:t.jsx(le,{to:"/",className:"inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",children:"Về trang chủ"})})]})})}function Se({error:e,reset:n}){console.error(e);const a=ce();return d.useEffect(()=>{Te(e,{boundary:"tanstack_root_error_component"})},[e]),t.jsx("div",{className:"flex min-h-screen items-center justify-center bg-background px-4",children:t.jsxs("div",{className:"max-w-md text-center",children:[t.jsx("h1",{className:"text-xl font-semibold tracking-tight text-foreground",children:"Trang không thể tải"}),t.jsx("p",{className:"mt-2 text-sm text-muted-foreground",children:"Có lỗi xảy ra. Bạn có thể thử làm mới trang hoặc quay về trang chủ."}),t.jsxs("div",{className:"mt-6 flex flex-wrap justify-center gap-2",children:[t.jsx("button",{onClick:()=>{a.invalidate(),n()},className:"inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",children:"Thử lại"}),t.jsx("a",{href:"./",className:"inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",children:"Về trang chủ"})]})]})})}const g=se()({component:ze,notFoundComponent:qe,errorComponent:Se});function ze(){const{queryClient:e}=g.useRouteContext(),n=de({select:i=>i.location.pathname}),a=!n.includes("/print/")&&!n.startsWith("/quiz/")&&!n.startsWith("/mindmap/");return t.jsxs(he,{client:e,children:[t.jsx(me,{}),a&&t.jsx(Pe,{})]})}const De=365,Le=[31,28,31,30,31,30,31,31,30,31,30,31],Ie={1:()=>l(()=>import("./month01-DWfdc6ed.js"),__vite__mapDeps([0,1])).then(e=>e.month01Quotes),2:()=>l(()=>import("./month02-QV02r7uS.js"),__vite__mapDeps([2,1])).then(e=>e.month02Quotes),3:()=>l(()=>import("./month03-DJywo9Gb.js"),__vite__mapDeps([3,1])).then(e=>e.month03Quotes),4:()=>l(()=>import("./month04-CaPWUiur.js"),__vite__mapDeps([4,1])).then(e=>e.month04Quotes),5:()=>l(()=>import("./month05-BwzK0h21.js"),__vite__mapDeps([5,1])).then(e=>e.month05Quotes),6:()=>l(()=>import("./month06-BDRdB11Z.js"),__vite__mapDeps([6,1])).then(e=>e.month06Quotes),7:()=>l(()=>import("./month07-wP4CE2ty.js"),__vite__mapDeps([7,1])).then(e=>e.month07Quotes),8:()=>l(()=>import("./month08-uDPd5Xb_.js"),__vite__mapDeps([8,1])).then(e=>e.month08Quotes),9:()=>l(()=>import("./month09-D4-1xQhb.js"),__vite__mapDeps([9,1])).then(e=>e.month09Quotes),10:()=>l(()=>import("./month10-BjpPbWkU.js"),__vite__mapDeps([10,1])).then(e=>e.month10Quotes),11:()=>l(()=>import("./month11-BsCy6czh.js"),__vite__mapDeps([11,1])).then(e=>e.month11Quotes),12:()=>l(()=>import("./month12-DabnjnQr.js"),__vite__mapDeps([12,1])).then(e=>e.month12Quotes)},V=new Map,B=new Map;function T(e){const n=Math.trunc(e);return n>=1&&n<=12?n:null}function He(e,n){const a=e===2&&Math.trunc(n)===29?28:Math.trunc(n),i=Le[e-1];return a>=1&&a<=i?a:null}function Ae(e){const n=Date.UTC(e.getFullYear(),0,0),a=Date.UTC(e.getFullYear(),e.getMonth(),e.getDate());return Math.floor((a-n)/864e5)}function Oe(e){return{year:e.getFullYear(),month:e.getMonth()+1,day:e.getDate(),dayOfYear:Ae(e)}}async function v(e){const n=T(e);if(n===null)return[];const a=V.get(n);if(a)return a;const i=Ie[n]();return V.set(n,i),i}async function Qe(e){const n=T(e);if(n===null)return new Map;const a=B.get(n);if(a)return a;const i=v(n).then(r=>new Map(r.map(o=>[o.day,o])));return B.set(n,i),i}async function Xe(e,n){const a=T(e);if(a===null)return;const i=He(a,n);return i===null?void 0:(await Qe(a)).get(i)}function qt(e){return new Map(e.map(n=>[n.day,n]))}async function Y(e){return Xe(e.getMonth()+1,e.getDate())}async function Ke(e=new Date,n=3){const a=Array.from({length:Math.max(0,Math.trunc(n))},(r,o)=>{const s=new Date(e);return s.setDate(e.getDate()+o),Y(s)});return(await Promise.all(a)).filter(r=>!!r)}const $e=x("/")({loader:async()=>{const e=new Date,n=Oe(e),[a,i,r]=await Promise.all([Y(e),Ke(e,3),v(n.month)]);return{today:n,todaysQuote:a,dailyLessons:i,monthQuotes:r,remainingLessons:Math.max(0,De-n.dayOfYear)}},head:()=>({meta:[{title:"365 Ngày cùng Chủ nghĩa Xã hội Khoa học"},{name:"description",content:"Hành trình 365 ngày giải mã Chủ nghĩa Xã hội Khoa học theo 12 chủ đề bám giáo trình."},{property:"og:title",content:"365 Ngày cùng Chủ nghĩa Xã hội Khoa học"},{property:"og:description",content:"Mỗi ngày một bài học, mỗi tháng một chủ đề. Hành trình một năm cùng tư tưởng đã thay đổi thế giới."}]})}),b=[{n:1,title:"Nhập môn CNXHKH I",sub:"Sự ra đời, điều kiện kinh tế - xã hội, tiền đề lý luận",isPublished:!0},{n:2,title:"Nhập môn CNXHKH II",sub:"Các giai đoạn phát triển, đối tượng, phương pháp, ý nghĩa học tập",isPublished:!0},{n:3,title:"Giai cấp công nhân I",sub:"Khái niệm, đặc điểm, sứ mệnh lịch sử",isPublished:!0},{n:4,title:"Giai cấp công nhân II",sub:"Giai cấp công nhân hiện nay và ở Việt Nam",isPublished:!0},{n:5,title:"Chủ nghĩa xã hội",sub:"Khái niệm, đặc trưng, điều kiện xây dựng CNXH",isPublished:!0},{n:6,title:"Thời kỳ quá độ",sub:"Lý luận quá độ lên CNXH và quá độ ở Việt Nam",isPublished:!0},{n:7,title:"Dân chủ XHCN",sub:"Bản chất, đặc trưng, xây dựng nền dân chủ XHCN",isPublished:!0},{n:8,title:"Nhà nước XHCN",sub:"Nhà nước XHCN và nhà nước pháp quyền XHCN Việt Nam",isPublished:!0},{n:9,title:"Cơ cấu xã hội - giai cấp",sub:"Cơ cấu xã hội, liên minh giai cấp/tầng lớp",isPublished:!0},{n:10,title:"Vấn đề dân tộc",sub:"Dân tộc trong thời kỳ quá độ lên CNXH",isPublished:!0},{n:11,title:"Vấn đề tôn giáo",sub:"Tôn giáo trong thời kỳ quá độ lên CNXH",isPublished:!0},{n:12,title:"Vấn đề gia đình",sub:"Gia đình trong thời kỳ quá độ lên CNXH",isPublished:!0}];function q(e){return b.find(n=>n.n===e)}const R=b.filter(e=>e.isPublished).sort((e,n)=>e.n-n.n),Ve=new Map(R.map((e,n)=>[e.n,{previousChapter:R[n-1]?.n??null,nextChapter:R[n+1]?.n??null}]));function W(e){return Ve.get(e)??{previousChapter:null,nextChapter:null}}const Be=x("/quiz/")({loader:()=>({chapters:b}),head:()=>({meta:[{title:"Quiz Ôn Tập | 365 Ngày CNXHKH"},{name:"description",content:"Kiểm tra kiến thức Chủ nghĩa Xã hội Khoa học với bộ câu hỏi trắc nghiệm theo từng chủ đề."}]})}),Ge=x("/mindmap/")({loader:()=>({chapters:b}),head:()=>({meta:[{title:"Sơ đồ tư duy | 365 Ngày CNXHKH"},{name:"description",content:"Xem sơ đồ tư duy trực quan cho từng chủ đề Chủ nghĩa Xã hội Khoa học."}]})}),Fe=x("/quiz/$chapter")({loader:async({params:e})=>{const n=Number(e.chapter),a=q(n);if(!a||!a.isPublished)throw P();const i=await v(n);return{chapter:a,quotes:i}},head:({loaderData:e})=>({meta:[{title:e?`Quiz: ${e.chapter.title} | 365 Ngày CNXHKH`:"Quiz Ôn Tập | 365 Ngày CNXHKH"},{name:"description",content:e?.chapter.sub??"Ôn tập trắc nghiệm Chủ nghĩa Xã hội Khoa học."}]})});function S(){return t.jsx("svg",{viewBox:"0 0 620 760",fill:"none",xmlns:"http://www.w3.org/2000/svg","aria-hidden":!0,children:t.jsxs("g",{stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"7",vectorEffect:"non-scaling-stroke",children:[t.jsx("path",{d:"M154 322c-34-3-57-24-55-58 2-30 29-44 46-61 20-20 14-50 34-70 17-17 42-10 66-24 24-14 31-42 66-47 38-5 53 25 87 27 33 3 67-8 93 14 19 16 7 35 31 40 45 8 75 33 74 78 0 35 18 47 52 62 35 17 56 48 45 86-9 31-41 33-61 13-14-15-29-8-23 16 7 28 42 30 55 55 13 25-10 44-38 35-24-8-35 5-26 30 8 22-6 42-31 33"}),t.jsx("path",{d:"M229 346c-35 18-59 44-65 79-8 47 23 79 62 62 22-10 35-35 62-43 24-7 43 5 54 26"}),t.jsx("path",{d:"M383 354c36 24 56 58 55 95-1 39-26 55-58 42-26-11-38-38-69-48-25-9-45 4-57 24"}),t.jsx("path",{d:"M249 153c39-11 69 7 103 6 63-2 111-18 161 18 43 31 34 81 24 124-6 25-12 45 8 67 18 20 12 42-9 61"}),t.jsx("path",{d:"M249 153c-37 18-56 49-58 91-2 33 3 69-14 98-15 26-47 32-60 60"}),t.jsx("path",{d:"M194 301c12-23 37-37 65-35 27 2 49 17 65 38"}),t.jsx("path",{d:"M366 300c23-20 50-29 80-23 31 7 56 25 72 52"}),t.jsx("path",{d:"M202 323c30-16 63-17 94 1"}),t.jsx("path",{d:"M378 327c34-13 66-9 96 12"}),t.jsx("path",{d:"M245 323c-8 17-4 34 13 36 17 1 27-14 21-29-5-14-24-15-34-7Z"}),t.jsx("path",{d:"M416 330c-9 17-4 33 13 35 17 2 27-13 22-28-5-15-24-16-35-7Z"}),t.jsx("path",{d:"M330 338c-8 36-17 70-26 102-5 17 6 28 22 20"}),t.jsx("path",{d:"M327 461c23 18 51 19 74 3"}),t.jsx("path",{d:"M204 469c43-42 96-55 148-25 30 17 52 47 89 56 31 8 60 1 87-20"}),t.jsx("path",{d:"M194 493c22 45 31 83 77 102 42 18 90 10 127 39 31 24 32 62 4 85"}),t.jsx("path",{d:"M515 484c-9 53-25 105-68 132-46 29-93 4-132-17-40-21-77-33-112-7-27 21-33 62-10 94"}),t.jsx("path",{d:"M199 551c-50 13-83 39-98 82-16 45 0 95 26 133"}),t.jsx("path",{d:"M512 557c55 10 101 35 131 75 32 43 35 92 13 134"}),t.jsx("path",{d:"M150 626c24 14 49 17 76 6"}),t.jsx("path",{d:"M481 629c41 13 80 11 117-8"}),t.jsx("path",{d:"M214 626c-32 49-42 101-30 156"}),t.jsx("path",{d:"M474 617c-11 52-35 99-72 139"})]})})}const Ye=2026,We=["Tháng Một","Tháng Hai","Tháng Ba","Tháng Tư","Tháng Năm","Tháng Sáu","Tháng Bảy","Tháng Tám","Tháng Chín","Tháng Mười","Tháng Mười Một","Tháng Mười Hai"],Ue=["january","february","march","april","may","june","july","august","september","october","november","december"],Je=["T2","T3","T4","T5","T6","T7","CN"],w="/calendar-web-qr.png",U="/socialism-decoded-daily/calendar-web-qr.png",Ze=["Trịnh Gia Phúc","Nguyễn Hoàng Long","Vũ Quốc Khánh","Phạm Vũ Anh Hưng","Đinh Duy Trọng","Lê Ánh Ngọc","Nguyễn Việt Anh","Ngô Yến Dương","Phạm Duy Hưng"],et=String.raw`
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
`,J=x("/print/calendar-2026")({loader:async()=>{const e=await Promise.all(b.map(n=>v(n.n)));return{year:Ye,months:b.map((n,a)=>{const i=e[a]??[];return{chapter:n,fileName:Ue[a]??`month-${String(n.n).padStart(2,"0")}`,highlight:dt(i),quotes:i}})}},head:()=>({meta:[{title:"Lịch để bàn 2026 | 365 Ngày cùng Chủ nghĩa Xã hội Khoa học"},{name:"description",content:"Bộ lịch để bàn in ấn theo chủ đề 365 Ngày cùng Chủ nghĩa Xã hội Khoa học."}]}),component:tt});function tt(){const{months:e,year:n}=J.useLoaderData();return t.jsxs("main",{className:"print-calendar-root","aria-label":"Lịch để bàn 2026",children:[t.jsx("style",{children:et}),t.jsx(nt,{months:e,year:n}),e.map(a=>t.jsx(at,{month:a,year:n},a.chapter.n)),t.jsx(rt,{year:n})]})}function nt({months:e,year:n}){return t.jsx("section",{className:"calendar-sheet calendar-cover-sheet","data-page-name":"cover",children:t.jsxs("div",{className:"calendar-trim",children:[t.jsx(z,{}),t.jsx("div",{className:"calendar-cover-portrait","aria-hidden":!0,children:t.jsx(S,{})}),t.jsx("div",{className:"calendar-cover-star","aria-hidden":!0,children:t.jsx(Z,{})}),t.jsxs("div",{className:"calendar-cover-content",children:[t.jsxs("p",{className:"calendar-kicker",children:["Niên giám ",n]}),t.jsxs("h1",{className:"calendar-cover-title",children:[t.jsx("span",{className:"calendar-cover-title-main",children:"365 ngày cùng"}),t.jsx("span",{className:"calendar-cover-title-red",children:"Chủ nghĩa"}),t.jsx("span",{className:"calendar-cover-title-ink",children:"Xã hội Khoa học"})]}),t.jsx("p",{className:"calendar-cover-lead",children:"Mỗi ngày một bài học. Mỗi tháng một chủ đề. Một năm để đọc, ghi nhớ và suy ngẫm."})]}),t.jsx("div",{className:"calendar-cover-map","aria-label":"Bản đồ 12 chủ đề",children:e.map(a=>t.jsxs("div",{className:"calendar-cover-map-item",children:[t.jsx("span",{children:String(a.chapter.n).padStart(2,"0")}),t.jsx("strong",{children:a.chapter.title})]},a.chapter.n))}),t.jsxs("footer",{className:"calendar-page-footer",children:[t.jsx("span",{children:"365 ngày, một ý tưởng"}),t.jsx("span",{children:"MLN131 · Group 4"})]})]})})}function at({month:e,year:n}){const a=st(n,e.chapter.n),i=We[e.chapter.n-1];return t.jsx("section",{className:"calendar-sheet calendar-month-sheet","data-page-name":e.fileName,"aria-label":`${i} ${n}`,children:t.jsxs("div",{className:"calendar-trim",children:[t.jsx(z,{}),t.jsx("div",{className:"calendar-month-portrait","aria-hidden":!0,children:t.jsx(S,{})}),t.jsxs("header",{className:"calendar-month-header",children:[t.jsx("div",{className:"calendar-month-number",children:String(e.chapter.n).padStart(2,"0")}),t.jsxs("div",{children:[t.jsxs("p",{className:"calendar-kicker",children:[i," · Chủ đề ",String(e.chapter.n).padStart(2,"0")]}),t.jsx("h2",{className:`calendar-month-title ${lt(e.chapter.n)}`,children:e.chapter.title}),t.jsx("p",{children:e.chapter.sub})]})]}),t.jsxs("div",{className:"calendar-month-body",children:[t.jsxs("div",{className:"calendar-grid-panel",children:[t.jsx("div",{className:"calendar-weekdays","aria-hidden":!0,children:Je.map(r=>t.jsx("span",{children:r},r))}),t.jsx("div",{className:"calendar-date-grid",children:a.map((r,o)=>t.jsx("div",{className:["calendar-date-cell",r.day===null&&"calendar-date-cell-empty",r.isWeekend&&"calendar-date-cell-weekend",r.day===e.highlight?.day&&"calendar-date-cell-highlight"].filter(Boolean).join(" "),children:r.day&&t.jsx("span",{children:r.day})},`${e.chapter.n}-${o}`))})]}),t.jsxs("aside",{className:"calendar-quote-panel",children:[t.jsx(Z,{}),e.highlight?t.jsxs(t.Fragment,{children:[t.jsxs("p",{className:"calendar-quote-date",children:["Ngày ",String(e.highlight.day).padStart(2,"0")," /"," ",String(e.highlight.month).padStart(2,"0")]}),t.jsxs("blockquote",{className:ct(e.highlight.quote),children:["“",e.highlight.quote,"”"]}),t.jsxs("p",{className:"calendar-quote-source",children:[e.highlight.author," · ",e.highlight.context]})]}):t.jsxs(t.Fragment,{children:[t.jsx("p",{className:"calendar-quote-date",children:"Nội dung"}),t.jsx("blockquote",{children:"“Nội dung tháng này đang được cập nhật.”"}),t.jsxs("p",{className:"calendar-quote-source",children:[e.quotes.length," bài học"]})]})]})]}),t.jsxs("footer",{className:"calendar-page-footer",children:[t.jsx("span",{children:"365 ngày, một ý tưởng"}),t.jsx("span",{children:n})]})]})})}function rt({year:e}){return t.jsx("section",{className:"calendar-sheet calendar-final-sheet","data-page-name":"qr-members",children:t.jsxs("div",{className:"calendar-trim",children:[t.jsx(z,{}),t.jsx("div",{className:"calendar-final-portrait","aria-hidden":!0,children:t.jsx(S,{})}),t.jsxs("div",{className:"calendar-final-layout",children:[t.jsxs("div",{className:"calendar-final-qr-panel",children:[t.jsx(it,{}),t.jsx("p",{className:"calendar-final-qr-caption",children:"Quét QR để đọc online"})]}),t.jsxs("div",{className:"calendar-final-content",children:[t.jsx("p",{className:"calendar-kicker",children:"Website dự án"}),t.jsxs("h2",{children:["365 ngày cùng ",t.jsx("span",{children:"Chủ nghĩa"})," Xã hội Khoa học"]}),t.jsxs("p",{className:"calendar-final-copy",children:["Cảm ơn bạn đã đồng hành cùng niên giám ",e,". Quét mã để mở phiên bản web, đọc các chủ đề và tiếp tục hành trình mỗi ngày một ý tưởng."]}),t.jsxs("div",{className:"calendar-member-panel",children:[t.jsx("h3",{children:"Thành viên Group 4"}),t.jsx("ul",{children:Ze.map(n=>t.jsx("li",{children:n},n))})]})]})]}),t.jsxs("footer",{className:"calendar-page-footer",children:[t.jsx("span",{children:"365 ngày, một ý tưởng"}),t.jsx("span",{children:"MLN131 · Group 4"})]})]})})}function it(){const[e,n]=d.useState(w);return d.useEffect(()=>{n(ot())},[]),t.jsx("img",{src:e,alt:"QR dẫn đến website 365 Ngày cùng Chủ nghĩa Xã hội Khoa học",onError:()=>{n(a=>a.endsWith(w)?U:w)}})}function ot(){return typeof window>"u"||["localhost","127.0.0.1","::1"].includes(window.location.hostname)?w:U}function st(e,n){const i=(new Date(e,n-1,1).getDay()+6)%7,r=new Date(e,n,0).getDate(),o=[];for(let s=0;s<i;s+=1)o.push({day:null,isWeekend:!1});for(let s=1;s<=r;s+=1){const h=new Date(e,n-1,s).getDay();o.push({day:s,isWeekend:h===0||h===6})}for(;o.length<42;)o.push({day:null,isWeekend:!1});return o}function ct(e){if(e.length>=105)return"calendar-quote-long";if(e.length>=78)return"calendar-quote-medium"}function lt(e){return e===8||e===9?"calendar-month-title-tight":""}function dt(e){return e.length===0?null:e.filter(n=>n.quote.length<=82).sort((n,a)=>a.quote.length-n.quote.length)[0]??[...e].sort((n,a)=>n.quote.length-a.quote.length)[0]??null}function z(){return t.jsx("div",{className:"calendar-binding-dots","aria-hidden":!0,children:Array.from({length:14},(e,n)=>t.jsx("span",{},n))})}function Z(){return t.jsx("svg",{viewBox:"0 0 24 24",fill:"currentColor","aria-hidden":!0,children:t.jsx("path",{d:"M12 2l2.39 7.36H22l-6.18 4.49L18.21 22 12 17.27 5.79 22l2.39-8.15L2 9.36h7.61L12 2z"})})}const ht=x("/mindmap/$chapter")({loader:async({params:e})=>{const n=Number(e.chapter),a=q(n);if(!a||!a.isPublished)throw P();const i=await v(n);return{chapter:a,navigation:W(n),quotes:i}},head:({loaderData:e})=>({meta:[{title:e?`Sơ đồ: ${e.chapter.title} | 365 Ngày CNXHKH`:"Sơ đồ tư duy | 365 Ngày CNXHKH"},{name:"description",content:e?.chapter.sub??"Sơ đồ tư duy trực quan Chủ nghĩa Xã hội Khoa học."}]})}),mt=x("/chuong/$chapter")({loader:async({params:e})=>{const n=Number(e.chapter),a=q(n);if(!a||!a.isPublished)throw P();return{chapter:a,navigation:W(n),quotes:await v(n)}},head:({loaderData:e})=>({meta:[{title:e?`Chủ đề ${e.chapter.n}: ${e.chapter.title} | 365 Ngày`:"365 Ngày cùng Chủ nghĩa Xã hội Khoa học"},{name:"description",content:e?.chapter.sub??"Hành trình 365 ngày giải mã Chủ nghĩa Xã hội Khoa học."}]})}),ut=x("/print/$chapter")(),pt=$e.update({id:"/",path:"/",getParentRoute:()=>g}).lazy(()=>l(()=>import("./index.lazy-C0Qh448S.js"),__vite__mapDeps([13,14,15,16,17,18,19])).then(e=>e.Route)),gt=Be.update({id:"/quiz/",path:"/quiz/",getParentRoute:()=>g}).lazy(()=>l(()=>import("./index.lazy-Bx2DGk0x.js"),__vite__mapDeps([20,14,15,16,21,18,17])).then(e=>e.Route)),ft=Ge.update({id:"/mindmap/",path:"/mindmap/",getParentRoute:()=>g}).lazy(()=>l(()=>import("./index.lazy-BI3E3B3-.js"),__vite__mapDeps([22,14,15,16,18,17])).then(e=>e.Route)),xt=ut.update({id:"/print/$chapter",path:"/print/$chapter",getParentRoute:()=>g}).lazy(()=>l(()=>import("./_chapter.lazy-CmzdQQxt.js"),__vite__mapDeps([23,14,15,16,17])).then(e=>e.Route)),yt=Fe.update({id:"/quiz/$chapter",path:"/quiz/$chapter",getParentRoute:()=>g}).lazy(()=>l(()=>import("./_chapter.lazy-BFReqMzU.js"),__vite__mapDeps([24,14,15,16,18,17,21])).then(e=>e.Route)),bt=J.update({id:"/print/calendar-2026",path:"/print/calendar-2026",getParentRoute:()=>g}),vt=ht.update({id:"/mindmap/$chapter",path:"/mindmap/$chapter",getParentRoute:()=>g}).lazy(()=>l(()=>import("./_chapter.lazy-BF1mdOLI.js"),__vite__mapDeps([25,14,15,16,17,18])).then(e=>e.Route)),jt=mt.update({id:"/chuong/$chapter",path:"/chuong/$chapter",getParentRoute:()=>g}).lazy(()=>l(()=>import("./_chapter.lazy-w2o53esx.js"),__vite__mapDeps([26,14,15,16,18,17])).then(e=>e.Route)),Nt={IndexRoute:pt,ChuongChapterRoute:jt,MindmapChapterRoute:vt,PrintCalendar2026Route:bt,QuizChapterRoute:yt,PrintChapterLazyRoute:xt,MindmapIndexRoute:ft,QuizIndexRoute:gt},wt=g._addFileChildren(Nt)._addFileTypes(),_t="/socialism-decoded-daily/".replace(/\/$/,"")||"/",kt=()=>{const e=new ue;return pe({routeTree:wt,basepath:_t,context:{queryClient:e},scrollRestoration:!0,defaultPreloadStaleTime:0})},Ct=kt();ie.createRoot(document.getElementById("root")).render(t.jsx(oe.StrictMode,{children:t.jsx(ge,{router:Ct})}));export{S as M,l as _,v as a,G as b,b as c,qt as g};
