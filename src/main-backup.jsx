import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Navigate, NavLink, Route, Routes, useNavigate, useParams, useLocation } from 'react-router-dom';
import { QRCodeSVG as QRCode } from 'qrcode.react';
import {
  Activity, Archive, Bell, Brain, CheckCircle2, ChevronDown, ChevronLeft, ChevronRight,
  CircleUserRound, Clock3, CloudUpload, Database, Eye, FileCheck2, FileKey2, FileSearch,
  FileSignature, FileText, Fingerprint, FolderOpen, Gauge, Globe2, History, KeyRound,
  LayoutDashboard, LockKeyhole, LogIn, LogOut, Menu, MoreHorizontal, Network, QrCode,
  Search, Settings as SettingsGear, Shield, ShieldCheck, SlidersHorizontal, Sparkles, UploadCloud, UserPlus,
  Users, X, Zap
} from 'lucide-react';
import './styles.css';

const demoUser = JSON.parse(localStorage.getItem('securedoc_user') || JSON.stringify({name:'John Kumar',role:'Investigator',email:'john.kumar@securedoc.in',department:'Investigation'}));

const seedEvidence = [
  { id:'EV-001', caseId:'CASE-101', title:'Firing Report', type:'PDF', status:'Verified', uploadedBy:'Police Officer', date:'18 Sep 2026' },
  { id:'EV-002', caseId:'CASE-102', title:'CCTV Footage', type:'Video', status:'Verified', uploadedBy:'Investigator', date:'16 Sep 2026' },
  { id:'EV-003', caseId:'CASE-103', title:'Forensic Report', type:'PDF', status:'Verified', uploadedBy:'Forensic Expert', date:'17 Sep 2026' },
  { id:'EV-004', caseId:'CASE-104', title:'Call Recording', type:'Audio', status:'Verified', uploadedBy:'Police Officer', date:'15 Sep 2026' },
  { id:'EV-005', caseId:'CASE-105', title:'Document Scan', type:'PDF', status:'Verified', uploadedBy:'Investigator', date:'15 Sep 2026' },
  { id:'EV-006', caseId:'CASE-106', title:'Image Evidence', type:'Image', status:'Verified', uploadedBy:'Admin', date:'14 Sep 2026' },
  { id:'EV-007', caseId:'CASE-107', title:'Report Draft', type:'PDF', status:'Verified', uploadedBy:'Investigator', date:'14 Sep 2026' },
  { id:'EV-008', caseId:'CASE-108', title:'Video Clip', type:'Video', status:'Verified', uploadedBy:'Police Officer', date:'13 Sep 2026' },
];

const seedLogs = [
  ['19 Sep 2026, 09:15 AM','John Kumar','Login','192.168.1.10','Successful'],
  ['19 Sep 2026, 09:12 AM','Raj Sharma','Upload','192.168.1.11','EV-001'],
  ['19 Sep 2026, 08:50 AM','Niha Singh','View','192.168.1.12','EV-001'],
  ['19 Sep 2026, 11:20 AM','Amit Verma','Verify','192.168.1.13','EV-002'],
  ['19 Sep 2026, 06:45 PM','Priya Patel','Logout','192.168.1.15','Session End'],
];

function useEvidence(){
  const [evidence,setEvidence] = useState(()=>JSON.parse(localStorage.getItem('securedoc_evidence')||'null') || seedEvidence);
  useEffect(()=>localStorage.setItem('securedoc_evidence',JSON.stringify(evidence)),[evidence]);
  return [evidence,setEvidence];
}

function Layout({children}){
  const [collapsed,setCollapsed]=useState(false);
  const nav = useNavigate();
  const location=useLocation();
  const links=[
    ['Dashboard','/dashboard',LayoutDashboard],['Upload Evidence','/upload',CloudUpload],['Evidence List','/evidence',FolderOpen],['AI Search','/ai-search',Brain],['Chain of Custody','/custody',Network],['Audit Logs','/audit',History],['Digital Signature','/signature',FileSignature],['QR Tracking','/qr-tracking',QrCode],['Settings','/settings',SettingsGear]
  ];
  return <div className={'app '+(collapsed?'sidebar-collapsed':'')}>
    <aside className="sidebar">
      <div className="brand" onClick={()=>nav('/dashboard')}><div className="brand-icon"><ShieldCheck size={22}/></div><div><b>SecureDoc</b><small>Secure Digital Document Management System</small></div></div>
      <nav>{links.map(([label,to,Icon])=><NavLink key={to} to={to} className={({isActive})=>'nav-item '+(isActive?'active':'')}><Icon size={17}/><span>{label}</span></NavLink>)}</nav>
      <button className="sidebar-toggle" onClick={()=>setCollapsed(!collapsed)}><Menu size={18}/><span>{collapsed?'Expand':'Collapse'}</span></button>
      <div className="side-bottom"><div className="secure-pill"><LockKeyhole size={15}/> Secure session</div><button onClick={()=>nav('/login')}><LogOut size={16}/> <span>Logout</span></button></div>
    </aside>
    <main className="main">
      <header className="topbar"><div className="mobile-brand"><ShieldCheck size={20}/> SecureDoc</div><div className="top-actions"><button className="icon-btn"><Bell size={18}/><i></i></button><button className="profile" onClick={()=>nav('/settings')}><span className="avatar">JK</span><span><b>{demoUser.name}</b><small>{demoUser.role}</small></span><ChevronDown size={15}/></button></div></header>
      <div className="page-wrap">{children}</div>
    </main>
  </div>
}

function PageTitle({eyebrow,title,desc,action}){return <div className="page-title"><div><div className="eyebrow">{eyebrow}</div><h1>{title}</h1><p>{desc}</p></div>{action}</div>}
function Card({children,className=''}){return <section className={'card '+className}>{children}</section>}
function Stat({icon:Icon,label,value,delta,kind='blue'}){return <Card className="stat"><div className={'stat-icon '+kind}><Icon size={19}/></div><div className="stat-copy"><span>{label}</span><strong>{value}</strong><small className="positive">↗ {delta}</small></div></Card>}
function Status({children}){return <span className={'status '+children.toLowerCase().replace(' ','-')}><i></i>{children}</span>}

function Login(){
  const nav=useNavigate(); const [email,setEmail]=useState(''); const [password,setPassword]=useState('');
  const submit=(e)=>{e.preventDefault(); localStorage.setItem('securedoc_auth','1'); nav('/dashboard');};
  return <div className="auth-shell"><div className="auth-visual"><div className="auth-logo"><div className="brand-icon"><ShieldCheck/></div><div><b>SecureDoc</b><small>Secure Digital Document Management System</small></div></div><div className="auth-copy"><h1>Secure Evidence.<br/>Stronger Justice.</h1><p>A trusted platform for managing legal and investigation documents with end-to-end security, transparency, and AI-powered search.</p></div><div className="auth-shield"><Shield size={150}/></div><div className="auth-tags"><span>Encrypted</span><span>AI Powered</span><span>Audit Ready</span></div></div><div className="auth-form"><div className="auth-form-inner"><h2>Welcome Back</h2><p>Login to your account</p><form onSubmit={submit}><label>Email Address<input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Enter your email" type="email" required/></label><label>Password<div className="input-icon"><input value={password} onChange={e=>setPassword(e.target.value)} placeholder="Enter your password" type="password" required/><Eye size={17}/></div></label><div className="form-row"><label className="check"><input type="checkbox"/> Remember Me</label><button type="button" className="link-btn">Forgot Password?</button></div><button className="primary full"><LogIn size={17}/> Login</button></form><div className="or"><span>OR</span></div><button className="outline full" onClick={()=>nav('/dashboard')}><Fingerprint size={17}/> Login with OTP (MFA)</button><p className="bottom-note">Don't have an account? <button className="link-btn" onClick={()=>nav('/register')}>Register</button></p></div></div></div>
}

function Register(){const nav=useNavigate();return <div className="auth-shell"><div className="auth-visual register-visual"><div className="auth-logo"><div className="brand-icon"><ShieldCheck/></div><div><b>SecureDoc</b><small>Secure Digital Document Management System</small></div></div><div className="auth-copy"><h1>Secure Evidence.<br/>Stronger Justice.</h1><p>Join a secure network for legal & investigation services.</p></div><div className="auth-shield"><FileText size={150}/></div><div className="auth-tags"><span>Encrypted</span><span>AI Powered</span><span>Audit Ready</span></div></div><div className="auth-form"><div className="auth-form-inner"><h2>Create your Account</h2><p>Join a secure network for legal & investigation services.</p><form onSubmit={e=>{e.preventDefault();nav('/dashboard')}}><label>Full Name<input placeholder="Enter your full name" required/></label><label>Email Address<input type="email" placeholder="Enter your email" required/></label><label>Phone Number<input placeholder="Enter your phone number"/></label><label>Department<select><option>Select department</option><option>Investigation</option><option>Police</option><option>Forensic</option><option>Legal</option></select></label><label>Password<input type="password" placeholder="Create a strong password" required/></label><button className="primary full"><UserPlus size={17}/> Register</button></form><p className="bottom-note">Already have an account? <button className="link-btn" onClick={()=>nav('/login')}>Login</button></p></div></div></div>}

function Dashboard(){const [evidence]=useEvidence();return <><PageTitle eyebrow="OVERVIEW" title="Dashboard" desc={<>Welcome back, <b>{demoUser.name}</b>! Here's the latest overview of your system.</>}/><div className="stats-grid"><Stat icon={BriefcaseIcon} label="Total Cases" value="12" delta="15% from last week"/><Stat icon={FileCheck2} label="Total Evidence" value={evidence.length+40} delta="15% from last week" kind="cyan"/><Stat icon={Users} label="Active Users" value="8" delta="8% from last week" kind="purple"/><Stat icon={ShieldCheck} label="System Status" value="Secure" delta="All systems normal" kind="green"/></div><div className="dashboard-grid"><Card><div className="card-head"><div><h3>Evidence Uploads <small>(Last 7 Days)</small></h3></div><button className="ghost">View report</button></div><div className="fake-chart"><div className="chart-line"></div>{[20,48,32,56,39,68,52].map((v,i)=><div className="chart-point" key={i} style={{left:`${i*15+5}%`,bottom:`${v}%`}}><span>{i+1}</span></div>)}</div><div className="days"><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span></div></Card><Card><div className="card-head"><h3>Recent Activities</h3><button className="ghost">View all</button></div><div className="activity-list"><ActivityRow color="green" text="Evidence EV-001 uploaded" time="2 hours ago"/><ActivityRow color="blue" text="Case CASE-102 transferred" time="4 hours ago"/><ActivityRow color="orange" text="User admin logged in" time="6 hours ago"/><ActivityRow color="red" text="Evidence EV-001 verified" time="8 hours ago"/></div></Card></div><Card className="table-card"><div className="card-head"><h3>Recent Evidence</h3><NavLink to="/evidence" className="ghost">View All</NavLink></div><EvidenceTable rows={evidence.slice(0,4)}/></Card></>}
function BriefcaseIcon(){return <Archive size={19}/>}
function ActivityRow({color,text,time}){return <div className="activity-row"><span className={'activity-dot '+color}></span><span>{text}</span><time>{time}</time></div>}
function EvidenceTable({rows}){return <div className="table-scroll"><table><thead><tr><th>ID</th><th>Case ID</th><th>Title</th><th>Type</th><th>Status</th><th>Uploaded By</th><th>Date</th></tr></thead><tbody>{rows.map(r=><tr key={r.id}><td><b>{r.id}</b></td><td>{r.caseId}</td><td>{r.title}</td><td>{r.type}</td><td><Status>{r.status}</Status></td><td>{r.uploadedBy}</td><td>{r.date}</td></tr>)}</tbody></table></div>}

function Upload(){const [evidence,setEvidence]=useEvidence();const nav=useNavigate();const [file,setFile]=useState(null);const [caseId,setCaseId]=useState('');const [title,setTitle]=useState('');const [type,setType]=useState('PDF');const submit=()=>{if(!file||!caseId||!title)return alert('Please select a file and fill Case ID + Evidence Title.');const id='EV-'+String(evidence.length+1).padStart(3,'0');setEvidence([{id,caseId,title,type,status:'Verified',uploadedBy:demoUser.role,date:'23 Sep 2026'},...evidence]);setFile(null);setCaseId('');setTitle('');alert('Evidence uploaded in demo mode.');nav('/evidence');};return <><PageTitle eyebrow="EVIDENCE" title="Upload Evidence" desc="Upload new evidence with case details."/><div className="form-layout"><Card><div className="dropzone" onClick={()=>document.getElementById('file-input').click()}><UploadCloud size={42}/><h3>{file?file.name:'Drag & drop files here'}</h3><p>or</p><button className="outline">Choose Files</button><small>Supports: PDF, JPG, PNG, MP4, DOCX (Max 10MB)</small><input id="file-input" type="file" hidden onChange={e=>setFile(e.target.files[0])}/></div></Card><Card><h3>Evidence Details</h3><div className="form-grid"><label>Case ID<select value={caseId} onChange={e=>setCaseId(e.target.value)}><option value="">Select Case ID</option><option>CASE-101</option><option>CASE-102</option><option>CASE-103</option><option>CASE-104</option></select></label><label>Evidence Title<input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Enter evidence title"/></label><label className="full-field">Description<textarea placeholder="Enter description (optional)"/></label><label>Document Type<select value={type} onChange={e=>setType(e.target.value)}><option>PDF</option><option>Video</option><option>Audio</option><option>Image</option><option>DOCX</option></select></label></div><button className="primary full" onClick={submit}><CloudUpload size={17}/> Upload Evidence</button></Card></div></>}

function EvidenceList(){
  const [evidence]=useEvidence();
  const [q,setQ]=useState('');
  const [type,setType]=useState('All');
  const [status,setStatus]=useState('All');

  const filtered=evidence.filter(x=>{
    const text=Object.values(x).join(' ').toLowerCase();
    const searchMatch=text.includes(q.toLowerCase());
    const typeMatch=type==='All'||x.type===type;
    const statusMatch=status==='All'||x.status===status;
    return searchMatch&&typeMatch&&statusMatch;
  });

  return <>
    <PageTitle
      eyebrow="DOCUMENT MANAGEMENT"
      title="Evidence List"
      desc="Search, filter and manage all uploaded evidence."
      action={
        <NavLink to="/upload" className="primary">
          <UploadCloud size={17}/> Upload Evidence
        </NavLink>
      }
    />

    <Card className="table-card">
      <div className="toolbar">
        <div className="search">
          <Search size={17}/>
          <input
            value={q}
            onChange={e=>setQ(e.target.value)}
            placeholder="Search Evidence ID, Case ID, title..."
          />
        </div>

        <select value={type} onChange={e=>setType(e.target.value)}>
          <option value="All">All Types</option>
          <option value="PDF">PDF</option>
          <option value="Video">Video</option>
          <option value="Audio">Audio</option>
          <option value="Image">Image</option>
          <option value="DOCX">DOCX</option>
        </select>

        <select value={status} onChange={e=>setStatus(e.target.value)}>
          <option value="All">All Status</option>
          <option value="Verified">Verified</option>
          <option value="Pending">Pending</option>
        </select>

        <button
          className="outline"
          onClick={()=>{setQ('');setType('All');setStatus('All')}}
        >
          <SlidersHorizontal size={16}/> Reset
        </button>
      </div>

      <EvidenceTable rows={filtered}/>

      <div className="pagination">
        <span>
          Showing <b>{filtered.length}</b> of <b>{evidence.length}</b> evidence records
        </span>
        <div>
          <button className="current">1</button>
        </div>
      </div>
    </Card>
  </>
}
function Custody(){
  const [evidence]=useEvidence();
  const [q,setQ]=useState('EV-001');
  const [selected,setSelected]=useState(evidence[0] || null);

  const viewEvidence=()=>{
    const found=evidence.find(x=>
      x.id.toLowerCase()===q.toLowerCase() ||
      x.caseId.toLowerCase()===q.toLowerCase() ||
      x.title.toLowerCase().includes(q.toLowerCase())
    );

    setSelected(found || null);
  };

  const steps=[
    [
      'Police Upload',
      selected?.uploadedBy || 'Police Officer',
      selected?.date || '18 Sep 2026, 09:15 AM',
      'Completed'
    ],
    [
      'Investigator Review',
      'Niha Sharma (Investigator)',
      '18 Sep 2026, 12:20 PM',
      'Completed'
    ],
    [
      'Forensic Verification',
      'Amit Verma (Forensic Expert)',
      '19 Sep 2026, 10:20 AM',
      'Completed'
    ],
    [
      'Court Submission',
      'Court Officer',
      '19 Sep 2026, 01:10 PM',
      'In Progress'
    ]
  ];

  return <>
    <PageTitle
      eyebrow="TRACEABILITY"
      title="Chain of Custody"
      desc="Track the complete journey of evidence."
    />

    <Card className="custody-card">

      <div className="custody-search">

        <div className="search">
          <Search size={17}/>
          <input
            value={q}
            onChange={e=>setQ(e.target.value)}
            onKeyDown={e=>{
              if(e.key==='Enter') viewEvidence();
            }}
            placeholder="Search Evidence ID, Case ID or Title..."
          />
        </div>

        <button className="primary" onClick={viewEvidence}>
          <Search size={16}/>
          View
        </button>

      </div>

      {selected ? (
        <>
          <div className="custody-summary">

            <div>
              <span>Evidence ID</span>
              <b>{selected.id}</b>
            </div>

            <div>
              <span>Case ID</span>
              <b>{selected.caseId}</b>
            </div>

            <div>
              <span>Evidence</span>
              <b>{selected.title}</b>
            </div>

            <div>
              <span>Status</span>
              <Status>{selected.status}</Status>
            </div>

          </div>

          <div className="timeline">

            {steps.map((s,i)=>(
              <div className="timeline-row" key={s[0]}>

                <div className={
                  'timeline-icon '+(i===3?'progress':'')
                }>
                  <span>
                    {i===3 ? '4' : '?'}
                  </span>
                </div>

                <div className="timeline-content">

                  <div>
                    <b>{i+1}. {s[0]}</b>

                    <span className={
                      'step-status '+(i===3?'progress':'')
                    }>
                      {s[3]}
                    </span>
                  </div>

                  <p>By {s[1]}</p>
                  <small>{s[2]}</small>

                </div>

              </div>
            ))}

          </div>

          <div className="custody-footer">
            <ShieldCheck size={19}/>
            <div>
              <b>Evidence Integrity Protected</b>
              <p>
                Every custody step is recorded and traceable
                for authorized users.
              </p>
            </div>
          </div>

        </>
      ) : (

        <div className="ai-empty">
          <Search size={42}/>
          <h3>No evidence found</h3>
          <p>
            Try an Evidence ID, Case ID or evidence title.
          </p>
        </div>

      )}

    </Card>
  </>;
}
function Audit(){
  const [action,setAction]=useState('All');
  const [fromDate,setFromDate]=useState('2026-09-01');
  const [toDate,setToDate]=useState('2026-09-30');
  const [search,setSearch]=useState('');
  const [applied,setApplied]=useState({
    action:'All',
    fromDate:'2026-09-01',
    toDate:'2026-09-30',
    search:''
  });

  const filteredLogs=seedLogs.filter(r=>{
    const text=r.join(' ').toLowerCase();
    const matchesSearch=!applied.search ||
      text.includes(applied.search.toLowerCase());

    const matchesAction=
      applied.action==='All' ||
      r[2].toLowerCase()===applied.action.toLowerCase();

    return matchesSearch && matchesAction;
  });

  const applyFilters=()=>{
    setApplied({
      action,
      fromDate,
      toDate,
      search
    });
  };

  const clearFilters=()=>{
    setAction('All');
    setFromDate('2026-09-01');
    setToDate('2026-09-30');
    setSearch('');
    setApplied({
      action:'All',
      fromDate:'2026-09-01',
      toDate:'2026-09-30',
      search:''
    });
  };

  return <>
    <PageTitle
      eyebrow="SECURITY"
      title="Audit Logs"
      desc="Track all system activities and user actions."
    />

    <Card className="table-card">

      <div className="audit-toolbar">

        <label>
          From Date
          <input
            type="date"
            value={fromDate}
            onChange={e=>setFromDate(e.target.value)}
          />
        </label>

        <label>
          To Date
          <input
            type="date"
            value={toDate}
            onChange={e=>setToDate(e.target.value)}
          />
        </label>

        <label>
          Action
          <select
            value={action}
            onChange={e=>setAction(e.target.value)}
          >
            <option>All</option>
            <option>Login</option>
            <option>Upload</option>
            <option>View</option>
            <option>Verify</option>
          </select>
        </label>

        <label className="audit-search-field">
          Search
          <input
            value={search}
            onChange={e=>setSearch(e.target.value)}
            placeholder="Search user, action or details..."
          />
        </label>

        <div className="audit-buttons">
          <button className="primary" onClick={applyFilters}>
            <Search size={16}/>
            Search
          </button>

          <button className="outline" onClick={clearFilters}>
            Clear
          </button>
        </div>

      </div>

      <div className="audit-summary">
        <div>
          <b>{filteredLogs.length}</b>
          <span>Matching Activities</span>
        </div>

        <div>
          <b>Secure</b>
          <span>System Status</span>
        </div>

        <div>
          <b>SHA-256</b>
          <span>Integrity</span>
        </div>
      </div>

      <div className="table-scroll">
        <table>
          <thead>
            <tr>
              <th>Time</th>
              <th>User</th>
              <th>Action</th>
              <th>IP Address</th>
              <th>Details</th>
            </tr>
          </thead>

          <tbody>
            {filteredLogs.length>0 ? (
              filteredLogs.map((r,i)=>(
                <tr key={i}>
                  <td>{r[0]}</td>
                  <td><b>{r[1]}</b></td>
                  <td>
                    <span className="action-tag">
                      {r[2]}
                    </span>
                  </td>
                  <td>{r[3]}</td>
                  <td>{r[4]}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">
                  <div className="empty-state">
                    <History size={38}/>
                    <b>No audit records found</b>
                    <p>Try changing your filters.</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

    </Card>
  </>;
}
async function createSignature(text){const data=new TextEncoder().encode(text);const digest=await crypto.subtle.digest('SHA-256',data);return Array.from(new Uint8Array(digest)).map(b=>b.toString(16).padStart(2,'0')).join('');}
function Signature(){const [evidence]=useEvidence();const [selected,setSelected]=useState(evidence[0]?.id||'EV-001');const [signature,setSignature]=useState(null);const [busy,setBusy]=useState(false);const [qr,setQr]=useState('');const selectedDoc=evidence.find(x=>x.id===selected)||evidence[0];const sign=async()=>{setBusy(true);const hash=await createSignature(`${selectedDoc.id}|${selectedDoc.caseId}|${selectedDoc.title}|${selectedDoc.date}`);setSignature({hash,certificate:'SDC-CERT-2026-001',signedBy:demoUser.name,time:new Date().toLocaleString()});const url=`${window.location.origin}/#/track/${selectedDoc.id}`;setQr(url);setBusy(false)};return <><PageTitle eyebrow="TRUST & AUTHENTICITY" title="Digital Signature" desc="Sign documents securely with a browser-based cryptographic demo."/><div className="signature-grid"><Card><h3>Sign Document</h3><label>Select Document<select value={selected} onChange={e=>setSelected(e.target.value)}>{evidence.map(x=><option key={x.id}>{x.id} — {x.title}</option>)}</select></label><div className="certificate-box"><div className="cert-icon"><FileKey2 size={24}/></div><div><b>SecureDoc Digital Certificate</b><p>PKI-style demo certificate • SHA-256 document fingerprint</p></div><Status>Valid Certificate</Status></div><label>Reason for Signature<textarea defaultValue="Evidence authenticity verification"/></label><div className="sign-info"><ShieldCheck size={18}/><span>Your document will be signed using a cryptographic hash in this frontend demo. Backend PKI/HSM integration can replace this for production.</span></div><button className="primary full" onClick={sign} disabled={busy}><FileSignature size={17}/>{busy?'Signing...':'Sign Document'}</button></Card><Card><h3>Digital Certificate</h3>{signature?<><div className="valid-banner"><CheckCircle2 size={18}/><div><b>Valid Certificate</b><small>Signed successfully</small></div></div><div className="detail-list"><div><span>Signed To</span><b>{signature.signedBy}</b></div><div><span>Certificate</span><b>{signature.certificate}</b></div><div><span>SHA-256 Fingerprint</span><code>{signature.hash.slice(0,30)}...</code></div><div><span>Signed At</span><b>{signature.time}</b></div></div><div className="qr-mini"><QRCode value={qr} size={118}/><div><b>QR Tracking</b><p>Scan to open the public evidence tracking view.</p><small>{selectedDoc.id}</small></div></div></>:<div className="empty-state"><FileSignature size={40}/><b>No signature yet</b><p>Select a document and click Sign Document.</p></div>}</Card></div><Card className="signature-banner"><div className="banner-icon"><FileSignature size={46}/></div><div><h2>Digital Signature</h2><p>Authenticate · Verify · Protect</p><ul><li>PKI-ready digital signature workflow</li><li>Document fingerprint prevents unnoticed changes</li><li>Non-repudiation support</li><li>Designed for court-ready evidence workflows</li></ul></div></Card></>}

function QRTracking(){const {id}=useParams();const [evidence]=useEvidence();const doc=evidence.find(x=>x.id===id)||evidence[0];const trackingUrl=`${window.location.origin}/#/track/${doc.id}`;return <div className="tracking-page"><div className="tracking-header"><div className="brand"><div className="brand-icon"><ShieldCheck/></div><div><b>SecureDoc</b><small>Evidence Verification Portal</small></div></div><span className="public-pill"><Globe2 size={14}/> Public verification</span></div><div className="tracking-card"><div className="qr-large"><QRCode value={trackingUrl} size={180}/></div><div className="verified-title"><CheckCircle2 size={22}/> Evidence record found</div><h1>{doc.id}</h1><p className="tracking-sub">Secure tracking record for <b>{doc.title}</b></p><div className="tracking-details"><div><span>Case ID</span><b>{doc.caseId}</b></div><div><span>Document Type</span><b>{doc.type}</b></div><div><span>Uploaded By</span><b>{doc.uploadedBy}</b></div><div><span>Status</span><Status>{doc.status}</Status></div><div><span>Upload Date</span><b>{doc.date}</b></div><div><span>Integrity</span><b className="green-text">SHA-256 verified</b></div></div><div className="track-timeline"><div><i></i><span><b>Uploaded</b><small>Evidence registered in SecureDoc</small></span></div><div><i></i><span><b>Verified</b><small>Record marked as verified</small></span></div><div><i></i><span><b>Traceable</b><small>Chain of custody available to authorized users</small></span></div></div><button className="outline" onClick={()=>window.print()}><FileCheck2 size={16}/> Print verification</button></div><p className="tracking-foot">SecureDoc · Secure · Intelligent · Court-Ready</p></div>}

function AISearch(){
  const [q,setQ]=useState('');
  const [searched,setSearched]=useState(false);

  const suggestions=[
    'Show me all CCTV footage from CASE-102',
    'Show evidence from CASE-101',
    'Find forensic reports',
    'Show video evidence',
    'Show recent evidence'
  ];

  const [evidence]=useEvidence();

  const results=evidence.filter(x=>{
    const text=Object.values(x).join(' ').toLowerCase();
    const query=q.toLowerCase().trim();

    if(!query) return false;

    if(query.includes('case-102') && query.includes('cctv')){
      return x.caseId==='CASE-102' &&
        (x.type.toLowerCase().includes('video') ||
         x.title.toLowerCase().includes('cctv'));
    }

    if(query.includes('case-101'))
      return x.caseId==='CASE-101';

    if(query.includes('video') || query.includes('cctv'))
      return x.type.toLowerCase().includes('video') ||
             x.title.toLowerCase().includes('cctv');

    if(query.includes('forensic'))
      return text.includes('forensic');

    return text.includes(query);
  });

  const search=()=>{
    setSearched(true);
  };

  return <>
    <PageTitle
      eyebrow="INTELLIGENCE"
      title="AI Powered Search"
      desc="Find evidence, cases, and documents using natural language."
    />

    <Card className="ai-card">

      <div className="ai-search">
        <div className="search">
          <Sparkles size={18}/>
          <input
            value={q}
            onChange={e=>{
              setQ(e.target.value);
              setSearched(false);
            }}
            onKeyDown={e=>{
              if(e.key==='Enter') search();
            }}
            placeholder='e.g. "Show me all CCTV footage from CASE-102"'
          />
        </div>

        <button className="primary" onClick={search}>
          <Search size={17}/>
          Search
        </button>
      </div>

      <div className="suggestion-title">
        Suggested Searches
      </div>

      <div className="suggestions">
        {suggestions.map(s=>(
          <button
            key={s}
            onClick={()=>{
              setQ(s);
              setSearched(false);
            }}
          >
            <Sparkles size={14}/>
            {s}
          </button>
        ))}
      </div>

      {!searched ? (
        <div className="ai-empty">
          <Brain size={48}/>
          <h3>Ask anything...</h3>
          <p>
            Use natural language to search across all your
            documents and evidence.
          </p>
        </div>
      ) : results.length===0 ? (
        <div className="ai-empty">
          <Search size={42}/>
          <h3>No evidence found</h3>
          <p>
            Try another Case ID, Evidence ID, title or evidence type.
          </p>
        </div>
      ) : (
        <div className="ai-results">

          <div className="ai-result-head">
            <div>
              <h3>Search Results</h3>
              <p>{results.length} matching evidence record(s) found</p>
            </div>

            <span className="ai-found">
              AI Match
            </span>
          </div>

          <div className="ai-result-list">
            {results.map(r=>(
              <div className="ai-result" key={r.id}>

                <div className="ai-result-icon">
                  {r.type.toLowerCase().includes('video')
                    ? <FileVideo size={22}/>
                    : <FileText size={22}/>
                  }
                </div>

                <div className="ai-result-info">
                  <div className="ai-result-title">
                    <b>{r.title}</b>
                    <Status>{r.status}</Status>
                  </div>

                  <div className="ai-result-meta">
                    <span>Evidence: <b>{r.id}</b></span>
                    <span>Case: <b>{r.caseId}</b></span>
                    <span>Type: <b>{r.type}</b></span>
                    <span>Date: <b>{r.date}</b></span>
                  </div>
                </div>

                <button
                  className="outline"
                  onClick={()=>alert(
                    `Evidence: ${r.id}\nCase: ${r.caseId}\nTitle: ${r.title}`
                  )}
                >
                  View
                </button>

              </div>
            ))}
          </div>

        </div>
      )}

    </Card>
  </>;
}
function Settings(){
  const [tab,setTab]=useState('Profile');
  const [twoFA,setTwoFA]=useState(true);
  const [emailNotif,setEmailNotif]=useState(true);
  const [loginNotif,setLoginNotif]=useState(true);
  const [uploadNotif,setUploadNotif]=useState(true);
  const [darkMode,setDarkMode]=useState(false);

  const toggleDark=()=>{
    setDarkMode(!darkMode);
    document.body.classList.toggle('dark-mode');
  };

  return <>
    <PageTitle
      eyebrow="PREFERENCES"
      title="Settings"
      desc="Manage your account, security and system preferences."
    />

    <div className="settings-layout">

      <Card className="settings-menu">
        {['Profile','Security','Notifications','Appearance','System'].map(t=>
          <button
            className={tab===t?'active':''}
            key={t}
            onClick={()=>setTab(t)}
          >
            <SettingsIcon tab={t}/>
            {t}
          </button>
        )}
      </Card>

      <Card>

        <h3>{tab}</h3>

        {tab==='Profile' &&
        <div className="profile-settings">
          <div className="big-avatar">JK</div>

          <label>
            Name
            <input defaultValue={demoUser.name}/>
          </label>

          <label>
            Email
            <input defaultValue={demoUser.email}/>
          </label>

          <label>
            Department
            <input defaultValue={demoUser.department}/>
          </label>

          <button
            className="primary"
            onClick={()=>alert('Profile updated successfully!')}
          >
            Update Profile
          </button>
        </div>
        }

        {tab==='Security' &&
        <div className="settings-options">

          <div className="security-box">
            <ShieldCheck size={28}/>
            <div>
              <b>Secure Account</b>
              <p>Your account is protected with SecureDoc security controls.</p>
            </div>
          </div>

          <div className="setting-row">
            <div>
              <b>Two-Factor Authentication</b>
              <small>Add an extra layer of protection to your account.</small>
            </div>
            <button
              className={'toggle '+(twoFA?'on':'')}
              onClick={()=>setTwoFA(!twoFA)}
            >
              {twoFA?'ON':'OFF'}
            </button>
          </div>

          <div className="setting-row">
            <div>
              <b>Password Security</b>
              <small>Last password update: Recently</small>
            </div>
            <button
              className="outline"
              onClick={()=>alert('Password change option opened.')}
            >
              Change Password
            </button>
          </div>

          <div className="setting-row">
            <div>
              <b>Active Session</b>
              <small>This browser session is currently active.</small>
            </div>
            <span className="status Verified">
              <i></i>Active
            </span>
          </div>

        </div>
        }

        {tab==='Notifications' &&
        <div className="settings-options">

          <div className="setting-row">
            <div>
              <b>Email Notifications</b>
              <small>Receive important system updates by email.</small>
            </div>
            <button
              className={'toggle '+(emailNotif?'on':'')}
              onClick={()=>setEmailNotif(!emailNotif)}
            >
              {emailNotif?'ON':'OFF'}
            </button>
          </div>

          <div className="setting-row">
            <div>
              <b>Login Alerts</b>
              <small>Get notified when your account is accessed.</small>
            </div>
            <button
              className={'toggle '+(loginNotif?'on':'')}
              onClick={()=>setLoginNotif(!loginNotif)}
            >
              {loginNotif?'ON':'OFF'}
            </button>
          </div>

          <div className="setting-row">
            <div>
              <b>Evidence Upload Alerts</b>
              <small>Receive alerts when new evidence is uploaded.</small>
            </div>
            <button
              className={'toggle '+(uploadNotif?'on':'')}
              onClick={()=>setUploadNotif(!uploadNotif)}
            >
              {uploadNotif?'ON':'OFF'}
            </button>
          </div>

        </div>
        }

        {tab==='Appearance' &&
        <div className="settings-options">

          <div className="setting-row">
            <div>
              <b>Dark Mode</b>
              <small>Switch between light and dark interface.</small>
            </div>
            <button
              className={'toggle '+(darkMode?'on':'')}
              onClick={toggleDark}
            >
              {darkMode?'ON':'OFF'}
            </button>
          </div>

          <div className="setting-row">
            <div>
              <b>Interface Theme</b>
              <small>SecureDoc professional dashboard theme.</small>
            </div>
            <span className="status Verified">
              <i></i>Professional
            </span>
          </div>

        </div>
        }

        {tab==='System' &&
        <div className="settings-options">

          <div className="setting-row">
            <div>
              <b>Data Storage</b>
              <small>Local browser storage enabled for this prototype.</small>
            </div>
            <span className="status Verified">
              <i></i>Active
            </span>
          </div>

          <div className="setting-row">
            <div>
              <b>System Status</b>
              <small>All SecureDoc frontend services are running.</small>
            </div>
            <span className="status Verified">
              <i></i>Secure
            </span>
          </div>

          <div className="setting-row">
            <div>
              <b>Application Version</b>
              <small>SecureDoc SIH 2026 Prototype</small>
            </div>
            <b>v1.0.0</b>
          </div>

          <button
            className="outline"
            onClick={()=>{
              if(confirm('Reset demo data?')){
                localStorage.clear();
                alert('Demo data cleared. Please login again.');
                window.location.href='/login';
              }
            }}
          >
            Reset Demo Data
          </button>

        </div>
        }

      </Card>
    </div>
  </>
}
function SettingsIcon({tab}){const I=tab==='Profile'?CircleUserRound:tab==='Security'?ShieldCheck:tab==='Notifications'?Bell:tab==='Appearance'?SlidersHorizontal:SettingsGear;return <I size={16}/>}
function Protected(){return localStorage.getItem('securedoc_auth')?<Layout><Routes><Route path="/dashboard" element={<Dashboard/>}/><Route path="/upload" element={<Upload/>}/><Route path="/evidence" element={<EvidenceList/>}/><Route path="/ai-search" element={<AISearch/>}/><Route path="/custody" element={<Custody/>}/><Route path="/audit" element={<Audit/>}/><Route path="/signature" element={<Signature/>}/><Route path="/qr-tracking" element={<QRTrackingHome/>}/><Route path="/settings" element={<Settings/>}/><Route path="*" element={<Navigate to="/dashboard" replace/>}/></Routes></Layout>:<Navigate to="/login" replace/>}
function QRTrackingHome(){const [evidence]=useEvidence();return <><PageTitle eyebrow="VERIFICATION" title="QR Tracking" desc="Generate and test QR links for evidence verification."/><Card><div className="qr-home-grid">{evidence.slice(0,6).map(doc=><div className="qr-card" key={doc.id}><QRCode value={`${window.location.origin}/#/track/${doc.id}`} size={110}/><div><b>{doc.id}</b><p>{doc.title}</p><Status>{doc.status}</Status><NavLink className="link-btn" to={`/track/${doc.id}`}>Open tracking</NavLink></div></div>)}</div></Card></>}
function App(){return <Routes><Route path="/login" element={<Login/>}/><Route path="/register" element={<Register/>}/><Route path="/track/:id" element={<QRTracking/>}/><Route path="/*" element={<Protected/>}/></Routes>}
createRoot(document.getElementById('root')).render(<BrowserRouter><App/></BrowserRouter>);
















