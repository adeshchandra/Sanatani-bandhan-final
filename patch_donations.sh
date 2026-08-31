#!/bin/bash
sed -i '1066i\
                </>\
              )}\
              {detailTab === '\''donations'\'' && canViewFinancials && (\
                <div className="space-y-4">\
                  <div className="flex justify-between items-center bg-stone-950/50 p-4 rounded-2xl border border-stone-800/60">\
                    <div>\
                      <h3 className="text-stone-200 font-bold">Donation History</h3>\
                      <p className="text-xs text-stone-500">{selectedDevoteeDonations.length} records found</p>\
                    </div>\
                    <button\
                      onClick={() => generateDonationHistoryPDF(selectedDevotee, selectedDevoteeDonations, activeWorkspace)}\
                      className="px-3 py-1.5 bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-400 text-xs font-bold rounded-lg border border-indigo-500/30 flex items-center gap-1.5 transition-colors"\
                    >\
                      <FileText className="w-4 h-4" /> Export PDF\
                    </button>\
                  </div>\
                  <div className="bg-stone-900 border border-stone-800/60 rounded-2xl overflow-hidden">\
                    <table className="w-full text-left text-sm whitespace-nowrap">\
                      <thead className="bg-stone-950/50 text-stone-400 border-b border-stone-800/60">\
                        <tr>\
                          <th className="px-4 py-3 font-semibold">Date</th>\
                          <th className="px-4 py-3 font-semibold">Receipt No.</th>\
                          <th className="px-4 py-3 font-semibold">Category</th>\
                          <th className="px-4 py-3 font-semibold">Mode</th>\
                          <th className="px-4 py-3 font-semibold text-right">Amount (₹)</th>\
                        </tr>\
                      </thead>\
                      <tbody className="divide-y divide-stone-800/60 text-stone-300">\
                        {selectedDevoteeDonations.map((donation) => (\
                          <tr key={donation.id} className="hover:bg-stone-800/40 transition-colors">\
                            <td className="px-4 py-3">{new Date(donation.date).toLocaleDateString()}</td>\
                            <td className="px-4 py-3 font-mono text-xs text-stone-400">{donation.id}</td>\
                            <td className="px-4 py-3">{donation.category}</td>\
                            <td className="px-4 py-3">{donation.paymentMode}</td>\
                            <td className="px-4 py-3 font-bold text-amber-400 text-right">{donation.amount.toLocaleString()}</td>\
                          </tr>\
                        ))}\
                        {selectedDevoteeDonations.length === 0 && (\
                          <tr>\
                            <td colSpan={5} className="px-4 py-8 text-center text-stone-500">\
                              No donation records found for this devotee.\
                            </td>\
                          </tr>\
                        )}\
                      </tbody>\
                    </table>\
                  </div>\
                </div>\
              )}' src/components/domain1/DevoteeGrid.tsx
