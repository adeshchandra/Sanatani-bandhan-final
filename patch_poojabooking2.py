import re

filepath = 'src/components/domain3/PoojaBookingDesk.tsx'
with open(filepath, 'r') as f:
    content = f.read()

# 6. Update Status Change Buttons
old_buttons = """            {/* Status Change Buttons */}
            <div className="pt-2 border-t border-stone-800 flex items-center justify-between">
              <span className="text-[10px] text-stone-400 font-mono">ID: {pooja.id}</span>
              {pooja.status !== 'Completed' && (
                <button
                  type="button"
                  onClick={() => updatePoojaStatus(pooja.id, 'Completed')}
                  className="px-3 py-1 rounded-xl bg-stone-800 hover:bg-emerald-600 hover:text-stone-950 text-stone-300 text-xs font-semibold flex items-center gap-1 transition-all cursor-pointer"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Mark Completed</span>
                </button>
              )}
            </div>"""

new_buttons = """            {/* Action Buttons */}
            <div className="pt-3 border-t border-stone-800 flex flex-wrap items-center justify-between gap-2">
              <span className="text-[10px] text-stone-400 font-mono">ID: {pooja.id}</span>
              
              <div className="flex items-center gap-2">
                {(pooja.status === 'Confirmed' || pooja.status === 'Completed') && (
                  <button
                    type="button"
                    onClick={() => printReceipt(pooja)}
                    className="px-2.5 py-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-stone-100 text-[10px] font-semibold flex items-center gap-1 transition-all cursor-pointer border border-stone-700"
                  >
                    <Printer className="w-3 h-3" />
                    <span>Receipt</span>
                  </button>
                )}
                
                {pooja.status !== 'Completed' && pooja.status !== 'Cancelled' && (
                  <>
                    <button
                      type="button"
                      onClick={() => openCancelModal(pooja.id)}
                      className="px-2.5 py-1.5 rounded-xl bg-stone-800 hover:bg-red-500/20 text-stone-300 hover:text-red-400 text-[10px] font-semibold flex items-center gap-1 transition-all cursor-pointer border border-stone-700 hover:border-red-500/30"
                    >
                      <XCircle className="w-3 h-3" />
                      <span>Cancel</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => updatePoojaStatus(pooja.id, 'Completed')}
                      className="px-2.5 py-1.5 rounded-xl bg-stone-800 hover:bg-emerald-600 hover:text-stone-950 text-stone-300 hover:border-emerald-500 text-[10px] font-semibold flex items-center gap-1 transition-all cursor-pointer border border-stone-700"
                    >
                      <CheckCircle2 className="w-3 h-3" />
                      <span>Complete</span>
                    </button>
                  </>
                )}
              </div>
            </div>"""

content = content.replace(old_buttons, new_buttons)

# 7. Add Cancel Modal UI just before final closing div
old_final_closing = """      <UpsellModal 
        isOpen={showUpsell}
        onClose={closeUpsell}
        onUpgrade={() => { window.location.href = '/?action=signup'; }}
        module={upsellModule}
      />
    </div>
  );
};"""

cancel_modal_ui = """      {/* Cancel Booking Modal */}
      {cancelModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-md">
          <div className="bg-stone-900 border border-stone-700 rounded-2xl max-w-sm w-full p-6 text-stone-100 shadow-2xl">
            <h3 className="font-bold text-lg text-red-400 mb-2">Cancel Booking</h3>
            <p className="text-xs text-stone-400 mb-4">Please provide a reason for cancelling this ritual booking.</p>
            
            <textarea
              value={cancellationReason}
              onChange={(e) => setCancellationReason(e.target.value)}
              placeholder="E.g., Requested by devotee, scheduling conflict..."
              rows={3}
              className="w-full bg-stone-800 border border-stone-700 rounded-xl px-3 py-2 text-xs text-stone-200 focus:border-red-500 focus:outline-none mb-4"
            />
            
            <div className="flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setCancelModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-stone-800 text-stone-300 font-semibold text-xs"
              >
                Keep Booking
              </button>
              <button
                type="button"
                onClick={confirmCancel}
                className="px-5 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-stone-50 font-bold text-xs"
              >
                Confirm Cancel
              </button>
            </div>
          </div>
        </div>
      )}"""

content = content.replace(old_final_closing, cancel_modal_ui + "\n" + old_final_closing)

# 8. Render Org/Individual tag in the list card view
card_header_old = """                  <div className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
                    <Flame className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-sm text-stone-100">{pooja.poojaName}</h3>
                    <p className="text-xs text-amber-400 font-semibold">{pooja.devoteeName}</p>
                  </div>"""

card_header_new = """                  <div className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
                    {pooja.bookingType === 'Organization' ? <Building2 className="w-4 h-4" /> : <Flame className="w-4 h-4" />}
                  </div>
                  <div className="truncate">
                    <h3 className="font-extrabold text-sm text-stone-100 truncate">{pooja.poojaName}</h3>
                    <div className="flex items-center gap-1.5 text-xs text-amber-400 font-semibold">
                      {pooja.bookingType === 'Organization' && <span className="px-1.5 py-0.5 rounded bg-stone-800 text-[9px] text-stone-400 uppercase tracking-widest border border-stone-700">Org</span>}
                      <p className="truncate">{pooja.bookingType === 'Organization' ? pooja.organizationName : pooja.devoteeName}</p>
                    </div>
                  </div>"""

content = content.replace(card_header_old, card_header_new)

with open(filepath, 'w') as f:
    f.write(content)
