import re

with open('src/components/domain1/DevoteeGrid.tsx', 'r') as f:
    content = f.read()

target_donations = """  const selectedDevoteeDonations = useMemo(() => {
    if (!selectedDevotee) return [];
    return treasury.filter(t => t.devoteeId === selectedDevotee.id).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [treasury, selectedDevotee]);"""

replacement_donations = """  const selectedDevoteeDonations = useMemo(() => {
    if (!selectedDevotee) return [];
    return treasury.filter(t => t.devoteeId === selectedDevotee.id).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [treasury, selectedDevotee]);

  const selectedDevoteeTimeline = useMemo(() => {
    if (!selectedDevotee) return [];
    const events: any[] = [];
    
    // Add donations
    treasury.filter(t => t.devoteeId === selectedDevotee.id).forEach(t => {
      events.push({
        id: t.id,
        date: new Date(t.date).getTime(),
        type: 'donation',
        title: `Donation: ${t.category}`,
        desc: `₹${t.amount.toLocaleString()} via ${t.paymentMode}`,
        icon: Receipt,
        color: 'text-amber-400'
      });
    });

    // Add poojas if poojas is an array
    if (Array.isArray(poojas)) {
      poojas.filter(p => p.devoteeId === selectedDevotee.id).forEach(p => {
        events.push({
          id: p.id,
          date: p._createdAt,
          type: 'pooja',
          title: `Pooja Sankalp: ${p.poojaName}`,
          desc: p.status,
          icon: Sparkles,
          color: 'text-indigo-400'
        });
      });
    }

    // Add profile creation
    if (selectedDevotee.id) {
      events.push({
        id: 'created',
        date: parseInt(selectedDevotee.id.split('-')[1] || Date.now().toString()),
        type: 'system',
        title: 'Profile Created',
        desc: `Registered as ${selectedDevotee.role}`,
        icon: UserCog,
        color: 'text-stone-400'
      });
    }

    return events.sort((a, b) => b.date - a.date);
  }, [selectedDevotee, treasury, poojas]);"""

target_ui = """                    </table>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      )}"""

replacement_ui = """                    </table>
                  </div>
                </div>
              )}

              {detailTab === 'timeline' as any && (
                <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-stone-700 before:to-transparent">
                  {selectedDevoteeTimeline.map((event, i) => {
                    const Icon = event.icon;
                    return (
                      <div key={event.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                        <div className="flex items-center justify-center w-10 h-10 rounded-full border border-stone-700 bg-stone-900 text-stone-400 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                          <Icon className={`w-4 h-4 ${event.color}`} />
                        </div>
                        <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-stone-900/80 p-4 rounded-xl border border-stone-800 shadow-xl hover:border-amber-500/50 transition-colors">
                          <div className="flex items-center justify-between space-x-2 mb-1">
                            <div className="font-bold text-stone-200 text-sm">{event.title}</div>
                            <time className="font-mono text-[10px] text-stone-500">{new Date(event.date).toLocaleDateString()}</time>
                          </div>
                          <div className="text-xs text-stone-400">{event.desc}</div>
                        </div>
                      </div>
                    );
                  })}
                  {selectedDevoteeTimeline.length === 0 && (
                    <div className="text-center text-stone-500 py-8">No activity recorded yet.</div>
                  )}
                </div>
              )}

            </div>
          </div>
        </div>
      )}"""

if target_donations in content and target_ui in content:
    content = content.replace(target_donations, replacement_donations)
    content = content.replace(target_ui, replacement_ui)
    with open('src/components/domain1/DevoteeGrid.tsx', 'w') as f:
        f.write(content)
    print("Patched timeline successfully")
else:
    print("Target timeline not found", target_donations in content, target_ui in content)
