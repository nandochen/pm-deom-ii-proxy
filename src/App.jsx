import { useState } from 'react'
import { AuthClient } from "@dfinity/auth-client";
import './App.css'

function App() {
  const [principal, setPrincipal] = useState('NaN');
  const [identityStr, setIdentityStr] = useState('NaN');
  const identityProvider = 'https://identity.ic0.app/#authorize';
  const keyType = 'Ed25519';

  let TMAUrl = `https://t.me/cd202405001_bot/qooooo?startapp=`;
  let identity = null;

  async function IILogin() {
    try { 
      const authClient = await AuthClient.create({ keyType });
      // 
      await new Promise((resolve) => {
          authClient.login({
              identityProvider,
              onSuccess: resolve
          });
      });
      identity = authClient.getIdentity();
      setPrincipal(identity.getPrincipal().toString());
      console.log(identity); 
      console.log(identity._inner.getKeyPair()); 
      setIdentityStr(encodeURIComponent(JSON.stringify(identity._inner.getKeyPair())));
    } catch (e) {
      alert(e);
    }
  }

  function openTMA(e) {
    e.preventDefault();
    window.open(TMAUrl + identityStr);
  }

  return (
    <>
      <h1>II Proxy</h1>
      <div className="card">
        <button onClick={IILogin}>II Login</button>
        <p>Principal: <code>{principal}</code></p>
      </div>
      <div className="card">
        <button onClick={openTMA}>Open TMA</button>
      </div>
    </>
  )
}

export default App

function _isLocal(str) {
  return (str).indexOf('127.0.0.1') != -1 || (str).indexOf('localhost') != -1;
}
