const fs = require('fs');

const code = fs.readFileSync('src/components/public/PortalLogin.tsx', 'utf8');

const returnRegex = /return \([\s\S]*\}\;/;

const newReturn = `return (
    <div className="min-h-screen bg-stone-50 flex items-center justify-center p-4 sm:p-8 font-sans selection:bg-amber-100 selection:text-amber-600 relative overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute inset-0 z-0">
        <motion.div 
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }} 
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-gradient-to-br from-amber-500/20 to-orange-600/10 rounded-full blur-3xl pointer-events-none"
        />
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }} 
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] bg-gradient-to-tr from-stone-800/10 to-stone-900/5 rounded-full blur-3xl pointer-events-none"
        />
      </div>

      {/* GLOBAL CUSTOM TOAST ENGINE */}
      <AnimatePresence>
        {toast && createPortal(
          <motion.div 
            initial={{ opacity: 0, y: -50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.9 }}
            className={\`fixed top-6 left-1/2 transform -translate-x-1/2 z-[10000] px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-4 \${toast.type === 'error' ? 'bg-red-900' : 'bg-gray-900'} text-white\`}
          >
             <div className={\`p-2 rounded-full shrink-0 \${toast.type === 'offline' ? 'bg-amber-500/20 text-amber-500' : toast.type === 'error' ? 'bg-red-500/20 text-red-400' : 'bg-green-500/20 text-green-400'}\`}>
               {toast.type === 'offline' ? <WifiOff size={20}/> : toast.type === 'error' ? <AlertTriangle size={20}/> : <CheckCircle2 size={20}/>}
             </div>
             <div>
               <p className={\`text-xs font-black uppercase tracking-widest mb-0.5 \${toast.type === 'offline' ? 'text-amber-400' : toast.type === 'error' ? 'text-red-400' : 'text-green-400'}\`}>
                 {toast.type === 'offline' ? 'Offline Cache' : toast.type === 'error' ? 'Error' : 'Success'}
               </p>
               <p className="text-sm font-bold">{toast.message}</p>
             </div>
          </motion.div>,
          document.body
        )}
      </AnimatePresence>

      {/* OFFLINE BANNER */}
      <AnimatePresence>
        {!isOnline && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-0 w-full bg-red-600 text-white p-2 text-center flex items-center justify-center gap-2 shadow-sm z-[110]"
          >
            <WifiOff size={14} />
            <span className="text-[10px] font-black uppercase tracking-widest">Offline Mode: Cached Login Active</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Container */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-6xl bg-white/80 backdrop-blur-xl rounded-[2rem] shadow-2xl border border-white/50 overflow-hidden flex flex-col lg:flex-row relative z-10"
      >
        
        {/* Left Side: Branding & Visuals */}
        <div className="lg:w-5/12 bg-stone-950 p-8 lg:p-12 relative overflow-hidden flex flex-col justify-between hidden md:flex">
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-500 via-stone-900 to-stone-950"></div>
          
          <div className="relative z-10 flex items-center gap-3">
             <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-600 rounded-2xl shadow-lg flex items-center justify-center text-white">
                <Flame size={24} fill="currentColor" />
             </div>
             <div>
                <h1 className="text-2xl font-black text-white tracking-tight">{t('app_name')}</h1>
                <p className="text-[10px] font-bold text-amber-500 uppercase tracking-widest">{t('portal_subtitle')}</p>
             </div>
          </div>

          <div className="relative z-10 my-16">
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl lg:text-5xl font-black text-white leading-[1.1] tracking-tight mb-6"
            >
              Secure Identity <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">& Community</span> <br/>Management.
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="text-stone-400 font-medium leading-relaxed max-w-sm"
            >
              Access your digital ashram, manage devotees, coordinate events, and secure your community data with enterprise-grade encryption.
            </motion.p>
          </div>

          <div className="relative z-10 flex items-center justify-between border-t border-stone-800 pt-6">
             <div className="flex items-center gap-2 text-stone-500 text-xs font-bold">
               <ShieldCheck size={16} className="text-emerald-500" />
               AES-256 ENCRYPTED
             </div>
             
             <div className="relative flex items-center bg-stone-900 rounded-xl p-1 border border-stone-800">
                <Languages size={14} className="text-stone-400 ml-2 mr-1" />
                <select 
                  value={language} 
                  onChange={(e) => setLanguage(e.target.value as any)}
                  className="bg-transparent text-xs font-bold text-stone-300 outline-none cursor-pointer pr-2 appearance-none"
                >
                  <option value="en">English</option>
                  <option value="hi">हिंदी</option>
                  <option value="bn">বাংলা</option>
                </select>
             </div>
          </div>
        </div>

        {/* Right Side: Authentication Forms */}
        <div className="w-full lg:w-7/12 p-6 sm:p-10 lg:p-12 relative flex flex-col">
          
          {/* Header toggles */}
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-black text-stone-900">
              {activeView === 'LOGIN' ? 'Welcome Back' : 'Create Workspace'}
            </h3>
            
            <div className="flex bg-stone-100 p-1 rounded-xl">
               <button 
                 onClick={() => { setActiveView('LOGIN'); clearErrors(); }} 
                 className={\`px-4 py-2 text-[10px] sm:text-xs font-black uppercase tracking-widest rounded-lg transition-all \${activeView === 'LOGIN' ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-500 hover:text-stone-700'}\`}
               >
                 Login
               </button>
               <button 
                 onClick={() => { setActiveView('REGISTER'); clearErrors(); }} 
                 className={\`px-4 py-2 text-[10px] sm:text-xs font-black uppercase tracking-widest rounded-lg transition-all \${activeView === 'REGISTER' ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-500 hover:text-stone-700'}\`}
               >
                 Sign Up
               </button>
            </div>
          </div>

          <div className="flex-1 relative">
            
            {/* FULLSCREEN BIOMETRIC SCANNER OVERLAY */}
            <AnimatePresence>
            {isBiometricPromptActive && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="absolute inset-0 bg-stone-950/95 backdrop-blur-md z-50 flex flex-col items-center justify-center rounded-3xl p-6 shadow-2xl border border-stone-800"
              >
                 <button onClick={() => setIsBiometricPromptActive(false)} className="absolute top-4 right-4 bg-white/10 text-white p-2 rounded-full hover:bg-red-500 transition-colors z-50">
                   <X size={24}/>
                 </button>
                 <div className="w-24 h-24 bg-emerald-500/20 rounded-full flex items-center justify-center relative mb-6">
                   <div className="absolute inset-0 border-[3px] border-emerald-500/30 rounded-full animate-ping"></div>
                   <div className="absolute inset-2 border-[2px] border-emerald-500/50 rounded-full animate-pulse"></div>
                   <Fingerprint size={48} className="text-emerald-400 relative z-10" />
                 </div>
                 <h3 className="text-white text-lg font-black uppercase tracking-widest mb-2 text-center">Touch Sensor</h3>
                 <p className="text-stone-400 text-xs font-bold text-center leading-relaxed">
                   Waiting for device biometric verification.<br/>Use Touch ID, Face ID, or your device PIN.
                 </p>
                 <button onClick={() => setIsBiometricPromptActive(false)} className="mt-8 text-stone-500 text-[10px] font-black uppercase tracking-widest hover:text-white transition-colors border-b border-stone-700 pb-1">
                   Use Manual Password Instead
                 </button>
              </motion.div>
            )}
            </AnimatePresence>

            {/* FULLSCREEN QR SCANNER OVERLAY */}
            <AnimatePresence>
            {isScanning && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="absolute inset-0 bg-stone-950/95 backdrop-blur-md z-50 flex flex-col items-center justify-center rounded-3xl p-4 shadow-2xl border border-stone-800"
              >
                 <button onClick={stopScanner} className="absolute top-4 right-4 bg-white/10 text-white p-2 rounded-full hover:bg-red-500 transition-colors z-50">
                   <X size={24}/>
                 </button>
                 <h3 className="text-white font-black uppercase tracking-widest mb-4 flex items-center gap-2"><QrCode/> Scan Official ID</h3>
                 <div className="relative w-64 h-64 rounded-3xl overflow-hidden border-4 border-amber-500 shadow-[0_0_50px_rgba(245,158,11,0.3)]">
                    <video ref={videoRef} className="absolute inset-0 w-full h-full object-cover" />
                    <canvas ref={canvasRef} className="hidden" />
                    <div className="absolute inset-0 border-[3px] border-white/30 m-8 rounded-xl pointer-events-none"></div>
                    <div className="absolute top-1/2 left-0 w-full h-0.5 bg-amber-500/50 shadow-[0_0_8px_#f59e0b] animate-pulse"></div>
                 </div>
                 <p className="text-stone-400 text-xs mt-6 font-bold text-center">Align QR code within the frame</p>
              </motion.div>
            )}
            </AnimatePresence>

            <AnimatePresence mode="wait">
              {activeView === 'LOGIN' ? (
                <motion.form 
                  key="login"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  onSubmit={handleSmartLogin} 
                  className={\`space-y-5 \${isScanning ? 'opacity-0' : 'opacity-100'}\`}
                >
                  <div className="bg-indigo-50/50 border border-indigo-100/50 p-4 rounded-2xl mb-6 text-center shadow-inner">
                    <p className="text-[10px] font-black text-indigo-800 uppercase tracking-widest flex items-center justify-center gap-1.5"><ShieldCheck size={14}/> Universal Access Portal</p>
                    <p className="text-xs text-indigo-600/80 mt-1 font-semibold">Secure login for Admins, Members, and Purohits</p>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-6">
                     <button type="button" onClick={startScanner} className="group bg-white hover:bg-stone-50 border border-stone-200 text-stone-700 font-bold py-4 rounded-2xl text-[10px] sm:text-xs uppercase tracking-widest transition-all flex flex-col justify-center items-center gap-2 shadow-sm hover:shadow-md">
                       <div className="p-2 bg-amber-100 text-amber-600 rounded-full group-hover:scale-110 transition-transform"><QrCode size={20}/></div>
                       Scan Pass
                     </button>
                     <button type="button" onClick={handleBiometricLogin} className="group bg-white hover:bg-stone-50 border border-stone-200 text-stone-700 font-bold py-4 rounded-2xl text-[10px] sm:text-xs uppercase tracking-widest transition-all flex flex-col justify-center items-center gap-2 shadow-sm hover:shadow-md">
                       <div className="p-2 bg-emerald-100 text-emerald-600 rounded-full group-hover:scale-110 transition-transform"><Fingerprint size={20}/></div>
                       Passkey
                     </button>
                  </div>

                  <div className="flex items-center gap-4 py-2 opacity-60">
                     <div className="h-px bg-stone-300 flex-1"></div>
                     <span className="text-[10px] font-bold text-stone-500 uppercase tracking-widest">OR USE CREDENTIALS</span>
                     <div className="h-px bg-stone-300 flex-1"></div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-[10px] font-black text-stone-600 uppercase tracking-widest mb-1.5">{t('login_identity')}</label>
                      <div className="relative group">
                        <User size={18} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-stone-400 group-focus-within:text-amber-500 transition-colors" />
                        <input type="text" required value={loginIdentity} onChange={e=>setLoginIdentity(e.target.value)} placeholder="Email, Phone, or ID" className="w-full pl-12 pr-4 py-4 bg-white border border-stone-200 rounded-2xl text-sm font-bold text-stone-800 focus:border-amber-500 outline-none transition-all shadow-sm focus:ring-4 focus:ring-amber-50" />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between items-end mb-1.5">
                        <label className="block text-[10px] font-black text-stone-600 uppercase tracking-widest">{t('login_pass')}</label>
                        <button type="button" onClick={handleForgotPassword} className="text-[10px] font-bold text-amber-600 hover:text-amber-700 transition-colors">
                          {t('login_forgot')}
                        </button>
                      </div>
                      <div className="relative group">
                        <Key size={18} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-stone-400 group-focus-within:text-amber-500 transition-colors" />
                        <input type="password" required value={loginCredential} onChange={e=>setLoginCredential(e.target.value)} placeholder="Enter Password or PIN" className="w-full pl-12 pr-4 py-4 bg-white border border-stone-200 rounded-2xl text-sm font-bold text-stone-800 focus:border-amber-500 outline-none transition-all shadow-sm focus:ring-4 focus:ring-amber-50" />
                      </div>
                    </div>
                  </div>

                  <AnimatePresence>
                    {error && (
                      <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
                        <div className="bg-red-50 border border-red-200 text-red-600 p-3.5 rounded-xl text-xs font-bold text-center shadow-sm flex items-center justify-center gap-2">
                          <AlertTriangle size={14}/> {error}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <button type="submit" disabled={loading} className="w-full bg-stone-900 hover:bg-black text-white font-black py-4 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.2)] hover:-translate-y-0.5 text-xs uppercase tracking-widest transition-all flex justify-center items-center gap-2 mt-6 disabled:opacity-50 disabled:hover:translate-y-0">
                    {loading ? <Loader2 size={18} className="animate-spin" /> : t('btn_access_portal')}
                  </button>
                </motion.form>
              ) : (
                <motion.form 
                  key="register"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  onSubmit={handleRegister} 
                  className="space-y-6 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar"
                >
                  <div className="bg-amber-50/50 border border-amber-200 p-4 rounded-2xl flex items-start gap-3 shadow-inner">
                    <AlertTriangle className="text-amber-600 shrink-0 mt-0.5" size={20} />
                    <div>
                      <h4 className="text-amber-800 font-black text-xs uppercase tracking-widest mb-1">{t('reg_warning_title')}</h4>
                      <p className="text-[10px] text-amber-700 font-medium leading-relaxed">
                        {t('reg_warning_desc_1')}<strong className="font-black text-amber-900">{regData.type}</strong>{t('reg_warning_desc_2')}
                      </p>
                    </div>
                  </div>

                  <div className="bg-stone-50/50 p-5 rounded-2xl border border-stone-200 space-y-4">
                    <h4 className="text-[10px] font-black text-stone-500 uppercase tracking-widest border-b border-stone-200 pb-2 flex items-center gap-2"><Building2 size={14}/> {t('reg_step1')}</h4>
                    
                    <div>
                      <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-widest mb-1">{t('reg_org_type')}</label>
                      <select value={regData.type} onChange={e=>setRegData({...regData, type: e.target.value as WorkspaceType})} className="w-full p-3.5 bg-white border border-stone-200 rounded-xl text-sm font-bold text-stone-800 focus:border-amber-500 outline-none transition-all cursor-pointer shadow-sm">
                        <option value="Mandir">Mandir / Temple</option>
                        <option value="Ashram">Ashram</option>
                        <option value="Trust">Trust / NGO</option>
                        <option value="PurohitSabha">Purohit Sabha</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-widest mb-1">{t('reg_org_name')} *</label>
                      <input type="text" required value={regData.commName} onChange={e=>setRegData({...regData, commName: e.target.value})} className="w-full p-3.5 bg-white border border-stone-200 rounded-xl text-sm font-bold text-stone-800 focus:border-amber-500 outline-none transition-all shadow-sm" placeholder="e.g. Sri Ram Mandir Trust" />
                    </div>

                    <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-sm space-y-4">
                       <div className="flex items-center gap-2 text-[10px] font-black text-amber-600 uppercase tracking-widest border-b border-stone-100 pb-2 mb-2">
                         <MapPin size={14}/> Location Details
                       </div>
                       <div>
                         <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-widest mb-1">Country *</label>
                         <div className="relative">
                           <Globe2 size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-stone-400" />
                           <select required value={regData.country} onChange={handleCountryChange} className="w-full pl-10 pr-4 py-3.5 bg-stone-50 border border-stone-200 rounded-xl text-sm font-bold text-stone-800 focus:bg-white focus:border-amber-500 outline-none transition-all cursor-pointer appearance-none">
                             <option value="" disabled>Select Country...</option>
                             <option value="India">India (भारत)</option>
                             <option value="Bangladesh">Bangladesh (বাংলাদেশ)</option>
                             <option value="Nepal">Nepal (नेपाल)</option>
                             <option value="Sri Lanka">Sri Lanka</option>
                             <option value="USA">United States</option>
                             <option value="UK">United Kingdom</option>
                             <option value="Other">Other Region</option>
                           </select>
                         </div>
                       </div>
                       <div className="grid grid-cols-2 gap-3">
                         <div>
                           <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-widest mb-1">State / Division *</label>
                           <input type="text" required value={regData.state} onChange={e=>setRegData({...regData, state: e.target.value})} className="w-full p-3.5 bg-stone-50 border border-stone-200 rounded-xl text-sm font-bold text-stone-800 focus:bg-white focus:border-amber-500 outline-none transition-all" placeholder="e.g. West Bengal" />
                         </div>
                         <div>
                           <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-widest mb-1">City / District *</label>
                           <input type="text" required value={regData.city} onChange={e=>setRegData({...regData, city: e.target.value})} className="w-full p-3.5 bg-stone-50 border border-stone-200 rounded-xl text-sm font-bold text-stone-800 focus:bg-white focus:border-amber-500 outline-none transition-all" placeholder="e.g. Kolkata" />
                         </div>
                       </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-black text-stone-500 uppercase tracking-widest mb-1.5">{t('reg_desc')}</label>
                      <div className="relative">
                        <AlignLeft size={16} className="absolute left-3 top-3.5 text-stone-400" />
                        <textarea rows={2} value={regData.description} onChange={e=>setRegData({...regData, description: e.target.value})} className="w-full pl-10 pr-4 p-3.5 bg-white border border-stone-200 rounded-xl text-sm font-bold text-stone-800 focus:border-amber-500 outline-none shadow-sm transition-colors resize-none" placeholder={regData.type === 'PurohitSabha' ? 'Short description of your services...' : 'Short description of your community...'} />
                      </div>
                    </div>
                  </div>

                  <div className="bg-stone-50/50 p-5 rounded-2xl border border-stone-200 space-y-4">
                    <h4 className="text-[10px] font-black text-stone-500 uppercase tracking-widest border-b border-stone-200 pb-2 flex items-center gap-2"><User size={14}/> {t('reg_step2')}</h4>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-black text-stone-500 uppercase tracking-widest mb-1.5">{t('reg_your_name')}</label>
                        <input type="text" required value={regData.adminName} onChange={e=>setRegData({...regData, adminName: e.target.value})} className="w-full p-3.5 bg-white border border-stone-200 rounded-xl text-sm font-bold text-stone-800 focus:border-amber-500 outline-none shadow-sm transition-colors" placeholder="Full Name" />
                      </div>
                      <div>
                        <label className="block text-[10px] font-black text-stone-500 uppercase tracking-widest mb-1.5">{t('reg_your_phone')}</label>
                        <input type="tel" required value={regData.phone} onChange={e=>setRegData({...regData, phone: e.target.value})} className="w-full p-3.5 bg-white border border-stone-200 rounded-xl text-sm font-bold text-stone-800 focus:border-amber-500 outline-none shadow-sm transition-colors" placeholder="Mobile Number" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-black text-stone-500 uppercase tracking-widest mb-1.5">{t('reg_official_email')}</label>
                      <div className="relative">
                        <Mail size={16} className="absolute left-3 top-3.5 text-stone-400" />
                        <input type="email" required value={regData.email} onChange={e=>setRegData({...regData, email: e.target.value})} className="w-full pl-10 pr-4 p-3.5 bg-white border border-stone-200 rounded-xl text-sm font-bold text-stone-800 focus:border-amber-500 outline-none shadow-sm transition-colors" placeholder="admin@example.com" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-black text-stone-500 uppercase tracking-widest mb-1.5">{t('login_pass')} *</label>
                      <div className="relative">
                        <Lock size={16} className="absolute left-3 top-3.5 text-stone-400" />
                        <input type="password" required value={regData.password} onChange={e=>setRegData({...regData, password: e.target.value})} className="w-full pl-10 pr-4 p-3.5 bg-white border border-stone-200 rounded-xl text-sm font-bold text-stone-800 focus:border-amber-500 outline-none shadow-sm transition-colors" placeholder="Create a strong password" />
                      </div>
                    </div>
                  </div>

                  <AnimatePresence>
                    {error && (
                      <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
                        <div className="bg-red-50 border border-red-200 text-red-600 p-3.5 rounded-xl text-xs font-bold text-center shadow-sm flex items-center justify-center gap-2">
                          <AlertTriangle size={14}/> {error}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <button type="submit" disabled={loading} className="w-full bg-amber-500 hover:bg-amber-600 text-white font-black py-4 rounded-2xl shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5 text-xs uppercase tracking-widest flex justify-center items-center gap-2 mt-6 disabled:opacity-50 disabled:hover:translate-y-0">
                    {loading ? <Loader2 size={18} className="animate-spin" /> : t('btn_create_dynamic').replace('{X}', regData.type.toUpperCase())}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
`;

const updatedCode = code.replace(returnRegex, newReturn);
fs.writeFileSync('src/components/public/PortalLogin.tsx', updatedCode);
