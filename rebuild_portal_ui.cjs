const fs = require('fs');
let code = fs.readFileSync('src/components/public/PortalLogin.tsx', 'utf8');

// Ensure Flame is imported
if (!code.includes('Flame,')) {
    code = code.replace("Upload, Camera", "Upload, Camera, Flame");
}

const lines = code.split('\n');
const returnIndex = lines.findIndex(line => line.includes('return ('));

const logicCode = lines.slice(0, returnIndex).join('\n');

const newUI = `  return (
    <div className="fixed inset-0 z-50 flex bg-stone-50">
      {/* Left Panel - Hero Branding (Desktop) */}
      <div className="hidden lg:flex flex-col justify-between w-[40%] xl:w-[45%] bg-stone-950 text-white p-12 relative overflow-hidden shrink-0">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[800px] h-[800px] bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-[600px] h-[600px] bg-orange-600/10 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="relative z-10">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-stone-400 hover:text-white transition-colors w-fit group font-bold mb-16"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            Back to Public Site
          </button>

          <div className="flex items-center gap-4 mb-10">
            <div className="w-14 h-14 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-xl shadow-orange-500/20">
              <Flame className="w-7 h-7 text-white" />
            </div>
            <span className="text-3xl font-black tracking-tight text-white">Sanatani Bandhan</span>
          </div>
          
          <h1 className="text-4xl xl:text-5xl font-black mb-6 leading-[1.15] tracking-tight">
            Unify your <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">
              spiritual community
            </span>
          </h1>
          <p className="text-stone-400 text-lg font-medium leading-relaxed max-w-md">
            The all-in-one enterprise operating system for Mandirs, Goshalas, Ashrams, and Sanghas to manage devotees, finances, and rituals.
          </p>
        </div>

        <div className="relative z-10 text-[11px] font-bold text-stone-500 uppercase tracking-widest space-y-2">
          <p>Protected by Enterprise-Grade Security</p>
          <p>Made with ❤️ by TrackIQ Academy</p>
          <p>© {new Date().getFullYear()} Sanatani Bandhan</p>
        </div>
      </div>

      {/* Right Panel - Auth Forms */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 sm:p-12 relative overflow-y-auto custom-scrollbar">
         
         {/* Mobile Header */}
         <div className="lg:hidden absolute top-0 left-0 right-0 bg-white border-b border-stone-200 px-6 py-4 flex items-center justify-between z-10 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center shadow-md shadow-orange-500/20">
                <Flame className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-black tracking-tight text-stone-900">Sanatani Bandhan</span>
            </div>
            <button 
              onClick={onBack}
              className="p-2 bg-stone-100 rounded-full text-stone-600 hover:text-stone-900 hover:bg-stone-200 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
         </div>

         <div className="w-full max-w-md relative z-10 mt-20 lg:mt-0">
            {mode === 'login' ? (
              <div className="bg-white rounded-[2rem] shadow-2xl shadow-stone-200/50 p-8 sm:p-10 border border-stone-100">
                <div className="mb-8">
                  <h2 className="text-3xl font-black text-stone-900 mb-2 tracking-tight">Welcome Back</h2>
                  <p className="text-stone-500 font-medium">Please sign in to your account</p>
                </div>

                {/* Tabs */}
                <div className="flex bg-stone-100 p-1.5 rounded-xl mb-8">
                  <button
                    type="button"
                    onClick={() => setLoginTab('admin')}
                    className={\`flex-1 py-2.5 text-xs sm:text-sm font-bold rounded-lg transition-all \${
                      loginTab === 'admin' 
                        ? 'bg-white text-stone-900 shadow-sm border border-stone-200/50' 
                        : 'text-stone-500 hover:text-stone-700'
                    }\`}
                  >
                    Admin
                  </button>
                  <button
                    type="button"
                    onClick={() => setLoginTab('devotee')}
                    className={\`flex-1 py-2.5 text-xs sm:text-sm font-bold rounded-lg transition-all \${
                      loginTab === 'devotee' 
                        ? 'bg-white text-stone-900 shadow-sm border border-stone-200/50' 
                        : 'text-stone-500 hover:text-stone-700'
                    }\`}
                  >
                    Devotee
                  </button>
                  <button
                    type="button"
                    onClick={() => setLoginTab('qr')}
                    className={\`flex-1 py-2.5 text-xs sm:text-sm font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 \${
                      loginTab === 'qr' 
                        ? 'bg-emerald-50 text-emerald-700 shadow-sm border border-emerald-200/50' 
                        : 'text-stone-500 hover:text-emerald-600'
                    }\`}
                  >
                    <QrCode className="w-4 h-4" /> Smart Pass
                  </button>
                </div>

                <form onSubmit={handleLogin} className="space-y-5">
                  {loginTab === 'admin' && (
                    <div className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-300">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-stone-700 uppercase tracking-wider">Email or Phone</label>
                        <div className="relative">
                          <User className="w-5 h-5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                          <input 
                            type="text" 
                            value={adminPhoneEmail}
                            onChange={(e) => setAdminPhoneEmail(e.target.value)}
                            required
                            className="w-full bg-stone-50 border border-stone-200 rounded-xl py-3.5 pl-10 pr-4 text-sm font-bold focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all placeholder:text-stone-400"
                            placeholder="admin@mandir.org"
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between">
                          <label className="text-xs font-bold text-stone-700 uppercase tracking-wider">Password</label>
                          <button type="button" className="text-xs font-bold text-amber-600 hover:text-amber-700">Forgot?</button>
                        </div>
                        <div className="relative">
                          <KeyRound className="w-5 h-5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                          <input 
                            type="password" 
                            value={adminPassword}
                            onChange={(e) => setAdminPassword(e.target.value)}
                            required
                            className="w-full bg-stone-50 border border-stone-200 rounded-xl py-3.5 pl-10 pr-4 text-sm font-bold focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all placeholder:text-stone-400"
                            placeholder="••••••••"
                          />
                        </div>
                      </div>

                      <div className="relative flex items-center py-2">
                        <div className="flex-grow border-t border-stone-200"></div>
                        <span className="flex-shrink-0 mx-4 text-stone-400 text-xs font-bold uppercase tracking-wider">Or Admin SSO</span>
                        <div className="flex-grow border-t border-stone-200"></div>
                      </div>

                      <button
                        type="button"
                        onClick={handleGoogleSignIn}
                        disabled={isProcessing}
                        className="w-full py-3.5 rounded-xl font-bold text-stone-700 bg-white border border-stone-200 shadow-sm hover:bg-stone-50 transition-all flex justify-center items-center gap-3"
                      >
                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                        </svg>
                        Sign in with Workspace
                      </button>
                    </div>
                  )}

                  {loginTab === 'devotee' && (
                    <div className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-300">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-stone-700 uppercase tracking-wider">{t('registered_phone_id', 'Registered Phone / ID', 'নিবন্ধিত ফোন / আইডি', 'पंजीकृत फोन / आईडी')}</label>
                        <div className="relative">
                          <User className="w-5 h-5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                          <input 
                            type="text" 
                            value={devoteePhoneId}
                            onChange={(e) => setDevoteePhoneId(e.target.value)}
                            required
                            className="w-full bg-stone-50 border border-stone-200 rounded-xl py-3.5 pl-10 pr-4 text-sm font-bold focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all placeholder:text-stone-400"
                            placeholder="+91 98765 43210"
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-stone-700 uppercase tracking-wider">{t('auth_pin', 'Authentication PIN', 'অ প্রমাণীকরণ পিন', 'प्रमाणीकरण पिन')}</label>
                        <div className="relative">
                          <KeyRound className="w-5 h-5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                          <input 
                            type="password"
                            inputMode="numeric" 
                            value={devoteePin}
                            onChange={(e) => setDevoteePin(e.target.value)}
                            required
                            className="w-full bg-stone-50 border border-stone-200 rounded-xl py-3.5 pl-10 pr-4 text-sm font-bold focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all placeholder:text-stone-400 tracking-widest"
                            placeholder="••••"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {loginTab === 'qr' && (
                    <div className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-300">
                      <div className="text-center py-2 space-y-3">
                        <div className="w-16 h-16 bg-emerald-100 rounded-2xl mx-auto flex items-center justify-center border border-emerald-200 shadow-inner">
                          <QrCode className="w-8 h-8 text-emerald-600" />
                        </div>
                        <p className="text-sm font-bold text-stone-600">
                          {t('qr_instruction', 'Use your Smart Pass to auto-login', 'অটো-লগইনের জন্য আপনার স্মার্ট পাস ব্যবহার করুন', 'ऑटो-लॉगिन के लिए अपने स्मार्ट पास का उपयोग करें')}
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <button
                          type="button"
                          onClick={() => setIsCameraOpen(true)}
                          className="flex flex-col items-center justify-center gap-2 py-4 bg-stone-50 border border-stone-200 rounded-xl hover:bg-stone-100 hover:border-emerald-300 transition-colors group"
                        >
                          <Camera className="w-6 h-6 text-stone-400 group-hover:text-emerald-500 transition-colors" />
                          <span className="text-xs font-bold text-stone-700">{t('live_scan', 'Live Scan', 'লাইভ স্ক্যান', 'लाइव स्कैन')}</span>
                        </button>
                        
                        <label className="flex flex-col items-center justify-center gap-2 py-4 bg-stone-50 border border-stone-200 rounded-xl hover:bg-stone-100 hover:border-emerald-300 transition-colors cursor-pointer group">
                          <Upload className="w-6 h-6 text-stone-400 group-hover:text-emerald-500 transition-colors" />
                          <span className="text-xs font-bold text-stone-700">{t('upload_qr', 'Upload Image', 'ছবি আপলোড করুন', 'छवि अपलोड करें')}</span>
                          <input type="file" className="hidden" accept="image/*" onChange={handleQRUpload} />
                        </label>
                      </div>

                      {qrCodeUrl && (
                        <div className="mt-4 p-4 bg-white rounded-xl shadow-lg border border-stone-200 text-center">
                          <img src={qrCodeUrl} alt="Recovery QR" className="w-32 h-32 mx-auto rounded-lg mb-2" />
                          <p className="text-xs text-stone-500 font-bold uppercase">Recovery Token</p>
                        </div>
                      )}
                      {!qrCodeUrl && (
                        <div className="text-center mt-2">
                           <button type="button" onClick={generateRecoveryQR} className="text-xs text-stone-400 hover:text-stone-600 font-bold transition-colors">
                              Generate Diagnostics Token
                           </button>
                        </div>
                      )}
                    </div>
                  )}

                  {loginTab !== 'qr' && (
                    <button
                      type="submit"
                      disabled={isProcessing}
                      className={\`w-full py-4 rounded-xl font-black text-white shadow-xl transition-all flex justify-center items-center gap-2 \${
                        loginTab === 'admin' 
                          ? 'bg-stone-900 hover:bg-stone-800 shadow-stone-900/20' 
                          : 'bg-amber-600 hover:bg-amber-500 shadow-amber-600/20'
                      } \${isProcessing ? 'opacity-80 cursor-not-allowed' : ''}\`}
                    >
                      {isProcessing ? <Loader2 className="w-5 h-5 animate-spin" /> : (
                        <>
                          {loginTab === 'admin' ? <ShieldCheck className="w-5 h-5" /> : <User className="w-5 h-5" />}
                          {t('login_btn', 'Secure Authentication', 'নিরাপদ লগইন', 'सुरक्षित प्रमाणीकरण')}
                        </>
                      )}
                    </button>
                  )}
                </form>

                <div className="text-center mt-8 pt-6 border-t border-stone-100">
                  <p className="text-sm font-medium text-stone-500">
                    Need to establish a new organization? <br/>
                    <button 
                      onClick={() => { setMode('signup'); setWizardStep(1); }} 
                      className="text-amber-600 hover:text-amber-700 font-black mt-1"
                    >
                      Initialize Workspace
                    </button>
                  </p>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-[2rem] shadow-2xl shadow-stone-200/50 p-8 sm:p-10 border border-stone-100">
                <div className="mb-8">
                  <h2 className="text-3xl font-black text-stone-900 mb-2 tracking-tight">System Init</h2>
                  <p className="text-stone-500 font-medium">Provision a new global workspace</p>
                </div>

                <div className="flex gap-2 mb-8">
                  {[1,2,3].map((step) => (
                    <div key={step} className={\`h-1.5 rounded-full flex-1 transition-colors \${wizardStep >= step ? 'bg-amber-500' : 'bg-stone-200'}\`}></div>
                  ))}
                </div>

                <form onSubmit={handleSignupSubmit} className="space-y-5">
                  {wizardStep === 1 && (
                    <div className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-300">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-stone-700 uppercase tracking-wider">Organization Name</label>
                        <div className="relative">
                          <Building2 className="w-5 h-5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                          <input 
                            type="text" 
                            required
                            value={regOrgName}
                            onChange={(e) => setRegOrgName(e.target.value)}
                            className="w-full bg-stone-50 border border-stone-200 rounded-xl py-3 pl-10 pr-4 text-sm font-bold focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all placeholder:text-stone-400 placeholder:font-medium"
                            placeholder="e.g. Kashi Vishwanath Mandir"
                          />
                        </div>
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-stone-700 uppercase tracking-wider">Domain Type</label>
                        <div className="relative">
                          <Sparkles className="w-5 h-5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                          <select
                            value={regOrgType}
                            onChange={(e) => setRegOrgType(e.target.value as WorkspaceType)}
                            className="w-full bg-stone-50 border border-stone-200 rounded-xl py-3 pl-10 pr-4 text-sm font-bold focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all appearance-none"
                          >
                            {ORG_TYPES.map(type => (
                              <option key={type} value={type}>{type}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                  )}

                  {wizardStep === 2 && (
                    <div className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-300">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-stone-700 uppercase tracking-wider">Region / Country</label>
                        <div className="relative">
                          <Globe2 className="w-5 h-5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                          <select
                            value={regCountry}
                            onChange={(e) => setRegCountry(e.target.value)}
                            className="w-full bg-stone-50 border border-stone-200 rounded-xl py-3 pl-10 pr-4 text-sm font-bold focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all appearance-none"
                          >
                            <option value="India">India</option>
                            <option value="USA">USA</option>
                            <option value="UK">UK</option>
                            <option value="Australia">Australia</option>
                            <option value="Canada">Canada</option>
                          </select>
                        </div>
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-stone-700 uppercase tracking-wider">Physical Address</label>
                        <div className="relative">
                          <MapPin className="w-5 h-5 text-stone-400 absolute left-3 top-3" />
                          <textarea 
                            required
                            rows={3}
                            value={regAddress}
                            onChange={(e) => setRegAddress(e.target.value)}
                            className="w-full bg-stone-50 border border-stone-200 rounded-xl py-3 pl-10 pr-4 text-sm font-bold focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all resize-none placeholder:text-stone-400 placeholder:font-medium"
                            placeholder="Complete street address..."
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {wizardStep === 3 && (
                    <div className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-300">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-stone-700 uppercase tracking-wider">Admin Name</label>
                        <div className="relative">
                          <User className="w-5 h-5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                          <input 
                            type="text" 
                            required
                            value={regAdminName}
                            onChange={(e) => setRegAdminName(e.target.value)}
                            className="w-full bg-stone-50 border border-stone-200 rounded-xl py-3 pl-10 pr-4 text-sm font-bold focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all placeholder:text-stone-400 placeholder:font-medium"
                            placeholder="Full Name"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-xs font-bold text-stone-700 uppercase tracking-wider">Phone</label>
                          <div className="relative">
                            <Phone className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                            <input 
                              type="tel" 
                              required
                              value={regAdminPhone}
                              onChange={(e) => setRegAdminPhone(e.target.value)}
                              className="w-full bg-stone-50 border border-stone-200 rounded-xl py-3 pl-9 pr-3 text-sm font-bold focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all placeholder:text-stone-400 placeholder:font-medium"
                              placeholder="Phone"
                            />
                          </div>
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-xs font-bold text-stone-700 uppercase tracking-wider">Email</label>
                          <div className="relative">
                            <Mail className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                            <input 
                              type="email" 
                              required
                              value={regAdminEmail}
                              onChange={(e) => setRegAdminEmail(e.target.value)}
                              className="w-full bg-stone-50 border border-stone-200 rounded-xl py-3 pl-9 pr-3 text-sm font-bold focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all placeholder:text-stone-400 placeholder:font-medium"
                              placeholder="Email"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-stone-700 uppercase tracking-wider">Master Password</label>
                        <div className="relative">
                          <KeyRound className="w-5 h-5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                          <input 
                            type="password" 
                            required
                            value={regAdminPassword}
                            onChange={(e) => setRegAdminPassword(e.target.value)}
                            className="w-full bg-stone-50 border border-stone-200 rounded-xl py-3 pl-10 pr-4 text-sm font-bold focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all placeholder:text-stone-400 placeholder:font-medium"
                            placeholder="Create a strong password"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center gap-3 mt-8">
                    {wizardStep > 1 && (
                      <button
                        type="button"
                        onClick={() => setWizardStep(wizardStep - 1 as any)}
                        className="py-3.5 px-6 rounded-xl font-bold text-stone-600 bg-stone-100 hover:bg-stone-200 transition-colors"
                      >
                        Back
                      </button>
                    )}
                    <button
                      type="submit"
                      disabled={isProcessing}
                      className="flex-1 py-3.5 rounded-xl font-black text-white bg-stone-900 hover:bg-stone-800 shadow-xl shadow-stone-900/20 transition-all flex justify-center items-center gap-2"
                    >
                      {isProcessing ? <Loader2 className="w-5 h-5 animate-spin" /> : (
                        <>
                          {wizardStep === 3 ? 'Establish Workspace' : 'Continue'}
                          {wizardStep < 3 && <ArrowRight className="w-4 h-4" />}
                        </>
                      )}
                    </button>
                  </div>
                </form>
                
                <div className="text-center pt-8 border-t border-stone-100 mt-8">
                  <button
                    onClick={() => setMode('login')}
                    className="text-stone-500 hover:text-stone-900 font-bold text-sm transition-colors"
                  >
                    Cancel and return to Gateway
                  </button>
                </div>
              </div>
            )}
         </div>
      </div>

      {isCameraOpen && (
        <div className="fixed inset-0 z-[100] bg-black/90 flex flex-col animate-in fade-in">
          <div className="p-6 flex justify-between items-center text-white bg-black/50 backdrop-blur-sm z-10">
            <h3 className="font-bold">Live Scan</h3>
            <button onClick={() => setIsCameraOpen(false)} className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors">
              <X className="w-6 h-6" />
            </button>
          </div>
          <div className="flex-1 relative">
            <CameraScanner 
              onClose={() => setIsCameraOpen(false)}
              onScan={(data) => processQRData(data, 'qr_camera')}
            />
          </div>
        </div>
      )}
    </div>
  );
};
`;

const finalCode = logicCode + '\n' + newUI;
fs.writeFileSync('src/components/public/PortalLogin.tsx', finalCode);
