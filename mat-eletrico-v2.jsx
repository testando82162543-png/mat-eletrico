import { useState, useMemo } from "react";

const CATS_INICIAIS = {
  "Disjuntores": [
    { id:"DIS-001", descricao:"Disjuntor Monopolar 10A", unidade:"un" },
    { id:"DIS-002", descricao:"Disjuntor Monopolar 16A", unidade:"un" },
    { id:"DIS-003", descricao:"Disjuntor Monopolar 20A", unidade:"un" },
    { id:"DIS-004", descricao:"Disjuntor Monopolar 25A", unidade:"un" },
    { id:"DIS-005", descricao:"Disjuntor Monopolar 32A", unidade:"un" },
    { id:"DIS-006", descricao:"Disjuntor Bipolar 20A", unidade:"un" },
    { id:"DIS-007", descricao:"Disjuntor Bipolar 32A", unidade:"un" },
    { id:"DIS-008", descricao:"Disjuntor Bipolar 50A", unidade:"un" },
    { id:"DIS-009", descricao:"Disjuntor Tripolar 32A", unidade:"un" },
    { id:"DIS-010", descricao:"Disjuntor Tripolar 63A", unidade:"un" },
    { id:"DIS-011", descricao:"Disjuntor Tripolar 100A", unidade:"un" },
    { id:"DIS-012", descricao:"Disjuntor DR 25A/30mA", unidade:"un" },
    { id:"DIS-013", descricao:"Disjuntor DR 40A/30mA", unidade:"un" },
    { id:"DIS-014", descricao:"Disjuntor Motor 1-4A", unidade:"un" },
    { id:"DIS-015", descricao:"Disjuntor Motor 4-6.3A", unidade:"un" },
    { id:"DIS-016", descricao:"Disjuntor Motor 6-10A", unidade:"un" },
  ],
  "Contatoras e Reles": [
    { id:"CON-001", descricao:"Contatora 9A 220V", unidade:"un" },
    { id:"CON-002", descricao:"Contatora 12A 220V", unidade:"un" },
    { id:"CON-003", descricao:"Contatora 18A 220V", unidade:"un" },
    { id:"CON-004", descricao:"Contatora 25A 220V", unidade:"un" },
    { id:"CON-005", descricao:"Contatora 40A 220V", unidade:"un" },
    { id:"CON-006", descricao:"Contatora 65A 220V", unidade:"un" },
    { id:"CON-007", descricao:"Rele Termico 4-6A", unidade:"un" },
    { id:"CON-008", descricao:"Rele Termico 6-10A", unidade:"un" },
    { id:"CON-009", descricao:"Rele Termico 9-13A", unidade:"un" },
    { id:"CON-010", descricao:"Rele Termico 12-18A", unidade:"un" },
    { id:"CON-011", descricao:"Rele Temporizado On-Delay", unidade:"un" },
    { id:"CON-012", descricao:"Rele de Monitoramento de Fases", unidade:"un" },
    { id:"CON-013", descricao:"Bloco de Contatos Auxiliares NO+NF", unidade:"un" },
  ],
  "Paineis e Caixas": [
    { id:"PAI-001", descricao:"QDC 12 Disjuntores Embutir", unidade:"un" },
    { id:"PAI-002", descricao:"QDC 24 Disjuntores Embutir", unidade:"un" },
    { id:"PAI-003", descricao:"QDC 36 Disjuntores Embutir", unidade:"un" },
    { id:"PAI-004", descricao:"Caixa Metalica 30x20x15cm", unidade:"un" },
    { id:"PAI-005", descricao:"Caixa Metalica 40x30x20cm", unidade:"un" },
    { id:"PAI-006", descricao:"Caixa Metalica 60x50x25cm", unidade:"un" },
    { id:"PAI-007", descricao:"Trilho DIN 35mm", unidade:"m" },
    { id:"PAI-008", descricao:"Calha Organizadora 40x40mm", unidade:"m" },
    { id:"PAI-009", descricao:"Calha Organizadora 60x60mm", unidade:"m" },
    { id:"PAI-010", descricao:"Porta-fusivel NH00 160A", unidade:"un" },
    { id:"PAI-011", descricao:"Barramento de Cobre 100A", unidade:"un" },
    { id:"PAI-012", descricao:"Barramento de Cobre 250A", unidade:"un" },
  ],
  "Cabos e Fios": [
    { id:"CAB-001", descricao:"Cabo Flexivel 1,5mm Preto", unidade:"m" },
    { id:"CAB-002", descricao:"Cabo Flexivel 2,5mm Preto", unidade:"m" },
    { id:"CAB-003", descricao:"Cabo Flexivel 4mm Preto", unidade:"m" },
    { id:"CAB-004", descricao:"Cabo Flexivel 6mm Preto", unidade:"m" },
    { id:"CAB-005", descricao:"Cabo Flexivel 10mm Preto", unidade:"m" },
    { id:"CAB-006", descricao:"Cabo Flexivel 16mm Preto", unidade:"m" },
    { id:"CAB-007", descricao:"Fio Paralelo 2x1,5mm", unidade:"m" },
    { id:"CAB-008", descricao:"Cabo PP 3x2,5mm", unidade:"m" },
    { id:"CAB-009", descricao:"Cabo XLPE 35mm", unidade:"m" },
    { id:"CAB-010", descricao:"Cabo de Comando 12x1mm", unidade:"m" },
    { id:"CAB-011", descricao:"Cabo de Sinal Blindado 2x0,5mm", unidade:"m" },
  ],
  "Conectores e Terminais": [
    { id:"TER-001", descricao:"Terminal Pressao Trilho 4mm", unidade:"cx" },
    { id:"TER-002", descricao:"Terminal Pressao Trilho 6mm", unidade:"un" },
    { id:"TER-003", descricao:"Terminal Pressao Trilho 10mm", unidade:"un" },
    { id:"TER-004", descricao:"Terminal Olhal 10mm M6", unidade:"un" },
    { id:"TER-005", descricao:"Terminal Olhal 16mm M8", unidade:"un" },
    { id:"TER-006", descricao:"Terminal Pre-Isolado 1,5-2,5mm", unidade:"cx" },
    { id:"TER-007", descricao:"Terminal Pre-Isolado 4-6mm", unidade:"cx" },
  ],
  "Dispositivos de Protecao": [
    { id:"PRO-001", descricao:"Fusivel NH00 63A", unidade:"un" },
    { id:"PRO-002", descricao:"Fusivel NH00 100A", unidade:"un" },
    { id:"PRO-003", descricao:"Fusivel NH00 160A", unidade:"un" },
    { id:"PRO-004", descricao:"Fusivel NH1 200A", unidade:"un" },
    { id:"PRO-005", descricao:"DPS Classe II", unidade:"un" },
    { id:"PRO-006", descricao:"DPS Classe I+II Combinado", unidade:"un" },
    { id:"PRO-007", descricao:"Seccionadora 63A", unidade:"un" },
    { id:"PRO-008", descricao:"Seccionadora 100A", unidade:"un" },
    { id:"PRO-009", descricao:"Botao de Emergencia com Cogumelo", unidade:"un" },
  ],
  "Sinalizacao e Comando": [
    { id:"SIG-001", descricao:"Sinalizador LED Verde 220V", unidade:"un" },
    { id:"SIG-002", descricao:"Sinalizador LED Vermelho 220V", unidade:"un" },
    { id:"SIG-003", descricao:"Sinalizador LED Amarelo 220V", unidade:"un" },
    { id:"SIG-004", descricao:"Botao Pulsador Verde NO", unidade:"un" },
    { id:"SIG-005", descricao:"Botao Pulsador Vermelho NF", unidade:"un" },
    { id:"SIG-006", descricao:"Chave Seletora 2 Posicoes", unidade:"un" },
    { id:"SIG-007", descricao:"Chave Seletora 3 Posicoes", unidade:"un" },
    { id:"SIG-008", descricao:"Torre de Sinalizacao 3 cores", unidade:"un" },
    { id:"SIG-009", descricao:"Sirene Buzzer 220V", unidade:"un" },
  ],
  "Automacao e Controle": [
    { id:"AUT-001", descricao:"CLP Compacto", unidade:"un" },
    { id:"AUT-002", descricao:"Modulo Expansao Entradas Digitais", unidade:"un" },
    { id:"AUT-003", descricao:"Modulo Expansao Saidas Digitais", unidade:"un" },
    { id:"AUT-004", descricao:"Inversor de Frequencia 1cv 220V", unidade:"un" },
    { id:"AUT-005", descricao:"Inversor de Frequencia 2cv 220V", unidade:"un" },
    { id:"AUT-006", descricao:"Inversor de Frequencia 5cv 220V", unidade:"un" },
    { id:"AUT-007", descricao:"Soft-Starter 30A 220V", unidade:"un" },
    { id:"AUT-008", descricao:"Fonte 24VDC 5A DIN", unidade:"un" },
    { id:"AUT-009", descricao:"Rele de Interface 24V + Socket", unidade:"un" },
  ],
  "Aterramento": [
    { id:"ATR-001", descricao:"Barra de Aterramento Cobre 30cm", unidade:"un" },
    { id:"ATR-002", descricao:"Cabo Terra Verde Amarelo 6mm", unidade:"m" },
    { id:"ATR-003", descricao:"Cabo Terra Verde Amarelo 10mm", unidade:"m" },
    { id:"ATR-004", descricao:"Haste de Aterramento 5/8 x 3m", unidade:"un" },
    { id:"ATR-005", descricao:"Conector de Aterramento Cunha", unidade:"un" },
  ],
};

const buildItems = (cats) =>
  Object.entries(cats).flatMap(([cat, lista]) =>
    lista.map((item) => ({ ...item, categoria: cat, qtdEstoque: 0, qtdMinima: 0, qtdComprar: 0, status: "NA", obs: "" }))
  );

const calcStatus = (e, m) => {
  if (m === 0) return "NA";
  if (e === 0) return "Comprar";
  if (e < m) return "Baixo";
  return "OK";
};

const ST = {
  OK:      { label:"Em estoque",    dot:"#34d399", text:"rgba(52,211,153,0.9)",  bg:"rgba(52,211,153,0.1)"  },
  Baixo:   { label:"Estoque baixo", dot:"#fbbf24", text:"rgba(251,191,36,0.9)",  bg:"rgba(251,191,36,0.1)"  },
  Comprar: { label:"Comprar",       dot:"#f87171", text:"rgba(248,113,113,0.9)", bg:"rgba(248,113,113,0.1)" },
  NA:      { label:"N/A",           dot:"#64748b", text:"rgba(100,116,139,0.7)", bg:"rgba(100,116,139,0.08)"},
};

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
body{font-family:'Inter',sans-serif;background:#080d1a;min-height:100vh;color:#e2e8f0;}
::-webkit-scrollbar{width:4px;height:4px;}
::-webkit-scrollbar-thumb{background:rgba(255,255,255,0.12);border-radius:4px;}
.gl{background:rgba(255,255,255,0.055);backdrop-filter:blur(28px) saturate(160%);-webkit-backdrop-filter:blur(28px) saturate(160%);border:1px solid rgba(255,255,255,0.1);border-radius:16px;}
.gl-sm{background:rgba(255,255,255,0.04);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,0.08);border-radius:12px;}
.btn{display:inline-flex;align-items:center;gap:6px;background:rgba(255,255,255,0.07);backdrop-filter:blur(12px);border:1px solid rgba(255,255,255,0.12);border-radius:8px;color:#e2e8f0;cursor:pointer;font-family:'Inter',sans-serif;font-size:12px;font-weight:500;padding:7px 14px;transition:all .18s;white-space:nowrap;}
.btn:hover{background:rgba(255,255,255,0.13);border-color:rgba(255,255,255,0.2);}
.btn.amber{background:rgba(251,191,36,0.14);border-color:rgba(251,191,36,0.35);color:#fde68a;}
.btn.amber:hover{background:rgba(251,191,36,0.24);}
.btn.red{background:rgba(248,113,113,0.1);border-color:rgba(248,113,113,0.25);color:#fca5a5;}
.btn.red:hover{background:rgba(248,113,113,0.2);}
.inp{background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.09);border-radius:8px;color:#e2e8f0;font-family:'Inter',sans-serif;font-size:12px;padding:7px 11px;outline:none;transition:border-color .2s;width:100%;}
.inp:focus{border-color:rgba(251,191,36,0.45);background:rgba(255,255,255,0.08);}
.inp::placeholder{color:rgba(148,163,184,0.4);}
.num{background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.09);border-radius:6px;color:#e2e8f0;font-family:'Inter',sans-serif;font-size:12px;text-align:center;padding:3px 0;width:54px;outline:none;transition:border-color .2s;}
.num:focus{border-color:rgba(251,191,36,0.4);}
.tab{background:transparent;border:none;border-bottom:2px solid transparent;color:rgba(148,163,184,0.6);cursor:pointer;font-family:'Inter',sans-serif;font-size:12px;font-weight:500;padding:10px 16px;transition:all .18s;}
.tab.on{color:#fde68a;border-bottom-color:#fbbf24;}
.tab:hover:not(.on){color:#e2e8f0;}
.row:hover td{background:rgba(255,255,255,0.025)!important;}
.ov{position:fixed;inset:0;z-index:200;background:rgba(0,0,0,0.55);backdrop-filter:blur(10px);display:flex;align-items:center;justify-content:center;padding:20px;}
.badge{display:inline-flex;align-items:center;gap:5px;padding:3px 9px;border-radius:20px;font-size:10px;font-weight:600;}
.dot{width:6px;height:6px;border-radius:50%;flex-shrink:0;}
@keyframes fi{from{opacity:0;transform:translateY(5px)}to{opacity:1;transform:none}}
.fi{animation:fi .22s ease;}
`;

export default function App() {
  const [items, setItems] = useState(buildItems(CATS_INICIAIS));
  const [cats, setCats] = useState(Object.keys(CATS_INICIAIS));

  const [obra, setObra] = useState("");
  const [resp, setResp] = useState("");
  const [emp, setEmp] = useState("");
  const [dt, setDt] = useState(new Date().toISOString().split("T")[0]);

  const [aba, setAba] = useState("planilha");
  const [busca, setBusca] = useState("");
  const [fCat, setFCat] = useState("Todas");
  const [fSt, setFSt] = useState("Todos");

  const [mCat, setMCat] = useState(false);
  const [novaCat, setNovaCat] = useState("");
  const [mRen, setMRen] = useState(null);
  const [renVal, setRenVal] = useState("");
  const [mItem, setMItem] = useState(false);
  const [novoItem, setNovoItem] = useState({ descricao:"", unidade:"un", categoria:"" });
  const [editCell, setEditCell] = useState(null);
  const [editVal, setEditVal] = useState("");

  const upd = (id, campo, valor) => setItems(prev => prev.map(it => {
    if (it.id !== id) return it;
    const up = { ...it, [campo]: valor };
    if (campo === "qtdEstoque" || campo === "qtdMinima") {
      const e = campo === "qtdEstoque" ? Number(valor) : it.qtdEstoque;
      const m = campo === "qtdMinima" ? Number(valor) : it.qtdMinima;
      up.status = calcStatus(e, m);
      up.qtdComprar = (e < m && m > 0) ? m - e : 0;
    }
    return up;
  }));

  const addCat = () => {
    const n = novaCat.trim();
    if (!n || cats.includes(n)) return;
    setCats(p => [...p, n]); setNovaCat(""); setMCat(false);
  };

  const renCat = () => {
    const n = renVal.trim();
    if (!n || n === mRen || cats.includes(n)) return;
    setCats(p => p.map(c => c === mRen ? n : c));
    setItems(p => p.map(i => i.categoria === mRen ? { ...i, categoria: n } : i));
    setMRen(null); setRenVal("");
  };

  const delCat = (cat) => {
    if (!window.confirm(`Remover categoria "${cat}" e todos os seus itens?`)) return;
    setCats(p => p.filter(c => c !== cat));
    setItems(p => p.filter(i => i.categoria !== cat));
  };

  const addItem = () => {
    const desc = novoItem.descricao.trim();
    const cat = novoItem.categoria || cats[0];
    if (!desc || !cat) return;
    const px = cat.replace(/\s/g,"").substring(0,3).toUpperCase();
    const n = items.filter(i => i.categoria === cat).length + 1;
    const id = `${px}-${String(n).padStart(3,"0")}`;
    setItems(p => [...p, { id, descricao:desc, unidade:novoItem.unidade, categoria:cat, qtdEstoque:0, qtdMinima:0, qtdComprar:0, status:"NA", obs:"" }]);
    setNovoItem({ descricao:"", unidade:"un", categoria:cat }); setMItem(false);
  };

  const delItem = (id) => { if (window.confirm("Remover este item?")) setItems(p => p.filter(i => i.id !== id)); };

  const filtrados = useMemo(() => items.filter(it => {
    const mb = !busca || it.descricao.toLowerCase().includes(busca.toLowerCase()) || it.id.toLowerCase().includes(busca.toLowerCase());
    const mc = fCat === "Todas" || it.categoria === fCat;
    const ms = fSt === "Todos" || it.status === fSt;
    return mb && mc && ms;
  }), [items, busca, fCat, fSt]);

  const qtOK = items.filter(i => i.status==="OK").length;
  const qtB  = items.filter(i => i.status==="Baixo").length;
  const qtC  = items.filter(i => i.status==="Comprar").length;
  const qtNA = items.filter(i => i.status==="NA").length;

  const gerarPDF = () => {
    const comprar = items.filter(i => i.qtdComprar > 0);
    const dataFmt = dt ? new Date(dt+"T12:00:00").toLocaleDateString("pt-BR") : "";
    const rc = (i) => i%2===0?"#f8fafc":"#fff";
    const sc = {OK:"#16a34a",Baixo:"#b45309",Comprar:"#dc2626",NA:"#64748b"};
    const sb = {OK:"#dcfce7",Baixo:"#fef9c3",Comprar:"#fee2e2",NA:"#f1f5f9"};
    const sl = {OK:"Em estoque",Baixo:"Estoque baixo",Comprar:"Comprar",NA:"N/A"};

    const html = `<!DOCTYPE html><html lang="pt-BR"><head><meta charset="UTF-8">
<title>Levantamento de Materiais</title>
<style>
*{box-sizing:border-box;margin:0;padding:0;}
body{font-family:Arial,sans-serif;font-size:10px;color:#1e293b;}
@media print{body{-webkit-print-color-adjust:exact;print-color-adjust:exact;}.pgb{page-break-before:always;}}
.hd{background:#0f172a;color:#fff;padding:18px 26px;display:flex;justify-content:space-between;align-items:flex-end;}
.ht{font-size:18px;font-weight:700;color:#fbbf24;}
.hs{font-size:10px;color:#94a3b8;margin-top:3px;}
.hm{text-align:right;line-height:1.9;color:#cbd5e1;}
.hm b{color:#fbbf24;}
.sr{display:flex;gap:10px;padding:12px 26px;background:#f8fafc;border-bottom:2px solid #e2e8f0;}
.sc{flex:1;padding:9px 12px;border-radius:5px;border:1.5px solid;}
.sn{font-size:20px;font-weight:700;}
.sl{font-size:9px;margin-top:2px;}
.sec{padding:0 26px;}
.ct{background:#1e293b;color:#fbbf24;padding:6px 10px;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.8px;margin-top:14px;border-radius:4px 4px 0 0;}
table{width:100%;border-collapse:collapse;}
th{background:#334155;color:#e2e8f0;padding:5px 6px;text-align:left;font-size:8.5px;text-transform:uppercase;letter-spacing:.3px;}
th.c{text-align:center;}
td{padding:4px 6px;border:1px solid #e2e8f0;font-size:9px;vertical-align:middle;}
.ct2{background:#dc2626;color:#fff;padding:7px 10px;font-weight:700;font-size:11px;border-radius:4px 4px 0 0;margin-top:18px;}
.ft{text-align:center;font-size:8px;color:#94a3b8;padding:14px;border-top:1px solid #e2e8f0;margin-top:18px;}
</style></head><body>
<div class="hd">
  <div><div class="ht">⚡ Levantamento de Materiais Eletricos</div><div class="hs">${emp||"Empresa"} — Controle de Estoque e Compras</div></div>
  <div class="hm"><div><b>Obra / Projeto:</b> ${obra||"—"}</div><div><b>Responsavel:</b> ${resp||"—"}</div><div><b>Data:</b> ${dataFmt}</div></div>
</div>
<div class="sr">
  <div class="sc" style="background:#dcfce7;border-color:#16a34a;color:#166534;"><div class="sn">${qtOK}</div><div class="sl">Em Estoque</div></div>
  <div class="sc" style="background:#fef9c3;border-color:#ca8a04;color:#854d0e;"><div class="sn">${qtB}</div><div class="sl">Estoque Baixo</div></div>
  <div class="sc" style="background:#fee2e2;border-color:#ef4444;color:#991b1b;"><div class="sn">${qtC}</div><div class="sl">Comprar</div></div>
  <div class="sc" style="background:#f1f5f9;border-color:#94a3b8;color:#475569;"><div class="sn">${items.length}</div><div class="sl">Total de Itens</div></div>
</div>
<div class="sec">
${cats.map(cat=>{
  const ci=items.filter(i=>i.categoria===cat);
  if(!ci.length)return"";
  return `<div class="ct">⚡ ${cat}</div><table><thead><tr>
<th style="width:74px">Codigo</th><th>Descricao</th>
<th class="c" style="width:36px">Un.</th>
<th class="c" style="width:56px">Estoque</th>
<th class="c" style="width:56px">Minimo</th>
<th class="c" style="width:56px">Comprar</th>
<th class="c" style="width:84px">Status</th>
<th>Obs.</th>
</tr></thead><tbody>
${ci.map((it,i)=>`<tr style="background:${rc(i)}">
<td style="font-weight:700;color:#b45309;">${it.id}</td>
<td>${it.descricao}</td>
<td style="text-align:center;">${it.unidade}</td>
<td style="text-align:center;">${it.qtdEstoque}</td>
<td style="text-align:center;">${it.qtdMinima}</td>
<td style="text-align:center;font-weight:700;color:${it.qtdComprar>0?"#dc2626":"#64748b"};">${it.qtdComprar}</td>
<td style="text-align:center;"><span style="background:${sb[it.status]};color:${sc[it.status]};border-radius:3px;padding:2px 5px;font-size:8px;font-weight:700;">${sl[it.status]}</span></td>
<td style="color:#64748b;">${it.obs||""}</td>
</tr>`).join("")}
</tbody></table>`;
}).join("")}
${comprar.length>0?`<div class="pgb"></div>
<div class="ct2">🛒 LISTA DE COMPRAS — ${comprar.length} ITEN(S)</div>
<table><thead><tr>
<th style="width:74px">Codigo</th><th>Descricao</th>
<th class="c" style="width:38px">Un.</th>
<th class="c" style="width:68px">Qtd Comprar</th>
<th>Obs.</th>
</tr></thead><tbody>
${comprar.map((it,i)=>`<tr style="background:${i%2===0?"#fff5f5":"#fff"}">
<td style="font-weight:700;color:#b45309;">${it.id}</td>
<td>${it.descricao}</td>
<td style="text-align:center;">${it.unidade}</td>
<td style="text-align:center;font-weight:700;font-size:13px;color:#dc2626;">${it.qtdComprar}</td>
<td style="color:#64748b;">${it.obs||""}</td>
</tr>`).join("")}
</tbody></table>`:""}
</div>
<div class="ft">Gerado por MatEletrico SaaS — ${new Date().toLocaleDateString("pt-BR",{day:"2-digit",month:"long",year:"numeric"})}</div>
</body></html>`;
    const w=window.open("","_blank");w.document.write(html);w.document.close();w.onload=()=>setTimeout(()=>w.print(),300);
  };

  const Badge = ({st}) => {
    const c = ST[st]||ST.NA;
    return <span className="badge" style={{background:c.bg,color:c.text}}><span className="dot" style={{background:c.dot}}/>{c.label}</span>;
  };

  const EC = ({it, campo}) => {
    const isEd = editCell?.id===it.id && editCell?.campo===campo;
    if (isEd) return (
      <input className="inp" autoFocus value={editVal}
        onChange={e=>setEditVal(e.target.value)}
        onBlur={()=>{upd(it.id,campo,editVal);setEditCell(null);}}
        onKeyDown={e=>{if(e.key==="Enter"){upd(it.id,campo,editVal);setEditCell(null);}if(e.key==="Escape")setEditCell(null);}}
        style={{fontSize:11,padding:"3px 7px"}}/>
    );
    return (
      <span onClick={()=>{setEditCell({id:it.id,campo});setEditVal(it[campo]);}}
        title="Clique para editar"
        style={{cursor:"text",borderBottom:"1px dashed rgba(255,255,255,0.1)",paddingBottom:1,fontSize:11}}>
        {it[campo]||<span style={{color:"rgba(148,163,184,0.3)"}}>—</span>}
      </span>
    );
  };

  let lastCat=null;

  return (
    <>
      <style>{CSS}</style>
      <div style={{position:"fixed",inset:0,zIndex:0,background:"radial-gradient(ellipse at 15% 15%,#111d3c 0%,#080d1a 55%,#050810 100%)",pointerEvents:"none"}}/>
      <div style={{position:"fixed",top:"5%",left:"55%",width:500,height:500,borderRadius:"50%",background:"rgba(251,191,36,0.035)",filter:"blur(100px)",pointerEvents:"none",zIndex:0}}/>
      <div style={{position:"fixed",top:"55%",left:"5%",width:350,height:350,borderRadius:"50%",background:"rgba(99,102,241,0.04)",filter:"blur(90px)",pointerEvents:"none",zIndex:0}}/>

      <div style={{position:"relative",zIndex:1,minHeight:"100vh",display:"flex",flexDirection:"column"}}>

        {/* HEADER */}
        <div className="gl" style={{margin:"14px 14px 0",padding:"14px 18px",display:"flex",gap:14,alignItems:"center",flexWrap:"wrap"}}>
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            <div style={{width:38,height:38,borderRadius:11,background:"rgba(251,191,36,0.13)",border:"1px solid rgba(251,191,36,0.28)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:20}}>⚡</div>
            <div>
              <div style={{fontWeight:700,fontSize:15,color:"#fde68a",letterSpacing:-0.3}}>MatElétrico</div>
              <div style={{fontSize:9,color:"rgba(148,163,184,0.5)",marginTop:1}}>Levantamento de Materiais Elétricos</div>
            </div>
          </div>
          <div style={{flex:1,display:"flex",gap:8,flexWrap:"wrap"}}>
            <input className="inp" style={{flex:1,minWidth:100}} placeholder="Empresa" value={emp} onChange={e=>setEmp(e.target.value)}/>
            <input className="inp" style={{flex:1,minWidth:100}} placeholder="Obra / Projeto" value={obra} onChange={e=>setObra(e.target.value)}/>
            <input className="inp" style={{flex:1,minWidth:100}} placeholder="Responsável" value={resp} onChange={e=>setResp(e.target.value)}/>
            <input className="inp" type="date" style={{width:128}} value={dt} onChange={e=>setDt(e.target.value)}/>
          </div>
          <button className="btn amber" onClick={gerarPDF} style={{padding:"8px 18px",fontSize:12}}>🖨️ Gerar PDF</button>
        </div>

        {/* CARDS */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(120px,1fr))",gap:9,margin:"10px 14px 0"}}>
          {[
            {v:qtOK, l:"Em Estoque",    c:"#34d399",bg:"rgba(52,211,153,0.07)"},
            {v:qtB,  l:"Estoque Baixo", c:"#fbbf24",bg:"rgba(251,191,36,0.07)"},
            {v:qtC,  l:"Comprar",       c:"#f87171",bg:"rgba(248,113,113,0.07)"},
            {v:qtNA, l:"Não definido",  c:"#94a3b8",bg:"rgba(148,163,184,0.05)"},
            {v:items.length, l:"Total", c:"#a5b4fc",bg:"rgba(165,180,252,0.07)"},
          ].map(({v,l,c,bg})=>(
            <div key={l} className="gl-sm" style={{padding:"11px 14px",background:bg}}>
              <div style={{fontSize:24,fontWeight:700,color:c,lineHeight:1}}>{v}</div>
              <div style={{fontSize:9,color:"rgba(148,163,184,0.6)",marginTop:3}}>{l}</div>
            </div>
          ))}
        </div>

        {/* TABS */}
        <div style={{display:"flex",padding:"0 14px",marginTop:14,borderBottom:"1px solid rgba(255,255,255,0.06)"}}>
          <button className={`tab ${aba==="planilha"?"on":""}`} onClick={()=>setAba("planilha")}>📋 Planilha</button>
          <button className={`tab ${aba==="compras"?"on":""}`} onClick={()=>setAba("compras")}>🛒 Lista de Compras {qtC>0&&<span style={{background:"rgba(248,113,113,0.2)",color:"#f87171",borderRadius:10,padding:"0 6px",fontSize:10,marginLeft:4}}>{qtC}</span>}</button>
        </div>

        {/* TOOLBAR */}
        {aba==="planilha"&&(
          <div style={{display:"flex",gap:8,padding:"10px 14px",flexWrap:"wrap",alignItems:"center"}}>
            <input className="inp" style={{width:190}} placeholder="🔍 Buscar..." value={busca} onChange={e=>setBusca(e.target.value)}/>
            <select className="inp" style={{width:150}} value={fCat} onChange={e=>setFCat(e.target.value)}>
              <option>Todas</option>
              {cats.map(c=><option key={c}>{c}</option>)}
            </select>
            <select className="inp" style={{width:120}} value={fSt} onChange={e=>setFSt(e.target.value)}>
              <option>Todos</option>
              {Object.keys(ST).map(s=><option key={s}>{s}</option>)}
            </select>
            <span style={{fontSize:10,color:"rgba(148,163,184,0.4)"}}>{filtrados.length} iten(s)</span>
            <div style={{marginLeft:"auto",display:"flex",gap:6}}>
              <button className="btn" onClick={()=>{setNovoItem({descricao:"",unidade:"un",categoria:cats[0]});setMItem(true);}}>+ Item</button>
              <button className="btn amber" onClick={()=>setMCat(true)}>+ Categoria</button>
            </div>
          </div>
        )}

        {/* TABELA */}
        {aba==="planilha"&&(
          <div style={{overflowX:"auto",padding:"0 14px 28px",flex:1}}>
            <table style={{width:"100%",borderCollapse:"collapse",minWidth:680}}>
              <thead>
                <tr>
                  {["Código","Descrição","Un.","Estoque","Mínimo","Comprar","Status","Obs.",""]. map((h,i)=>(
                    <th key={i} style={{padding:"7px 10px",textAlign:i>=3&&i<=5?"center":"left",fontSize:9,color:"rgba(148,163,184,0.5)",fontWeight:600,textTransform:"uppercase",letterSpacing:.7,borderBottom:"1px solid rgba(255,255,255,0.06)",background:"transparent",whiteSpace:"nowrap"}}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtrados.map((it)=>{
                  const sc = it.categoria!==lastCat && fCat==="Todas";
                  lastCat=it.categoria;
                  return [
                    sc&&(
                      <tr key={`hd-${it.categoria}`}>
                        <td colSpan={9} style={{padding:"12px 10px 4px",fontSize:9,fontWeight:700,color:"rgba(251,191,36,0.65)",textTransform:"uppercase",letterSpacing:1.4,borderBottom:"1px solid rgba(251,191,36,0.08)"}}>
                          ⚡ {it.categoria}
                          <button className="btn" onClick={()=>{setMRen(it.categoria);setRenVal(it.categoria);}} style={{marginLeft:8,fontSize:9,padding:"1px 7px"}}>✏️ Renomear</button>
                          <button className="btn red" onClick={()=>delCat(it.categoria)} style={{marginLeft:4,fontSize:9,padding:"1px 7px"}}>✕</button>
                        </td>
                      </tr>
                    ),
                    <tr key={it.id} className="row fi">
                      <td style={{padding:"5px 10px",color:"rgba(251,191,36,0.75)",fontWeight:600,fontSize:10,whiteSpace:"nowrap",borderBottom:"1px solid rgba(255,255,255,0.035)"}}>{it.id}</td>
                      <td style={{padding:"5px 10px",borderBottom:"1px solid rgba(255,255,255,0.035)",maxWidth:220}}><EC it={it} campo="descricao"/></td>
                      <td style={{padding:"5px 10px",color:"rgba(148,163,184,0.55)",fontSize:10,textAlign:"center",borderBottom:"1px solid rgba(255,255,255,0.035)"}}>{it.unidade}</td>
                      <td style={{padding:"5px 10px",textAlign:"center",borderBottom:"1px solid rgba(255,255,255,0.035)"}}><input className="num" type="number" min={0} value={it.qtdEstoque} onChange={e=>upd(it.id,"qtdEstoque",e.target.value)}/></td>
                      <td style={{padding:"5px 10px",textAlign:"center",borderBottom:"1px solid rgba(255,255,255,0.035)"}}><input className="num" type="number" min={0} value={it.qtdMinima} onChange={e=>upd(it.id,"qtdMinima",e.target.value)}/></td>
                      <td style={{padding:"5px 10px",textAlign:"center",fontWeight:700,fontSize:13,color:it.qtdComprar>0?"#f87171":"rgba(148,163,184,0.35)",borderBottom:"1px solid rgba(255,255,255,0.035)"}}>{it.qtdComprar||"—"}</td>
                      <td style={{padding:"5px 10px",borderBottom:"1px solid rgba(255,255,255,0.035)",whiteSpace:"nowrap"}}><Badge st={it.status}/></td>
                      <td style={{padding:"5px 10px",borderBottom:"1px solid rgba(255,255,255,0.035)",maxWidth:130}}><EC it={it} campo="obs"/></td>
                      <td style={{padding:"5px 6px",borderBottom:"1px solid rgba(255,255,255,0.035)",textAlign:"center"}}><button className="btn red" onClick={()=>delItem(it.id)} style={{fontSize:9,padding:"2px 7px"}}>✕</button></td>
                    </tr>
                  ].filter(Boolean);
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* ABA COMPRAS */}
        {aba==="compras"&&(()=>{
          const lista=items.filter(i=>i.qtdComprar>0);
          return (
            <div style={{padding:"14px 14px 28px",flex:1}}>
              {lista.length===0?(
                <div className="gl" style={{padding:40,textAlign:"center",color:"rgba(148,163,184,0.45)"}}>
                  <div style={{fontSize:36,marginBottom:10}}>✅</div>
                  <div style={{fontWeight:500}}>Nenhum item para comprar.</div>
                  <div style={{fontSize:10,marginTop:6,color:"rgba(148,163,184,0.3)"}}>Preencha as colunas Estoque e Mínimo na planilha.</div>
                </div>
              ):(
                <div style={{overflowX:"auto"}}>
                  <div style={{marginBottom:10,fontSize:11,color:"rgba(248,113,113,0.8)",fontWeight:600}}>🛒 {lista.length} iten(s) precisam ser comprados</div>
                  <table style={{width:"100%",borderCollapse:"collapse",minWidth:480}}>
                    <thead>
                      <tr>{["Código","Categoria","Descrição","Un.","Estoque","Mínimo","Comprar","Status","Obs."].map((h,i)=>(
                        <th key={i} style={{padding:"7px 10px",textAlign:i>=4&&i<=6?"center":"left",fontSize:9,color:"rgba(148,163,184,0.5)",fontWeight:600,textTransform:"uppercase",letterSpacing:.7,borderBottom:"1px solid rgba(255,255,255,0.06)"}}>{h}</th>
                      ))}</tr>
                    </thead>
                    <tbody>
                      {lista.map(it=>(
                        <tr key={it.id} className="row">
                          <td style={{padding:"6px 10px",color:"rgba(251,191,36,0.75)",fontWeight:600,fontSize:10,borderBottom:"1px solid rgba(255,255,255,0.035)"}}>{it.id}</td>
                          <td style={{padding:"6px 10px",fontSize:10,color:"rgba(148,163,184,0.55)",borderBottom:"1px solid rgba(255,255,255,0.035)"}}>{it.categoria}</td>
                          <td style={{padding:"6px 10px",fontSize:11,borderBottom:"1px solid rgba(255,255,255,0.035)"}}>{it.descricao}</td>
                          <td style={{padding:"6px 10px",fontSize:10,textAlign:"center",color:"rgba(148,163,184,0.55)",borderBottom:"1px solid rgba(255,255,255,0.035)"}}>{it.unidade}</td>
                          <td style={{padding:"6px 10px",textAlign:"center",borderBottom:"1px solid rgba(255,255,255,0.035)"}}>{it.qtdEstoque}</td>
                          <td style={{padding:"6px 10px",textAlign:"center",borderBottom:"1px solid rgba(255,255,255,0.035)"}}>{it.qtdMinima}</td>
                          <td style={{padding:"6px 10px",textAlign:"center",fontWeight:700,fontSize:15,color:"#f87171",borderBottom:"1px solid rgba(255,255,255,0.035)"}}>{it.qtdComprar}</td>
                          <td style={{padding:"6px 10px",borderBottom:"1px solid rgba(255,255,255,0.035)"}}><Badge st={it.status}/></td>
                          <td style={{padding:"6px 10px",fontSize:10,color:"rgba(148,163,184,0.45)",borderBottom:"1px solid rgba(255,255,255,0.035)"}}>{it.obs||"—"}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          );
        })()}
      </div>

      {/* MODAL NOVA CATEGORIA */}
      {mCat&&(
        <div className="ov" onClick={()=>setMCat(false)}>
          <div className="gl fi" onClick={e=>e.stopPropagation()} style={{padding:26,width:"100%",maxWidth:360,borderRadius:18}}>
            <div style={{fontWeight:600,marginBottom:14,fontSize:14}}>Nova Categoria</div>
            <input className="inp" autoFocus placeholder="Nome da categoria" value={novaCat} onChange={e=>setNovaCat(e.target.value)} onKeyDown={e=>e.key==="Enter"&&addCat()}/>
            <div style={{display:"flex",gap:8,marginTop:14,justifyContent:"flex-end"}}>
              <button className="btn" onClick={()=>setMCat(false)}>Cancelar</button>
              <button className="btn amber" onClick={addCat}>Adicionar</button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL RENOMEAR */}
      {mRen&&(
        <div className="ov" onClick={()=>setMRen(null)}>
          <div className="gl fi" onClick={e=>e.stopPropagation()} style={{padding:26,width:"100%",maxWidth:360,borderRadius:18}}>
            <div style={{fontWeight:600,marginBottom:14,fontSize:14}}>Renomear Categoria</div>
            <input className="inp" autoFocus value={renVal} onChange={e=>setRenVal(e.target.value)} onKeyDown={e=>e.key==="Enter"&&renCat()}/>
            <div style={{display:"flex",gap:8,marginTop:14,justifyContent:"flex-end"}}>
              <button className="btn" onClick={()=>setMRen(null)}>Cancelar</button>
              <button className="btn amber" onClick={renCat}>Salvar</button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL NOVO ITEM */}
      {mItem&&(
        <div className="ov" onClick={()=>setMItem(false)}>
          <div className="gl fi" onClick={e=>e.stopPropagation()} style={{padding:26,width:"100%",maxWidth:400,borderRadius:18}}>
            <div style={{fontWeight:600,marginBottom:14,fontSize:14}}>Adicionar Item</div>
            <div style={{display:"flex",flexDirection:"column",gap:10}}>
              <div>
                <div style={{fontSize:10,color:"rgba(148,163,184,0.5)",marginBottom:3}}>Categoria</div>
                <select className="inp" value={novoItem.categoria||cats[0]} onChange={e=>setNovoItem(p=>({...p,categoria:e.target.value}))}>
                  {cats.map(c=><option key={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <div style={{fontSize:10,color:"rgba(148,163,184,0.5)",marginBottom:3}}>Descrição</div>
                <input className="inp" autoFocus placeholder="Ex: Disjuntor Bipolar 40A" value={novoItem.descricao} onChange={e=>setNovoItem(p=>({...p,descricao:e.target.value}))} onKeyDown={e=>e.key==="Enter"&&addItem()}/>
              </div>
              <div>
                <div style={{fontSize:10,color:"rgba(148,163,184,0.5)",marginBottom:3}}>Unidade</div>
                <select className="inp" value={novoItem.unidade} onChange={e=>setNovoItem(p=>({...p,unidade:e.target.value}))}>
                  {["un","m","cx","kg","pc","rolo"].map(u=><option key={u}>{u}</option>)}
                </select>
              </div>
            </div>
            <div style={{display:"flex",gap:8,marginTop:16,justifyContent:"flex-end"}}>
              <button className="btn" onClick={()=>setMItem(false)}>Cancelar</button>
              <button className="btn amber" onClick={addItem}>Adicionar</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
