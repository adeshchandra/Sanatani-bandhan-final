import re
filepath = 'src/components/domain7/YatraNetDesk.tsx'
with open(filepath, 'r') as f:
    text = f.read()

# Let's fix the end of YatraNetDesk.tsx
# The MESH tab has:
# <div className="space-y-6 animate-in slide-in-from-bottom-4"> (line 394)
#   {activeChatNode ? ( ... ) : ( <> ... </> )} 
#   {showSOSModal && ( ... )}
# </div> (missing!)
# )} (closes activeTab === 'SOCIAL' ? ... : ...)
# </div> (closes max-w-4xl container)

text = text.replace('''      )}

      </>
      )}
    </div>
  );
}''', '''      )}
      </>
      )}
      </div>
      )}
    </div>
  );
}''')
with open(filepath, 'w') as f:
    f.write(text)
