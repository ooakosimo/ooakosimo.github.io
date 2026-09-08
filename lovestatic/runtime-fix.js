// LOVE STATIC runtime plumbing patch — mobile/audio/remote only.
// Keeps the padded-room / character drawing untouched.
(() => {
  const $ = id => document.getElementById(id);
  const STREAM_TRACKS = ['LoveStatic-Ooakosimo.mp3','Heartbreak-Hotel-on-Mars.mp3'];
  const STREAM_NAMES = ['LOVE STATIC','HEARTBREAK HOTEL ON MARS'];
  const VISUAL_PEER_ID = 'ooakosimo-lovestatic-vj';

  let streamCtx=null, streamAnalyser=null, streamData=null;
  let streamAudio=null, streamMediaNode=null;
  let streamMicSource=null, streamMicGain=null;
  let streamStatus='ready';

  let peerLibPromise=null, visualPeer=null;
  let remoteConns=new Set(), remoteStatus='starting';
  let stateTimer=null;

  function loadPeerJS(){
    if(window.Peer) return Promise.resolve(window.Peer);
    if(peerLibPromise) return peerLibPromise;
    peerLibPromise=new Promise((resolve,reject)=>{
      const s=document.createElement('script');
      s.src='https://cdn.jsdelivr.net/npm/peerjs@1.5.5/dist/peerjs.min.js';
      s.async=true;
      s.onload=()=>window.Peer?resolve(window.Peer):reject(new Error('PeerJS missing after load'));
      s.onerror=()=>reject(new Error('PeerJS CDN failed'));
      document.head.appendChild(s);
    });
    return peerLibPromise;
  }

  function ensureAudioGraph(){
    if(!streamCtx){
      const AC=window.AudioContext||window.webkitAudioContext;
      if(!AC) throw new Error('Web Audio unavailable');
      streamCtx=new AC();
      streamAnalyser=streamCtx.createAnalyser();
      streamAnalyser.fftSize=2048;
      streamAnalyser.smoothingTimeConstant=.78;
      streamData=new Uint8Array(streamAnalyser.frequencyBinCount);
    }
    if(streamCtx.state==='suspended') streamCtx.resume().catch(()=>{});
    return streamCtx;
  }

  function stopMicGraph(){
    try{if(streamMicSource)streamMicSource.disconnect()}catch(e){}
    try{if(streamMicGain)streamMicGain.disconnect()}catch(e){}
    if(micStream){try{micStream.getTracks().forEach(t=>t.stop())}catch(e){}}
    streamMicSource=null;streamMicGain=null;micStream=null;micSrc=null;micGainNode=null;
  }

  function detachMusicGraph(){
    try{if(streamMediaNode)streamMediaNode.disconnect()}catch(e){}
    try{if(streamAnalyser)streamAnalyser.disconnect()}catch(e){}
  }

  function ensureAudioElement(){
    ensureAudioGraph();
    if(!streamAudio){
      streamAudio=new Audio();
      streamAudio.preload='metadata';
      streamAudio.loop=true;
      streamAudio.playsInline=true;
      streamAudio.setAttribute('playsinline','');
      streamAudio.setAttribute('webkit-playsinline','');
      streamAudio.addEventListener('playing',()=>{streamStatus='playing';publishState()});
      streamAudio.addEventListener('waiting',()=>streamStatus='buffering');
      streamAudio.addEventListener('stalled',()=>streamStatus='buffering');
      streamAudio.addEventListener('canplay',()=>{if(streamStatus==='loading')streamStatus='ready'});
      streamAudio.addEventListener('error',()=>{streamStatus='audio error';console.warn('LOVE STATIC audio',streamAudio.error)});
      streamMediaNode=streamCtx.createMediaElementSource(streamAudio);
    }
    return streamAudio;
  }

  function setStartHint(text){const h=document.querySelector('#start .hint');if(h)h.textContent=text}

  launch=function(){
    started=true;
    const s=$('start'),dt=$('deckToggle'),d=$('deck');
    if(s)s.style.display='none';
    if(dt)dt.style.display='block';
    SHOW_DECK=false;
    if(d)d.style.display='none';
  };

  stopSong=function(){
    if(song){try{song.stop()}catch(e){}song=null}
    if(streamAudio){try{streamAudio.pause()}catch(e){}}
    detachMusicGraph();
  };

  startAuto=function(){
    stopSong();stopMicGraph();
    AUDIO_SOURCE='auto';AUTO_CRUISE=true;streamStatus='auto';
    launch();publishState();
  };

  startTrack=function(i){
    currentTrack=((Number(i)||0)%STREAM_TRACKS.length+STREAM_TRACKS.length)%STREAM_TRACKS.length;
    stopMicGraph();
    const a=ensureAudioElement();
    stopSong();
    AUDIO_SOURCE='music';streamStatus='loading';
    try{streamMediaNode.connect(streamAnalyser);streamAnalyser.connect(streamCtx.destination)}catch(e){console.warn('LOVE STATIC music graph',e)}
    a.src=STREAM_TRACKS[currentTrack];
    a.load();
    launch();
    const pp=a.play();
    if(pp&&pp.catch)pp.catch(err=>{streamStatus='tap MUSIC again';console.warn('LOVE STATIC play blocked',err)});
    publishState();
  };

  nextTrack=function(){startTrack(AUDIO_SOURCE==='music'?(currentTrack+1)%STREAM_TRACKS.length:currentTrack)};

  startMic=async function(){
    stopSong();stopMicGraph();
    AUDIO_SOURCE='mic';streamStatus='asking mic permission';launch();publishState();
    try{
      ensureAudioGraph();
      if(!navigator.mediaDevices||!navigator.mediaDevices.getUserMedia)throw new Error('getUserMedia unavailable');
      micStream=await navigator.mediaDevices.getUserMedia({audio:{echoCancellation:false,noiseSuppression:false,autoGainControl:false}});
      streamMicSource=streamCtx.createMediaStreamSource(micStream);
      streamMicGain=streamCtx.createGain();
      streamMicGain.gain.value=MIC_GAIN;
      streamMicSource.connect(streamMicGain);
      streamMicGain.connect(streamAnalyser);
      micSrc=streamMicSource;micGainNode=streamMicGain;
      streamStatus='mic live';publishState();
    }catch(e){streamStatus='mic failed';setStartHint('MIC FAILED — HTTPS + microphone permission required.');console.warn('LOVE STATIC microphone',e)}
  };

  function bandAverage(lo,hi){
    if(!streamAnalyser||!streamData||!streamCtx)return 0;
    const nyq=streamCtx.sampleRate/2,bins=streamData.length;
    let a=Math.max(0,Math.floor(lo/nyq*bins)),b=Math.min(bins-1,Math.ceil(hi/nyq*bins));
    let sum=0,n=0;for(let i=a;i<=b;i++){sum+=streamData[i];n++}
    return n?sum/n:0;
  }

  readAudio=function(){
    if(AUDIO_SOURCE==='auto'&&started){
      let t=millis()*.001,beat=pow(max(0,sin(t*2.35)),12),half=pow(max(0,sin(t*1.17+.4)),8),slow=sin(t*.29)*.5+.5;
      nrm.sub=.14+.68*half;nrm.bass=.08+.9*beat;nrm.lowMid=.12+.72*noise(t*.26+10);
      nrm.mid=.1+.72*(sin(t*.77+1.6)*.5+.5);nrm.high=.05+.86*pow(max(0,sin(t*1.43+2)),5);nrm.air=.04+.75*noise(t*.82+80)*(.35+.65*slow);
      for(let b of BANDS){nrm[b]=constrain(nrm[b]*SENSITIVITY,0,1);raw[b]=nrm[b]*190}
      return;
    }
    if(!started||!streamAnalyser||!streamData)return;
    streamAnalyser.getByteFrequencyData(streamData);
    for(let b of BANDS){raw[b]=bandAverage(HZ[b][0],HZ[b][1]);let v;if(NORMALIZE)[v,peak[b]]=adapt(raw[b],peak[b]);else v=raw[b]/255;nrm[b]=constrain(v*SENSITIVITY,0,1)}
  };

  toggleDeck=function(){
    SHOW_DECK=!SHOW_DECK;
    const d=$('deck'),b=$('deckToggle');
    if(d)d.style.display=SHOW_DECK?'grid':'none';
    if(b)b.textContent=SHOW_DECK?'× HIDE':'☰ DECK';
    publishState();
  };

  togglePanel=function(){SHOW_PANEL=!SHOW_PANEL;const p=$('panel');if(p)p.style.display=SHOW_PANEL?'block':'none';if(SHOW_PANEL)buildPanel()};

  // p5's original touchStarted() returned false globally, which cancels the
  // browser's synthetic click on phones/tablets. Never swallow UI touches.
  window.touchStarted=function(e){
    const target=e&&e.target;
    if(target&&target.closest&&target.closest('button,input,select,a,#start,#deck,#panel,#deckToggle'))return true;
    if(started&&!SHOW_PANEL&&typeof mousePressed==='function')mousePressed();
    return false;
  };

  bindUI=function(){
    const on=(id,fn)=>{const el=$(id);if(!el)return;el.onclick=e=>{e.stopPropagation();fn(e)}};
    on('micStart',()=>startMic());on('track1Start',()=>startTrack(0));on('track2Start',()=>startTrack(1));on('autoStart',()=>startAuto());
    document.querySelectorAll('[data-trigger]').forEach(b=>b.onclick=e=>{e.stopPropagation();trigger(b.dataset.trigger)});
    on('deckToggle',()=>toggleDeck());on('paletteBtn',()=>cyclePalette());on('autoBtn',()=>toggleAuto());on('freezeBtn',()=>toggleFreeze());
    on('hudBtn',()=>{SHOW_HUD=!SHOW_HUD;publishState()});on('panelBtn',()=>togglePanel());
    on('sensDown',()=>{SENSITIVITY=max(.2,SENSITIVITY-.1);publishState()});on('sensUp',()=>{SENSITIVITY=min(3,SENSITIVITY+.1);publishState()});
    on('trackBtn',()=>nextTrack());on('fullBtn',()=>fullscreen(!fullscreen()));
    document.querySelectorAll('button,input,select').forEach(el=>el.style.touchAction='manipulation');
  };

  buildPanel=function(){
    const p=$('panel');if(!p)return;
    let html='<h2>LOVE STATIC // MOD BAY</h2><div class="slot"><h3>GLOBAL</h3>'+rangeHTML('SENSITIVITY',SENSITIVITY,.2,3,.05)+'<div class="mini"><button id="normToggle">NORMALIZE '+(NORMALIZE?'ON':'OFF')+'</button><button id="densityToggle">DENSITY '+DENSITY+'</button></div></div>';
    for(let [k,m] of Object.entries(MODS))html+=`<div class="slot" data-mod="${k}"><h3>${m.name}</h3><div class="row"><label>band</label><select data-p="band">${BANDS.map(b=>`<option ${b===m.band?'selected':''}>${b}</option>`).join('')}</select></div>${rangeHTML('min',m.min,0,k==='heartPulse'||k==='beardStretch'?3:k==='lightning'?2:k==='scratches'?1:120,.01)}${rangeHTML('max',m.max,0,k==='heartPulse'||k==='beardStretch'?4:k==='lightning'?2:k==='scratches'?1:160,.01)}${rangeHTML('curve',m.curve,.2,3,.05)}${rangeHTML('attack',m.attack,.01,1,.01)}${rangeHTML('release',m.release,.01,.7,.01)}</div>`;
    p.innerHTML=html;
    const s=p.querySelector('[data-name="SENSITIVITY"]');if(s)s.oninput=e=>{SENSITIVITY=Number(e.target.value);e.target.nextElementSibling.textContent=SENSITIVITY.toFixed(2);publishState()};
    const nt=$('normToggle'),dt=$('densityToggle');if(nt)nt.onclick=()=>{NORMALIZE=!NORMALIZE;buildPanel();publishState()};if(dt)dt.onclick=()=>{DENSITY=DENSITY%3+1;buildScene();buildPanel();publishState()};
    p.querySelectorAll('[data-mod]').forEach(slot=>{let m=MODS[slot.dataset.mod];slot.querySelectorAll('select,input').forEach(el=>el.oninput=()=>{let prop=el.dataset.p||el.dataset.name;m[prop]=prop==='band'?el.value:Number(el.value);let out=el.nextElementSibling;if(out&&out.classList.contains('value'))out.textContent=Number(el.value).toFixed(2);publishState()})});
  };

  function stateObject(){return{type:'state',palette:PALETTES[paletteIndex].name,sensitivity:SENSITIVITY,micGain:MIC_GAIN,auto:AUTO_CRUISE,frozen:FROZEN,source:AUDIO_SOURCE,track:currentTrack,audio:streamStatus,fps:Math.round(frameRate())}}

  publishState=function(){
    const state=stateObject();
    for(const conn of [...remoteConns]){
      if(conn&&conn.open){try{conn.send(state)}catch(e){remoteConns.delete(conn)}}
      else remoteConns.delete(conn);
    }
  };

  handleRemote=function(c){
    if(!c||typeof c!=='object')return;
    lastControl=Date.now();
    if(c.type==='trigger')trigger(c.name,true);
    if(c.type==='action'){
      if(c.name==='palette')cyclePalette();
      if(c.name==='auto')toggleAuto();
      if(c.name==='freeze')toggleFreeze();
      if(c.name==='hud')SHOW_HUD=!SHOW_HUD;
      if(c.name==='deck')toggleDeck();
    }
    if(c.type==='set'&&c.path==='sensitivity')SENSITIVITY=constrain(Number(c.value),.2,3);
    if(c.type==='set'&&c.path==='micGain'){
      MIC_GAIN=constrain(Number(c.value),.2,8);
      if(streamMicGain)streamMicGain.gain.value=MIC_GAIN;
      if(micGainNode&&micGainNode.gain)micGainNode.gain.value=MIC_GAIN;
    }
    publishState();
  };

  function attachRemoteConn(conn){
    const markOpen=()=>{remoteConns.add(conn);remoteStatus='REMOTE ONLINE';publishState()};
    conn.on('open',markOpen);
    conn.on('data',data=>{try{handleRemote(data)}catch(e){console.warn('LOVE STATIC remote data',e)}});
    conn.on('close',()=>{remoteConns.delete(conn);remoteStatus=remoteConns.size?'REMOTE ONLINE':'waiting';publishState()});
    conn.on('error',e=>{remoteConns.delete(conn);remoteStatus='remote error';console.warn('LOVE STATIC Peer connection',e)});
    if(conn.open)markOpen();
  }

  async function connectPeerRemote(){
    try{
      await loadPeerJS();
      if(visualPeer&&!visualPeer.destroyed)return;
      remoteStatus='signaling';
      visualPeer=new Peer(VISUAL_PEER_ID,{debug:1});
      visualPeer.on('open',()=>{remoteStatus='READY';publishState()});
      visualPeer.on('connection',attachRemoteConn);
      visualPeer.on('disconnected',()=>{remoteStatus='reconnecting';try{visualPeer.reconnect()}catch(e){}});
      visualPeer.on('close',()=>{remoteStatus='offline';remoteConns.clear()});
      visualPeer.on('error',e=>{
        remoteStatus=e&&e.type==='unavailable-id'?'ID BUSY — close other LOVE STATIC visual':'peer error';
        console.warn('LOVE STATIC PeerJS',e);
      });
      if(stateTimer)clearInterval(stateTimer);stateTimer=setInterval(()=>publishState(),1500);
    }catch(e){remoteStatus='PeerJS failed';console.warn('LOVE STATIC PeerJS loader',e)}
  }

  // setup() in the original visual still calls connectMQTT(); repurpose that hook
  // so we do not touch the artwork's main file.
  connectMQTT=function(){connectPeerRemote()};

  drawHUD=function(){
    const h=$('hud');if(!h)return;if(!SHOW_HUD){h.textContent='';return}
    let bar=b=>'▮'.repeat(floor(nrm[b]*8))+'·'.repeat(8-floor(nrm[b]*8));
    let src=AUDIO_SOURCE.toUpperCase();if(AUDIO_SOURCE==='music')src+=' · '+STREAM_NAMES[currentTrack];
    h.textContent=`LOVE STATIC // ${src}\nSUB ${bar('sub')}  BASS ${bar('bass')}  LM ${bar('lowMid')}\nMID ${bar('mid')}  HIGH ${bar('high')}  AIR ${bar('air')}\nPAL ${PALETTES[paletteIndex].name}  SENS ${SENSITIVITY.toFixed(1)}  AUTO ${AUTO_CRUISE?'ON':'OFF'}  FPS ${frameRate().toFixed(0)}\nAUDIO ${streamStatus}  REMOTE ${remoteStatus}\nH:deck  S:mods  F:full`;
  };

  console.log('LOVE STATIC runtime patch v3 loaded');
})();