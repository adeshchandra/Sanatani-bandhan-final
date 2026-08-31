#!/bin/bash
sed -i '861a\
            {/* Tabs */}\
            <div className="flex border-b border-stone-800 bg-stone-900/50 px-6">\
              <button\
                onClick={() => setDetailTab('\''profile'\'')}\
                className={`py-3 px-4 text-sm font-semibold border-b-2 transition-colors ${detailTab === '\''profile'\'' ? '\''border-amber-500 text-amber-500'\'' : '\''border-transparent text-stone-400 hover:text-stone-300'\''}`}\
              >\
                Profile Information\
              </button>\
              {canViewFinancials && (\
                <button\
                  onClick={() => setDetailTab('\''donations'\'')}\
                  className={`py-3 px-4 text-sm font-semibold border-b-2 transition-colors ${detailTab === '\''donations'\'' ? '\''border-amber-500 text-amber-500'\'' : '\''border-transparent text-stone-400 hover:text-stone-300'\''}`}\
                >\
                  Donation History\
                </button>\
              )}\
            </div>
' src/components/domain1/DevoteeGrid.tsx
